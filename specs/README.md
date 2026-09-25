# Memória técnica do projeto

[Português](README.md) | [English](README.en.md)

Este diretório registra o contrato necessário para compreender e modificar o portfólio bilíngue.

## Ordem de leitura

1. Leia este índice.
2. Abra `capabilities/core.md` para o contrato do portfólio.
3. Consulte `system.md` para confirmar o implementado.
4. Consulte `testing.md` antes de alterar a validação.
5. Leia `open-decisions.md` e a especificação relacionada quando a tarefa tocar uma pendência.
6. Use `../docs/state.md` somente para handoff local.

## Autoridade

| Documento | Autoridade |
|---|---|
| `capabilities/*.md` | Contrato e estado de entrega |
| `system.md` | Arquitetura realmente implementada |
| `testing.md` | Estratégia e mapa de evidências |
| `open-decisions.md` | Questões que não podem ser inventadas |
| `changes/*.md` | Escopo e critérios de mudanças complexas |
| `history.md` | Marcos; o Git preserva os detalhes |

## Roteamento por tarefa

| Tema | Ler |
|---|---|
| Página inicial, projetos, stack, idioma e navegação | `capabilities/core.md` |
| Arquitetura, rotas, estado ou persistência | `system.md` |
| Testes, acessibilidade e responsividade | `testing.md` |
| Internacionalização e desacoplamento | `changes/CHG-20260924-bilingual-personal-portfolio.md` |
| Navbar, rolagem, rota de projetos e carrossel de habilidades | `changes/CHG-20260925-navigation-scroll-skills.md` |

## Manutenção

- Cada documento substantivo possui português no caminho canônico e inglês em `*.en.md`.
- Mudança funcional atualiza a capability.
- Mudança de evidência atualiza `testing.md`.
- Decisão duradoura cria ou substitui ADR.
- Marco relevante atualiza `history.md`.
