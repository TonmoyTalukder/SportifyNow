import React, { useEffect, useState, useMemo } from "react";
import ReactFlow, { Node, Edge, Background, Position } from "reactflow";
import { motion } from "framer-motion";
import "reactflow/dist/style.css";
import "./HowItWorks.css"; // For additional styling
import { edgeTypes } from "./CustomEdgeTypes"; // Import the edge types

// Define the structure of a node
interface CustomNode extends Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type?: "input" | "output" | "default";
}

const proOptions = { hideAttribution: true };

const HowItWorks: React.FC = () => {
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [edges] = useState<Edge[]>([
    { id: "e1-2", source: "1", target: "2", type: "custom", animated: true },
    { id: "e2-3", source: "2", target: "3", type: "custom", animated: true },
    { id: "e3-4", source: "3", target: "4", type: "custom", animated: true },
    { id: "e4-5", source: "4", target: "5", type: "custom", animated: true },
    { id: "e4-6", source: "4", target: "6", type: "custom", animated: true },
    { id: "e5-6", source: "5", target: "6", type: "custom", animated: true },
  ]);

  useEffect(() => {
    // Function to set responsive node positions
    const updateNodePositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setNodes([
        {
          id: "1",
          position: { x: isMobile ? width * 0.15 : width * 0.15, y: height * 0.1 },
          data: { label: "Select Sport" },
          type: "input",
          sourcePosition: Position.Bottom,
        },
        {
          id: "2",
          position: { x: width * 0.5, y: height * 0.2 },
          data: { label: "Slot Availability Search" },
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
        {
          id: "3",
          position: { x: width * 0.6, y: isMobile ? height * 0.4 : height * 0.3 },
          data: { label: "Slot Choosing" },
          targetPosition: Position.Right,
          sourcePosition: Position.Left,
        },
        {
          id: "4",
          position: { x: width * 0.3, y: isMobile ? height * 0.5 : height * 0.4 },
          data: { label: "Book Slot" },
          targetPosition: Position.Left,
          sourcePosition: Position.Bottom,
        },
        {
          id: "5",
          position: { x: width * 0.65, y: isMobile ? height * 0.6 : height * 0.5 },
          data: { label: "Login if Not Logged In" },
          targetPosition: Position.Left,
          sourcePosition: Position.Right,
        },
        {
          id: "6",
          position: { x: width * 0.4, y: isMobile ? height * 0.75 : height * 0.65 },
          data: { label: "Complete Payment" },
          targetPosition: Position.Top,
          type: "output",
        },
      ]);
    };

    // Update node positions on window resize
    window.addEventListener("resize", updateNodePositions);

    // Initial call
    updateNodePositions();

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateNodePositions);
  }, [isMobile]);

  const customNodeStyles: React.CSSProperties = {
    border: "2px solid #e0e0e0",
    padding: "10px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
  };

  const customEdgeStyles: React.CSSProperties = {
    strokeWidth: 2,
    stroke: "#9e9e9e",
    strokeDasharray: "5 5",
  };

  const memoizedEdgeTypes = useMemo(() => edgeTypes, []);

  return (
    <div style={{ width: "99vw", marginTop: "5vh" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ width: "100%", height: isMobile ? "98vh" : "80vh" }}
      >
        <ReactFlow
          nodes={nodes.map((node) => ({
            ...node,
            data: {
              label: <div style={customNodeStyles}>{node.data.label}</div>,
            },
          }))}
          edges={edges.map((edge) => ({
            ...edge,
            type: "custom",
            style: customEdgeStyles,
          }))}
          edgeTypes={memoizedEdgeTypes}
          nodesDraggable={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          preventScrolling={false}
          proOptions={proOptions}
        >
          <Background />
        </ReactFlow>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
