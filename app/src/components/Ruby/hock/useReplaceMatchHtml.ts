export const useReplaceMatchHtml = (checkTarget: ICheckTarget): string => {
  if (!checkTarget.result) return ''
  if (checkTarget.result?.is_error) return checkTarget.result?.error_message || ''
  const html = escapeHTML(checkTarget.result?.message)    // must escape !!!
  return html
    .replace(/\{{{match_start}}}/g, '<strong>')
    .replace(/\{{{match_end}}}/g, '</strong>')
    .replace(/\n/g, '<br />')
}

const escapeHTML = (str?: string) => {
  if (!str) return ''
  return str.replace(/&/g, '&lt;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, "&#x27;");
}
