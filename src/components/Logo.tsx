import Image from "next/image";

/**
 * The Brightlant logo, straight from the supplied artwork.
 *
 * `mark` drops the wordmark and renders the chevron alone — for the chat avatar,
 * where the lockup would be unreadable at 24px and the panel already says the
 * brand name underneath it.
 *
 * `onDark` swaps in the lightened artwork. The navy in the original disappears
 * into the black footer and chat header, which leaves the logo reading as a thin
 * cyan sliver rather than the mark.
 */
const ART = {
  "logo": { w: 518, h: 159 },
  "logo-light": { w: 518, h: 159 },
  "logo-mark": { w: 123, h: 159 },
  "logo-mark-light": { w: 123, h: 159 },
} as const;

export function Logo({
  className = "h-9 w-auto",
  onDark = false,
  mark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  mark?: boolean;
  priority?: boolean;
}) {
  const name = `logo${mark ? "-mark" : ""}${onDark ? "-light" : ""}` as keyof typeof ART;
  const { w, h } = ART[name];

  return (
    <Image
      src={`/${name}.png`}
      alt="Brightlant"
      width={w}
      height={h}
      priority={priority}
      // shrink-0 always: an image with w-auto is a flex item with no width basis,
      // so any tight flex row squashes the logo down to a sliver.
      className={`shrink-0 ${className}`}
    />
  );
}
