import { signatureVerify } from 'https://deno.land/x/polkadot@0.2.45/util-crypto/index.ts';

export function signatureIsValid(publicKey: string, signature: string, message: string) {
  return signatureVerify(message, signature, publicKey).isValid;
}
