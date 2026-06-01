import ProjectPage from "@/components/ProjectPage";

export default function Clearframe() {
  const data = {
    title: "Clearframe",
    description: "Windows desktop SaaS that restores window visibility for apps with restricted display affinity.",
    articleImage: "/clearframe/clearframecover.png",
    content: "A portable Windows utility that re-enables display output for whitelisted apps that block screen sharing or recording. A lightweight Win32 client in C paired with a serverless Cloudflare Workers backend handling licensing, device binding, and Stripe subscriptions.",
    role: ["Software Engineer", "Full Stack"],
    tools: ["C", "Win32 API", "TypeScript", "Cloudflare Workers", "Cloudflare D1", "Stripe"],
    integrations: ["Stripe", "Resend", "Cloudflare D1"],
    duration: "2026",
    links: [
      {
        name: "clearframe.com.br",
        url: "https://clearframe.com.br",
        icon: "🌐"
      },
    ],
    features: [
      {
        title: "Win32 client in C",
        description: "Global system hook that restores window visibility for whitelisted processes, shipped as a single signed installer with no runtime dependencies.",
      },
      {
        title: "Signed licensing with device binding",
        description: "ECDSA P-256 license validation tied to a hardware fingerprint, plus SHA-256 checksum verification so a leaked key can't run elsewhere and tampered binaries refuse to start.",
      },
      {
        title: "Serverless backend on Cloudflare",
        description: "Workers + D1 handle the full Stripe subscription lifecycle (active, trial, grace period, canceled), provisioning and emailing license keys within seconds of payment.",
      },
      {
        title: "Automated Windows builds",
        description: "GitHub Actions cross-compiles on every tagged release and feeds the artifact's hash into the license server, making updates safe to ship.",
      },
    ],
  };
  return (
    <ProjectPage data={data} />
  );
}
