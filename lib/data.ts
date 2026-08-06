export interface Gallery {
  id: string;
  title: string;
  projectType: string;
  image: string;
  href: string;
  isDisabled?: boolean;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "soul-global",
    title: "Soul Global",
    period: "2024 - Present",
    description: "Building a platform for importing containers products from China to Brazil in a simple and efficient way. Now in v2.0 — full rewrite on Next.js 16 Server Components with Inngest workflows and an AI assistant."
  },
  {
    id: "central-inteligencia",
    title: "Central de Inteligência (TerraLogs)",
    period: "2025 - Present",
    description: "Front-end for TerraLogs' data intelligence platform. Interactive Google Maps with layered geospatial data over rural properties, heavy GeoJSON manipulation, and analytics dashboards in Vue 3 + Quasar."
  },
  {
    id: "clubinho",
    title: "Clubinho (Corações Preciosos)",
    period: "2026 - Present",
    description: "Subscriber app and retention platform for a children's book subscription club with 12,000+ subscribers. 39 React Native screens shipped through EAS, plus the loyalty ledger and community modules behind them."
  },
  {
    id: "meunu",
    title: "Meunu",
    period: "2023 - 2024",
    description: "Built a platform for managing and tracking orders, bills and products for a restaurant."
  },
  {
    id: "independent-practice",
    title: "Independent Practice",
    period: "2022 - Present",
    description: "Worked independently for a few companies, helping and creating projects and websites for them."
  }
];

export const gallery: Gallery[] = [
  {
    id: "soulglobalv2",
    title: "Soul Global 2.0",
    projectType: "Web App · Rewrite",
    image: "/soulglobalv2/soulglobalv2brand.png",
    href: "/soulglobalv2"
  },
  {
    id: "clubinho",
    title: "Clubinho — Corações Preciosos",
    projectType: "Mobile App · Loyalty Platform",
    image: "/clubinho/clubinhocover.png",
    href: "/clubinho"
  },
  {
    id: "centralinteligencia",
    title: "Central de Inteligência",
    projectType: "Web App · Data Intelligence",
    image: "/centralinteligencia/map.png",
    href: "/centralinteligencia"
  },
  {
    id: "clearframe",
    title: "Clearframe",
    projectType: "Desktop SaaS",
    image: "/clearframe/clearframecover.png",
    href: "/clearframe"
  },
  {
    id: "bingx",
    title: "BingX Robot",
    projectType: "Web App · Trading",
    image: "/bingx/bingxcover.jpg",
    href: "/bingx"
  },
  {
    id: "autoframe",
    title: "Autoframe",
    projectType: "Web App",
    image: "/autoframe/autoframebrand.jpg",
    href: "/autoframe",
    isDisabled: true
  },
  {
    id: "meunu",
    title: "Meunu",
    projectType: "Web App",
    image: "/meunu/meunubrand.jpg",
    href: "/meunu",
  },
  {
    id: "soulglobal",
    title: "Soul Global",
    projectType: "Web App",
    image: "/soulglobal/soulglobalbrand.jpg",
    href: "/soulglobal"
  },
  {
    id: "oab",
    title: "OAB (Brazilian Bar Association)",
    projectType: "Landing Page",
    image: "/oab/oabvideo.mp4",
    href: "/oab"
  },
  {
    id: "stopbycafe",
    title: "Stop by Cafe",
    projectType: "Landing Page",
    image: "/stopbycafe/stopbycafe.mp4",
    href: "/stopbycafe"
  },
  {
    id: "mosaico",
    title: "Mosaico Genetica",
    projectType: "Landing Page",
    image: "/mosaico/mosaicobrand.jpg",
    href: "/mosaico"
  },
  {
    id: "pesqueiro110",
    title: "Pesqueiro 110",
    projectType: "Landing Page",
    image: "/pesqueiro110/pesqueiro110.mp4",
    href: "/pesqueiro110"
  },
  {
    id: "nihon",
    title: "Nihon",
    projectType: "Landing Page",
    image: "/nihon/nihon.jpg",
    href: "/nihon"
  }
];
