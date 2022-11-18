import { u8, u32, u64, u128, i32, Option, Vec, Struct, BTreeMap, BTreeSet } from 'https://deno.land/x/polkadot@0.2.16/types/mod.ts';
import { AccountId32 } from 'https://deno.land/x/polkadot@0.2.16/types/interfaces/index.ts';
import { Codec } from 'https://deno.land/x/polkadot@0.2.16/types/types/index.ts';

import { MessageId, ProgramId } from '../ids/index.ts';
import { DispatchKind } from './entry.ts';

export type ExitCode = i32;

export type Payload = Vec<u8>;

export interface ReplyDetails extends Struct {
  replyTo: MessageId;
  exitCode: ExitCode;
}

export interface Message extends Codec {
  id: MessageId;
  source: ProgramId;
  destination: AccountId32;
  payload: Vec<u8>;
  gas_limit: u64;
  value: u128;
  reply: Option<ReplyDetails>;
}

export type UserMessageSentMessage = Omit<Message, 'gas_limit'>;

export type StoredMessage = Omit<Message, 'gas_limit'>;

export interface ContextStore extends Struct {
  outgoing: BTreeMap<u32, Option<Payload>>,
    reply: Option<Payload>,
    initialized: BTreeSet<ProgramId>,
    awaken: BTreeSet<MessageId>,
    reply_sent: boolean,
}

export interface StoredDispatch extends Struct{
  kind: DispatchKind,
  message: StoredMessage
  context: Option<ContextStore>
}

export interface Interval<T extends Codec> extends Struct {
  start: T,
  finish: T
}
