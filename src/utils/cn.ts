/**
 * Lightweight className utility — joins truthy strings.
 * Avoids a full clsx dependency for simple usage.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}
