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
        description: "Developed an optimized 7-step sequential workflow system using React and PostgreSQL to manage the complete lifecycle of import orders, from contract signing to final delivery, reducing complexity from the previous 11-step model and boosting operational efficiency.",
        description2: "Implemented advanced partial payment logic using API REST integrations allowing multiple payments until 100% completion, providing complete payment flexibility while maintaining robust administrative control and automated workflow progression.",
        images: [
          { url: "/soulglobal/orderfeature.mp4", description: "Customer order management" },
        ],
      },
      {
        title: "Complex International Freight Calculations and Integrated Financial Management",
        description: "Implemented a dynamic international freight calculation engine using Next.js and TailwindCSS taking into account multiple variables, providing users with detailed cost simulations for precise import cost planning.",
        description2: "Created precise commission control and NCM management features using PostgreSQL and API REST, ensuring compliance and accurate pricing in import operations.",
        images: [
          { url: "/soulglobal/cart.mp4", description: "International Freight Calculation Engine" },
        ],
      },
      {
        title: "Multi-Role Marketplace System",
        description: "Developed a comprehensive marketplace architecture using React and Next.js supporting three distinct roles (Admin, Seller, Client) with customized dashboards and interfaces, ensuring appropriate access and functionalities for each user type within the import ecosystem.",
        description2: "Implemented Role-Based Access Control (RBAC) system using NextAuth.js ensuring functionalities and data are accessible only to users with correct permissions, providing secure user management and role-specific monitoring.",
        description3: "Enhanced with context-based Multi-Role Marketplace System leveraging React Context API to intelligently determine and fetch specific data based on the user's role, improving page loading times by an average of 30%.",
      },
      {
        title: "Advanced Data Management and Performance Optimization",
        description: "Implemented pagination with client-side caching and complex filtering capabilities using SWR and Next.js API Routes with queryCriteria to optimize response times and performance for large data requests across various tables by up to 40%.",
        description2: "Created efficient data handling mechanisms for managing large datasets in import operations, ensuring smooth user experience even when dealing with extensive supplier catalogs, order histories, users, companies, and more.",
        description3: "Enabled stateful table filters by integrating queryCriteria with URL parameters using Nuqs guaranteeing that filter selections are preserved when the page is reloaded, improving user workflow.",
        images: [
          { url: "/soulglobal/tablefilters.mp4", description: "Filtering and sorting" },
        ],
      },
      {
        title: "Audit log",
        description: "Implemented a comprehensive audit log system using PostgreSQL to track all user actions, order status changes, and system events, providing complete transparency and compliance for auditing purposes.",
        description2: "Created queryable audit database using PostgreSQL enabling detailed tracking and reporting for regulatory compliance and operational oversight.",
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