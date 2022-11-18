import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.16/types/mod.ts';
import { Reason } from './common.ts';

export interface MessageWokenRuntimeReason extends Enum {
  isWakeCalled: boolean;
  asWakeCalled: Null;
}

export interface MessageWokenSystemReason extends Enum {
  isProgramGotInitialized: boolean;
  isTimeoutHasCome: boolean;
  isOutOfRent: boolean;
  asProgramGotInitialized: Null;
  asTimeoutHasCome: Null;
  asOutOfRent: Null;
}

export type MessageWokenReason = Reason<MessageWokenRuntimeReason, MessageWokenSystemReason>;
