"use client";

import styles from "./BuilderCanvas.module.css";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import DatabaseNode from "./nodes/DatabaseNode";
import { useEffect } from "react";
import {
  sampleNeo4jConfig,
  samplePostgreSQLConfig,
} from "@/interface/database/sampleConfig";
import ServerNode from "./nodes/ServerNode";
import {
  sampleAxumConfig,
  sampleNestConfig,
} from "@/interface/server/sampleConfig";
import {
  sampleNextConfig,
  sampleReactConfig,
} from "@/interface/web/sampleConfig";
import WebNode from "./nodes/WebNode";
import StorageNode from "./nodes/StorageNode";
import DesktopNode from "./nodes/DesktopNode";
import MobileNode from "./nodes/MobileNode";
import image2 from "@/asset/images/image2.png";
import Image from "next/image";

interface defaultNodeDataType {
  name: string;
}

const initialNodes = [
  {
    id: "node-1",
    type: "database",
    position: { x: 0, y: 0 },
    data: sampleNeo4jConfig as defaultNodeDataType,
  },
  {
    id: "node-2",
    type: "database",
    position: { x: 250, y: 0 },
    data: samplePostgreSQLConfig as defaultNodeDataType,
  },
  {
    id: "node-3",
    type: "server",
    position: { x: 125, y: 250 },
    data: sampleNestConfig as defaultNodeDataType,
  },
  {
    id: "node-6",
    type: "server",
    position: { x: 125, y: 500 },
    data: sampleAxumConfig as defaultNodeDataType,
  },
  {
    id: "node-4",
    type: "web",
    position: { x: 0, y: 500 },
    data: sampleReactConfig as defaultNodeDataType,
  },
  {
    id: "node-5",
    type: "web",
    position: { x: 250, y: 500 },
    data: sampleNextConfig as defaultNodeDataType,
  },
  {
    id: "node-7",
    type: "desktop",
    position: { x: 0, y: 250 },
    data: { name: "Desktop" },
  },
  {
    id: "node-8",
    type: "mobile",
    position: { x: 250, y: 250 },
    data: { name: "Mobile" },
  },
  {
    id: "node-9",
    type: "storage",
    position: { x: 0, y: 750 },
    data: { name: "Storage" },
  },
];

const nodeTypes = {
  database: DatabaseNode,
  server: ServerNode,
  web: WebNode,
  storage: StorageNode,
  desktop: DesktopNode,
  mobile: MobileNode,
};

export default function BuilderCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (params: any) => {
    setEdges((edges) => [
      ...edges,
      {
        id: `edge-${edges.length}`,
        source: params.source,
        target: params.target,
      },
    ]);
  };

  return (
    <main className={styles.main}>
      <div className={styles.background}>
        <Image src={image2} alt="bg" />
      </div>
      <div className={styles.canvas}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll
          selectionOnDrag
          panOnDrag={[1, 2]}
          selectionMode={SelectionMode.Partial}
          snapToGrid
          snapGrid={[20, 20]}
          proOptions={{
            hideAttribution: true,
          }}
          fitView
        >
          <Background
            gap={20}
            variant={BackgroundVariant.Lines}
            lineWidth={0.4}
          />
          <Controls />
        </ReactFlow>
      </div>
    </main>
  );
}
