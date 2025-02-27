// src/components/ui/world-map.js
import { useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }) {
  const svgRef = useRef(null);

  // Initialize DottedMap with error handling
  let svgMap;
  try {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    svgMap = map.getSVG({
      radius: 0.22,
      color: "#00000040",
      shape: "circle",
      backgroundColor: "transparent", // Match Login's bg-gray-900
    });
  } catch (error) {
    console.error("Error generating map SVG:", error);
    svgMap = "";
  }

  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] bg-transparent relative font-sans overflow-hidden">
      {svgMap ? (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full pointer-events-none select-none opacity-80"
          alt="world map"
          style={{ height: "100%", width: "100%" }}
          draggable={false}
        />
      ) : (
        <p className="text-white">Map failed to load</p>
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots
          .filter(
            (dot) =>
              dot.start?.lat && dot.start?.lng && dot.end?.lat && dot.end?.lng
          )
          .map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <g key={`path-group-${i}`}>
                <motion.path
                  d={createCurvedPath(startPoint, endPoint)}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
                />
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2.5"
                  fill={lineColor}
                />
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2.5"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2.5"
                    to="10"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2.5"
                  fill={lineColor}
                />
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2.5"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2.5"
                    to="10"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default WorldMap;
