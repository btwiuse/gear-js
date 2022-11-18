import { Tuple } from 'https://deno.land/x/polkadot@0.2.16/types/mod.ts';
import { BlockNumber } from 'https://deno.land/x/polkadot@0.2.16/types/interfaces/index.ts';
import { Interval, StoredMessage } from './base.ts';

export interface MailboxItem extends Tuple {
  0: StoredMessage,
  1: Interval<BlockNumber>
}
