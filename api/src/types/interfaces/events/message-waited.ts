import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';

import { Reason } from './common.ts';

export interface MessageWaitedRuntimeReason extends Enum {
  isWaitCalled: boolean;
  asWaitCalled: Null;
}

export interface MessageWaitedSystemReason extends Enum {
  isProgramIsNotInitialized: boolean;
  asProgramIsNotInitialized: Null;
}

export type MessageWaitedReason = Reason<MessageWaitedRuntimeReason, MessageWaitedSystemReason>;
