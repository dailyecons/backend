import { Byte } from '@bit-js/byte';
import { sign, unsign } from './cookie';

// Parse a cookie token
export const parse = Byte.handle((ctx) => {
  const cookie = ctx.req.headers.get('Cookie');

  if (cookie !== null) {
    const startIdx = cookie.indexOf('token=') + 6;
    if (startIdx !== 5) {
      const endIdx = cookie.indexOf(';', startIdx);
      return endIdx === -1 ? cookie.substring(startIdx) : cookie.substring(startIdx, endIdx);
    }
  }

  ctx.status = 404;
  return ctx.body(null);
});

// Parse and unsign the cookie
export const parseUnsign = Byte.handle((ctx) => {
  const cookie = ctx.req.headers.get('Cookie');

  if (cookie !== null) {
    const startIdx = cookie.indexOf('token=') + 6;
    if (startIdx !== 5) {
      const endIdx = cookie.indexOf(';', startIdx);
      const originalValue = unsign(endIdx === -1 ? cookie.substring(startIdx) : cookie.substring(startIdx, endIdx));

      if (originalValue !== null) return originalValue;
    }
  }

  ctx.status = 404;
  return ctx.body(null);
});

export function serialize(token: string) {
  return `token=${token}; HttpOnly`;
}

export function serializeSign(token: string) {
  return `token=${sign(token)}; HttpOnly`;
}
