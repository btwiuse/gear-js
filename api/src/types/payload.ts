import { Hex } from './common.ts';
import { Bytes } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';
import { AnyJson } from 'https://deno.land/x/polkadot@0.2.17/types/types/index.ts';

export type PayloadType = Hex | Uint8Array | string | Bytes | AnyJson;
