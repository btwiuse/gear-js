import { Null, Enum } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';
import { BlockNumber, H256 } from 'https://deno.land/x/polkadot@0.2.17/types/interfaces/index.ts';

export interface ProgramChangedKind extends Enum {
  isActive: boolean;
  isInactive: boolean;
  isPaused: boolean;
  asActive: { expiration: BlockNumber };
  asInactive: Null;
  asPaused: {
    code_hash: H256;
    memory_hash: H256;
    waitlist_hash: H256;
  };
}
