import { Tuple } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';
import { BlockNumber } from 'https://deno.land/x/polkadot@0.2.15/types/interfaces/index.ts';
import { Interval, StoredDispatch } from './base.ts';

export interface WaitlistItem extends Tuple {
  0: StoredDispatch,
  1: Interval<BlockNumber>
}
