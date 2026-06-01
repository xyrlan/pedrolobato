import ProjectPage from "@/components/ProjectPage";

export default function Nihon() {
  const data = {
    title: "Nihon",
    description: "Nihon is a Japanese restaurant.",
    articleImage: "/nihon/nihonimage.png",
    content: "One of my first projects that I was the only developer and designer.",
    role: ["Front End Developer", "UI/UX Designer"],
    tools: ["React", "TailwindCSS", "Framer Motion"],
    duration: "1 month",
    links: [
      {
        name: "www.nihonrestaurante.com.br",
        url: "https://www.nihonrestaurante.com.br",
        icon: "🌐"
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}