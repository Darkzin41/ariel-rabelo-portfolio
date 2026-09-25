import type { Locale } from "../i18n/core.ts"
import { catalogs } from "../i18n/messages.ts"

export type ProjectStatus = "inDevelopment" | "completed" | "experimental" | "academic"
export type ProjectClassification = "professional" | "research" | "academicProject" | "academicExperiment" | "earlyWork"

export interface Project {
  slug: string

  title: string

  subtitle?: string

  category: string

  tags: string[]

  year: string

  role: string

  status: ProjectStatus
  repoPublic: boolean

  repoUrl?: string

  publicationUrl?: string

  shortDescription: string

  longDescription: string

  context: string

  challenge: string

  myRole: string

  stack: string[]

  impact: string

  learnings: string

  featured: boolean

  filterCategory: "professional" | "research" | "academic" | "experimental" | "earlywork"

  classification: ProjectClassification
}

export const projects: Project[] = [
  {
    slug: "agiliza-transparencia",

    title: "Agiliza Transparência",

    subtitle: "STC/MA",

    category: "GovTech · Full Stack · Software Engineering",

    tags: ["Next.js", "React", "TypeScript", "Python", "OCR", "Full Stack"],

    year: "2026",

    role: "Desenvolvedor de Software Full Stack Jr.",

    status: "inDevelopment",
    repoPublic: false,

    shortDescription:
      "Plataforma web proposta para a Secretaria de Estado da Transparência e Controle do Maranhão — modernizando o fluxo de coleta, validação e gerenciamento de dados entre a STC/MA e órgãos estaduais.",

    longDescription:
      "Sistema full stack para centralizar e modernizar a gestão de dados entre a STC/MA e órgãos estaduais do Maranhão, reduzindo dependência de processos manuais e aumentando a rastreabilidade das informações.",

    context:
      "A Secretaria de Estado da Transparência e Controle do Maranhão necessitava modernizar seus processos de coleta e validação de dados provenientes de múltiplos órgãos estaduais. O fluxo existente era fragmentado, dependente de planilhas e comunicação manual.",

    challenge:
      "Criar uma plataforma que centralizasse o fluxo de dados, oferecesse mecanismos robustos de autenticação e verificação, suportasse processamento de documentos via OCR, e fosse extensível para múltiplos órgãos estaduais com diferentes requisitos.",

    myRole:
      "Desenvolvimento da plataforma frontend em Next.js 16 + React 19 + TypeScript. Modelagem e estruturação de banco de dados relacional. Implementação de automações de atualização de status e sincronização de dados. Integração com Google Vision API para OCR e processamento de documentos. Definição de fluxos, mecanismos de autenticação e verificação de informações. Participação em reuniões de alinhamento e validação com equipes da STC.",

    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Python",
      "Google Vision API",
      "SQL",
      "MySQL",
    ],

    impact:
      "Projeto em desenvolvimento ativo com protótipo client-side estruturado contendo 49 objetos de dados, 276 campos definidos, 484 associações mapeadas e 417 testes comportamentais cadastrados. O sistema ainda está sendo validado em ambiente de desenvolvimento.",

    learnings:
      "Trabalhar em contexto GovTech exige rigor na modelagem de dados, atenção a fluxos de validação complexos e comunicação constante com stakeholders não-técnicos. A integração de OCR adicionou uma camada de processamento que demandou tratamento cuidadoso de edge cases.",

    featured: true,

    filterCategory: "professional",

    classification: "professional",
  },

  {
    slug: "arquivo-digital-indigena",

    title: "Arquivo Digital de História Indígena",

    subtitle: "São José de Ribamar",

    category: "Research · Open Education · Web Development",

    tags: ["HTML", "CSS", "JavaScript", "Acessibilidade", "Metadados", "IFMA"],

    year: "2024",

    role: "Desenvolvedor & Pesquisador",

    status: "academic",
    repoPublic: false,

    publicationUrl: undefined,

    shortDescription:
      "Acervo digital dedicado à preservação, organização e disponibilização de documentos históricos relacionados à história indígena de São José de Ribamar — publicado nos Anais do Universo IF.",

    longDescription:
      "Projeto de iniciação científica e tecnológica desenvolvido no IFMA. Combina pesquisa histórica com desenvolvimento web para criar um sistema de acesso aberto ao patrimônio histórico indígena da região.",

    context:
      "A história indígena de São José de Ribamar era pouco acessível digitalmente. Documentos históricos estavam dispersos, sem organização e sem um ponto centralizado de acesso público.",

    challenge:
      "Criar uma estrutura digital capaz de preservar, organizar e disponibilizar documentos históricos com metadados corretos, busca funcional e acessibilidade como requisito fundamental, não como afterthought.",

    myRole:
      "Desenvolvimento da estrutura web. Definição de schema de metadados para documentos históricos. Implementação de funcionalidade de busca e filtros. Atenção a critérios de acessibilidade web. Pesquisa e curadoria de conteúdo histórico junto ao co-autor João Pedro.",

    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL",
      "Metadados",
      "Acessibilidade Web",
    ],

    impact:
      "Projeto publicado nos Anais do Universo IF. Contribui para preservação e acesso à memória histórica indígena regional. O sistema foi apresentado como projeto de iniciação científica e tecnológica.",

    learnings:
      "Trabalhar com preservação digital requer pensar além da interface — metadados corretos, estrutura semântica e acessibilidade são fundamentais quando o objetivo é garantir acesso de longo prazo à informação.",

    featured: true,

    filterCategory: "research",

    classification: "research",
  },

  {
    slug: "edx-techx",

    title: "Plataforma Inteligente EDX/TechX",

    category: "AI Agents · Energy Tech · Academic",

    tags: ["AI Agents", "Python", "Data", "Automation", "Energy Tech"],

    year: "2026",

    role: "Pesquisador & Desenvolvedor",

    status: "experimental",
    repoPublic: false,

    shortDescription:
      "Plataforma baseada em agentes de IA aplicada à análise energética — explorando UFV, BESS e sistemas integrados. Projeto/desafio acadêmico.",

    longDescription:
      "Investigação e prototipação de agentes de inteligência artificial especializados para análise e geração de relatórios técnico-econômicos no contexto de sistemas de energia.",

    context:
      "Análise de sistemas energéticos como UFV e BESS envolve grandes volumes de dados técnicos e econômicos. A hipótese do projeto é que agentes de IA especializados podem acelerar e padronizar esse processo analítico.",

    challenge:
      "Definir a arquitetura de agentes, criar pipelines de processamento de dados energéticos e gerar outputs técnico-econômicos estruturados e úteis para tomada de decisão.",

    myRole:
      "Pesquisa sobre arquiteturas de agentes de IA. Prototipação de pipelines de processamento de dados. Estudo de contextos de UFV, BESS e sistemas integrados. Exploração de modelos LLM para geração de relatórios.",

    stack: ["Python", "AI Agents", "LLMs", "Data Processing", "Pandas"],

    impact:
      "Projeto experimental acadêmico em fase de exploração. Ainda não existe produto ou sistema em produção.",

    learnings:
      "Sistemas de agentes de IA para domínios especializados exigem curadoria cuidadosa de contexto e validação constante dos outputs para que sejam tecnicamente úteis.",

    featured: false,

    filterCategory: "academic",

    classification: "academicProject",
  },

  {
    slug: "automation-lab",

    title: "Automation Lab",

    category: "Automation · n8n · AI Workflows",

    tags: ["n8n", "APIs", "LLMs", "Google Workspace", "Webhooks"],

    year: "2025–2026",

    role: "Engenheiro de Automação",

    status: "experimental",
    repoPublic: false,

    shortDescription:
      "Coleção de experimentos de automação e agentes conectando IA, documentos, dados e processos — usando n8n como orquestrador.",

    longDescription:
      "Laboratório pessoal de automação explorando workflows de RH, integração com Google Drive/Sheets/Gmail, extração de informações de PDFs, chatbots e agentes LLM com n8n.",

    context:
      "Processos repetitivos consomem tempo que poderia ser dedicado a trabalho criativo e técnico. O Automation Lab é um espaço de experimentação contínua para reduzir fricção em fluxos comuns.",

    challenge:
      "Criar automações confiáveis que integrem múltiplos sistemas heterogêneos (APIs, documentos, emails, planilhas) com tratamento de erros e monitoramento adequados.",

    myRole:
      "Design e implementação de workflows em n8n. Integração com APIs externas. Configuração de agentes LLM para classificação e resumo automático. Extração de dados de PDFs. Notificações e chatbots.",

    stack: [
      "n8n",
      "Google Workspace APIs",
      "OpenAI/LLMs",
      "Webhooks",
      "JSON",
      "HTTP Request",
    ],

    impact:
      "Conjunto de workflows funcionais para casos de uso práticos: automação de RH, processamento de documentos, notificações inteligentes e agentes conversacionais.",

    learnings:
      "Automação robusta não é apenas conectar sistemas — é prever falhas, criar fallbacks e garantir observabilidade do que está acontecendo em cada etapa do fluxo.",

    featured: false,

    filterCategory: "experimental",

    classification: "academicExperiment",
  },

  {
    slug: "computer-vision-lab",

    title: "Computer Vision Lab",

    category: "AI · Computer Vision · Python",

    tags: ["YOLO", "OpenCV", "Python", "Detecção", "Webcam"],

    year: "2025",

    role: "Pesquisador & Desenvolvedor",

    status: "experimental",
    repoPublic: false,

    shortDescription:
      "Experimentos com visão computacional utilizando YOLO e OpenCV — detecção de objetos, reconhecimento de gestos, faces e análise em tempo real via webcam.",

    longDescription:
      "Laboratório de experimentos com computer vision explorando capacidades de detecção e reconhecimento visual em tempo real usando Python, OpenCV e modelos YOLO.",

    context:
      "Visão computacional é uma das fronteiras mais aplicáveis da IA. O Computer Vision Lab é um espaço de aprendizado prático com experimentos reais rodando via webcam.",

    challenge:
      "Implementar pipelines de inferência em tempo real que rodem eficientemente em hardware convencional, mantendo FPS aceitável e resultados de detecção úteis.",

    myRole:
      "Implementação de pipelines com YOLO e OpenCV. Experimentos com detecção de objetos, reconhecimento de gestos e faces. Análise de dados de inferência em tempo real.",

    stack: ["Python", "OpenCV", "YOLO", "NumPy", "Webcam API"],

    impact:
      "Conjunto de experimentos funcionais demonstrando aplicação prática de visão computacional. Projeto experimental de aprendizado — não é produto em produção.",

    learnings:
      "Computer vision exige equilíbrio entre precisão e performance. O ajuste de threshold de confiança e a escolha do modelo certo para o contexto são críticos para resultados úteis.",

    featured: false,

    filterCategory: "experimental",

    classification: "academicExperiment",
  },

  {
    slug: "basquete-brasileiro",

    title: "Basquete Brasileiro",

    category: "Web Development · Foundations",

    tags: ["HTML", "CSS", "JavaScript", "DOM", "Dataset"],

    year: "2023",

    role: "Desenvolvedor Frontend",

    status: "completed",
    repoPublic: true,

    repoUrl: "https://github.com/Darkzin41",

    shortDescription:
      "Buscador de informações sobre basquete brasileiro com pesquisa dinâmica, dataset JavaScript e manipulação de DOM — projeto de fundamentos web.",

    longDescription:
      "Aplicação web para pesquisa de dados sobre o basquete brasileiro, construída com fundamentos sólidos de HTML, CSS e JavaScript sem frameworks.",

    context:
      "Projeto desenvolvido durante a fase de aprendizado dos fundamentos do desenvolvimento web, explorando manipulação de DOM, eventos e estruturação de dados em JavaScript puro.",

    challenge:
      "Criar uma experiência de busca fluida e organizada apenas com HTML, CSS e JavaScript vanilla, sem depender de frameworks ou bibliotecas externas.",

    myRole:
      "Desenvolvimento completo da aplicação: estrutura HTML semântica, estilização CSS responsiva, lógica de pesquisa em JavaScript, estruturação do dataset e manipulação dinâmica do DOM.",

    stack: ["HTML", "CSS", "JavaScript"],

    impact:
      "Projeto de fundamentos concluído. Demonstra sólida compreensão dos princípios base do desenvolvimento web antes da adoção de frameworks.",

    learnings:
      "Trabalhar com JavaScript puro antes de frameworks cria uma base muito mais sólida. Entender como o DOM funciona de fato muda a forma como você usa React ou Vue depois.",

    featured: false,

    filterCategory: "earlywork",

    classification: "earlyWork",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const allProjects = projects

type ProjectCopy = Pick<Project, "category" | "tags" | "role" | "shortDescription" | "longDescription" | "context" | "challenge" | "myRole" | "impact" | "learnings">

export type LocalizedProject = Project & {
  statusLabel: string
  classificationLabel: string
}

const englishProjectCopy: Record<string, ProjectCopy> = {
  "agiliza-transparencia": {
    category: "GovTech · Full Stack · Software Engineering",
    tags: ["Next.js", "React", "TypeScript", "Python", "OCR", "Full Stack"],
    role: "Junior Full Stack Software Developer",
    shortDescription:
      "A web platform proposed for the State Department of Transparency and Control of Maranhão, modernizing data collection, validation, and management between STC/MA and state agencies.",
    longDescription:
      "A Full Stack system designed to centralize and modernize data management between STC/MA and Maranhão state agencies, reducing manual processes and improving information traceability.",
    context:
      "The State Department of Transparency and Control of Maranhão needed to modernize the collection and validation of data received from multiple state agencies. The existing workflow was fragmented and depended on spreadsheets and manual communication.",
    challenge:
      "Build a platform that centralizes data flows, provides robust authentication and verification, supports OCR document processing, and can grow to serve agencies with different requirements.",
    myRole:
      "Frontend development with Next.js 16, React 19, and TypeScript. Relational database modeling, status-update automations, data synchronization, Google Vision API integration for OCR, workflow and authentication design, and technical alignment with STC teams.",
    impact:
      "An actively developed project with a structured client-side prototype containing 49 data objects, 276 defined fields, 484 mapped associations, and 417 registered behavioral tests. The system is still being validated in a development environment.",
    learnings:
      "GovTech work requires rigorous data modeling, careful handling of complex validation flows, and constant communication with non-technical stakeholders. OCR also introduced processing edge cases that demanded deliberate handling.",
  },
  "arquivo-digital-indigena": {
    category: "Research · Open Education · Web Development",
    tags: ["HTML", "CSS", "JavaScript", "Accessibility", "Metadata", "IFMA"],
    role: "Developer & Researcher",
    shortDescription:
      "A digital archive dedicated to preserving, organizing, and providing access to historical documents about the Indigenous history of São José de Ribamar, published in the Universo IF Proceedings.",
    longDescription:
      "A scientific and technological initiation project developed at IFMA. It combines historical research and web development to provide open access to the region's Indigenous heritage.",
    context:
      "The Indigenous history of São José de Ribamar had limited digital access. Historical documents were scattered, unorganized, and lacked a central public access point.",
    challenge:
      "Create a digital structure that preserves, organizes, and exposes historical documents with accurate metadata, functional search, and accessibility as a core requirement.",
    myRole:
      "Web structure development, metadata schema design for historical documents, search and filtering implementation, accessibility work, and historical content research and curation with co-author João Pedro.",
    impact:
      "Published in the Universo IF Proceedings, the project contributes to preserving and expanding access to regional Indigenous memory and was presented as scientific and technological initiation research.",
    learnings:
      "Digital preservation goes beyond interface design: accurate metadata, semantic structure, and accessibility are essential when the goal is long-term access to information.",
  },
  "edx-techx": {
    category: "AI Agents · Energy Tech · Academic",
    tags: ["AI Agents", "Python", "Data", "Automation", "Energy Tech"],
    role: "Researcher & Developer",
    shortDescription:
      "An AI-agent platform applied to energy analysis, exploring PV systems, BESS, and integrated systems as an academic project and challenge.",
    longDescription:
      "Research and prototyping of specialized artificial intelligence agents for technical and economic analysis and report generation in energy systems.",
    context:
      "Analyzing energy systems such as PV and BESS involves large volumes of technical and economic data. The project explores whether specialized AI agents can accelerate and standardize this work.",
    challenge:
      "Define the agent architecture, build energy-data processing pipelines, and generate structured technical and economic outputs that support decision-making.",
    myRole:
      "Research into AI-agent architectures, prototyping data-processing pipelines, studying PV, BESS, and integrated systems, and exploring LLMs for report generation.",
    impact:
      "An academic experiment in its exploration stage. No production product or system exists yet.",
    learnings:
      "AI-agent systems for specialized domains need carefully curated context and continuous output validation to remain technically useful.",
  },
  "automation-lab": {
    category: "Automation · n8n · AI Workflows",
    tags: ["n8n", "APIs", "LLMs", "Google Workspace", "Webhooks"],
    role: "Automation Engineer",
    shortDescription:
      "A collection of automation and agent experiments connecting AI, documents, data, and processes, with n8n as the orchestrator.",
    longDescription:
      "A personal automation lab exploring HR workflows, Google Drive, Sheets, and Gmail integrations, PDF information extraction, chatbots, and LLM agents with n8n.",
    context:
      "Repetitive processes consume time that could be spent on creative and technical work. Automation Lab is a continuous experimentation space for reducing friction in common workflows.",
    challenge:
      "Create reliable automations across heterogeneous systems such as APIs, documents, email, and spreadsheets, with appropriate error handling and monitoring.",
    myRole:
      "Designing and implementing n8n workflows, integrating external APIs, configuring LLM agents for automatic classification and summarization, extracting PDF data, and building notifications and chatbots.",
    impact:
      "A set of functional workflows for practical use cases including HR automation, document processing, intelligent notifications, and conversational agents.",
    learnings:
      "Robust automation is more than connecting systems: it requires anticipating failures, creating fallbacks, and making every workflow step observable.",
  },
  "computer-vision-lab": {
    category: "AI · Computer Vision · Python",
    tags: ["YOLO", "OpenCV", "Python", "Detection", "Webcam"],
    role: "Researcher & Developer",
    shortDescription:
      "Computer-vision experiments with YOLO and OpenCV, covering object detection, gesture and face recognition, and real-time webcam analysis.",
    longDescription:
      "An experiment lab exploring real-time visual detection and recognition with Python, OpenCV, and YOLO models.",
    context:
      "Computer vision is one of AI's most practical frontiers. Computer Vision Lab is a hands-on learning space built around experiments running through a webcam.",
    challenge:
      "Implement real-time inference pipelines that run efficiently on conventional hardware while maintaining useful frame rates and detection results.",
    myRole:
      "Implementing YOLO and OpenCV pipelines, experimenting with object, gesture, and face detection, and analyzing real-time inference data.",
    impact:
      "A collection of functional experiments demonstrating practical computer-vision applications. It is an experimental learning project, not a production product.",
    learnings:
      "Computer vision requires balancing precision and performance. Confidence thresholds and choosing the right model for the context are critical to useful results.",
  },
  "basquete-brasileiro": {
    category: "Web Development · Foundations",
    tags: ["HTML", "CSS", "JavaScript", "DOM", "Dataset"],
    role: "Frontend Developer",
    shortDescription:
      "A Brazilian basketball information finder with dynamic search, a JavaScript dataset, and DOM manipulation, built as a web-foundations project.",
    longDescription:
      "A web application for searching Brazilian basketball data, built with solid HTML, CSS, and JavaScript foundations and no frameworks.",
    context:
      "Developed while learning web fundamentals, the project explores DOM manipulation, events, and data structures in vanilla JavaScript.",
    challenge:
      "Create a fluid, organized search experience using only semantic HTML, responsive CSS, and vanilla JavaScript without external frameworks or libraries.",
    myRole:
      "End-to-end development: semantic HTML, responsive CSS, JavaScript search logic, dataset structure, and dynamic DOM manipulation.",
    impact:
      "A completed foundations project demonstrating a solid understanding of core web principles before adopting frameworks.",
    learnings:
      "Working with vanilla JavaScript before frameworks builds a stronger foundation. Understanding the DOM changes how you use React or Vue later.",
  },
}

export function getLocalizedProjects(locale: Locale): LocalizedProject[] {
  const messages = catalogs[locale]

  return allProjects.map((project) => ({
    ...project,
    ...(locale === "en" ? englishProjectCopy[project.slug] : undefined),
    statusLabel: messages.statuses[project.status],
    classificationLabel: messages.classifications[project.classification],
  }))
}
