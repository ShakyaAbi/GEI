const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const isHtmlContent = (value: string) => HTML_TAG_PATTERN.test(value);

export const plainTextToHtml = (value: string) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return '';
  }

  return trimmedValue
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br />')}</p>`)
    .join('');
};

export const normalizeRichTextContent = (value: string) => {
  if (!value) {
    return '';
  }

  return isHtmlContent(value) ? value : plainTextToHtml(value);
};

export const getRichTextPlainText = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const hasMeaningfulRichText = (value: string) => getRichTextPlainText(value).length > 0;