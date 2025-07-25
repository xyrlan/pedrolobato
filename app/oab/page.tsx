import ProjectPage from "@/components/ProjectPage";

export default function OAB() {
  const data = {
    title: "OAB Paratodos",
    description: "OAB is the Brazilian Bar Association.",
    articleImage: "/oab/oabbrand.jpg",
    content: "This is a landing page for the Brazilian Bar Association slate 01 called OAB Paratodos.",
    role: ["Front End Developer"],
    tools: ["React", "TailwindCSS", "Framer Motion"],
    collaborators: ["Lucas Mendonça", "Davi"],
    duration: "1 month",
    features: [{
      title: "Scroll Animations",
      description: "Used the framer motion library to create smooth scroll animations for the landing page.",
      images: [
        {
          url: "/oab/oabvideo2.mp4",
          description: "Scroll Animations"
        }
      ]
    }],
    links: [
      {
        name: "oabparatodos.com.br",
        url: "https://oabparatodos.com.br",
        icon: "🌐"
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}