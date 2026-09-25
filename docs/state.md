# Estado da sessão

[Português](state.md) | [English](state.en.md)

## Visão operacional

O portfólio pessoal bilíngue está no repositório independente `Darkzin41/ariel-rabelo-portfolio`. As correções atuais estão isoladas na branch `codex/navbar-scroll-skills`, no worktree `ariel-rabelo-portfolio-nav-worktree`; o `main` permanece intacto até a integração.

## Resultado atual

- Interface, conteúdo assistivo e metadados completos em PT-BR e inglês.
- Identidade pública de Ariel Rabelo e posicionamento Full Stack/Python/PHP/IA.
- Código independente, padronizado em npm e sem infraestrutura específica de ferramentas de design.
- Navbar por direção, item ativo sincronizado, rota `/projects` direta e reset instantâneo no topo.
- Carrossel Habilidades da home com PostgreSQL, sem Next.js ou Power BI; dados detalhados preservados.
- Repositório público: `Darkzin41/ariel-rabelo-portfolio`.
- Nenhum deploy previsto nesta rodada.

## Verificação

TypeScript, 20 testes, build, specs, auditoria de produção, revisão manual responsiva e console limpo compõem o gate final descrito em `../specs/testing.md`.

## Handoff

Integrar somente no repositório pessoal após o gate final. Preservar a branch e o worktree até a sincronização; o repositório acadêmico não deve receber esta branch.
