import crypto from 'node:crypto';

const buf = Buffer.alloc(64);

// Load the buffer with random values
{
  const res = Promise.withResolvers();

  crypto.randomFill(buf, (err) => {
    if (err === null) res.resolve();
    else res.reject(err);
  });

  await res.promise;
}

// Setup a HMAC instance 
const hmac = crypto.createHmac('sha256', buf);

export function sign(value: string) {
  return `${value}.${hmac.update(value).digest('base64url')}`;
}

export function unsign(value: string) {
  const dotIdx = value.lastIndexOf('.');
  if (dotIdx === -1) return null;

  const originalValue = value.substring(0, dotIdx);

  const reSignBuf = sign(originalValue);
  return reSignBuf.length === value.length && crypto.timingSafeEqual(Buffer.from(reSignBuf), Buffer.from(value)) ? originalValue : null;
}
