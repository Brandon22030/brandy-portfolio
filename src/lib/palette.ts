export const projectAccents = [
  "#4338ca",
  "#059669",
  "#d97706",
  "#e11d48",
  "#0891b2",
] as const;

export function projectAccent(index: number) {
  return projectAccents[index % projectAccents.length];
}

export function projectGradient(index: number) {
  const from = projectAccents[index % projectAccents.length];
  const to = projectAccents[(index + 2) % projectAccents.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}
