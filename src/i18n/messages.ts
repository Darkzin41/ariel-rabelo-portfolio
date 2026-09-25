import type { Locale } from "./core.ts"

export interface AppMessages {
  metadata: { title: string; description: string; socialDescription: string }
  language: {
    buttonLabel: string
    menuLabel: string
    portuguese: string
    english: string
  }
  nav: {
    mainLabel: string
    home: string
    projects: string
    skills: string
    experience: string
    contact: string
    chooseAccent: string
    accentTitle: string
    accentBlue: string
    accentViolet: string
    accentEmerald: string
    accentAmber: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    sectionLabel: string
    eyebrow: string
    statementStart: string
    statementEmphasis: string
    statementEnd: string
    exploreProjects: string
    location: string
    scroll: string
  }
  featured: {
    eyebrow: string
    title: string
    titleEmphasis: string
    exploreProject: string
    exploreProjectAria: string
    objects: string
    fields: string
    associations: string
    authValidation: string
    dataSync: string
    tests: string
    inDevelopment: string
    published: string
  }
  moreProjects: { eyebrow: string; text: string; emphasis: string; action: string }
  carousel: {
    eyebrow: string
    text: string
    emphasis: string
    regionLabel: string
    roleDescription: string
    listLabel: string
    drag: string
    pauseAndDrag: string
    keyboard: string
    reducedMotion: string
    play: string
    pause: string
    playAria: string
    pauseAria: string
  }
  experience: {
    experienceLabel: string
    educationLabel: string
    present: string
    current: string
    jobTitle: string
    organization: string
    location: string
    description: string
    linkedIn: string
    ongoing: string
    ceumaCourse: string
    ifmaCourse: string
    ifmaNote: string
    incodeCourse: string
  }
  recognition: {
    recognitionLabel: string
    certificationsLabel: string
    research: string
    competition: string
    membership: string
    universoIfSubtitle: string
    hackathonSubtitle: string
    leagueTitle: string
    leagueSubtitle: string
    certificatesAction: string
    aboutLabel: string
    aboutStart: string
    aboutEmphasis: string
    aboutBody: string
  }
  footer: {
    contact: string
    headlineStart: string
    headlineEmphasis: string
    headlineEnd: string
    action: string
    role: string
    location: string
    builtWith: string
    backToTop: string
  }
  projects: {
    pageLabel: string
    title: string
    titleEmphasis: string
    all: string
    professional: string
    research: string
    academic: string
    experimental: string
    earlyWork: string
    project: string
    projects: string
    exploreAria: string
    openProject: string
  }
  projectDetail: {
    notFound: string
    viewAll: string
    breadcrumbLabel: string
    projects: string
    classification: string
    year: string
    role: string
    status: string
    stack: string
    privateRepository: string
    screenshot: string
    replaceScreenshot: string
    context: string
    challenge: string
    contribution: string
    resultImpact: string
    learnings: string
    tags: string
    nextProject: string
  }
  stack: {
    pageLabel: string
    title: string
    titleEmphasis: string
    description: string
    specialty: string
    projectUse: string
    developing: string
    exploring: string
    usedIn: string
  }
  statuses: {
    inDevelopment: string
    completed: string
    experimental: string
    academic: string
  }
  classifications: {
    professional: string
    research: string
    academicProject: string
    academicExperiment: string
    earlyWork: string
  }
}

