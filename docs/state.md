# Estado da sessão

[Português](state.md) | [English](state.en.md)

## Visão operacional

O portfólio pessoal bilíngue está no repositório independente `Darkzin41/ariel-rabelo-portfolio`. As alterações foram integradas e sincronizadas no `main`; a branch `codex/navbar-scroll-skills` e o worktree `ariel-rabelo-portfolio-nav-worktree` permanecem preservados para recuperação.

## Resultado atual

- Interface, conteúdo assistivo e metadados completos em PT-BR e inglês.
- Identidade pública de Ariel Rabelo e posicionamento Full Stack/Python/PHP/IA.
- Código independente, padronizado em npm e sem infraestrutura específica de ferramentas de design.
- Navbar por direção, item ativo sincronizado, rota `/projects` direta e reset instantâneo no topo.
- Carrossel Habilidades da home com PostgreSQL, sem Next.js ou Power BI; dados detalhados preservados.
- Repositório público: `Darkzin41/ariel-rabelo-portfolio`.
- Produção: `https://ariel-rabelo-portfolio.vercel.app`, publicada pela integração GitHub/Vercel.
- Fallback de SPA ativo para acesso direto e recarga nas rotas públicas.

## Verificação

TypeScript, 22 testes, build, specs, auditoria de produção, deployment concluído e respostas `200` em `/`, `/projects` e `/stack` compõem o gate final descrito em `../specs/testing.md`.

## Handoff

Não há ação pendente nesta entrega. Preservar a branch e o worktree para recuperação; o repositório acadêmico não deve receber esta branch.
