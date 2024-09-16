import { Byte } from '@bit-js/byte';
import { randomBytes } from 'node:crypto';
import KeySigner from '@bit-js/ncrypt/key-signer';
import CookieSigner from '@bit-js/ncrypt/cookie-signer';

const signer = new CookieSigner(new KeySigner(randomBytes(64)));

// Parse and unsign the cookie
export const parseUnsign = Byte.handle((ctx) => {
  const value = ctx.req.headers.get('Authorization');

  if (value !== null) {
    const originalValue = signer.unsign(value);
    if (originalValue !== null) return originalValue;
  }

  ctx.status = 401;
  return ctx.end();
});

export function signToken(token: string) {
  return signer.sign(token);
}
