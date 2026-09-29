import type { Profile } from "@/lib/about";
import type { Client, EducationItem, Experience, Project, SkillGroup } from "@/lib/data";

export type PortfolioData = {
  profile: Profile;
  experience: Experience[];
  skills: SkillGroup[];
  education: EducationItem[];
  projects: Project[];
  clients: Client[];
};

export type SectionId = "about" | "projects" | "experience" | "skills" | "education" | "contact";

export type TabRef =
  | { kind: "home" }
  | { kind: "section"; section: SectionId }
  | { kind: "project"; slug: string };

export type Tab = TabRef & { id: string };

export function tabId(ref: TabRef): string {
  if (ref.kind === "home") return "home";
  if (ref.kind === "section") return `section:${ref.section}`;
  return `project:${ref.slug}`;
}

export type SectionMeta = {
  id: SectionId;
  label: string;
  number: string;
  tint: string;
};

export const SECTIONS: SectionMeta[] = [
  { id: "about", label: "Moi", number: "01", tint: "#f6c332" },
  { id: "projects", label: "Projets", number: "02", tint: "#f26b1d" },
  { id: "experience", label: "Parcours", number: "03", tint: "#c6ef3a" },
  { id: "skills", label: "Compétences", number: "04", tint: "#8fd3ff" },
  { id: "education", label: "Formation", number: "05", tint: "#e7c4e8" },
  { id: "contact", label: "Contact", number: "06", tint: "#f1e9d6" },
];

export function sectionMeta(id: SectionId): SectionMeta {
  return SECTIONS.find((s) => s.id === id)!;
}