const ptBR: AppMessages = {
  metadata: {
    title: "Ariel Rabelo — Desenvolvedor Full Stack | Python, PHP e IA",
    description:
      "Portfólio de Ariel Rabelo, desenvolvedor Full Stack especializado em Python, PHP e inteligência artificial.",
    socialDescription:
      "Sistemas Full Stack, automações e experiências digitais construídas com Python, PHP e inteligência artificial.",
  },
  language: {
    buttonLabel: "Escolher idioma",
    menuLabel: "Opções de idioma",
    portuguese: "Português (Brasil)",
    english: "English",
  },
  nav: {
    mainLabel: "Navegação principal",
    home: "Início",
    projects: "Projetos",
    skills: "Habilidades",
    experience: "Experiência",
    contact: "Contato",
    chooseAccent: "Escolher cor de destaque",
    accentTitle: "Cor de destaque",
    accentBlue: "Azul elétrico",
    accentViolet: "Violeta cósmico",
    accentEmerald: "Esmeralda",
    accentAmber: "Âmbar solar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  hero: {
    sectionLabel: "Apresentação",
    eyebrow: "Desenvolvedor Full Stack / Python · PHP · IA",
    statementStart:
      "Construo sistemas Full Stack, automações e experiências digitais que transformam",
    statementEmphasis: "problemas reais",
    statementEnd: "em soluções inteligentes.",
    exploreProjects: "Explorar projetos",
    location: "São Luís · Maranhão · Brasil",
    scroll: "rolar",
  },
  featured: {
    eyebrow: "Projetos selecionados",
    title: "Problemas reais.",
    titleEmphasis: "Sistemas reais.",
    exploreProject: "Explorar projeto",
    exploreProjectAria: "Explorar projeto",
    objects: "Objetos",
    fields: "Campos",
    associations: "Associações",
    authValidation: "Autenticação e validação",
    dataSync: "Sincronização de dados",
    tests: "417 testes · 38 E2E",
    inDevelopment: "Em desenvolvimento",
    published: "Publicado · Universo IF · Anais IFMA",
  },
  moreProjects: {
    eyebrow: "Mais projetos",
    text: "IA, automação, visão computacional",
    emphasis: "e experimentos acadêmicos.",
    action: "Explorar todos os projetos",
  },
  carousel: {
    eyebrow: "Stack e ferramentas",
    text: "Ferramentas mudam.",
    emphasis: "A forma de resolver problemas evolui.",
    regionLabel: "Tecnologias e ferramentas",
    roleDescription: "carrossel",
    listLabel: "Tecnologias do carrossel",
    drag: "Arraste para explorar.",
    pauseAndDrag:
      "Passe o ponteiro ou foque para pausar. Arraste para explorar.",
    keyboard: "Use ← →, Home e End no teclado.",
    reducedMotion: "Movimento reduzido ativo",
    play: "Reproduzir",
    pause: "Pausar",
    playAria: "Reproduzir rolagem automática",
    pauseAria: "Pausar rolagem automática",
  },
  experience: {
    experienceLabel: "Experiência",
    educationLabel: "Formação",
    present: "2026 — Presente",
    current: "Atual",
    jobTitle: "Desenvolvedor de Software Full Stack Jr.",
    organization: "Secretaria de Estado da Transparência e Controle",
    location: "STC/MA · São Luís, Maranhão",
    description:
      "Desenvolvimento de sistemas, automações e fluxos digitais voltados à gestão e validação de dados. Integração com Google Vision API e alinhamento com equipes técnicas da STC.",
    linkedIn: "Ver no LinkedIn",
    ongoing: "Em andamento",
    ceumaCourse: "CST em Análise e Desenvolvimento de Sistemas",
    ifmaCourse: "Técnico em Informática para Internet",
    ifmaNote: "Pesquisa publicada nos Anais do Universo IF",
    incodeCourse: "Curso de programação — módulo 1 concluído",
  },
  recognition: {
    recognitionLabel: "Reconhecimento",
    certificationsLabel: "Certificações selecionadas",
    research: "Pesquisa",
    competition: "Competição",
    membership: "Membro",
    universoIfSubtitle: "Anais — Iniciação Científica e Tecnológica",
    hackathonSubtitle: "Maratona de Gestão Pública",
    leagueTitle: "Liga Acadêmica de Inteligência Artificial",
    leagueSubtitle: "Universidade Ceuma",
    certificatesAction: "Consultar certificados no LinkedIn",
    aboutLabel: "/sobre",
    aboutStart:
      "Curioso por sistemas, inteligência artificial e pela forma como a tecnologia pode",
    aboutEmphasis: "simplificar problemas complexos.",
    aboutBody:
      "Meu trabalho vive entre código, arquitetura, automação, dados e produto. Como membro da Liga Acadêmica de Inteligência Artificial da Universidade Ceuma, também participo de um ambiente de estudo e troca sobre IA. Quando não estou construindo alguma coisa, provavelmente estou estudando tecnologia, treinando ou jogando.",
  },
  footer: {
    contact: "Contato",
    headlineStart: "Vamos transformar uma",
    headlineEmphasis: "ideia",
    headlineEnd: "em sistema.",
    action: "Entrar em contato",
    role: "Desenvolvedor Full Stack · Python · PHP · IA",
    location: "São Luís · Maranhão · Brasil",
    builtWith: "Construído com curiosidade, código e muitas abas abertas.",
    backToTop: "Voltar ao topo",
  },
  projects: {
    pageLabel: "/projetos",
    title: "Projetos, experimentos",
    titleEmphasis: "e sistemas.",
    all: "Todos",
    professional: "Profissional",
    research: "Pesquisa",
    academic: "Acadêmico",
    experimental: "Experimental",
    earlyWork: "Primeiros projetos",
    project: "projeto",
    projects: "projetos",
    exploreAria: "Explorar projeto",
    openProject: "Abrir projeto",
  },
  projectDetail: {
    notFound: "Projeto não encontrado.",
    viewAll: "Ver todos os projetos",
    breadcrumbLabel: "Navegação estrutural",
    projects: "Projetos",
    classification: "Classificação",
    year: "Ano",
    role: "Atuação",
    status: "Status",
    stack: "Stack",
    privateRepository: "Repositório privado",
    screenshot: "[CAPTURA DO PROJETO]",
    replaceScreenshot: "Substituir por uma captura real do projeto",
    context: "O contexto",
    challenge: "O desafio",
    contribution: "Minha atuação",
    resultImpact: "Resultado e impacto",
    learnings: "Aprendizados",
    tags: "Tags",
    nextProject: "Próximo projeto",
  },
  stack: {
    pageLabel: "/stack",
    title: "Tecnologia é a caixa de ferramentas.",
    titleEmphasis: "Resolver problemas é a habilidade.",
    description:
      "Ferramentas organizadas por contexto — com especialidade em Python, PHP e IA e transparência sobre o uso das demais.",
    specialty: "Especialidade",
    projectUse: "Uso em projetos",
    developing: "Em desenvolvimento",
    exploring: "Explorando",
    usedIn: "Usado em",
  },
  statuses: {
    inDevelopment: "Em desenvolvimento",
    completed: "Concluído",
    experimental: "Experimental",
    academic: "Acadêmico",
  },
  classifications: {
    professional: "PROFISSIONAL",
    research: "PESQUISA",
    academicProject: "PROJETO ACADÊMICO",
    academicExperiment: "EXPERIMENTO ACADÊMICO",
    earlyWork: "PRIMEIROS PROJETOS",
  },
}

