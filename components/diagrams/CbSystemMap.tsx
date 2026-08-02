"use client";
import SystemMap, { type MapDetail, type MapEdgeSpec, type MapNodeSpec } from "./SystemMap";

const NODES: MapNodeSpec[] = [
  { id: "app", x: 0, y: 150, label: "expo app", tag: "39 screens" },
  { id: "redeapoio", x: 240, y: 30, label: "rede de apoio", tag: "prayer network" },
  { id: "clubzz", x: 240, y: 150, label: "clubzz", tag: "points ledger" },
  { id: "marketplace", x: 240, y: 270, label: "marketplace", tag: "redemption" },
  { id: "push", x: 480, y: 30, label: "push", tag: "expo push api" },
  { id: "db", x: 720, y: 150, label: "postgres", tag: "64 entities" },
  {
    id: "billing",
    x: 240,
    y: 410,
    label: "billing core",
    tag: "inherited",
    kind: "inherited",
  },
  {
    id: "erp",
    x: 480,
    y: 410,
    label: "erp · fulfillment",
    tag: "inherited",
    kind: "inherited",
  },
];

const EDGES: MapEdgeSpec[] = [
  ["e1", "app", "redeapoio", "s-r", "t-l"],
  ["e2", "app", "clubzz", "s-r", "t-l"],
  ["e3", "app", "marketplace", "s-r", "t-l"],
  ["e4", "redeapoio", "push", "s-r", "t-l", "digest · urgency"],
  ["e5", "push", "app", "s-t", "t-t", "expo push"],
  ["e6", "marketplace", "clubzz", "s-t", "t-b", "debits lots"],
  ["e7", "redeapoio", "db", "s-r", "t-t"],
  ["e8", "clubzz", "db", "s-r", "t-l"],
  ["e9", "marketplace", "db", "s-r", "t-l"],
  ["e10", "billing", "clubzz", "s-l", "t-l", "plan reward"],
  ["e11", "app", "billing", "s-b", "t-l", "reads · change card"],
  ["e12", "billing", "db", "s-r", "t-b"],
  ["e13", "erp", "db", "s-r", "t-b"],
];

const DETAILS: Record<string, MapDetail> = {
  app: {
    title: "Expo mobile app",
    summary:
      "The subscriber-facing product: one React Native codebase for iOS and Android, shipped through EAS to a base of over 12,000 active subscribers.",
    items: [
      { name: "39 screens · 22.6k LOC", meta: "Expo SDK 54 · RN 0.81" },
      { name: "onboarding · first access", meta: "account provisioned just in time" },
      { name: "subscription · shipments", meta: "reads the inherited billing core" },
      { name: "change-card WebView", meta: "signed, expiring token" },
      { name: "referral · wallet · store", meta: "the loyalty surface" },
      { name: "rede de apoio · madrugada", meta: "community + offline audio" },
    ],
  },
  redeapoio: {
    title: "Rede de Apoio · prayer network",
    summary:
      "A community support module handling genuinely sensitive text. The privacy constraints drove the architecture, not the other way around.",
    items: [
      { name: "text never in a push payload", meta: "and never written to logs" },
      { name: "automatic risk triage", meta: "blocks publication, routes to CVV 188" },
      { name: "versioned consent", meta: "90-day retention" },
      { name: "no AI text reaches a subscriber", meta: "hard product rule" },
      { name: "batch distribution", meta: "ordered to spread fatigue" },
      { name: "1:1 chat · moderation queue", meta: "admin panel pages" },
    ],
  },
  clubzz: {
    title: "Clubzz · points as a lot ledger",
    summary:
      "Points are not an integer on a row. Each award is a lot with its own lifecycle, so an expiry or a reversal touches only the lot that earned it.",
    items: [
      { name: "pendente → aprovada", meta: "awarded, not yet spendable" },
      { name: "→ reservada", meta: "held while a redemption is pending" },
      { name: "→ debitada", meta: "spent" },
      { name: "expirada · anulada", meta: "aged out or reversed" },
      { name: "plan rewards", meta: "credited off the billing cycle" },
      { name: "expiry cron", meta: "daily at 04:00" },
    ],
  },
  marketplace: {
    title: "Redemption marketplace",
    summary:
      "Reward redemption kept deliberately separate from the purchase order tables, so a redemption can never be mistaken for a sale.",
    items: [
      { name: "idx_mr_pending_unique", meta: "partial unique index" },
      { name: "(client_id, product_id)", meta: "WHERE status = 'pending'" },
      { name: "double-click is a DB error", meta: "not a race the API has to win" },
      { name: "reserves clubzz lots", meta: "debited only on approval" },
      { name: "operator approval queue", meta: "panel page" },
    ],
  },
  push: {
    title: "Push infrastructure",
    summary:
      "Expo Push API with the delivery details that only show up at scale — batching, dead-token pruning and cadence control.",
    items: [
      { name: "chunked 100 per batch", meta: "Expo's ticket limit" },
      { name: "DeviceNotRegistered", meta: "prunes uninstalled devices" },
      { name: "broadcasts", meta: "targeted from the panel" },
      { name: "digest every 15 min", meta: "urgency sweep every 5 min" },
    ],
  },
  db: {
    title: "PostgreSQL · TypeORM",
    summary:
      "One shared database across the whole product. I added 30 of the 90 migrations, all scoped to the modules I own.",
    items: [
      { name: "64 entities · 90 migrations", meta: "PostgreSQL 17" },
      { name: "clubzz_lots", meta: "the points ledger" },
      { name: "marketplace_requests", meta: "partial unique index" },
      { name: "prayer_* tables", meta: "requests, threads, responses" },
      { name: "push_token · push_broadcast", meta: "device registry" },
      { name: "wallet_transactions · referrals", meta: "loyalty ledger" },
    ],
  },
  billing: {
    title: "Billing core — inherited",
    summary:
      "Built by other engineers before and alongside me. I integrated with it; I did not write it. Included here because it is what makes the loyalty layer meaningful.",
    items: [
      { name: "AppMax v3", meta: "no native recurrence — the platform re-charges" },
      { name: "daily recurrence cron", meta: "mutex + dunning" },
      { name: "what I touched", meta: "reading subscription state from the app" },
      { name: "change-card flow", meta: "app side only" },
    ],
  },
  erp: {
    title: "ERP & fulfillment — inherited",
    summary:
      "The physical side of a subscription box: kit preparation, invoices and shipment tracking. Also built by others.",
    items: [
      { name: "kit → production → invoice", meta: "Tiny NF" },
      { name: "shipment ingestion", meta: "spreadsheet + label-photo OCR" },
      { name: "my involvement", meta: "shipments screen in the app" },
    ],
  },
};

export default function CbSystemMap() {
  return (
    <SystemMap
      label="What I built, and what I built it on"
      nodes={NODES}
      edges={EDGES}
      details={DETAILS}
      initial="clubzz"
      legend="Solid nodes are mine. Dashed nodes are the inherited billing and fulfillment system I integrated with — built by other engineers on the team."
    />
  );
}
