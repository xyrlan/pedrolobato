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
    features: [
      {
        title: "RESTful API Development",
        description: "Developed a RESTful API (API v1) using Next.js API Routes to enable modular and on-demand data loading, significantly reducing session payload and improving overall system performance.",
        description2: "Created custom React hooks leveraging SWR and Next.js's component-based architecture to encapsulate data fetching and mutation logic for various modules (e.g., profile, delivery settings, tables), promoting code reusability and maintainability.",
      },
      {
        title: "Advanced State Management and Caching",
        description: "Implemented robust state management and caching using SWR (Stale-While-Revalidate) to ensure real-time data updates, automatic caching, improved user experience with optimistic updates, and efficient data synchronization across components and tabs.",
        description2: "Implemented advanced SWR features such as optimistic updates, conditional revalidation, and persistent cache to further optimize data fetching, enhance UI responsiveness, and provide a seamless user experience even in varying network conditions.",
      },
      {
        title: "Database Architecture and Authentication",
        description: "Designed and integrated a flexible database schema using PostgreSQL with Prisma ORM to manage diverse restaurant data, including users, customers, products, orders, tables, and payment information.",
        description2: "Implemented secure user authentication and authorization using NextAuth.js and middleware to protect API routes, verify user sessions, and enforce role-based access control, ensuring data integrity and user privacy.",
      },
      {
        title: "Table Management System",
        description: "Developed a comprehensive table management system utilizing QR code generation and dedicated API endpoints to streamline dine-in operations, including table status tracking, service fee management, and digital menu access.",
        description2: "Created seamless integration between physical restaurant tables and digital ordering system, enabling customers to scan QR codes and access menus directly from their devices.",
      },
      {
        title: "Payment Integration",
        description: "Integrated multiple payment methods with Stripe for payment processing and PIX/cash options to provide flexible and secure transaction capabilities for various order types.",
        description2: "Ensured comprehensive payment coverage for Brazilian market needs, supporting both international and local payment preferences with secure transaction processing.",
      },
      {
        title: "Media Management and Promotions",
        description: "Implemented image upload functionalities leveraging AWS S3 for storage and FormData with API routes to enable merchants to manage their avatar, logo, and cover images efficiently.",
        description2: "Built a dynamic coupon and discount management system using dedicated API endpoints and associated hooks to allow businesses to create and manage promotional offers for customers.",
      },
      {
        title: "Frontend User Experience",
        description: "Enhanced frontend user experience with UI components from Radix UI and Headless UI, along with TailwindCSS for styling to create a modern, responsive, and accessible interface.",
        description2: "Focused on delivering intuitive user interactions and seamless navigation across all platform features, ensuring optimal usability for restaurant owners and their customers.",
      }
    ],
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