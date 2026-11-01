/**
 * Picks the pre-generated size of a project image (see
 * scripts/make-responsive-images.mjs). next/image builds the srcset from this,
 * so each screen downloads only what it needs. Everything else, such as logos,
 * is already small and is served as it is.
 */
export default function imageLoader({ src, width }: { src: string; width: number }): string {
  const match = src.match(/^\/images\/projects\/(.+)-4k\.webp$/);
  return match ? `/images/projects/responsive/${match[1]}-${width}.webp` : src;
}
