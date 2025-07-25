import ProjectPage from "@/components/ProjectPage";

export default function SoulGlobal() {
  const data = {
    title: "Soul Global",
    description: "Marketplace with complex logistics and order management system",
    articleImage: "/soulglobal/soulglobalbrand.jpg",
    content: "Soul Global is a cutting-edge platform revolutionizing the import of containerized products from China to Brazil. We offer a comprehensive solution that combines a robust marketplace for Chinese suppliers with an integrated system designed to simplify the entire import bureaucracy and complex tax calculations for Brazilian businesses.",
    role: ["Software Engineer", "Full Stack", "UI/UX Designer"],
    tools: ["React", "Next.js", "TailwindCSS", "API REST", "PostgreSQL"],
    integrations: ["ZapSign", "Asaas"],
    duration: "2024 - Present",
    links: [
      {
        name: "soulglobal.com.br",
        url: "https://soulglobal.com.br",
        icon: "🌐"
      },
    ],
    features: [
      {
        title: "Complex order management system",
        description: "We've implemented an optimized 7-step sequential workflow system to manage the complete lifecycle of import orders, from contract signing to final delivery. This represents a significant transition from our previous 11-step model, specifically designed to reduce complexity and boost operational efficiency. The streamlined process ensures smoother transitions and improved oversight at every stage.",
        description2: "For Step 2: Merchandise Payment, I developed an advanced logic that allows for multiple partial payments until 100% of the total merchandise value is reached. This provides complete payment flexibility for the client while maintaining robust administrative control and automated workflow progression. This innovative approach enhances customer convenience without compromising financial oversight",
        images: [
          { url: "/soulglobal/orderfeature.mp4", description: "Customer order management" },
        ],
      },
      {
        title: "Complex International Freight Calculations and Integrated Financial Management",
        description: "International Freight Calculation Engine: I implemented a robust system for dynamic international freight calculations, taking into account multiple variables and providing users with detailed cost simulations.",
        description2: "Financial and Commission Management: I developed features for precise commission control and detailed NCM (Mercosul Common Nomenclature) management, which is crucial for pricing and compliance in import operations.",
        images: [
          { url: "/soulglobal/cart.mp4", description: "International Freight Calculation Engine" },
        ],
      },
      {
        title: "Multi-Role Marketplace System",
        description: "Complete Multi-Role Marketplace Architecture: I developed and implemented a robust marketplace architecture that supports three distinct roles: Admin, Seller, and Client. Each role features customized user experiences and permissions. This involved creating specific dashboards and interfaces for each user type, ensuring appropriate access and functionalities aligned with their role within the import ecosystem.",
        description2: "Access and Authorization Management (Role-Based Access Control - RBAC): I implemented a Role-Based Access Control (RBAC) system using NextAuth.js. This ensures that functionalities and data are accessible only to users with the correct permissions. This includes user management, seller control, and order monitoring tailored to each specific role.",
      },
      {
        title: "Audit log",
        description: "Implemented a comprehensive audit log system to track all actions taken by users within the platform. This includes user actions, order status changes, and system events. The audit log is stored in a PostgreSQL database and can be queried for auditing purposes.",
        description2: "The audit log is stored in a PostgreSQL database and can be queried for auditing purposes.",
        images: [
          { url: "/soulglobal/auditlog.png", description: "Audit log" },
        ],
      }
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}