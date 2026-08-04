/**
 * Renders every locale in lib/cv to its own PDF under public/cv/.
 *
 * Run with:  bun run cv:pdf
 *
 * This is a real PDF layout, not a print of the web page — react-pdf paginates
 * the flow itself, so entries break between bullets instead of mid-line and
 * there is no empty grid gutter on later pages.
 */
import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
  renderToFile,
} from "@react-pdf/renderer";
import React from "react";
import { cvByLocale, type CV } from "../lib/cv";

const INK = "#ededed";
const BG = "#0b0b0c";
const ACCENT = "#a3e635";
const dim = (o: number) => `rgba(237,237,237,${o})`;

Font.registerHyphenationCallback((word) => [word]);

/**
 * The built-in Helvetica is WinAnsi-encoded and has no U+2192, which renders as
 * a stray apostrophe. Em dash and ellipsis are in WinAnsi, so only the arrow
 * needs rewriting — and "->" reads correctly in the technical lines that use it.
 */
const pdfText = (t: string) => t.replace(/→/g, "->");

const s = StyleSheet.create({
  page: {
    backgroundColor: BG,
    color: INK,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 8.4,
    lineHeight: 1.38,
  },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: -0.5, lineHeight: 1.15 },
  title: { fontSize: 9, color: dim(0.6), marginTop: 5 },
  contacts: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 7 },
  contact: { fontSize: 8, color: dim(0.55) },

  sectionLabel: {
    fontSize: 7.5,
    letterSpacing: 1.1,
    color: dim(0.42),
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: dim(0.14),
  },
  section: { marginTop: 12 },

  skillRow: { flexDirection: "row", marginBottom: 2 },
  skillLabel: { width: 92, color: dim(0.45), fontSize: 8 },
  skillValue: { flex: 1, color: dim(0.85) },

  entry: { marginBottom: 9 },
  entryHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  role: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  period: { fontSize: 7.5, color: dim(0.5) },
  company: { fontSize: 8.5, color: ACCENT, marginTop: 2 },
  summary: { color: dim(0.6), marginTop: 3, marginBottom: 1, fontStyle: "italic" },

  bullet: { flexDirection: "row", marginTop: 3 },
  bulletMark: { width: 9, color: dim(0.35), fontSize: 8 },
  bulletText: { flex: 1, color: dim(0.88) },

  projectRow: { flexDirection: "row", marginBottom: 6 },
  projectName: { width: 92, color: INK, fontFamily: "Helvetica-Bold", fontSize: 8.5 },
  projectWhat: { flex: 1, color: dim(0.8) },

  eduRow: { marginBottom: 6 },
  eduHead: { flexDirection: "row", justifyContent: "space-between" },
  eduCourse: { fontSize: 9, color: dim(0.92) },
  eduMeta: { fontSize: 8, color: dim(0.5), marginTop: 1 },
});

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      <Text style={s.sectionLabel}>{label.toUpperCase()}</Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.bulletMark}>–</Text>
      <Text style={s.bulletText}>{pdfText(children)}</Text>
    </View>
  );
}

function CVDocument({ cv }: { cv: CV }) {
  return (
    <Document
      title={cv.ui.metaTitle}
      author={cv.name}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={s.page}>
        {/* header */}
        <View>
          <Text style={s.name}>{cv.name}</Text>
          <Text style={s.title}>
            {cv.title} · {cv.location}
          </Text>
          <View style={s.contacts}>
            {cv.links.map((l) => (
              <Text key={l.name} style={s.contact}>
                {l.name}
              </Text>
            ))}
          </View>
        </View>

        <Section label={cv.ui.skills}>
          {cv.skills.map((k) => (
            <View key={k.label} style={s.skillRow} wrap={false}>
              <Text style={s.skillLabel}>{k.label}</Text>
              <Text style={s.skillValue}>{pdfText(k.items)}</Text>
            </View>
          ))}
        </Section>

        <Section label={cv.ui.experience}>
          {cv.experience.map((e) => (
            <View key={e.company} style={s.entry}>
              {/* The header block stays glued to its first lines; the bullets
                  below are free to flow onto the next page, so an entry that
                  does not fit whole never leaves a third of a page blank. */}
              <View minPresenceAhead={46}>
                <View style={s.entryHead}>
                  <Text style={s.role}>{e.role}</Text>
                  <Text style={s.period}>
                    {e.mode} · {e.period}
                  </Text>
                </View>
                <Text style={s.company}>{e.company}</Text>
                <Text style={s.summary}>{pdfText(e.summary)}</Text>
              </View>
              {e.bullets.map((b, n) => (
                <Bullet key={n}>{b}</Bullet>
              ))}
            </View>
          ))}
        </Section>

        <Section label={cv.ui.projects}>
          {cv.projects.map((p) => (
            <View key={p.name} style={s.projectRow} minPresenceAhead={40}>
              <Text style={s.projectName}>{p.name}</Text>
              <Text style={s.projectWhat}>{pdfText(p.what)}</Text>
            </View>
          ))}
        </Section>

        <Section label={cv.ui.education}>
          {cv.education.map((ed) => (
            <View key={ed.school} style={s.eduRow} wrap={false}>
              <View style={s.eduHead}>
                <Text style={s.eduCourse}>{ed.course}</Text>
                <Text style={s.period}>{ed.period}</Text>
              </View>
              <Text style={s.eduMeta}>
                {ed.school} · {ed.place}
                {ed.note ? ` · ${ed.note}` : ""}
              </Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}

/* The output path is the one the page links to, so it comes from the CV itself
   rather than being repeated here. */
for (const cv of Object.values(cvByLocale)) {
  const out = `public${cv.pdf}`;
  await renderToFile(<CVDocument cv={cv} />, out);
  console.log(`wrote ${out}`);
}
