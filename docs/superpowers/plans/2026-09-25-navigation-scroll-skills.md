# Plano de implementação: navegação responsiva ao scroll e habilidades

[Português](2026-09-25-navigation-scroll-skills.md) | [English](2026-09-25-navigation-scroll-skills.en.md)

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corrigir navegação, restauração de scroll e estado ativo da Navbar, além de atualizar somente o carrossel de Habilidades da home.

**Architecture:** Regras puras de navegação ficam em `src/lib/navigation.ts` para permitir testes sem DOM. A Navbar consome essas regras e recebe o estado aberto do seletor de idioma; a restauração de rota ocorre antes da pintura em `App.tsx`. O catálogo detalhado de stack permanece intacto e apenas `carouselCards` muda.

**Tech Stack:** React 19, React Router, TypeScript, Node Test Runner, Tailwind CSS 4.

---

### Task 1: Regras puras de navegação

**Files:**
- Create: `src/lib/navigation.test.ts`
- Create: `src/lib/navigation.ts`
- Modify: `package.json`

- [ ] **Step 1: Escrever testes que falham**

Criar testes para `NAV_LINKS`, `resolveActiveNavItem` e `getNextNavbarState`. Eles devem exigir Projetos em `/projects`, Habilidades em `/stack`, seção ativa na home, limiar acumulado, visibilidade perto do topo e bloqueio quando um painel está aberto.

```ts
test("Projects points to its page and route state wins", () => {
  assert.equal(NAV_LINKS.find((link) => link.id === "projects")?.to, "/projects")
  assert.equal(resolveActiveNavItem("/projects/agiliza-transparencia", "inicio"), "projects")
})

test("a panel keeps the navbar visible", () => {
  assert.deepEqual(
    getNextNavbarState({ anchorY: 100, currentY: 300, visible: false, locked: true }),
    { anchorY: 300, visible: true },
  )
})
```

- [ ] **Step 2: Confirmar a falha esperada**

Run: `node --experimental-strip-types --test src/lib/navigation.test.ts`

Expected: FAIL porque `src/lib/navigation.ts` ainda não existe.

- [ ] **Step 3: Implementar as funções mínimas**

Definir `NavItemId`, `NavLinkDefinition`, `NAV_LINKS`, `resolveActiveNavItem` e:

```ts
export function getNextNavbarState(input: NavbarScrollInput): NavbarScrollState {
  if (input.locked || input.currentY <= 64) {
    return { anchorY: input.currentY, visible: true }
  }
  const delta = input.currentY - input.anchorY
  if (Math.abs(delta) < 8) {
    return { anchorY: input.anchorY, visible: input.visible }
  }
  return { anchorY: input.currentY, visible: delta < 0 }
}
```

- [ ] **Step 4: Executar o teste e a suíte**

Run: `node --experimental-strip-types --test src/lib/navigation.test.ts && npm test`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/navigation.ts src/lib/navigation.test.ts package.json
git commit -m "test: define portfolio navigation behavior"
```

### Task 2: Navbar sincronizada e sensível à rolagem

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/LanguageSelector.tsx`

- [ ] **Step 1: Expor o estado do seletor de idioma**

Adicionar `onOpenChange?: (open: boolean) => void` ao seletor e notificar em cada mudança real de `open` por `useEffect`.

```ts
interface LanguageSelectorProps {
  onOpenChange?(open: boolean): void
}
```

- [ ] **Step 2: Consumir definições e estado ativo**

Remover a tabela local de hashes. Traduzir os labels de `NAV_LINKS`, resolver o item ativo por `resolveActiveNavItem(location.pathname, activeSection)` e manter `aria-current="location"` somente no destino ativo.

- [ ] **Step 3: Separar rota e âncora**

No clique, navegar para `link.to`. Projetos usa `/projects`; os demais destinos de seção usam `/#...`. O fluxo deve preservar cliques modificados e fechar o menu mobile.

- [ ] **Step 4: Aplicar visibilidade por direção**

