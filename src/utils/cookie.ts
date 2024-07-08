import { randomBytes } from 'node:crypto';
import KeySigner from '@bit-js/ncrypt/key-signer';
import CookieSigner from '@bit-js/ncrypt/cookie-signer';

export default new CookieSigner(new KeySigner(randomBytes(64)));

