import type { Locale } from "../i18n/core.ts"

export type StackLevel = "specialty" | "projectUse" | "developing" | "exploring"

export interface StackItem {
  name: string
  level: StackLevel
  usedIn?: string[]
}

export interface StackCategory {
  id: string
  label: string
  labelEn: string
  specialty?: boolean
  items: StackItem[]
}

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    labelEn: "Frontend",
    items: [
      {
        name: "HTML",
        level: "projectUse",
        usedIn: ["Agiliza", "Arquivo Digital", "Basquete Brasileiro"],
      },
      {
        name: "CSS",
        level: "projectUse",
        usedIn: ["Agiliza", "Arquivo Digital", "Basquete Brasileiro"],
      },
      {
        name: "JavaScript",
        level: "projectUse",
        usedIn: ["Basquete Brasileiro", "Arquivo Digital"],
      },
      {
        name: "TypeScript",
        level: "projectUse",
        usedIn: ["Agiliza Transparência"],
      },
      { name: "React", level: "projectUse", usedIn: ["Agiliza Transparência"] },
      {
        name: "Next.js",
        level: "projectUse",
        usedIn: ["Agiliza Transparência"],
      },
    ],
  },

  {
    id: "backend",
    label: "Backend",
    labelEn: "Backend",
    items: [
      {
        name: "Python",
        level: "specialty",
        usedIn: ["Computer Vision Lab", "EDX/TechX", "Automation Lab"],
      },
      { name: "PHP", level: "specialty" },
      { name: "Laravel", level: "developing" },
      {
        name: "REST APIs",
        level: "projectUse",
        usedIn: ["Agiliza", "Automation Lab"],
      },
      { name: "SQL", level: "projectUse", usedIn: ["Agiliza Transparência"] },
      { name: "MySQL", level: "projectUse", usedIn: ["Agiliza Transparência"] },
    ],
  },

  {
    id: "ai",
    label: "IA e Dados",
    labelEn: "AI & Data",
    specialty: true,
    items: [
      { name: "Pandas", level: "projectUse", usedIn: ["EDX/TechX"] },
      { name: "Scikit-learn", level: "exploring" },
      { name: "OpenCV", level: "projectUse", usedIn: ["Computer Vision Lab"] },
      { name: "YOLO", level: "projectUse", usedIn: ["Computer Vision Lab"] },
      {
        name: "LLMs",
        level: "developing",
        usedIn: ["Automation Lab", "EDX/TechX"],
      },
      { name: "AI Agents", level: "exploring", usedIn: ["EDX/TechX"] },
      { name: "Power BI", level: "developing" },
      {
        name: "Google Vision API",
        level: "projectUse",
        usedIn: ["Agiliza Transparência"],
      },
    ],
  },

  {
    id: "automation",
    label: "Automação",
    labelEn: "Automation",
    items: [
      { name: "n8n", level: "projectUse", usedIn: ["Automation Lab"] },
      { name: "Webhooks", level: "projectUse", usedIn: ["Automation Lab"] },
      {
        name: "Google APIs",
        level: "projectUse",
        usedIn: ["Automation Lab", "Agiliza"],
      },
      { name: "Gmail API", level: "projectUse", usedIn: ["Automation Lab"] },
      {
        name: "Google Drive API",
        level: "projectUse",
        usedIn: ["Automation Lab"],
      },
      {
        name: "Google Sheets API",
        level: "projectUse",
        usedIn: ["Automation Lab"],
      },
    ],
  },

  {
    id: "tools",
    label: "Dev Tools",
    labelEn: "Dev Tools",
    items: [
      { name: "Git", level: "projectUse" },
      { name: "GitHub", level: "projectUse" },
      { name: "VS Code", level: "projectUse" },
      { name: "Figma", level: "projectUse" },
    ],
  },
]

export interface CarouselCard {
  group: string

  color: string

  items: string[]
}

export const carouselCards: CarouselCard[] = [
  { group: "PYTHON", color: "#3776AB", items: ["Python"] },

  { group: "HTML", color: "#E34F26", items: ["HTML"] },

  { group: "CSS", color: "#1572B6", items: ["CSS"] },

  { group: "JAVASCRIPT", color: "#F7DF1E", items: ["JavaScript"] },

  { group: "REACT", color: "#61DAFB", items: ["React"] },

  { group: "POSTGRESQL", color: "#4169E1", items: ["PostgreSQL"] },

  { group: "PHP", color: "#8892BF", items: ["PHP"] },

  { group: "LARAVEL", color: "#FF2D20", items: ["Laravel"] },

  { group: "SQL", color: "#10B981", items: ["SQL"] },

  { group: "N8N", color: "#EA4B71", items: ["n8n"] },

  { group: "GIT / GITHUB", color: "#F05032", items: ["Git", "GitHub"] },

  { group: "VS CODE", color: "#23A8F2", items: ["VS Code"] },
]

export function getLocalizedStackCategories(_locale: Locale) {
  return stackCategories.map((category) => ({
    ...category,
    label: _locale === "en" ? category.labelEn : category.label,
  }))
}
