export interface NavItem {
  label: string
  href: string
}

export interface ExpertiseCard {
  title: string
  description: string
  icon: string
}

export interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'animation' | 'backend' | 'tools'
}

export interface TimelineItem {
  institution: string
  degree: string
  period: string
  current: boolean
  details: string[]
}
