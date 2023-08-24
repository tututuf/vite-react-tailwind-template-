export function getResource(name: string) {
  return new URL(`../assets/${name}`, import.meta.url).href
}