/**
 * Common helper functions
 */

/**
 * Copies text to user clipboard with a promise.
 * @param {string} text
 * @returns {Promise<boolean>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

/**
 * Creates an encoded mailto URL with prefilled parameters.
 * @param {string} email
 * @param {string} subject
 * @param {string} body
 * @returns {string}
 */
export function createMailtoLink(email, subject = '', body = '') {
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encSubject}&body=${encBody}`;
}
