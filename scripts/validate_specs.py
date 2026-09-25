#!/usr/bin/env python3
"""Validate bilingual project documentation and durable technical memory."""

from __future__ import annotations

import re
import sys
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import unquote


IGNORED_PARTS = {".git", "dist", "node_modules"}
REQUIRED_SPEC_FILES = (
    "README.md",
    "system.md",
    "testing.md",
    "open-decisions.md",
    "history.md",
)
CAPABILITY_FIELDS = (
    "id",
    "contract_status",
    "implementation_status",
    "last_verified",
    "last_verified_ref",
)
CAPABILITY_HEADINGS = (
    "Finalidade e limites",
    "Atores, permissões, entradas e resultados",
    "Contrato comportamental e critérios de aceite",
    "Invariantes e regras de negócio",
    "Estado atual e lacunas",
    "Evidências de implementação e teste",
    "Relações",
)
CHANGE_FIELDS = ("id", "status", "date", "affected_capabilities")
CHANGE_HEADINGS = (
    "Problema e contexto",
    "Resultado esperado",
    "Escopo",
    "Não escopo",
    "Alternativas e decisão",
    "Solução e fluxo",
    "Interfaces e dados afetados",
    "Falhas, segurança e compatibilidade",
    "Estratégia de testes",
    "Critérios de aceite",
    "Consolidação na memória viva",
)
LINK_RE = re.compile(r"!?\[[^\]]*]\(([^)]+)\)")
PLACEHOLDER_RE = re.compile(r"\b(?:TBD|TODO|FIXME|PLACEHOLDER|PREENCHER)\b", re.I)


@dataclass(frozen=True)
class Issue:
    code: str
    path: Path
    message: str


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}, text
    try:
        closing = lines.index("---", 1)
    except ValueError:
        return {}, text
    metadata: dict[str, str] = {}
    for line in lines[1:closing]:
        if ":" in line:
            key, value = line.split(":", 1)
            metadata[key.strip()] = value.strip().strip("\"'")
    return metadata, "\n".join(lines[closing + 1 :])


def has_heading(body: str, heading: str) -> bool:
    return bool(re.search(rf"^##\s+{re.escape(heading)}\s*$", body, re.M))


def markdown_files(root: Path) -> list[Path]:
    return sorted(
        path
        for path in root.rglob("*.md")
        if not any(part in IGNORED_PARTS for part in path.parts)
    )


def english_pair(path: Path) -> Path:
    return path.with_name(f"{path.stem}.en.md")


def canonical_pair(path: Path) -> Path:
    return path.with_name(f"{path.name.removesuffix('.en.md')}.md")


def validate_links(path: Path, root: Path) -> list[Issue]:
    issues: list[Issue] = []
    text = path.read_text(encoding="utf-8")
    for raw_target in LINK_RE.findall(text):
        target = raw_target.strip().strip("<>")
        if not target or target.startswith("#"):
            continue
        if re.match(r"^[a-z][a-z0-9+.-]*:", target, re.I):
            continue
        relative = unquote(target.split("#", 1)[0])
        resolved = (path.parent / relative).resolve()
        try:
            resolved.relative_to(root)
        except ValueError:
            issues.append(Issue("link-outside-project", path, raw_target))
            continue
        if not resolved.exists():
            issues.append(Issue("broken-link", path, raw_target))
    return issues


def validate_capability(path: Path) -> list[Issue]:
    issues: list[Issue] = []
    metadata, body = parse_frontmatter(path.read_text(encoding="utf-8"))
    for field in CAPABILITY_FIELDS:
        if not metadata.get(field):
            issues.append(Issue("capability-field-missing", path, field))
    if metadata.get("id") != path.stem:
        issues.append(Issue("capability-id-mismatch", path, metadata.get("id", "")))
    if metadata.get("contract_status") not in {"draft", "confirmed", "superseded"}:
        issues.append(Issue("invalid-contract-status", path, metadata.get("contract_status", "")))
    if metadata.get("implementation_status") not in {"planned", "partial", "implemented", "verified"}:
        issues.append(Issue("invalid-implementation-status", path, metadata.get("implementation_status", "")))
    try:
        date.fromisoformat(metadata.get("last_verified", ""))
    except ValueError:
        issues.append(Issue("invalid-verification-date", path, metadata.get("last_verified", "")))
    for heading in CAPABILITY_HEADINGS:
        if not has_heading(body, heading):
            issues.append(Issue("capability-section-missing", path, heading))
    return issues


def validate_change(path: Path) -> list[Issue]:
    issues: list[Issue] = []
    metadata, body = parse_frontmatter(path.read_text(encoding="utf-8"))
    for field in CHANGE_FIELDS:
        if not metadata.get(field):
            issues.append(Issue("change-field-missing", path, field))
    if metadata.get("status") not in {"draft", "approved", "implemented", "verified", "superseded"}:
        issues.append(Issue("invalid-change-status", path, metadata.get("status", "")))
    try:
        date.fromisoformat(metadata.get("date", ""))
    except ValueError:
        issues.append(Issue("invalid-change-date", path, metadata.get("date", "")))
    for heading in CHANGE_HEADINGS:
        if not has_heading(body, heading):
            issues.append(Issue("change-section-missing", path, heading))
    return issues


def validate_project(project_root: str | Path) -> list[Issue]:
    root = Path(project_root).resolve()
    specs = root / "specs"
    issues: list[Issue] = []
    if not specs.is_dir():
        return [Issue("specs-directory-missing", specs, "specs/")]

    for name in REQUIRED_SPEC_FILES:
        path = specs / name
        if not path.is_file():
            issues.append(Issue("required-file-missing", path, name))

    files = markdown_files(root)
    for path in files:
        text = path.read_text(encoding="utf-8")
        if not text.strip():
            issues.append(Issue("empty-file", path, "Markdown vazio"))
        if PLACEHOLDER_RE.search(text):
            issues.append(Issue("placeholder", path, "marcador pendente"))
        issues.extend(validate_links(path, root))

        if path.name.endswith(".en.md"):
            pair = canonical_pair(path)
            if not pair.is_file():
                issues.append(Issue("canonical-pair-missing", path, str(pair.relative_to(root))))
        else:
            pair = english_pair(path)
            if not pair.is_file():
                issues.append(Issue("english-pair-missing", path, str(pair.relative_to(root))))

    capability_files = sorted((specs / "capabilities").glob("*.md"))
    canonical_capabilities = [path for path in capability_files if not path.name.endswith(".en.md")]
    if not canonical_capabilities:
        issues.append(Issue("capability-missing", specs / "capabilities", "core.md"))
    for path in canonical_capabilities:
        issues.extend(validate_capability(path))

    for path in sorted((specs / "changes").glob("*.md")):
        if not path.name.endswith(".en.md"):
            issues.extend(validate_change(path))
    return issues


def main(argv: list[str] | None = None) -> int:
    root = Path(argv[0] if argv else ".").resolve()
    issues = validate_project(root)
    if not issues:
        print(f"[OK] Documentação bilíngue válida: {root / 'specs'}")
        return 0
    for issue in issues:
        try:
            display = issue.path.resolve().relative_to(root)
        except ValueError:
            display = issue.path
        print(f"[ERROR] {issue.code}: {display}: {issue.message}")
    print(f"[FAIL] {len(issues)} problema(s) encontrado(s).")
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
