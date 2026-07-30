/**
 * Escape untrusted text before embedding it in HTML email templates.
 * Prevents HTML injection in transactional mail bodies.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character] ?? character;
  });
}

/**
 * Convert plain text newlines to HTML line breaks after escaping.
 */
export function textToHtml(value: string): string {
  return escapeHtml(value).replaceAll('\n', '<br />');
}
