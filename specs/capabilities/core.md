---
id: core
contract_status: confirmed
implementation_status: verified
last_verified: 2026-09-25
last_verified_ref: working-tree
---

# Portfólio pessoal bilíngue

[Português](core.md) | [English](core.en.md)

## Finalidade e limites

Apresentar a identidade profissional, os projetos, a stack, a experiência, a formação e os meios de contato de Ariel Rabelo. O posicionamento central é Desenvolvedor Full Stack especializado em Python, PHP e Inteligência Artificial. A aplicação é somente frontend, não inclui backend, autenticação ou coleta de dados e é publicada na Vercel.

## Atores, permissões, entradas e resultados

Qualquer visitante pode navegar, alternar entre português do Brasil e inglês, filtrar projetos, abrir detalhes, consultar links externos, escolher a cor de destaque e explorar o carrossel por mouse, touch ou teclado. Idioma e cor são preferências locais do navegador; não há contas nem entrada de dados pessoais.

## Contrato comportamental e critérios de aceite

- `pt-BR` é o idioma padrão; `en` é a alternativa e a escolha persiste em `ariel-rabelo.locale`.
- Um seletor com globo fica no canto superior direito em desktop e mobile, expõe estados ARIA, fecha com `Escape` e restaura o foco.
- Conteúdo visível, conteúdo assistivo, `html[lang]`, título, descrição e metadados sociais acompanham o idioma.
- O Hero, a stack, o README e o rodapé destacam Full Stack, Python, PHP e IA.
- O reconhecimento inclui “Membro da Liga Acadêmica de Inteligência Artificial — Universidade Ceuma”, sem cargo ou período inventados.
- O tema permanece escuro com quatro opções de destaque.
- Somente Agiliza Transparência e Arquivo Digital de História Indígena aparecem como projetos destacados.
- A grade completa mantém seis projetos e as rotas `/`, `/projects`, `/projects/:slug` e `/stack`.
- O carrossel mantém mouse, touch, teclado, pausa e suporte a movimento reduzido.
- A Navbar permanece visível no topo, desaparece ao rolar para baixo e reaparece ao rolar para cima; menus abertos mantêm a barra visível.
- O estado ativo acompanha Início, Habilidades, Experiência e Contato na home, Projetos em `/projects` e detalhes, e Habilidades em `/stack`.
- “Projetos” abre `/projects` diretamente, e toda troca de pathname posiciona a nova página no topo antes da pintura.
- O carrossel Habilidades da home contém PostgreSQL e não contém Next.js ou Power BI.

## Invariantes e regras de negócio

- Slugs, URLs, nomes próprios, tecnologias e fatos dos seis projetos são estáveis nos dois idiomas.
- Status, classificações e níveis técnicos são chaves semânticas traduzidas somente na apresentação.
- Python e PHP usam o nível `specialty`; IA é uma categoria de especialidade sem elevar artificialmente todas as ferramentas de IA.
- Scikit-learn permanece em `exploring`, sem vínculo com projeto.
- O carrossel avança a 27 px/s e preserva o restante ao normalizar nos dois sentidos.
- Valores de idioma inválidos ou armazenamento indisponível retornam com segurança a `pt-BR`.
- A substituição por PostgreSQL é exclusiva do carrossel Habilidades da home; dados detalhados da stack e fatos dos projetos permanecem intactos.

## Estado atual e lacunas

O contrato está implementado e verificado localmente. Não há suíte E2E persistida; interações de UI e breakpoints são conferidos manualmente. O código público vive no GitHub e a produção é publicada na Vercel pela integração externa com a branch `main`.

## Evidências de implementação e teste

- Idioma e metadados: `src/contexts/language.tsx`, `src/components/LanguageSelector.tsx` e `src/i18n/`.
- Dados localizados: `src/data/projects.ts` e `src/data/stack.ts`.
- Navegação e rolagem: `src/lib/navigation.ts`, `src/components/Navbar.tsx`, `src/App.tsx` e `src/index.css`.
- Gates reproduzíveis: `npm run check` e `python scripts/validate_specs.py .`.
- Auditoria: `npm audit --omit=dev`.
- Deploy: `vercel.json` garante fallback da SPA; o status da integração GitHub/Vercel e as rotas públicas são verificados após a publicação.
- Validação manual: rotas nos dois idiomas, persistência após recarga, menus por teclado e breakpoints de 375 a 1920 px.

## Relações

- Especificação relacionada: `../changes/CHG-20260924-bilingual-personal-portfolio.md`.
- Especificação relacionada: `../changes/CHG-20260925-navigation-scroll-skills.md`.
- Especificação relacionada: `../changes/CHG-20260925-vercel-production.md`.
- Decisões abertas: `../open-decisions.md`.
- ADR relacionado: nenhum.
