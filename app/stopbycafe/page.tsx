import ProjectPage from "@/components/ProjectPage";

export default function StopbyCafe() {
  const data = {
    title: "Stop by Cafe",
    description: "Stopby Cafe is a coffe shop.",
    articleImage: "/stopbycafe/stopbycafe.mp4",
    content: "Stopby Cafe is a coffee shop that sells coffee and other drinks,  localized in the center of New York, Manhattan.",
    role: ["Front End Developer", "UI/UX Designer"],
    tools: ["React", "TailwindCSS", "Framer Motion"],
    duration: "1 month",
    features: [{
      title: "Carousel Parallax",
      description: "Used the framer motion library to create a carousel parallax.",
      images: [
        {
          url: "/stopbycafe/carousel.mp4",
          description: "Carousel Parallax"
        },
      ],
    }],
    links: [
      {
        name: "stopbycafe.com",
        url: "https://stopbycafe.com",
        icon: "🌐"
      },
    ],
  };

    return(
    <ProjectPage data = { data } />
  );
  }
