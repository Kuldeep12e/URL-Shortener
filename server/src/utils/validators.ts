const codeRegex = /^[A-Za-z0-9]{6,8}$/;

export function isValidCode(code: string): boolean {
  return codeRegex.test(code);
}

export function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}
