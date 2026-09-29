import { Briefcase, Cpu, FolderOpen, GraduationCap, LayoutGrid, Mail, UserRound, type LucideIcon } from "lucide-react";
import type { SectionId, Tab } from "./types";

export const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  about: UserRound,
  projects: FolderOpen,
  experience: Briefcase,
  skills: Cpu,
  education: GraduationCap,
  contact: Mail,
};

export function tabIcon(tab: Tab): LucideIcon {
  if (tab.kind === "section") return SECTION_ICONS[tab.section];
  if (tab.kind === "project") return FolderOpen;
  return LayoutGrid;
}
