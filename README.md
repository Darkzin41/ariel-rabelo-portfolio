# Portfólio de Ariel Rabelo

[Português](README.md) | [English](README.en.md)

Portfólio pessoal bilíngue de **Ariel Rabelo**, **Desenvolvedor Full Stack especializado em Python, PHP e Inteligência Artificial** e membro da Liga Acadêmica de Inteligência Artificial da Universidade Ceuma.

A aplicação reúne projetos profissionais, pesquisa, experimentos acadêmicos, experiência, formação e tecnologias em uma interface editorial responsiva. O código é uma base React independente, mantida diretamente neste repositório.

## Site publicado

[Acesse o portfólio em produção](https://ariel-rabelo-portfolio.vercel.app).

## Destaques

- Interface completa em português do Brasil e inglês;
- Português como idioma padrão, com preferência persistida em `localStorage`;
- Seletor de idioma acessível no canto superior direito, disponível em desktop e mobile;
- Metadados, conteúdo visual e textos assistivos atualizados conforme o idioma;
- Seis projetos com filtros e páginas individuais;
- Stack com Python e PHP como especialidades e IA como área de especialidade;
- Tema escuro com quatro cores de destaque;
- Hero com visual Saturn em Canvas;
- Carrossel contínuo operável por mouse, touch e teclado;
- Suporte a `prefers-reduced-motion` e pausa de animações fora da viewport.

## Tecnologias e arquitetura

- React 19 e React Router;
- TypeScript 5.7;
- Vite 8;
- Tailwind CSS 4;
- Canvas API;
- Internacionalização nativa e tipada em `src/contexts/language.tsx` e `src/i18n/`;
- Conteúdo estruturado e localizado em `src/data/`.

O site não possui backend, autenticação ou coleta de dados pessoais. As preferências de idioma (`ariel-rabelo.locale`) e de cor de destaque são armazenadas somente no navegador.

## Executando localmente

Requisitos: Node.js 22 e npm.

```bash
npm ci
npm run dev
```

O Vite exibirá o endereço local no terminal.

## Qualidade e testes

```bash
npm run typecheck
npm test
npm run build
python scripts/validate_specs.py .
npm audit --omit=dev
```

`npm test` executa os testes de idioma, integridade dos catálogos e dados localizados, navegação, configuração de deploy e os cinco testes determinísticos do carrossel.

## Estrutura principal

```text
src/
├── components/     # Seções, navegação e componentes reutilizáveis
│   └── ui/         # Primitivos visuais
├── contexts/       # Idioma e cor de destaque
├── data/           # Projetos e tecnologias localizados
├── hooks/          # Comportamentos reutilizáveis
├── i18n/           # Tipos, catálogos e persistência de idioma
├── lib/            # Regras e testes do carrossel
├── pages/          # Home, projetos, detalhes e stack
├── App.tsx         # Rotas e providers globais
├── index.css       # Tailwind, tokens e estilos globais
└── main.tsx        # Entrada da aplicação
```

## Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial |
| `/projects` | Relação e filtros dos seis projetos |
| `/projects/:slug` | Detalhes de um projeto |
| `/stack` | Tecnologias e níveis de experiência |

Os slugs e URLs são os mesmos nos dois idiomas.

## Acessibilidade

- Navegação por teclado e foco visível;
- Menus de idioma e mobile com `Escape` e restauração de foco;
- Estados ARIA para menus, filtros e controles;
- Carrossel com pausa, setas, `Home` e `End`;
- Cópias decorativas ocultadas de tecnologias assistivas;
- Movimento reduzido conforme a preferência do sistema.

## Licença e conteúdo pessoal

O código-fonte é distribuído sob a [Licença MIT](LICENSE). Textos, identidade visual, dados dos projetos e imagens pessoais permanecem reservados a Ariel Rabelo conforme o [NOTICE](NOTICE.md).

## Contato

- [LinkedIn](https://www.linkedin.com/in/ariel-asafedev)
- [GitHub](https://github.com/Darkzin41)
- E-mail: `arielasafe09@gmail.com`

Desenvolvido por **Ariel Rabelo**.
