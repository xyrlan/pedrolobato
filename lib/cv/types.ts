export interface CVLink {
  name: string;
  url: string;
}

export interface CVSkill {
  label: string;
  items: string;
}

export interface CVExperience {
  role: string;
  company: string;
  link?: string;
  mode: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface CVProject {
  name: string;
  what: string;
}

export interface CVEducation {
  course: string;
  school: string;
  place: string;
  period: string;
  note?: string;
}

export interface CV {
  name: string;
  title: string;
  location: string;
  pdf: string;
  links: CVLink[];
  skills: CVSkill[];
  experience: CVExperience[];
  projects: CVProject[];
  education: CVEducation[];
  /** Chrome around the content: section headings, buttons, page metadata. */
  ui: {
    metaTitle: string;
    metaDescription: string;
    downloadPdf: string;
    backToWork: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    /** Label of the link pointing at the other language. */
    otherLocale: string;
    otherLocaleHref: string;
  };
}

export type Locale = "en" | "pt";
