import React, { useEffect, useState, useMemo } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const TOPOJSON_URL =
  "https://cdn.jsdelivr.net/gh/mesaugat/geoJSON-Nepal@master/nepal-districts.topojson";

const WORST_HIT = new Set(["Rasuwa"]);
const ALSO_AFFECTED = new Set(["Nuwakot", "Dhading", "Gorkha", "Chitwan"]);

const COLORS = {
  worst: "#A32D2D",
  worstHover: "#7a2121",
  affected: "#F09595",
  affectedHover: "#d67a7a",
  default: "#D3D1C7",
  defaultHover: "#b8b6ac",
  stroke: "#ffffff",
  labelText: "#4A1B0C",
};

interface NepalFloodMapProps {
  width?: number;
  height?: number;
  worstHit?: Set<string>;
  alsoAffected?: Set<string>;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showLegend?: boolean;
  legendStyle?: "inline" | "wrapped";
  legendOnly?: boolean;
  onlyAffected?: boolean;
}

export default function NepalFloodMap({
  width = 680,
  height = 340,
  worstHit = WORST_HIT,
  alsoAffected = ALSO_AFFECTED,
  interactive = true,
  className = "",
  style,
  showLegend = true,
  legendStyle = "wrapped",
  legendOnly = false,
  onlyAffected = false,
}: NepalFloodMapProps) {
  const [features, setFeatures] = useState<GeoJSON.Feature[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(TOPOJSON_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load map data: ${res.status}`);
        return res.json();
      })
      .then((topo: any) => {
        if (cancelled) return;
        const key = Object.keys(topo.objects)[0];
        const geo = feature(topo, topo.objects[key]);
        setFeatures(geo.features as GeoJSON.Feature[]);
      })
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  const { paths, labels } = useMemo(() => {
    if (!features) return { paths: [], labels: [] };

    let filteredFeatures = features;
    if (onlyAffected) {
      const affectedNames = new Set([...worstHit, ...alsoAffected]);
      filteredFeatures = features.filter((f) =>
        affectedNames.has((f.properties as any)?.name || f.id)
      );
    }

    const projection = geoMercator().fitExtent(
      [
        [10, 10],
        [width - 10, height - 10],
      ],
      { type: "FeatureCollection", features: filteredFeatures }
    );
    const pathGen = geoPath(projection);

    const paths = filteredFeatures.map((f) => {
      const name = (f.properties as any)?.name || f.id;
      const isWorst = worstHit.has(name);
      const isAffected = alsoAffected.has(name);
      let fill = COLORS.default;
      if (isWorst) fill = COLORS.worst;
      else if (isAffected) fill = COLORS.affected;
      return { name, d: pathGen(f)!, fill, isWorst, isAffected };
    });

    const labels = paths.map((p) => {
      const feature = filteredFeatures.find((f) => ((f.properties as any)?.name || f.id) === p.name);
      if (!feature) return null;
      const centroid = pathGen.centroid(feature);
      const isWorst = worstHit.has(p.name);
      const isAffected = alsoAffected.has(p.name);
      if (!isWorst && !isAffected) return null;
      return {
        name: p.name,
        x: centroid[0],
        y: centroid[1] - 4,
        fontSize: isWorst ? 12 : 10,
        fontWeight: isWorst ? 600 : 500,
      };
    }).filter(Boolean);

    return { paths, labels };
  }, [features, width, height, worstHit, alsoAffected, onlyAffected]);

  if (error) {
    return <p style={{ color: "#A32D2D", fontSize: 14 }}>{error}</p>;
  }

  if (!features) {
    return (
      <div style={{ width: "100%", height, display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        Loading map…
      </div>
    );
  }

  const getHoverFill = (name: string, baseFill: string) => {
    if (name === hoveredDistrict) {
      if (worstHit.has(name)) return COLORS.worstHover;
      if (alsoAffected.has(name)) return COLORS.affectedHover;
      return COLORS.defaultHover;
    }
    return baseFill;
  };

  const getHoverStroke = (name: string) => {
    return name === hoveredDistrict ? "#fff" : COLORS.stroke;
  };

  const getHoverStrokeWidth = (name: string) => {
    return name === hoveredDistrict ? 1.5 : 0.6;
  };

  return (
    <div className={className} style={{ width: "100%", ...style }}>
      {!legendOnly && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          role="img"
          aria-label="Interactive map of Nepal flood-affected districts. Hover a district to see its name."
          style={{ display: "block" }}
        >
          <title>Nepal flood-affected districts</title>
          {paths.map((p) => (
            <path
              key={p.name}
              d={p.d}
              fill={interactive ? getHoverFill(p.name, p.fill) : p.fill}
              stroke={interactive ? getHoverStroke(p.name) : COLORS.stroke}
              strokeWidth={interactive ? getHoverStrokeWidth(p.name) : 0.6}
              onMouseEnter={() => interactive && setHoveredDistrict(p.name)}
              onMouseLeave={() => interactive && setHoveredDistrict(null)}
              style={{
                cursor: interactive ? "pointer" : "default",
                transition: "fill 150ms ease, stroke 150ms ease, stroke-width 150ms ease",
                filter: hoveredDistrict && hoveredDistrict !== p.name ? "brightness(0.7)" : "none",
              }}
            >
              <title>{p.name}</title>
            </path>
          ))}
          {labels.map((l) => (
            <text
              key={l.name}
              x={l.x}
              y={l.y}
              textAnchor="middle"
              fontSize={l.fontSize}
              fontWeight={l.fontWeight}
              fill={COLORS.labelText}
              paintOrder="stroke"
              stroke="#ffffff"
              strokeWidth={3}
              pointerEvents="none"
            >
              {l.name}
            </text>
          ))}
        </svg>
      )}

      {!interactive && showLegend && (
        <div
          style={{
            display: "flex",
            flexWrap: legendStyle === "inline" ? "nowrap" : "wrap",
            gap: legendStyle === "inline" ? 24 : 16,
            marginTop: 12,
            padding: "10px 12px",
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
            fontSize: 12,
            color: "#555",
            alignItems: "center",
            overflowX: legendStyle === "inline" ? "auto" : "visible",
          }}
        >
          <Legend color={COLORS.worst} label="Rasuwa — worst-hit district" />
          <Legend color={COLORS.affected} label="Also affected (Nuwakot, Dhading, Gorkha, Chitwan)" />
          <Legend color={COLORS.default} label="Other districts" />
        </div>
      )}
      {interactive && showLegend && (
        <div
          style={{
            display: "flex",
            flexWrap: legendStyle === "inline" ? "nowrap" : "wrap",
            gap: legendStyle === "inline" ? 24 : 16,
            marginTop: 8,
            padding: "8px 12px",
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
            fontSize: 12,
            color: "#555",
            alignItems: "center",
            overflowX: legendStyle === "inline" ? "auto" : "visible",
          }}
        >
          <Legend color={COLORS.worst} label="Rasuwa — worst-hit district" />
          <Legend color={COLORS.affected} label="Also affected (Nuwakot, Dhading, Gorkha, Chitwan)" />
          <Legend color={COLORS.default} label="Other districts" />
        </div>
      )}
      {interactive && hoveredDistrict && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            background: "#1a1a19",
            color: "#fff",
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 500,
            display: "inline-block",
            animation: "fadeIn 150ms ease",
          }}
        >
          {hoveredDistrict}
          {worstHit.has(hoveredDistrict) && " — Worst-hit district"}
          {alsoAffected.has(hoveredDistrict) && " — Also affected"}
        </div>
      )}

      {!interactive && showLegend && (
        <div
          style={{
            display: "flex",
            flexWrap: legendStyle === "inline" ? "nowrap" : "wrap",
            gap: legendStyle === "inline" ? 24 : 16,
            marginTop: 12,
            fontSize: 12,
            color: "#555",
            alignItems: "center",
            overflowX: legendStyle === "inline" ? "auto" : "visible",
          }}
        >
          <Legend color={COLORS.worst} label="Rasuwa — worst-hit district" />
          <Legend color={COLORS.affected} label="Also affected (Nuwakot, Dhading, Gorkha, Chitwan)" />
          <Legend color={COLORS.default} label="Other districts" />
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
      {label}
    </span>
  );
}