# Navegação responsiva ao scroll e ajuste de habilidades

[Português](2026-09-25-navigation-scroll-skills-design.md) | [English](2026-09-25-navigation-scroll-skills-design.en.md)

## Contexto

A Navbar permanece sempre visível, o item Início pode continuar destacado fora de sua seção e o link Projetos aponta para uma âncora da home em vez da página `/projects`. Ao entrar em uma rota depois de rolar a home, a posição anterior pode aparecer antes da correção de scroll. O bloco Habilidades também precisa refletir a seleção atual de tecnologias.

## Resultado esperado

- A Navbar permanece visível no topo da página.
- Depois que o visitante começa a rolar, a Navbar se oculta ao rolar para baixo e reaparece ao rolar para cima.
- A Navbar continua visível enquanto o menu mobile, o seletor de idioma ou o seletor de cor estiverem abertos.
- A cápsula visual acompanha a seção ou página ativa.
- Projetos navega diretamente para `/projects` em desktop e mobile.
- Toda mudança de pathname posiciona a nova página no topo antes da pintura visível.
- O bloco Habilidades da home remove Next.js e Power BI e adiciona PostgreSQL.
- As stacks internas dos projetos e a página detalhada `/stack` não são alteradas por este ajuste de conteúdo.

## Navegação e estado ativo

Os destinos passam a ter semântica explícita:

- Início: `/#inicio`;
- Projetos: `/projects`;
- Habilidades: `/#habilidades`;
- Experiência: `/#experiencia`;
- Contato: `/#contato`.

Na home, o scroll-spy define a cápsula ativa entre Início, Habilidades, Experiência e Contato. Em `/projects` e `/projects/:slug`, Projetos fica ativo. Na página `/stack`, Habilidades fica ativo. A mudança preserva `aria-current` e o mesmo comportamento em desktop e mobile.

## Visibilidade da Navbar

A direção do scroll será calculada por uma função pura e testável. Pequenas oscilações serão ignoradas por um limiar curto. A Navbar:

- aparece quando `scrollY` está próximo do topo;
- some depois de um deslocamento relevante para baixo;
- reaparece após um deslocamento relevante para cima;
- reaparece em mudança de rota;
- não se esconde quando um painel de navegação está aberto.

A transição usa apenas `transform` e mantém suporte a `prefers-reduced-motion` pelos estilos já existentes.

## Restauração de scroll

O reset de rota passa a ocorrer em `useLayoutEffect`, antes da pintura, e o histórico do navegador usa restauração manual enquanto a aplicação estiver montada. A chave é o `pathname`; mudanças apenas de hash continuam controladas pela Navbar para rolar até a seção correspondente.

## Habilidades

Somente `carouselCards`, que alimenta o bloco Habilidades da home, será alterado:

- remover o cartão Next.js;
- remover o cartão Power BI;
- adicionar o cartão PostgreSQL.

Não haverá associação de PostgreSQL a projetos, nível técnico novo ou alteração dos dados exibidos em `/stack`.

## Testes

- Teste puro para direção, limiar, topo e bloqueio da visibilidade da Navbar.
- Teste dos destinos e da resolução do item ativo por rota/seção.
- Teste do conteúdo do carrossel confirmando PostgreSQL e a ausência de Next.js e Power BI.
- TypeScript, suíte existente, build e validação das specs.
- Verificação manual em desktop e mobile: rolagem nas duas direções, item ativo, entrada em `/projects` no topo e navegação por teclado.

## Fora do escopo

- Redesign da Navbar ou do carrossel.
- Alteração das tecnologias registradas nos seis projetos.
- Alteração da página detalhada `/stack`.
- Deploy nesta rodada.
