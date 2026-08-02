"use client";
import SystemMap, { type MapDetail, type MapEdgeSpec, type MapNodeSpec } from "./SystemMap";

const NODES: MapNodeSpec[] = [
  { id: "service", x: 0, y: 165, label: "LayerService", tag: "façade · 724 loc" },
  { id: "toggle", x: 240, y: 0, label: "LayerToggleLogic", tag: "pure state machine" },
  { id: "orchestrator", x: 240, y: 110, label: "DataOrchestrator", tag: "fetch lifecycle" },
  { id: "url", x: 240, y: 220, label: "UrlResolver", tag: "filters → url" },
  { id: "scope", x: 240, y: 330, label: "ScopeManager", tag: "brasil→uf→município" },
  { id: "factory", x: 490, y: 110, label: "LayerTypeFactory", tag: "type → class" },
  { id: "base", x: 730, y: 110, label: "BaseLayerManager", tag: "abstract" },
  { id: "geojson", x: 970, y: 0, label: "GeoJsonLayer", tag: "625 loc" },
  { id: "cluster", x: 970, y: 110, label: "ClusterLayer", tag: "supercluster" },
  { id: "raster", x: 970, y: 220, label: "tiles · wms · heatmap", tag: "3 classes" },
];

const EDGES: MapEdgeSpec[] = [
  ["e1", "service", "toggle", "s-r", "t-l"],
  ["e2", "service", "orchestrator", "s-r", "t-l"],
  ["e3", "service", "scope", "s-r", "t-l"],
  ["e4", "orchestrator", "url", "s-b", "t-t"],
  ["e5", "orchestrator", "factory", "s-r", "t-l"],
  ["e6", "factory", "base", "s-r", "t-l", "instantiates"],
  ["e7", "base", "geojson", "s-r", "t-l", "extends"],
  ["e8", "base", "cluster", "s-r", "t-l"],
  ["e9", "base", "raster", "s-r", "t-l"],
];

