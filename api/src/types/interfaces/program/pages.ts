import { u32 } from 'https://deno.land/x/polkadot@0.2.16/types/mod.ts';

export interface IGearPages {
  [key: string]: Uint8Array;
}

export type WasmPageNumber = u32;
