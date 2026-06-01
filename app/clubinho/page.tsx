import ProjectPage from "@/components/ProjectPage";

export default function Clubinho() {
  const data = {
    title: "Clubinho — Corações Preciosos",
    description: "Cross-platform mobile app for a Brazilian children's subscription and marketplace service.",
    articleImage: "/clubinho/clubinhocover.png",
    content: "A React Native + Expo app delivering a full e-commerce and subscription experience for families across iOS, Android, and Web from one codebase — marketplace, checkout, orders, subscriptions, shipping, and a referral program, all integrated with a custom REST backend.",
    role: ["Mobile Developer", "Full Stack"],
    tools: ["React Native", "Expo", "TypeScript", "React Navigation", "Axios", "AsyncStorage"],
    integrations: ["Custom REST API", "CEP / freight calculation", "Payment gateway"],
    duration: "2026 - Present",
    features: [
      {
        title: "Full shopping flow, single codebase",
        description: "Marketplace, cart, checkout, subscriptions, order history, and shipment tracking across iOS, Android, and Web — built once with React Navigation and a shared typed API layer.",
      },
      {
        title: "JWT auth with silent refresh",
        description: "Login, password reset, and session persistence with an Axios interceptor that transparently refreshes expired tokens on any 401 and retries the request.",
      },
      {
        title: "Referral program + wallet",
        description: "Share-tracked referrals credit a wallet balance usable as a discount at checkout, with a transaction history view.",
      },
      {
        title: "Brazilian checkout details",
        description: "CEP lookup and real-time freight calculation, CPF/phone validation, and a coupon engine — the pieces that make Brazilian e-commerce convert.",
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}
