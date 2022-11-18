import { u8aToHex } from 'https://deno.land/x/polkadot@0.2.16/util/mod.ts';
import { Keyring } from 'https://deno.land/x/polkadot@0.2.16/api/mod.ts';

import { Hex } from '../types/index.ts';

export function decodeAddress(publicKey: string): Hex {
  return u8aToHex(new Keyring().decodeAddress(publicKey));
}

export function encodeAddress(publicKeyRaw: string | Uint8Array): string {
  return new Keyring().encodeAddress(publicKeyRaw);
}
