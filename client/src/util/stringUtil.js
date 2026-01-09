export function getInitials(username, letters = 2) {
  if (!username) return "";

  // Trim and normalize
  const name = username.trim();

  // Case 1: Name contains spaces (multiple words)
  if (name.includes(" ")) {
    return name
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, letters)
      .toUpperCase();
  }

  // Case 2: CamelCase name
  const camelMatches = name.match(/[A-Z][a-z]*|^[a-z]+/g);
  if (camelMatches && camelMatches.length > 1) {
    return camelMatches
      .map((word) => word[0])
      .join("")
      .slice(0, letters)
      .toUpperCase();
  }

  // Case 3: Single word
  return name.slice(0, letters).toUpperCase();
}
