export type NavItemId =
  | "home"
  | "projects"
  | "skills"
  | "experience"
  | "contact"

export interface NavLinkDefinition {
  id: NavItemId
  labelKey: NavItemId
  to: string
  sectionId?: string
}

export const NAV_LINKS = [
  { id: "home", labelKey: "home", to: "/#inicio", sectionId: "inicio" },
  { id: "projects", labelKey: "projects", to: "/projects" },
  {
    id: "skills",
    labelKey: "skills",
    to: "/#habilidades",
    sectionId: "habilidades",
  },
  {
    id: "experience",
    labelKey: "experience",
    to: "/#experiencia",
    sectionId: "experiencia",
  },
  {
    id: "contact",
    labelKey: "contact",
    to: "/#contato",
    sectionId: "contato",
  },
] as const satisfies readonly NavLinkDefinition[]

const HOME_SECTION_ITEMS: Readonly<Record<string, NavItemId>> = {
  inicio: "home",
  habilidades: "skills",
  experiencia: "experience",
  contato: "contact",
}

export function resolveActiveNavItem(
  pathname: string,
  activeSection: string,
): NavItemId | null {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "projects"
  }

  if (pathname === "/stack") return "skills"

  if (pathname === "/") return HOME_SECTION_ITEMS[activeSection] ?? "home"

  return null
}

interface NavbarScrollInput {
  anchorY: number
  currentY: number
  visible: boolean
  locked?: boolean
  topOffset?: number
  threshold?: number
}

interface NavbarScrollState {
  anchorY: number
  visible: boolean
}

export function getNextNavbarScrollState({
  anchorY,
  currentY,
  visible,
  locked = false,
  topOffset = 48,
  threshold = 8,
}: NavbarScrollInput): NavbarScrollState {
  if (locked || currentY <= topOffset) {
    return { anchorY: currentY, visible: true }
  }

  const delta = currentY - anchorY

  if (Math.abs(delta) < threshold) return { anchorY, visible }

  return { anchorY: currentY, visible: delta < 0 }
}
