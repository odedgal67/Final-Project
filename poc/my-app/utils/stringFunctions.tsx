export function truncate_with_dots(str: string, len: number): string {
  if (str.length > len) {
    return str.substring(0, len - 3) + "...";
  }
  return str;
}
