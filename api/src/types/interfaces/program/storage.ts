import { H256 } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';
import { u32 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';

export interface PausedProgramBlockAndHash {
  blockNumber: u32;
  hash: H256;
}
