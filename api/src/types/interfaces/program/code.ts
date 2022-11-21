import { Codec } from 'https://deno.land/x/polkadot@0.2.17/types-codec/types/index.ts';
import { H256 } from 'https://deno.land/x/polkadot@0.2.17/types/interfaces/index.ts';
import { u8, u32, Option, BTreeSet, Vec } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';
import { WasmPageNumber } from './pages.ts';
import { DispatchKind } from '../message/index.ts';

export interface CodeMetadata extends Codec {
  author: H256;
  blockNumber: u32;
}

export interface InstrumentedCode extends Codec {
  code: Vec<u8>;
  exports: BTreeSet<DispatchKind>;
  staticPages: WasmPageNumber;
  version: u32;
}

export type CodeStorage = Option<InstrumentedCode>;
