"use client";
import dynamic from "next/dynamic";

// Only /soulglobalv2 uses these today — keep them out of the chunk every
// project page loads.
const SgEventFlow = dynamic(() => import("./SgEventFlow"));
const SgMigration = dynamic(() => import("./SgMigration"));
const SgTaxCascade = dynamic(() => import("./SgTaxCascade"));
const SgTenancy = dynamic(() => import("./SgTenancy"));
// React Flow measures the DOM to lay itself out — client only. The placeholder
// reserves the same height so nothing shifts when it mounts.
const MnSystemMap = dynamic(() => import("./MnSystemMap"), {
  ssr: false,
  loading: () => (
    <div className="border border-ink/12 bg-ink/[.02] rounded-md h-[540px] md:h-[600px]" />
  ),
});
const MnRealtime = dynamic(() => import("./MnRealtime"));
const MnStock = dynamic(() => import("./MnStock"));
const MnStripe = dynamic(() => import("./MnStripe"));
const CiClassMap = dynamic(() => import("./CiClassMap"), {
  ssr: false,
  loading: () => (
    <div className="border border-ink/12 bg-ink/[.02] rounded-md h-[540px] md:h-[600px]" />
  ),
});
const CiGeoJsonPipeline = dynamic(() => import("./CiGeoJsonPipeline"));
const CiStaleGuard = dynamic(() => import("./CiStaleGuard"));
const CbSystemMap = dynamic(() => import("./CbSystemMap"), {
  ssr: false,
  loading: () => (
    <div className="border border-ink/12 bg-ink/[.02] rounded-md h-[540px] md:h-[600px]" />
  ),
});
const SgSystemMap = dynamic(() => import("./SgSystemMap"), {
  ssr: false,
  loading: () => (
    <div className="border border-ink/12 bg-ink/[.02] rounded-md h-[540px] md:h-[600px]" />
  ),
});

export type DiagramKey =
  | "sg-system-map"
  | "cb-system-map"
  | "mn-system-map"
  | "mn-realtime"
  | "mn-stock"
  | "mn-stripe"
  | "ci-class-map"
  | "ci-geojson-pipeline"
  | "ci-stale-guard"
  | "sg-event-flow"
  | "sg-tax-cascade"
  | "sg-tenancy"
  | "sg-migration";

export function renderDiagram(key: DiagramKey) {
  switch (key) {
    case "sg-system-map":
      return <SgSystemMap />;
    case "cb-system-map":
      return <CbSystemMap />;
    case "mn-system-map":
      return <MnSystemMap />;
    case "mn-realtime":
      return <MnRealtime />;
    case "mn-stock":
      return <MnStock />;
    case "mn-stripe":
      return <MnStripe />;
    case "ci-class-map":
      return <CiClassMap />;
    case "ci-geojson-pipeline":
      return <CiGeoJsonPipeline />;
    case "ci-stale-guard":
      return <CiStaleGuard />;
    case "sg-event-flow":
      return <SgEventFlow />;
    case "sg-tax-cascade":
      return <SgTaxCascade />;
    case "sg-tenancy":
      return <SgTenancy />;
    case "sg-migration":
      return <SgMigration />;
    default:
      return null;
  }
}
