import Section from "@/components/ui/Section";
import { getProjects } from "@/lib/projects";
import ProjectsGrid from "@/components/ProjectsGrid";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <Section
      id="projects"
      eyebrow="Projets"
      title="Projets"
      description="Conçus et développés en autonomie, du cahier des charges au produit. Clique sur un projet pour voir le détail."
    >
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
