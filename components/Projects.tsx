import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <div className="grid grid-cols-6 col-start-1 col-end-13 gap-3 md:col-start-7">
      <p className="col-start-1 opacity-40 caption">
        PROJECTS
      </p>
      <p className="col-start-3 opacity-40 caption">
        DESCRIPTION
      </p>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
} 