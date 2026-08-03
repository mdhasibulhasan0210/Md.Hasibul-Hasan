import type { NavItem, ExpertiseCard, TechItem, TimelineItem } from '../types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export const EXPERTISE_CARDS: ExpertiseCard[] = [
  {
    title: 'Frontend Development',
    description: 'Crafting pixel-perfect, performant interfaces using React, TypeScript, and modern CSS.',
    icon: '⚡',
  },
  {
    title: 'React Development',
    description: 'Building scalable component architectures with React 19 hooks, context, and best practices.',
    icon: '⚛️',
  },
  {
    title: 'TypeScript',
    description: 'Writing type-safe, maintainable code with strict TypeScript for zero runtime errors.',
    icon: '🔷',
  },
  {
    title: 'JavaScript',
    description: 'Deep understanding of ES2024+, async patterns, closures, and performance optimization.',
    icon: '🟡',
  },
  {
    title: 'Python',
    description: 'Scripting, automation, data manipulation, and exploring algorithmic problem solving.',
    icon: '🐍',
  },
  {
    title: 'Responsive Web Design',
    description: 'Mobile-first, fluid layouts that work flawlessly across every screen size.',
    icon: '📱',
  },
  {
    title: 'Prompt Engineering',
    description: 'Designing precise, effective AI prompts to maximize output quality and reliability.',
    icon: '🤖',
  },
  {
    title: 'UI/UX Design',
    description: 'Translating design principles into elegant, intuitive, and accessible user experiences.',
    icon: '🎨',
  },
  {
    title: 'Firebase',
    description: 'Integrating Firestore, Authentication, and Storage for real-time web applications.',
    icon: '🔥',
  },
  {
    title: 'Performance Optimization',
    description: 'Achieving Lighthouse 100 scores through lazy loading, code splitting, and asset tuning.',
    icon: '🚀',
  },
]

export const TECH_ITEMS: TechItem[] = [
  // Frontend
  { name: 'React', icon: 'SiReact', category: 'frontend' },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend' },
  { name: 'JavaScript', icon: 'SiJavascript', category: 'frontend' },
  { name: 'HTML5', icon: 'SiHtml5', category: 'frontend' },
  { name: 'CSS3', icon: 'SiCss3', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend' },
  // Animation
  { name: 'Framer Motion', icon: 'SiFramer', category: 'animation' },
  { name: 'GSAP', icon: 'SiGreensock', category: 'animation' },
  // Backend Knowledge
  { name: 'Firebase', icon: 'SiFirebase', category: 'backend' },
  { name: 'Firestore', icon: 'SiFirebase', category: 'backend' },
  // Tools
  { name: 'Git', icon: 'SiGit', category: 'tools' },
  { name: 'GitHub', icon: 'SiGithub', category: 'tools' },
  { name: 'VS Code', icon: 'SiVisualstudiocode', category: 'tools' },
  { name: 'Vite', icon: 'SiVite', category: 'tools' },
]

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    institution: 'APBn PSC',
    degree: 'Secondary School Certificate (SSC)',
    period: '2023 – 2028',
    current: true,
    details: [
      'Armed Police Battalion Public School & College',
      'Currently enrolled in Class 9',
      'SSC Examination: 2028',
      'Location: Bogura, Bangladesh',
    ],
  },
]

export const PERSONAL_INFO = {
  name: 'Md. Hasibul Hasan',
  email: 'mdhasibulhasan0210@gmail.com',
  github: 'https://github.com/mdhasibulhasan0210',
  githubUsername: 'mdhasibulhasan0210',
  tagline: "I don't care they have stolen my ideas, but I care that they have none of their own.",
  bio: `Md. Hasibul Hasan is a dedicated student and passionate frontend developer who enjoys solving real-world problems through technology. Although still a school student, he has already built multiple production-quality web applications while continuously improving his knowledge of modern frontend engineering.

He enjoys designing clean user interfaces, creating smooth animations, optimizing performance, and writing maintainable code. His goal is to become a professional Software Engineer while continuously learning new technologies and contributing meaningful projects to the developer community.`,
}
