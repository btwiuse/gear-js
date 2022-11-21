import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';
import { MessageId } from '../ids/index.ts';

export interface Entry extends Enum {
  isInit: boolean;
  isHandle: boolean;
  isReply: boolean;
  asInit: Null;
  asHandle: Null;
  asReply: MessageId;
}

export type DispatchKind = Entry
