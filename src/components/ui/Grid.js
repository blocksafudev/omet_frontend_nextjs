import { useId, useState, useEffect } from "react";

export const Grid = ({ pattern, size, bgclass = "blue" }) => {
  const [p, setP] = useState(pattern);

  useEffect(() => {
    if (!pattern) {
      setP([
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
      ]);
    }
  }, [pattern]);

  const isCustomColor = bgclass.startsWith("#") || bgclass.startsWith("rgb");

  const getBackgroundClasses = () => {
    if (bgclass === "black") {
      return "absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-gray-100/30 to-gray-300/30 dark:from-gray-900/30 dark:to-gray-900/30 opacity-100";
    } else if (bgclass === "gradeaaa") {
      return "absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-blue-ribbon-100/30 to-blue-ribbon-300/30 dark:from-blue-ribbon-900/30 dark:to-blue-ribbon-900/30 opacity-100";
    } else if (bgclass === "gradeccc") {
      return "absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-yellow-100/30 to-yellow-300/30 dark:from-yellow-900/30 dark:to-yellow-900/30 opacity-100";
    } else {
      return `absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-red-100/30 to-red-300/30 dark:from-red-900/30 dark:to-red-900/30 opacity-100`;
    }
  };

  const getSvgClasses = () => {
    if (bgclass === "black") {
      return "absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10";
    } else if (bgclass === "gradeaaa") {
      return "absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-gradeaaa/10 fill-gradeaaa/10";
    } else if (bgclass === "gradeccc") {
      return "absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-gradeccc/10 fill-gradeccc/10";
    } else {
      return `absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-gradeddd/10 fill-gradeddd/10`;
    }
  };

  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-36 -mt-0 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div
        className={`${getBackgroundClasses()}`}
        style={isCustomColor ? { background: bgclass } : {}}
      >
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className={`${getSvgClasses()}`}
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
