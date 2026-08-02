import ProjectPage from "@/components/ProjectPage";

export default function CentralInteligencia() {
  const data = {
    title: "Central de Inteligência (TerraLogs)",
    description:
      "A geospatial intelligence platform where the hard engineering is entirely in the browser — an object-oriented layer engine over Google Maps.",
    articleImage: "/centralinteligencia/map.png",
    content:
      "TerraLogs turns large geospatial datasets into an interactive map: rural properties, territories, environmental areas and mining processes, drilled from national scope down to a single município. This is a front-end-only role, which usually means the interesting problems live elsewhere — here they did not. Rendering thousands of features across five rendering strategies, keeping them consistent while filters change faster than requests resolve, and doing it without freezing the tab, needed a real architecture. I own that engine; a second engineer works alongside me on the product.",
    role: ["Front-End Engineer", "Map Architecture"],
    tools: [
      "Vue 3",
      "Quasar",
      "TypeScript",
      "TanStack Query",
      "Google Maps API",
      "Supercluster",
      "Turf.js",
      "ECharts",
    ],
    integrations: ["Google Maps", "AWS Cognito (OIDC)", "OpenAPI REST backend"],
    duration: "2025 - Present",
    features: [
      {
        title: "An OO layer engine, not a pile of map callbacks",
        description:
          "4.4k lines of pure TypeScript under src/core, with no Vue in it. Layers are declared as data — including their click handlers, as typed string keys into a registry — and a factory picks one of five implementations behind a single ILayerType contract. Adding a rendering strategy is a new subclass and one switch case.",
        visual: "ci-class-map" as const,
      },
      {
        title: "GeoJSON: eight stages between the API and a click",
        description:
          "The pipeline exists because the naive version fails quietly. Google's Data layer fires no events on a GeometryCollection, so every one is expanded into standalone features that keep the parent's id and properties — otherwise clicks simply stop working, with no error anywhere to point at.",
        visual: "ci-geojson-pipeline" as const,
      },
      {
        title: "Filters change faster than requests resolve",
        description:
          "Changing município mid-flight aborts the old request, but aborting is not enough — the response can still arrive. Every payload is revalidated against the current filters after the await and discarded if the scope moved, with the same guard mirrored on the error path so a stale 404 never surfaces over data you are actually looking at.",
        visual: "ci-stale-guard" as const,
      },
      {
        title: "Selection rules as a pure function",
        description:
          "Five interacting rules — single, special, drill-down, exclusive, default — resolved in fixed precedence by toggle(id, activeSet) → Set. No map, no network, no framework, including the inverted case where deactivating a parent activates its children. Pure by design, so the behaviour stays testable instead of scattering across components.",
      },
      {
        title: "Keeping the main thread alive",
        description:
          "GeoJSON is frozen before it reaches reactive state so Vue never builds deep proxies over thousands of features; every Google object is markRaw'd; clustering culls to the viewport and re-renders only on idle; and switching visualization modes yields to the browser between teardown steps rather than blocking straight through them.",
      },
      {
        title: "Two domains, one engine",
        description:
          "The same core drives AGRO — verified and estimated properties, irrigation pivots, indigenous and quilombola territories, protected areas — and MineraLogs, over ANM mining processes with phase, holder and opportunity ranking. They differ by configuration, not by code.",
      },
    ],
  };
  return <ProjectPage data={data} />;
}
