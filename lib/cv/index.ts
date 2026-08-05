import { en } from "./en";
import { pt } from "./pt";
import type { CV, Locale } from "./types";

export type { CV, Locale };

export const cvByLocale: Record<Locale, CV> = { en, pt };

/** The English CV stays the default export path, so `@/lib/cv` keeps working. */
export const cv = en;
