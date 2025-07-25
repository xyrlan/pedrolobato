import ProjectPage from "@/components/ProjectPage";

export default function Pesqueiro110() {
  const data = {
    title: "Pesqueiro 110",
    description: "Pesqueiro 110 is a fishing balneary.",
    articleImage: "/pesqueiro110/pesqueiro110.mp4",
    content: "Pesqueiro 110 website reached 500 visitors per day.",
    role: ["Front End Developer", "UI/UX Designer"],
    tools: ["React", "TailwindCSS", "Framer Motion"],
    duration: "1 month",
    features: [],
    links: [
      {
        name: "pesqueiro110.com.br",
        url: "https://pesqueiro110.com.br",
        icon: "🌐"
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}