/**
 * Indian-market formatting helpers. Prices in this market are read in crore
 * and lakh, not millions, so a plain Intl currency format is unhelpful.
 */

const CRORE = 10_000_000;
const LAKH = 100_000;

/** 24_500_000 -> "₹2.45 Cr" ; 9_000_000 -> "₹90 L" */
export function formatPrice(rupees: number | null): string | null {
  if (rupees === null || !Number.isFinite(rupees)) return null;

  if (rupees >= CRORE) {
    const cr = rupees / CRORE;
    // Two decimals below 10 Cr, one above — matches how listings are written.
    const value = cr >= 10 ? cr.toFixed(1) : cr.toFixed(2);
    return `₹${stripTrailingZeros(value)} Cr`;
  }

  if (rupees >= LAKH) {
    return `₹${stripTrailingZeros((rupees / LAKH).toFixed(2))} L`;
  }

  return `₹${new Intl.NumberFormat("en-IN").format(rupees)}`;
}

function stripTrailingZeros(value: string): string {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

/** [1470, 1860] -> "1,470 – 1,860 sq ft" */
export function formatArea(range: [number, number] | null): string | null {
  if (!range) return null;
  const [min, max] = range;
  const nf = new Intl.NumberFormat("en-IN");
  return min === max
    ? `${nf.format(min)} sq ft`
    : `${nf.format(min)} – ${nf.format(max)} sq ft`;
}

/** ["Studio", "2.5 BHK", "3 BHK"] -> "Studio, 2.5 & 3 BHK" is too clever; keep it plain. */
export function formatConfigurations(configs: string[]): string | null {
  return configs.length ? configs.join(", ") : null;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/** Joins class names, dropping falsy values. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
