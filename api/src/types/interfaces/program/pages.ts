import { u32 } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';

export interface IGearPages {
  [key: string]: Uint8Array;
}

export type WasmPageNumber = u32;
