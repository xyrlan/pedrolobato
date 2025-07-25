import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <>
      <h1 className="col-span-2 col-start-1 col-end-3 body">
        {project.title}
        <br />
        {project.period}
      </h1>
      <p className="col-span-4 col-start-3 body">
        {project.description}
      </p>
    </>
  );
} 