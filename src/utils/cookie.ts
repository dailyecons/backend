import crypto from 'node:crypto';

const buf = crypto.randomBytes(64);

export function sign(value: string) {
  return `${value}.${crypto.createHmac('sha256', buf).update(value).digest('base64url')}`;
}

export function unsign(value: string) {
  const dotIdx = value.lastIndexOf('.');
  if (dotIdx === -1) return null;

  const originalValue = value.substring(0, dotIdx);

  const reSignBuf = sign(originalValue);
  return reSignBuf.length === value.length && crypto.timingSafeEqual(Buffer.from(reSignBuf), Buffer.from(value)) ? originalValue : null;
}
