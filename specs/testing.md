# Estratégia e mapa de testes

[Português](testing.md) | [English](testing.en.md)

**Última verificação:** 2026-09-24

## Gates automatizados

| Comando | Evidência |
|---|---|
| `npm run typecheck` | Contratos TypeScript |
| `npm test` | Oito testes de idioma/conteúdo e cinco testes do carrossel |
| `npm run build` | Bundle de produção sem avisos de configuração legada |
| `python scripts/validate_specs.py .` | Estrutura, pares de idioma, links e contratos da memória técnica |
| `npm audit --omit=dev` | Auditoria de dependências de produção |

`npm run check` executa TypeScript, os 13 testes e o build em sequência.

## Responsabilidade por camada

| Comportamento | Evidência |
|---|---|
| Resolução, fallback e persistência de locale | `src/i18n/core.test.ts` |
| Integridade dos catálogos, projetos e especialidades | `src/i18n/content.test.ts` |
| Movimento determinístico do carrossel | `src/lib/carouselMotion.test.ts` |
| UI, rotas e dados | TypeScript, build e inspeção no navegador local |
| Responsividade | Navegador local em 375, 1280 e 1920 px, sem overflow horizontal |
| Acessibilidade interativa | Menus, ARIA, `Escape`, retorno de foco, filtros e controles do carrossel |
| Metadados | `html[lang]`, título, descrição e Open Graph inspecionados nos dois idiomas |

## Mapa por capacidade

| Capability | Arquivos ou globs | Situação |
|---|---|---|
| `core` | `src/**/*`, `src/**/*.test.ts` | Implementada e verificada localmente |

## Validação manual registrada

- Home, projetos, detalhe de projeto e stack conferidos em português e inglês.
- Preferência de idioma confirmada após recarga.
- Seletor e menu mobile conferidos com mouse e teclado; `Escape` restaura o foco.
- Cor de destaque e rotas existentes preservadas.
- Console do navegador sem erros ou avisos durante a revisão.

## Lacunas

Não há suíte E2E persistida. Gesto touch real e eventos de visibilidade dependem de navegador/dispositivo; o código usa Pointer Events, `visibilitychange` e `touch-action: pan-y`, enquanto a revisão automatizada cobre as regras determinísticas associadas.
