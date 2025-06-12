function capitalizeFirstLetter(string: string): string {
  if (!string) return "";
  const result = string.charAt(0).toUpperCase() + string.slice(1);
  return result || string || "";
}

export default capitalizeFirstLetter;
