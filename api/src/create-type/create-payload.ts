import { Codec } from 'https://deno.land/x/polkadot@0.2.16/types/types/index.ts';
import { isHex, isU8a, u8aToHex } from 'https://deno.land/x/polkadot@0.2.16/util/mod.ts';

import { Hex } from '../types/index.ts';
import { CreateType } from './CreateType.ts';

export function createPayload(payload: unknown, type: string, types: Hex | Uint8Array): Hex | Uint8Array | Codec {
  if (payload === undefined) {
    return '0x';
  }
  if (isHex(payload)) {
    return payload;
  }
  if (isU8a(payload)) {
    return u8aToHex(payload);
  }
  return CreateType.create(type, payload, types).toHex();
}
