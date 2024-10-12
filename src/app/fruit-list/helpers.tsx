export function groupBy<T extends Record<string, any>>(array: T[], field: keyof T): Record<string, T[]> {
  const groupedFruits = array.reduce((result, item) => {
    const key = item[field];
    result[key] = result[key] ?? [];
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
  return groupedFruits
}