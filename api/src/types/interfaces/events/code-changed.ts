import { Null, Enum, Option } from 'https://deno.land/x/polkadot@0.2.11/types/mod.ts';
import { BlockNumber } from 'https://deno.land/x/polkadot@0.2.11/types/interfaces/index.ts';

export interface CodeChangeKind extends Enum {
  isActive: boolean;
  isInactive: boolean;
  isReinstrumented: boolean;
  asActive: { expiration: Option<BlockNumber> };
  asInactive: Null;
  asReinstrumented: Null;
}