const en: AppMessages = {
  metadata: {
    title: "Ariel Rabelo — Full Stack Developer | Python, PHP & AI",
    description:
      "Ariel Rabelo's portfolio — a Full Stack Developer specializing in Python, PHP, and artificial intelligence.",
    socialDescription:
      "Full Stack systems, automations, and digital experiences built with Python, PHP, and artificial intelligence.",
  },
  language: {
    buttonLabel: "Choose language",
    menuLabel: "Language options",
    portuguese: "Português (Brasil)",
    english: "English",
  },
  nav: {
    mainLabel: "Main navigation",
    home: "Home",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    chooseAccent: "Choose accent color",
    accentTitle: "Accent color",
    accentBlue: "Electric blue",
    accentViolet: "Cosmic violet",
    accentEmerald: "Emerald",
    accentAmber: "Solar amber",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    sectionLabel: "Introduction",
    eyebrow: "Full Stack Developer / Python · PHP · AI",
    statementStart:
      "I build Full Stack systems, automations, and digital experiences that turn",
    statementEmphasis: "real problems",
    statementEnd: "into intelligent solutions.",
    exploreProjects: "Explore projects",
    location: "São Luís · Maranhão · Brazil",
    scroll: "scroll",
  },
  featured: {
    eyebrow: "Selected work",
    title: "Real problems.",
    titleEmphasis: "Real systems.",
    exploreProject: "Explore project",
    exploreProjectAria: "Explore project",
    objects: "Objects",
    fields: "Fields",
    associations: "Associations",
    authValidation: "Authentication and validation",
    dataSync: "Data synchronization",
    tests: "417 tests · 38 E2E",
    inDevelopment: "In development",
    published: "Published · Universo IF · IFMA Proceedings",
  },
  moreProjects: {
    eyebrow: "More work",
    text: "AI, automation, computer vision",
    emphasis: "and academic experiments.",
    action: "Explore all projects",
  },
  carousel: {
    eyebrow: "Stack and tools",
    text: "Tools change.",
    emphasis: "The way we solve problems evolves.",
    regionLabel: "Technologies and tools",
    roleDescription: "carousel",
    listLabel: "Carousel technologies",
    drag: "Drag to explore.",
    pauseAndDrag: "Hover or focus to pause. Drag to explore.",
    keyboard: "Use ← →, Home, and End on the keyboard.",
    reducedMotion: "Reduced motion active",
    play: "Play",
    pause: "Pause",
    playAria: "Play automatic scrolling",
    pauseAria: "Pause automatic scrolling",
  },
  experience: {
    experienceLabel: "Experience",
    educationLabel: "Education",
    present: "2026 — Present",
    current: "Current",
    jobTitle: "Junior Full Stack Software Developer",
    organization: "State Department of Transparency and Control",
    location: "STC/MA · São Luís, Maranhão",
    description:
      "Development of systems, automations, and digital workflows for data management and validation. Integration with Google Vision API and alignment with STC technical teams.",
    linkedIn: "View on LinkedIn",
    ongoing: "In progress",
    ceumaCourse: "Associate Degree in Systems Analysis and Development",
    ifmaCourse: "Technical Degree in Web Development",
    ifmaNote: "Research published in the Universo IF Proceedings",
    incodeCourse: "Programming course — module 1 completed",
  },
  recognition: {
    recognitionLabel: "Recognition",
    certificationsLabel: "Selected certifications",
    research: "Research",
    competition: "Competition",
    membership: "Member",
    universoIfSubtitle: "Proceedings — Scientific and Technological Initiation",
    hackathonSubtitle: "Public Management Marathon",
    leagueTitle: "Artificial Intelligence Academic League",
    leagueSubtitle: "Universidade Ceuma",
    certificatesAction: "View certificates on LinkedIn",
    aboutLabel: "/about",
    aboutStart:
      "Curious about systems, artificial intelligence, and how technology can",
    aboutEmphasis: "simplify complex problems.",
    aboutBody:
      "My work sits at the intersection of code, architecture, automation, data, and product. As a member of Universidade Ceuma's Artificial Intelligence Academic League, I also take part in a space for studying and exchanging ideas about AI. When I am not building something, I am probably studying technology, training, or gaming.",
  },
  footer: {
    contact: "Contact",
    headlineStart: "Let's turn an",
    headlineEmphasis: "idea",
    headlineEnd: "into a system.",
    action: "Get in touch",
    role: "Full Stack Developer · Python · PHP · AI",
    location: "São Luís · Maranhão · Brazil",
    builtWith: "Built with curiosity, code, and far too many open tabs.",
    backToTop: "Back to top",
  },
  projects: {
    pageLabel: "/projects",
    title: "Projects, experiments",
    titleEmphasis: "and systems.",
    all: "All",
    professional: "Professional",
    research: "Research",
    academic: "Academic",
    experimental: "Experimental",
    earlyWork: "Early work",
    project: "project",
    projects: "projects",
    exploreAria: "Explore project",
    openProject: "Open project",
  },
  projectDetail: {
    notFound: "Project not found.",
    viewAll: "View all projects",
    breadcrumbLabel: "Breadcrumb",
    projects: "Projects",
    classification: "Classification",
    year: "Year",
    role: "Role",
    status: "Status",
    stack: "Stack",
    privateRepository: "Private repository",
    screenshot: "[PROJECT SCREENSHOT]",
    replaceScreenshot: "Replace with a real project screenshot",
    context: "Context",
    challenge: "Challenge",
    contribution: "My contribution",
    resultImpact: "Outcome and impact",
    learnings: "Learnings",
    tags: "Tags",
    nextProject: "Next project",
  },
  stack: {
    pageLabel: "/stack",
    title: "Technology is the toolkit.",
    titleEmphasis: "Problem solving is the skill.",
    description:
      "Tools organized by context — specializing in Python, PHP, and AI while staying transparent about experience with the rest.",
    specialty: "Specialty",
    projectUse: "Used in projects",
    developing: "Developing",
    exploring: "Exploring",
    usedIn: "Used in",
  },
  statuses: {
    inDevelopment: "In development",
    completed: "Completed",
    experimental: "Experimental",
    academic: "Academic",
  },
  classifications: {
    professional: "PROFESSIONAL",
    research: "RESEARCH",
    academicProject: "ACADEMIC PROJECT",
    academicExperiment: "ACADEMIC EXPERIMENT",
    earlyWork: "EARLY WORK",
  },
}

export const catalogs: Record<Locale, AppMessages> = {
  "pt-BR": ptBR,
  en,
}
