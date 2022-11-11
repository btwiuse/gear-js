import { GenericEventData, GenericEvent } from 'https://deno.land/x/polkadot@0.2.11/types/mod.ts';
import {
  CodeChangedData,
  DebugData,
  MessageEnqueuedData,
  MessagesDispatchedData,
  MessageWaitedData,
  ProgramChangedData,
  TransferData,
  UserMessageReadData,
  UserMessageSentData,
  DebugModeData,
  MessageWakenData,
} from './GearEventData.ts';

export interface GearEvent<D extends GenericEventData> extends GenericEvent {
  data: D;
}

export type MessageEnqueued = GearEvent<MessageEnqueuedData>;

export type UserMessageSent = GearEvent<UserMessageSentData>;

export type UserMessageRead = GearEvent<UserMessageReadData>;

export type MessagesDispatched = GearEvent<MessagesDispatchedData>;

export type MessageWaited = GearEvent<MessageWaitedData>;

export type MessageWaken = GearEvent<MessageWakenData>;

export type CodeChanged = GearEvent<CodeChangedData>;

export type ProgramChanged = GearEvent<ProgramChangedData>;

export type DebugDataSnapshot = GearEvent<DebugData>;

export type DebugMode = GearEvent<DebugModeData>;

export type Transfer = GearEvent<TransferData>;
