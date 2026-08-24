export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}
