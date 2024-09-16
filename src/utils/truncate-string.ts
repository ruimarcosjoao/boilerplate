export function truncateString(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) {
    return str;
  }

  const firstChars = str.substring(0, maxLength / 2);
  const lastChars = str.substring(str.length - maxLength / 2);
  return `${firstChars}....${lastChars}`;
}