const DETAILS: Record<string, MapDetail> = {
  service: {
    title: "LayerService · the reconciler",
    summary:
      "Owns active layer ids, filters and zoom, and runs syncMapState() — a reconcile loop that computes the visibility every layer should have, then attaches or detaches only the ones that disagree.",
    items: [
      { name: "shouldBeVisible", meta: "selected && withinZoom && scopeValid" },
      { name: "early return", meta: "no-op when it already matches" },
      { name: "Promise.allSettled", meta: "one slow layer can't block the rest" },
      { name: "watchDebounced 300ms", meta: "filters change in bursts" },
      { name: "yieldToBrowser()", meta: "scheduler.yield() between teardown steps" },
      { name: "hasActiveDescendants", meta: "parent hides when a child is on" },
    ],
  },
  toggle: {
    title: "LayerToggleLogic · pure state machine",
    summary:
      "toggle(id, activeSet) → new Set. No map, no network, no Vue — which is why five interacting selection rules stay testable instead of turning into scattered if-statements in components.",
    items: [
      { name: "1 · single", meta: "removes siblings and their descendants" },
      { name: "2 · special", meta: "additive, survives exclusive wipes" },
      { name: "3 · drill-down", meta: "deactivating a parent activates its children" },
      { name: "4 · exclusive", meta: "clears everything non-special" },
      { name: "5 · default", meta: "adds recursively with sublayers" },
      { name: "LayerCountResolver", meta: "auto-opens the first non-empty sibling" },
    ],
  },
  orchestrator: {
    title: "LayerDataOrchestrator",
    summary:
      "Where the race conditions live. Keeps an in-flight promise, an AbortController and a URL snapshot per layer, so a filter change mid-flight can never paint stale geometry.",
    items: [
      { name: "url changed mid-flight", meta: "abort + reset layer immediately" },
      { name: "post-fetch revalidation", meta: "re-resolve url, discard if it moved" },
      { name: "mirrored on the error path", meta: "a stale 404 never toasts" },
      { name: "cancellation normalised", meta: "AbortError · CanceledError · ERR_CANCELED" },
      { name: "guarded cleanup", meta: "only if the controller is still current" },
      { name: "Object.freeze(geojson)", meta: "no Vue proxies over 1000s of features" },
    ],
  },
  url: {
    title: "UrlResolver",
    summary:
      "Turns a declarative layer config plus the active filters and geographic scope into a request URL, with a strategy per layer family.",
    items: [
      { name: "config + filters + scope", meta: "→ one canonical url" },
      { name: "urlIdOverride", meta: "config-level escape hatch" },
      { name: "doubles as identity", meta: "the orchestrator diffs on this string" },
    ],
  },
  scope: {
    title: "ScopeManager",
    summary:
      "Watches the geographic drill — brasil → uf → município — and reconciles which layers may even exist at the current level.",
    items: [
      { name: "supportedScopes", meta: "declared per layer" },
      { name: "auto-deactivate", meta: "layer invalid at the new scope" },
      { name: "auto-reactivate", meta: "restored on the way back up" },
      { name: "reset on url change", meta: "hands stale layers to the orchestrator" },
    ],
  },
  factory: {
    title: "LayerTypeFactory",
    summary:
      "One switch on layer.config.type. Adding a sixth rendering strategy means a new subclass and one case — no changes anywhere in the calling code.",
    items: [
      { name: "geojson · cluster", meta: "vector" },
      { name: "heatmap", meta: "google.maps.visualization" },
      { name: "tiles · wms", meta: "raster overlays" },
      { name: "returns ILayerType", meta: "callers never see the concrete class" },
    ],
  },
  base: {
    title: "BaseLayerManager · abstract",
    summary:
      "Every subclass implements attach / detach / isVisible / getLayerType, and inherits the same five-step attach template plus validation and structured logging.",
    items: [
      { name: "logAttachStart", meta: "→ validate → build → attach → success" },
      { name: "validateDataResponse", meta: "also the state mutation point" },
      { name: "validateNotAlreadyAttached", meta: "double-attach is a no-op, not a bug" },
      { name: "updateSelectedId?()", meta: "optional — restyles without re-adding" },
    ],
  },
  geojson: {
    title: "GeoJsonLayer",
    summary:
      "The heaviest subclass: everything between a raw API response and a styled, clickable google.maps.Data layer.",
    items: [
      { name: "GeometryCollection expansion", meta: "Google fires no events on them" },
      { name: "hit-test gating", meta: "polygons don't swallow pin clicks" },
      { name: "local filter strategies", meta: "supply chain · titular · fase" },
      { name: "featureFilter", meta: "sublayer renders a subset, no 2nd request" },
      { name: "style closure per feature", meta: "selection · geometry · opportunity" },
      { name: "dejitterCollocatedPoints", meta: "spirals overlapping pins apart" },
    ],
  },
  cluster: {
    title: "ClusterLayer",
    summary:
      "Supercluster over the viewport bbox, re-rendered only on map idle. Co-authored with the other engineer on the team.",
    items: [
      { name: "radius 140", meta: "maxZoom depends on the mode" },
      { name: "custom map/reduce", meta: "cluster inherits 'has opportunity'" },
      { name: "viewport culling", meta: "only visible clusters become markers" },
      { name: "zIndex 1000 + count", meta: "bigger clusters sit on top" },
      { name: "createFakeDataFeature", meta: "markers reuse the Data handler API" },
    ],
  },
  raster: {
    title: "Tiles · WMS · Heatmap",
    summary:
      "The three lighter subclasses, all pushing into map.overlayMapTypes or the visualization library.",
    items: [
      { name: "TilesLayer", meta: "XYZ via ImageMapType" },
      { name: "WmsLayer", meta: "hand-rolled tile → EPSG:3857 bbox" },
      { name: "HeatmapLayer", meta: "{lat,lng,weight}[]" },
      { name: "index-searched removal", meta: "overlayMapTypes has no keys" },
    ],
  },
};

export default function CiClassMap() {
  return (
    <SystemMap
      label="src/core — the layer engine"
      nodes={NODES}
      edges={EDGES}
      details={DETAILS}
      initial="base"
      legend="Layers are declared as data; the factory picks an implementation per type. Adding a rendering strategy touches one switch and one new subclass."
    />
  );
}
