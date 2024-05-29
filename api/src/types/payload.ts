import { AnyJson } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { Bytes } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';

export type PayloadType = Uint8Array | Bytes | AnyJson;
