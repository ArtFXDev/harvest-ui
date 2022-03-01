/**
 * Shorten a name by removing underscores and making an acronym
 * It also removes underscores
 * Ex: WHAT_ABOUT_COOKING -> WAC
 */
export function shortenName(name: string) {
  if (!name) return "";

  if (name.length > 15) {
    return name
      .split("_")
      .map((t) => t[0])
      .join("");
  }

  return name.replaceAll("_", " ");
}