Manter `scrollAnchorRef`, `navbarVisible` e `languageOpen`. Em cada scroll, chamar `getNextNavbarState` com `locked: menuOpen || accentOpen || languageOpen`. Aplicar ao `<nav>`:

```tsx
style={{
  transform: navbarVisible ? "translateY(0)" : "translateY(-110%)",
  ...existingVisualStyles,
}}
```

Mudança de rota e abertura de painel devem tornar a Navbar visível.

- [ ] **Step 5: Verificar tipos e testes**

Run: `npm run typecheck && npm test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.tsx src/components/LanguageSelector.tsx
git commit -m "feat: synchronize scroll-aware navigation"
```

### Task 3: Entrada de página sempre no topo

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Trocar o efeito de scroll**

Importar `useLayoutEffect`. No componente de restauração, configurar `window.history.scrollRestoration = "manual"` durante a montagem e restaurar o valor anterior no cleanup.

- [ ] **Step 2: Reposicionar antes da pintura**

Usar `useLayoutEffect` dependente de `pathname`:

```ts
useLayoutEffect(() => {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" })
}, [pathname])
```

- [ ] **Step 3: Verificar tipos e build**

Run: `npm run typecheck && npm run build`

Expected: PASS e build sem avisos.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "fix: restore routed pages at the top"
```

### Task 4: Conteúdo do bloco Habilidades

**Files:**
- Modify: `src/i18n/content.test.ts`
- Modify: `src/data/stack.ts`

- [ ] **Step 1: Escrever teste que falha**

Importar `carouselCards`, achatar `items` e exigir:

```ts
assert.equal(items.includes("PostgreSQL"), true)
assert.equal(items.includes("Next.js"), false)
assert.equal(items.includes("Power BI"), false)
```

- [ ] **Step 2: Confirmar a falha esperada**

Run: `node --experimental-strip-types --test src/i18n/content.test.ts`

Expected: FAIL porque o carrossel ainda contém Next.js e Power BI e não contém PostgreSQL.

- [ ] **Step 3: Alterar somente `carouselCards`**

Remover os cartões Next.js e Power BI e adicionar:

```ts
{ group: "POSTGRESQL", color: "#4169E1", items: ["PostgreSQL"] }
```

- [ ] **Step 4: Executar a suíte**

Run: `npm test`

Expected: PASS com o novo teste e os testes existentes.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/content.test.ts src/data/stack.ts
git commit -m "feat: update home skills carousel"
```

### Task 5: Memória técnica e validação final

**Files:**
- Create: `specs/changes/CHG-20260925-navigation-scroll-skills.md`
- Create: `specs/changes/CHG-20260925-navigation-scroll-skills.en.md`
- Modify: `specs/capabilities/core.md`
- Modify: `specs/capabilities/core.en.md`
- Modify: `specs/system.md`
- Modify: `specs/system.en.md`
- Modify: `specs/testing.md`
- Modify: `specs/testing.en.md`
- Modify: `specs/history.md`
- Modify: `specs/history.en.md`
- Modify: `docs/state.md`
- Modify: `docs/state.en.md`

- [ ] **Step 1: Consolidar comportamento e evidência**

Criar a especificação datada bilíngue da mudança e registrar Navbar por direção, destinos, item ativo, restauração no topo e conteúdo do bloco Habilidades. Atualizar datas, quantidade de testes e handoff em ambos os idiomas.

- [ ] **Step 2: Executar gates**

Run:

```bash
npm run check
npm run specs:check
npm audit --omit=dev
git diff --check
```

Expected: cada comando termina com código 0 e a auditoria não encontra vulnerabilidades.

- [ ] **Step 3: Verificar no navegador**

Confirmar desktop e mobile, PT-BR e inglês, rolagem nas duas direções, estado ativo, `/projects` no topo, menu mobile, teclado e console limpo.

- [ ] **Step 4: Commit**

```bash
git add specs docs/state.md docs/state.en.md
git commit -m "docs: record navigation and skills behavior"
```
