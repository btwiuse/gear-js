import { Tuple } from 'https://deno.land/x/polkadot@0.2.11/types/mod.ts';
import { BlockNumber } from 'https://deno.land/x/polkadot@0.2.11/types/interfaces/index.ts';
import { Interval, StoredDispatch } from './base.ts';

export interface WaitlistItem extends Tuple {
  0: StoredDispatch,
  1: Interval<BlockNumber>
}
