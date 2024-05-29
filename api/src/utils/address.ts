import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';
import { Keyring } from 'https://deno.land/x/polkadot@0.2.45/api/index.ts';
import { u8aToHex } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';

export function decodeAddress(publicKey: string): HexString {
  return u8aToHex(new Keyring().decodeAddress(publicKey));
}

export function encodeAddress(publicKeyRaw: string | Uint8Array): string {
  return new Keyring().encodeAddress(publicKeyRaw);
}
