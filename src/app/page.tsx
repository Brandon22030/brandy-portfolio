import { getProfile } from "@/lib/about";
import { getClients } from "@/lib/clients";
import { getExperience } from "@/lib/experience";
import { getSkillGroups } from "@/lib/skills";
import { getEducationList } from "@/lib/education";
import { getProjects } from "@/lib/projects";
import { personJsonLd } from "@/lib/schema";
import DesktopExperience from "@/components/desktop/DesktopExperience";

export default async function Home() {
  const [profile, experience, skills, education, projects, clients] = await Promise.all([
    getProfile(),
    getExperience(),
    getSkillGroups(),
    getEducationList(),
    getProjects(),
    getClients(),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />

      {/* Brandy OS is fully client-side; this server-rendered outline keeps the content crawlable and screen-reader friendly. */}
      <main className="sr-only">
        <h1>
          {profile.name} — {profile.role}
        </h1>
        <p>{profile.summary}</p>
        <h2>Projets</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}>
              <h3>
                {project.name}
                {project.inProgress ? " (en chantier)" : ""}
              </h3>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
        <h2>Expérience</h2>
        <ul>
          {experience.map((exp) => (
            <li key={`${exp.company}-${exp.period}`}>
              {exp.role} — {exp.company} ({exp.period})
            </li>
          ))}
        </ul>
        <p>
          Contact : <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </main>

      <DesktopExperience data={{ profile, experience, skills, education, projects, clients }} />
    </>
  );
}
