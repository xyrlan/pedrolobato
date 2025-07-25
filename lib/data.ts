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
    title: "Soul global",
    period: "2024 - Present",
    description: "Building a platform for importing containers products from China to Brazil in a simple and efficient way."
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
