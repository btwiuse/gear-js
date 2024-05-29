import { toHex } from './toHex.ts';

import { StorageKey, Vec } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { AnyTuple } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';

export const GPROG = 'g::prog::';
export const GPAGES = 'g::pages::';
export const GPROG_HEX = toHex(GPROG);
export const GPAGES_HEX = toHex(GPAGES);

export function getIdsFromKeys(keys: Vec<StorageKey<AnyTuple>>, prefix: string): HexString[] {
  return keys.map((key) => '0x' + key.toHex().slice(prefix.length)) as HexString[];
}
