import ProjectPage from "@/components/ProjectPage";

export default function Mosaico() {
  const data = {
    title: "Mosaico Genetica",
    description: "Mosaico Genetica is a medical genetics consulting company.",
    articleImage: "/mosaico/mosaico.png",
    content: "Website developed for a friend's company.",
    role: ["Front End Developer", "UI/UX Designer"],
    tools: ["React", "TailwindCSS", "Framer Motion"],
    duration: "1 month",
    links: [
      {
        name: "mosaico.com.br",
        url: "https://mosaico.com.br",
        icon: "🌐"
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}