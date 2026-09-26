# Marcos do projeto

[Português](history.md) | [English](history.en.md)

## 2026-09-25 — repositório sincronizado e produção na Vercel

- O `main` do repositório pessoal foi sincronizado com o GitHub.
- A integração GitHub/Vercel publicou o portfólio em `ariel-rabelo-portfolio.vercel.app`.
- O fallback de SPA passou a preservar acessos diretos e recargas em `/projects`, detalhes de projeto e `/stack`.
- Vinte e dois testes, TypeScript, build, specs e auditoria passaram; home, Projetos e Stack responderam `200` em produção.

## 2026-09-25 — navegação por direção e Habilidades ajustadas

- A Navbar passou a desaparecer ao rolar para baixo e reaparecer ao rolar para cima, permanecendo visível durante menus interativos.
- O estado ativo passou a acompanhar seções da home e as rotas de Projetos e Stack.
- “Projetos” passou a abrir `/projects` diretamente, e trocas de página agora começam no topo antes da pintura.
- A raiz de rolagem foi normalizada para impedir que páginas herdem posições anteriores.
- O carrossel Habilidades da home substituiu Next.js e Power BI por PostgreSQL sem alterar dados detalhados ou projetos.
- Vinte testes automatizados e revisão manual em desktop/mobile e PT-BR/inglês passaram localmente.

## 2026-09-24 — portfólio pessoal bilíngue e independente

- A identidade pública passou a Ariel Rabelo, Desenvolvedor Full Stack especializado em Python, PHP e IA.
- Português do Brasil e inglês passaram a cobrir interface, conteúdo assistivo, projetos, stack e metadados.
- O seletor de idioma ganhou persistência segura, teclado, ARIA, `Escape` e retorno de foco.
- A participação na Liga Acadêmica de Inteligência Artificial da Universidade Ceuma foi adicionada sem inventar cargo ou período.
- O projeto foi desacoplado da infraestrutura de design, padronizado em npm e teve dependências e artefatos obsoletos removidos.
- A documentação passou a ter pares PT/EN, Licença MIT e aviso de conteúdo pessoal.
- Treze testes automatizados, build, tipos e revisão responsiva de 375 a 1920 px passaram localmente.

## 2026-09-08 — refinamento visual e responsivo

- Containers, tipografia, Hero, Navbar e Saturn foram ajustados aos breakpoints.
- Dois projetos destacados ganharam composições maiores e CTAs mais claros.
- O carrossel passou a usar velocidade baseada em tempo, loop mensurado, Pointer Events e 13 tecnologias independentes.
- O tema ficou exclusivamente escuro, preservando a escolha da cor de destaque.
