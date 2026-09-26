---
id: CHG-20260925-vercel-production
status: implemented
date: 2026-09-25
affected_capabilities: core
---

# Publicação no GitHub e produção na Vercel

[Português](CHG-20260925-vercel-production.md) | [English](CHG-20260925-vercel-production.en.md)

## Problema e contexto

O `main` local contém a versão aprovada do portfólio, mas o remoto ainda aponta para a revisão inicial. A integração GitHub/Vercel existente publica somente o remoto e, sem fallback de SPA, acessos diretos a `/projects` e `/stack` retornam `404` embora a home funcione.

## Resultado esperado

Publicar a revisão aprovada em `origin/main`, entregar o mesmo commit em produção e fazer todas as rotas públicas responderem corretamente em acesso direto e recarga.

## Escopo

- Sincronização do `main` do repositório pessoal com o GitHub.
- Deploy de produção pela integração GitHub/Vercel existente.
- Fallback de SPA para as rotas do React Router.
- Evidência automatizada da configuração e verificação HTTP pós-deploy.

## Não escopo

- Mudança de conta, equipe, domínio personalizado ou provedor.
- Inclusão de credenciais, tokens ou identificadores privados no Git.
- Redesign ou alteração de conteúdo, rotas e dados do portfólio.

## Alternativas e decisão

Foi mantida a integração automática existente entre GitHub e Vercel em vez de introduzir autenticação local da CLI. Para as rotas, foi escolhida uma reescrita para `index.html`, preservando `BrowserRouter` e URLs legíveis; migrar para hash routing alteraria as URLs públicas sem necessidade.

## Solução e fluxo

Um push em `main` aciona o build Vite na Vercel. `vercel.json` reescreve qualquer rota pública para `index.html`; o React Router então resolve `/`, `/projects`, `/projects/:slug` e `/stack` no cliente. Se o build falhar, a produção anterior permanece ativa.

## Interfaces e dados afetados

- `vercel.json`: contrato de roteamento na borda da hospedagem.
- `src/lib/deployment.test.ts`: regressão da configuração de fallback.
- `package.json`: inclui o teste de deploy no gate padrão.
- Nenhuma interface React, dado de projeto ou persistência do navegador é alterada.

## Falhas, segurança e compatibilidade

Credenciais e vínculo do projeto permanecem na integração externa e não são versionados. O fallback retorna o shell da SPA para rotas públicas, enquanto os assets gerados continuam atendidos normalmente. O status do deployment e a revisão publicada são conferidos pelas APIs do GitHub/Vercel antes de declarar conclusão.

## Estratégia de testes

Executar `npm run check`, `npm run specs:check`, `npm audit --omit=dev` e `git diff --check` antes do push. Após o deploy, confirmar o commit do deployment e respostas `200` em `/`, `/projects` e `/stack`.

## Critérios de aceite

- `origin/main` aponta para o commit aprovado localmente.
- O deployment de produção da Vercel conclui com sucesso para o mesmo commit.
- `/`, `/projects` e `/stack` respondem `200` no domínio público.
- TypeScript, testes, build, validação das specs e auditoria de produção passam antes da publicação.

## Consolidação na memória viva

A decisão está consolidada em `../capabilities/core.md`, `../system.md`, `../testing.md` e `../open-decisions.md`. O marco e o handoff são atualizados após a produção ser verificada.
