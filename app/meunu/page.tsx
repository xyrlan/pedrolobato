import ProjectPage from "@/components/ProjectPage";

export default function Meunu() {
  const data = {
    title: "Meunu",
    description: "Meunu is a platform for managing and tracking orders, bills and products for a restaurant.",
    articleImage: "/meunu/meunuvideo.mp4",
    content: "Meunu is the all-in-one platform for you to create your online store in minutes. Easily list your products, share your store with your customers, and receive and organize orders in an incredibly easy and practical way.",
    role: ["Software Engineer", "Full Stack", "UI/UX Designer"],
    tools: ["React", "Next.js", "TailwindCSS", "API REST", "PostgreSQL"],
    integrations: ["Google Location API", "Printer", "Stripe"],
    duration: "2023 - 2024",
    features: [],
    links: [
      {
        name: "meunu.com.br",
        url: "https://meunu.com.br",
        icon: "🌐"
      },
    ],
  };

  return (
    <ProjectPage data={data} />
  );
}