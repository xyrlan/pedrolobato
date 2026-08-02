"use client";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { mono, monoLower } from "./shared";

export type MapDetail = {
  title: string;
  summary: string;
  items: { name: string; meta?: string }[];
};

export type MapNodeSpec = {
  id: string;
  x: number;
  y: number;
  label: string;
  tag: string;
  /** "inherited" renders dimmed — work that exists in the system but wasn't mine. */
  kind?: "built" | "inherited";
};

export type MapEdgeSpec = [
  id: string,
  source: string,
  target: string,
  sourceHandle: string,
  targetHandle: string,
  label?: string
];

const SIDE = {
  t: Position.Top,
  r: Position.Right,
  b: Position.Bottom,
  l: Position.Left,
} as const;

function MapNode({ data, selected }: NodeProps) {
  const d = data as { label: string; tag: string; kind?: string };
  const inherited = d.kind === "inherited";
  return (
    <div
      className={`rounded-md border px-3 py-2 w-[150px] transition-colors ${
        selected
          ? "border-accent/60 bg-surface"
          : inherited
          ? "border-ink/12 border-dashed bg-transparent hover:border-ink/30"
          : "border-ink/18 bg-surface hover:border-ink/45"
      }`}
    >
      {(["t", "r", "b", "l"] as const).map((p) => (
        <span key={p}>
          <Handle
            type="source"
            id={`s-${p}`}
            position={SIDE[p]}
            style={{ opacity: 0, width: 1, height: 1, border: 0 }}
          />
          <Handle
            type="target"
            id={`t-${p}`}
            position={SIDE[p]}
            style={{ opacity: 0, width: 1, height: 1, border: 0 }}
          />
        </span>
      ))}
      <p
        className={`${mono} leading-tight ${
          selected ? "text-accent" : inherited ? "text-ink/40" : "text-ink/85"
        }`}
      >
        {d.label}
      </p>
      <p className={`${monoLower} ${inherited ? "text-ink/25" : "text-ink/42"}`}>
        {d.tag}
      </p>
    </div>
  );
}

const nodeTypes = { map: MapNode };

function buildEdge([id, source, target, sh, th, label]: MapEdgeSpec): Edge {
  return {
    id,
    source,
    target,
    sourceHandle: sh,
    targetHandle: th,
    label,
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 14,
      height: 14,
      color: "#55555c",
    },
    style: { stroke: "#55555c", strokeWidth: 1 },
    labelStyle: {
      fontSize: 9,
      fill: "#8b8b93",
      fontFamily: "var(--font-geist-mono), monospace",
      letterSpacing: ".06em",
    },
    labelBgStyle: { fill: "#141416" },
    labelBgPadding: [4, 2] as [number, number],
  };
}

export default function SystemMap({
  label,
  nodes,
  edges,
  details,
  initial,
  legend,
}: {
  label: string;
  nodes: MapNodeSpec[];
  edges: MapEdgeSpec[];
  details: Record<string, MapDetail>;
  initial: string;
  legend?: string;
}) {
  const [sel, setSel] = useState(initial);
  const detail = details[sel];

  const onNodeClick = useCallback((_: unknown, node: Node) => setSel(node.id), []);

  const rfNodes: Node[] = nodes.map((n) => ({
    id: n.id,
    position: { x: n.x, y: n.y },
    data: { label: n.label, tag: n.tag, kind: n.kind ?? "built" },
    type: "map",
  }));

  return (
    <div className="border border-ink/12 bg-ink/[.02] rounded-md overflow-hidden">
      <div className="px-4 pt-4 md:px-6 md:pt-6 flex items-baseline justify-between gap-3">
        <p className={`${mono} text-ink/46`}>{label}</p>
        <p className={`${monoLower} text-ink/42`}>tap a node · drag to pan</p>
      </div>

      <div className="h-[340px] md:h-[400px] mt-3">
        <ReactFlow
          nodes={rfNodes}
          edges={edges.map(buildEdge)}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.35}
          maxZoom={1.4}
          nodesDraggable={false}
          nodesConnectable={false}
          edgesFocusable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        >
          <Background color="#2a2a2e" gap={18} size={1} />
          <Controls showInteractive={false} position="bottom-right" />
        </ReactFlow>
      </div>

      {legend && (
        <p
          className={`${monoLower} text-ink/42 px-4 md:px-6 pb-3 pt-3 border-t border-ink/12`}
        >
          {legend}
        </p>
      )}

      <div
        className={`border-t border-ink/12 bg-surface px-4 py-4 md:px-6 md:py-5 ${
          legend ? "border-t-0" : ""
        }`}
      >
        <p className={`${mono} text-accent`}>{detail.title}</p>
        <p className={`${monoLower} text-ink/52 mt-1.5 max-w-[62ch]`}>
          {detail.summary}
        </p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {detail.items.map((it) => (
            <div key={it.name} className="flex items-baseline gap-2 min-w-0">
              <span className="text-ink/28 text-[10px] shrink-0">▸</span>
              <span className={`${monoLower} text-ink/80 shrink-0`}>{it.name}</span>
              {it.meta && (
                <span className={`${monoLower} text-ink/42 truncate`}>{it.meta}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
