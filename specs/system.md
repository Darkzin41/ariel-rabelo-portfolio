# Sistema implementado

[Português](system.md) | [English](system.en.md)

**Última verificação:** 2026-09-25

**Referência:** `working-tree`

## Finalidade e unidade executável

O projeto entrega um portfólio pessoal bilíngue como aplicação React de página única. `src/main.tsx` monta `src/App.tsx`, que instala os providers globais e o roteador do navegador. O Vite serve e empacota a aplicação sem plugins ou infraestrutura específicos de ferramentas de design.

## Stack e entrypoints

- React 19, React DOM e React Router;
- Vite 8 e TypeScript 5.7;
- Tailwind CSS 4 pelo plugin oficial `@tailwindcss/vite`;
- `src/index.css` para tokens e estilos globais;
- `src/i18n/messages.ts` para o catálogo tipado;
- `src/data/projects.ts` e `src/data/stack.ts` para dados estruturados localizados.

## Fronteiras e fluxo

- `src/pages/Home.tsx` compõe a apresentação, projetos, stack, experiência, formação e contato.
- `src/pages/Projects.tsx` filtra os seis projetos localizados.
- `src/pages/ProjectDetail.tsx` resolve detalhes pelo slug estável.
- `src/pages/Stack.tsx` apresenta níveis semânticos e projetos relacionados.
- `LanguageProvider` resolve e persiste idioma; `AccentColorProvider` preserva a preferência visual.
- Navbar, Hero, projetos destacados, Saturn e carrossel encapsulam suas interações.

## Navegação e rolagem

`src/lib/navigation.ts` concentra destinos, resolução do item ativo e a regra determinística de direção da Navbar. Na home, o scroll-spy acompanha Início, Habilidades, Experiência e Contato; `/projects` e seus detalhes ativam Projetos, enquanto `/stack` ativa Habilidades. A Navbar observa a rolagem do documento, esconde ao descer, reaparece ao subir e permanece aberta enquanto um menu interativo estiver em uso.

`ScrollToTop` desativa a restauração automática do histórico e reposiciona trocas de pathname antes da pintura, sem interferir na navegação suave por hash. A raiz usa altura mínima e `overflow-x: clip`, mantendo o documento como superfície de rolagem e evitando que uma rota herde a posição da anterior.

## Internacionalização e metadados

`Locale` aceita apenas `pt-BR | en`. `LanguageProvider` inicia com a preferência válida de `localStorage`, usa português como fallback e grava em `ariel-rabelo.locale`. Mudanças atualizam `html[lang]`, título, descrição, Open Graph e Twitter. `useLanguage()` expõe locale, mensagens e alteração de idioma aos componentes.

## Estado, persistência e integrações

Não há backend. Idioma e cor de destaque são as únicas preferências persistidas no navegador. Links externos apontam para GitHub, LinkedIn e e-mail; nenhum segredo ou token é necessário para executar a aplicação.

## Restrições

- Conteúdo é estático e precisa ser atualizado nos dois idiomas.
- Rotas compartilham os mesmos slugs em português e inglês.
- Metadados são atualizados no cliente; renderização estática ou SSR não fazem parte da arquitetura atual.
- Deploy não está configurado neste repositório.
- O carrossel resumido de Habilidades e a página detalhada de stack são conjuntos independentes; a home exibe PostgreSQL no lugar de Next.js e Power BI sem reescrever fatos detalhados.
