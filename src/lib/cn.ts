/**
 * Minimal class-name joiner. Deliberately dependency-free: the site has no
 * conditional-variant explosion that would justify clsx + tailwind-merge.
 */
export type ClassValue = string | number | false | null | undefined | ClassValue[]

export function cn(...values: ClassValue[]): string {
  const out: string[] = []
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return
    if (Array.isArray(v)) {
      v.forEach(walk)
      return
    }
    out.push(String(v))
  }
  values.forEach(walk)
  return out.join(' ')
}
