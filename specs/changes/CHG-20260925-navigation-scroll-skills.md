---
id: CHG-20260925-navigation-scroll-skills
status: verified
date: 2026-09-25
affected_capabilities: core
---

# Navegação por direção e ajuste de Habilidades

[Português](CHG-20260925-navigation-scroll-skills.md) | [English](CHG-20260925-navigation-scroll-skills.en.md)

## Problema e contexto

A Navbar mantinha Início selecionado fora da seção correspondente, o link Projetos apontava para uma âncora da home e novas páginas podiam herdar a posição de rolagem anterior. O carrossel Habilidades também precisava trocar Next.js e Power BI por PostgreSQL sem reescrever a stack detalhada ou os fatos dos projetos.

## Resultado esperado

Entregar uma Navbar que desaparece ao descer, reaparece ao subir e comunica corretamente a seção ou página ativa. Projetos deve abrir `/projects` no topo, e o carrossel resumido da home deve refletir somente a alteração de tecnologias solicitada.

## Escopo

- Direção de rolagem, limiar estável e barra fixada enquanto menus estão abertos.
- Estado ativo por seção na home e por rota em Projetos, detalhes e Stack.
- Destino direto `/projects` e reset de rolagem antes da pintura em mudanças de pathname.
- Normalização da raiz de rolagem e do progresso visual.
- PostgreSQL no carrossel Habilidades da home, removendo Next.js e Power BI somente desse conjunto.

## Não escopo

- Redesign, novas rotas, alteração de slugs, URLs, projetos ou dados detalhados da stack.
- Remoção de Next.js ou Power BI de projetos, descrições ou da página `/stack`.
- Deploy ou mudança de infraestrutura.

## Alternativas e decisão

Foi mantido o destaque visual em formato de pílula, agora alimentado por uma regra única de rota e scroll-spy. Eliminar o destaque por completo reduziria a orientação do visitante; manter a regra antiga perpetuaria o estado incorreto. Para rolagem, o documento foi preservado como superfície principal em vez de criar um contêiner paralelo.

## Solução e fluxo

`src/lib/navigation.ts` define destinos, resolve o item ativo e calcula visibilidade por direção. A Navbar observa a rolagem efetiva, usa as seções `inicio`, `habilidades`, `experiencia` e `contato` na home e fixa-se quando menus estão abertos. `ScrollToTop` desativa restauração automática e força somente trocas de pathname ao topo com comportamento instantâneo; hashes continuam suaves.

## Interfaces e dados afetados

- `NavItemId`, `NAV_LINKS`, `resolveActiveNavItem()`, `getNextNavbarScrollState()` e `resolvePageScrollY()`.
- Callback opcional `LanguageSelector.onOpenChange` para manter a Navbar visível durante o menu.
- `carouselCards` em `src/data/stack.ts`; `stackCategories` e dados de projeto permanecem inalterados.

## Falhas, segurança e compatibilidade

Movimentos menores que oito pixels não alternam a barra, a região inicial sempre a mantém visível e painéis abertos bloqueiam a ocultação. A leitura de rolagem aceita `window`, `documentElement` e `body` para compatibilidade. A mudança não adiciona entrada de dados, dependências, rede ou novos riscos de segurança.

## Estratégia de testes

Seis testes puros cobrem destinos, resolução de item ativo, limiar/direção, bloqueio por painel e fontes de rolagem. Um teste de conteúdo garante a alteração exclusiva do carrossel. TypeScript, build, auditoria e inspeção manual em desktop/mobile e PT-BR/inglês completam a evidência.

## Critérios de aceite

- A Navbar esconde ao descer, reaparece ao subir e permanece visível no topo ou com menu aberto.
- O destaque acompanha as seções e rotas definidas, sem deixar Início permanentemente selecionado.
- Projetos abre `/projects`, ativa seu item e começa em `scrollY = 0`.
- Habilidades exibe PostgreSQL e não exibe Next.js ou Power BI no carrossel da home.
- Rotas, dados detalhados, idiomas, teclado, mobile e console permanecem íntegros.

## Consolidação na memória viva

Consolidado em `../capabilities/core.md`, `../system.md`, `../testing.md`, `../history.md` e `../../docs/state.md`, incluindo os pares em inglês.
