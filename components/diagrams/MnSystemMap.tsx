"use client";
import SystemMap, { type MapDetail, type MapEdgeSpec, type MapNodeSpec } from "./SystemMap";

const NODES: MapNodeSpec[] = [
  { id: "storefront", x: 0, y: 0, label: "storefront", tag: "customer · enforce" },
  { id: "tableqr", x: 0, y: 95, label: "table qr", tag: "customer · enforce" },
  { id: "pos", x: 0, y: 190, label: "manual pos", tag: "merchant" },
  { id: "mp", x: 0, y: 285, label: "mp webhook", tag: "already captured" },
  { id: "whatsapp", x: 0, y: 380, label: "whatsapp", tag: "merchant" },
  { id: "create", x: 260, y: 190, label: "createPedido", tag: "one entry point" },
  { id: "tx", x: 520, y: 90, label: "transaction", tag: "all or nothing" },
  { id: "post", x: 520, y: 290, label: "post-commit", tag: "isolated try/catch" },
  { id: "db", x: 780, y: 190, label: "postgres", tag: "prisma · tenantId" },
];

const EDGES: MapEdgeSpec[] = [
  ["e1", "storefront", "create", "s-r", "t-l"],
  ["e2", "tableqr", "create", "s-r", "t-l"],
  ["e3", "pos", "create", "s-r", "t-l"],
  ["e4", "mp", "create", "s-r", "t-l"],
  ["e5", "whatsapp", "create", "s-r", "t-l"],
  ["e6", "create", "tx", "s-r", "t-l"],
  ["e7", "create", "post", "s-r", "t-l"],
  ["e8", "tx", "db", "s-r", "t-t", "commit"],
  ["e9", "post", "db", "s-r", "t-b", "best effort"],
];

const DETAILS: Record<string, MapDetail> = {
  create: {
    title: "createPedidoFromPayload — one door",
    summary:
      "Five channels create orders. They converge on a single function rather than five near-identical code paths, because the invariants — tenant isolation, item snapshots, stock, notifications — have to hold identically for all of them.",
    items: [
      { name: "5 channels, 1 entry point", meta: "no duplicated order logic" },
      { name: "channel decides enforcement", meta: "passed in, not inferred" },
      { name: "catalog is authoritative", meta: "client prices are never trusted" },
      { name: "notifyMerchant ≠ notifyCustomer", meta: "kept separate on purpose" },
    ],
  },
  tx: {
    title: "Inside the transaction",
    summary:
      "Everything that must be true together, or not at all. If stock runs out on the last item, the order and its items roll back with it.",
    items: [
      { name: "Pedidos row", meta: "the order itself" },
      { name: "OrderItem[]", meta: "name + price snapshots" },
      { name: "conditional stock decrement", meta: "enforce channels only" },
      { name: "merchant WhatsAppOutbox", meta: "queued, not sent" },
    ],
  },
  post: {
    title: "After the commit — best effort",
    summary:
      "Everything that must not be able to destroy an order that already exists. Each step is wrapped in its own try/catch; a printer that is offline cannot fail a sale.",
    items: [
      { name: "non-enforce stock", meta: "clamps instead of failing" },
      { name: "PrinterOutbox", meta: "enqueued for the agent" },
      { name: "customer confirmation", meta: "notification, not a blocker" },
      { name: "the invariant", meta: "a failure here never rolls back the order" },
    ],
  },
  storefront: {
    title: "Storefront — customer ordering",
    summary:
      "Public per-subdomain store. The customer is choosing; refusing an out-of-stock item here is correct and expected.",
    items: [
      { name: "enforceStock: true", meta: "shortage → 409, order rolls back" },
      { name: "delivery fee re-derived", meta: "server-side, 1-cent epsilon" },
      { name: "fails closed", meta: "missing coords → expected fee 0" },
      { name: "ISR menu", meta: "revalidated whenever stock moves" },
    ],
  },
  tableqr: {
    title: "Table QR — dine-in",
    summary:
      "Scanning a table's QR opens the menu bound to that table, so orders attach to the table's tab without an app or an account.",
    items: [
      { name: "enforceStock: true", meta: "same reasoning as the storefront" },
      { name: "Table → Card → Pedidos", meta: "tab and bar comanda" },
      { name: "service percentage", meta: "per table, Decimal(12,2)" },
    ],
  },
  pos: {
    title: "Manual POS — merchant entry",
    summary:
      "The owner ringing up a sale at the counter. Here the owner is the source of truth about what is physically on the shelf.",
    items: [
      { name: "enforceStock: false", meta: "clamps to zero, never refuses" },
      { name: "origin: MERCHANT_MANUAL", meta: "distinguishable in reports" },
      { name: "why not enforce", meta: "blocking a real sale is the worse error" },
    ],
  },
  mp: {
    title: "Mercado Pago webhook",
    summary:
      "The order is created after the money is already captured — which inverts the stock decision entirely.",
    items: [
      { name: "enforceStock: false", meta: "refusing would leave a paid ghost" },
      { name: "assertStockAvailable()", meta: "read-only check BEFORE charging" },
      { name: "known TOCTOU race", meta: "documented — the alternative is worse" },
      { name: "mpPaymentId @unique", meta: "webhook idempotency" },
    ],
  },
  whatsapp: {
    title: "WhatsApp channel",
    summary:
      "Orders that arrive over WhatsApp, migrated to the Cloud API. Outbound messages are queued in an outbox inside the order transaction.",
    items: [
      { name: "WhatsAppOutbox", meta: "written in the transaction, sent after" },
      { name: "notificationChannel", meta: "whatsapp | plataforma" },
      { name: "Cloud API migration", meta: "documented as its own effort" },
    ],
  },
  db: {
    title: "PostgreSQL · Prisma",
    summary:
      "Row-level multi-tenancy on a tenantId discriminator, with isolation enforced at the API boundary rather than trusted from the URL.",
    items: [
      { name: "prefixed ids", meta: "tnt_ usr_ ped_ prd_ com_ — generated in PG" },
      { name: "withMerchantAuth", meta: "path userId must match the session" },
      { name: "tenantId derived", meta: "handlers never read it from the request" },
      { name: "Decimal(12,2)", meta: "all new money columns" },
      { name: "expand migration", meta: "string money and Decimal twins coexist" },
    ],
  },
};

export default function MnSystemMap() {
  return (
    <SystemMap
      label="Five order channels, one transaction boundary"
      nodes={NODES}
      edges={EDGES}
      details={DETAILS}
      initial="create"
      legend="The channel is what decides whether running out of stock should refuse the sale — so it is passed in as a parameter rather than guessed inside the order logic."
    />
  );
}
