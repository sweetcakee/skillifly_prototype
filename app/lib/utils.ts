export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function daysAgo(iso?: string) {
  if (!iso) return 999;
  const t = new Date(iso).getTime();
  const now = Date.now();
  return Math.floor((now - t) / (1000 * 60 * 60 * 24));
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
