import { cv } from "@/lib/cv";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pedro Lobato — CV",
  description:
    "Curriculum vitae of Pedro Lobato, software engineer working on import logistics, durable workflows and product interfaces.",
};

const caption = "caption text-ink/42";

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-start-1 col-end-13 md:col-start-5 md:col-end-13 lg:col-end-12 mb-10">
      <p className={`${caption} pb-2 mb-5 border-b border-ink/12`}>{label}</p>
      {children}
    </div>
  );
}

export default function CV() {
  return (
    <main className="min-h-[70vh]">
      <section className="cv-grid w-full grid grid-cols-12 grid-gap relative z-10 max-w-[1800px] my-8 md:my-12">
        {/* sticky identity column */}
        <div className="col-span-full md:col-end-4 md:top-[6em] md:sticky mb-10 md:mb-0 self-start">
          <h1 className="mb-1 h1">{cv.name}</h1>
          <p className={`${caption} text-ink/62`}>{cv.title}</p>
          <p className={`${caption} mt-0.5`}>{cv.location}</p>

          <a
            href={cv.pdf}
            download
            className={`${caption} group mt-6 flex items-center gap-2 text-ink/80 bg-ink/[.06] hover:bg-ink/12 hover:text-ink rounded-md p-4 transition-colors print:hidden`}
          >
            Download PDF
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 ml-auto stroke-[2.5px] stroke-ink/40 group-hover:stroke-ink"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>

          <div className="mt-6 flex flex-col gap-1">
            {cv.links.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target={l.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`${caption} text-ink/62 hover:text-accent transition-colors`}
              >
                {l.name}
              </a>
            ))}
          </div>

          <Link
            href="/"
            className={`${caption} mt-6 inline-block text-ink/42 hover:text-accent transition-colors print:hidden`}
          >
            ← Back to work
          </Link>
        </div>

        <Section label="Skills">
          <div className="flex flex-col gap-2.5">
            {cv.skills.map((s) => (
              <div key={s.label} className="grid grid-cols-12 gap-x-3">
                <p className={`${caption} col-span-12 sm:col-span-3`}>{s.label}</p>
                <p className="col-span-12 sm:col-span-9 text-ink/80">{s.items}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Experience">
          <div className="flex flex-col gap-10">
            {cv.experience.map((e) => (
              <div key={e.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="h2">{"✶ " + e.role}</h2>
                  <p className={caption}>
                    {e.mode} · {e.period}
                  </p>
                </div>
                <p className={`${caption} text-ink/62 mt-1.5`}>
                  {e.link ? (
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </p>
                <p className="text-ink/52 mt-2">{e.summary}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {e.bullets.map((b, n) => (
                    <li key={n} className="flex gap-2.5">
                      <span className="text-accent/70 shrink-0 leading-relaxed">▸</span>
                      <span className="text-ink/80 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Selected side projects">
          <div className="flex flex-col gap-4">
            {cv.projects.map((p) => (
              <div key={p.name} className="grid grid-cols-12 gap-x-3">
                <p className={`${caption} col-span-12 sm:col-span-3 text-ink/72`}>
                  {p.name}
                </p>
                <p className="col-span-12 sm:col-span-9 text-ink/80">{p.what}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="Education">
          <div className="flex flex-col gap-4">
            {cv.education.map((ed) => (
              <div key={ed.school}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="text-ink/90">{ed.course}</p>
                  <p className={caption}>{ed.period}</p>
                </div>
                <p className={`${caption} text-ink/62 mt-0.5`}>
                  {ed.school} · {ed.place}
                </p>
                {ed.note && <p className={`${caption} mt-0.5`}>{ed.note}</p>}
              </div>
            ))}
          </div>
        </Section>
      </section>
    </main>
  );
}
