import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';

import { Reason } from './common.ts';

export interface UserMessageReadRuntimeReason extends Enum {
  isMessageReplied: boolean;
  isMessageClaimed: boolean;
  asMessageReplied: Null;
  asMessageClaimed: Null;
}

export interface UserMessageReadSystemReason extends Enum {
  isOutOfRent: boolean;
  asOutOfRent: Null;
}

export type UserMessageReadReason = Reason<UserMessageReadRuntimeReason, UserMessageReadSystemReason>;
