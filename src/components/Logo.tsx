import { useId } from "react";

/**
 * The Brightlant mark.
 *
 * `onDark` swaps the near-black wedge for a light one. On the black footer and the
 * chat header the default wedge disappears into the background, which leaves the
 * mark reading as a thin blue sliver rather than the logo.
 *
 * The gradient ids come from useId() because the mark renders three times on a
 * page. Duplicate SVG ids all resolve to the first match in the document, so a
 * second variant would silently inherit the first one's colours.
 */
export function Logo({
  className = "h-9 w-auto",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const a = `blt-a-${uid}`;
  const b = `blt-b-${uid}`;

  return (
    <svg
      viewBox="0 0 46 40"
      // shrink-0 always: an SVG with w-auto is a flex item with no width basis, so
      // any tight flex row squashes the mark down to a sliver.
      className={`shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={a} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fd4ff" />
          <stop offset="1" stopColor="#0a63d6" />
        </linearGradient>
        <linearGradient id={b} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f8fef" />
          <stop offset="1" stopColor="#0b3f91" />
        </linearGradient>
      </defs>
      <path d="M4 3 L22 3 L40 20 L23 20 Z" fill={`url(#${a})`} />
      <path d="M4 20 L23 20 L40 20 L22 37 L4 37 Z" fill={`url(#${b})`} />
      <path d="M4 3 L4 37 L15 27 L15 13 Z" fill={onDark ? "#e9f0fc" : "#0a2a63"} />
    </svg>
  );
}
