import CvView from "@/components/CvView";
import { cvByLocale } from "@/lib/cv";
import type { Metadata } from "next";

const cv = cvByLocale.pt;

export const metadata: Metadata = {
  title: cv.ui.metaTitle,
  description: cv.ui.metaDescription,
  alternates: {
    canonical: "/cv/pt",
    languages: { "en": "/cv", "pt-BR": "/cv/pt" },
  },
};

export default function CVPt() {
  return (
    <div lang="pt-BR">
      <CvView cv={cv} />
    </div>
  );
}
