import { u32, u128, Vec, Option, BTreeMap, BTreeSet, GenericEventData, Bool } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';
import { BlockNumber, AccountId32 } from 'https://deno.land/x/polkadot@0.2.17/types/interfaces/index.ts';

import { QueuedDispatch, ProgramDetails } from '../types/index.ts';
import {
  MessageId,
  ProgramId,
  Entry,
  ProgramChangedKind,
  DispatchStatus,
  UserMessageReadReason,
  MessageWaitedReason,
  MessageWokenReason,
  CodeId,
  CodeChangeKind,
  UserMessageSentMessage,
} from '../types/index.ts';

export class GearEventData extends GenericEventData {
  constructor(data: GenericEventData) {
    super(data.registry, data.toU8a(), data.meta, data.section, data.method);
  }
}

export interface MessageEnqueuedData extends GenericEventData {
  id: MessageId;
  source: AccountId32;
  destination: ProgramId;
  entry: Entry;
}

export interface UserMessageSentData extends GenericEventData {
  message: UserMessageSentMessage;
  expiration: Option<BlockNumber>;
}

export interface UserMessageReadData extends GenericEventData {
  id: MessageId;
  reason: UserMessageReadReason;
}

export interface MessagesDispatchedData extends GenericEventData {
  total: u32;
  statuses: BTreeMap<MessageId, DispatchStatus>;
  stateChanges: BTreeSet<ProgramId>;
}

export interface MessageWaitedData extends GenericEventData {
  id: MessageId;
  origin: Option<MessageId>;
  reason: MessageWaitedReason;
  expiration: BlockNumber;
}

export interface MessageWakenData extends GenericEventData {
  id: MessageId;
  reason: MessageWokenReason;
}

export interface CodeChangedData extends GenericEventData {
  id: CodeId;
  change: CodeChangeKind;
}

export interface ProgramChangedData extends GenericEventData {
  id: ProgramId;
  change: ProgramChangedKind;
}

export interface DebugData extends GenericEventData {
  dispatchQueue: Vec<QueuedDispatch>;
  programs: Vec<ProgramDetails>;
}

export interface DebugModeData extends GenericEventData {
  enabled: Bool;
}

export interface TransferData extends GenericEventData {
  from: AccountId32;
  to: AccountId32;
  amount: u128;
}
