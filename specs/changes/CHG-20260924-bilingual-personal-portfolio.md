---
id: CHG-20260924-bilingual-personal-portfolio
status: verified
date: 2026-09-24
affected_capabilities: core
---

# Portfólio pessoal bilíngue e independente

[Português](CHG-20260924-bilingual-personal-portfolio.md) | [English](CHG-20260924-bilingual-personal-portfolio.en.md)

## Problema e contexto

O portfólio anterior dependia de um scaffold externo de design e apresentava conteúdo misto em português e inglês. A nova versão deve ser uma base de código pessoal e independente, adequada a visitantes brasileiros e internacionais.

## Resultado esperado

Entregar o mesmo portfólio visual, com identidade pública de Ariel Rabelo, seleção persistente entre português do Brasil e inglês e mensagem profissional centrada em desenvolvimento Full Stack, Python, PHP e inteligência artificial.

## Escopo

- Internacionalização tipada de conteúdo visível, conteúdo assistivo e metadados.
- Seletor de idioma acessível no canto superior direito em desktop e mobile.
- Desacoplamento técnico do scaffold anterior e limpeza de artefatos históricos sem autoridade atual.
- Documentação bilíngue e política explícita de licença e direitos autorais.
- Publicação posterior em um repositório público com histórico limpo.

## Não escopo

- Redesign visual, alteração de rotas, slugs, projetos, animações ou integrações externas.
- Deploy ou hospedagem do site.
- Backend, autenticação ou coleta de dados pessoais.

## Alternativas e decisão

Foi escolhida uma camada nativa e tipada de internacionalização, sem dependência externa. `react-i18next` adicionaria configuração desnecessária para dois idiomas estáticos; páginas duplicadas aumentariam divergência e manutenção.

## Solução e fluxo

Um provider de idioma mantém `pt-BR | en`, inicia em português, lê e grava a preferência local com fallback seguro e atualiza o idioma e os metadados do documento. Componentes consomem catálogos tipados, enquanto dados estruturados preservam identificadores e armazenam somente o conteúdo realmente localizado.

## Interfaces e dados afetados

- `Locale`, `LanguageContextValue` e `useLanguage()`.
- Conteúdo localizado para perfil, interface, projetos e stack.
- Níveis semânticos de habilidade, incluindo `specialty`, traduzidos na apresentação.
- Chave persistida `ariel-rabelo.locale`.

## Falhas, segurança e compatibilidade

Valores de idioma desconhecidos e falhas de `localStorage` retornam a `pt-BR`. React continua escapando o conteúdo estático; nenhuma renderização de HTML arbitrário será adicionada. Rotas, slugs, links externos e preferências de cor permanecem compatíveis.

## Estratégia de testes

Testes puros cobrem resolução de locale, fallback, persistência e integridade dos dois catálogos e dos seis projetos. Build, TypeScript, testes do carrossel, auditoria de dependências e revisão manual responsiva completam a evidência.

## Critérios de aceite

- Toda interface visível e assistiva alterna entre português e inglês sem navegação.
- A escolha persiste após recarregar e o documento expõe idioma e metadados coerentes.
- Python, PHP e IA aparecem como especialidades; a Liga Acadêmica da Universidade Ceuma aparece sem cargo ou data inventados.
- O build não depende de infraestrutura externa de design nem emite os avisos anteriores do carregador do Vite.
- A versão acadêmica original permanece intacta.

## Consolidação na memória viva

Consolidado em `../capabilities/core.md`, `../system.md`, `../testing.md`, `../history.md` e `../../docs/state.md`, incluindo os pares em inglês.
