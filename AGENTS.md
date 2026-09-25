# ariel-rabelo-portfolio

[Português](AGENTS.md) | [English](AGENTS.en.md)

Aplicação React + Vite + Tailwind CSS do portfólio bilíngue de Ariel Rabelo.

## Fluxo de trabalho

1. Leia `specs/README.md`.
2. Abra somente as capabilities relacionadas à tarefa.
3. Consulte `specs/system.md` para confirmar o que está implementado.
4. Consulte `specs/testing.md` antes de alterar a cobertura.
5. Use `docs/state.md` somente para handoff local.

Mudança funcional atualiza a capability; decisão duradoura cria ou substitui ADR; alteração de evidência atualiza `testing.md`; marco relevante atualiza `history.md`.

## Estrutura canônica

- `src/main.tsx`: entrypoint React e importação do CSS global;
- `src/App.tsx`: rotas e providers globais;
- `src/contexts/language.tsx`: estado, persistência e efeitos do idioma;
- `src/i18n/`: tipos, catálogo e regras puras de locale;
- `src/data/`: projetos e stack localizados;
- `src/index.css`: Tailwind CSS 4, tokens e estilos globais;
- `package.json`: scripts e dependências;
- `vite.config.ts`: React, Tailwind e alias `@`.

## Comandos

- `npm ci`: instalação reproduzível;
- `npm run dev`: servidor local;
- `npm run check`: TypeScript, testes e build;
- `python scripts/validate_specs.py .`: documentação técnica.

## Convenções

- Use npm e mantenha apenas `package-lock.json`.
- Preserve as rotas `/`, `/projects`, `/projects/:slug` e `/stack`.
- Preserve slugs, nomes próprios, tecnologias e URLs ao localizar conteúdo.
- Traduza texto visível, assistivo e metadados nos dois catálogos.
- Converta estados e níveis em chaves semânticas; traduza somente na apresentação.
- Mantenha `pt-BR` como fallback e `ariel-rabelo.locale` como chave de persistência.
- Use aspas duplas em strings com apóstrofos ou escape o apóstrofo.
- Feche tags JSX, mantenha chaves balanceadas e exporte componentes como default quando aplicável.
