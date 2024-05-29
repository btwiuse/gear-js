import { GenericEvent, GenericEventData } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';

import {
  CodeChangedData,
  MessageQueuedData,
  MessageWaitedData,
  MessageWakenData,
  MessagesDispatchedData,
  ProgramChangedData,
  ProgramResumeSessionStartedData,
  TransferData,
  UserMessageReadData,
  UserMessageSentData,
  VoucherDeclinedData,
  VoucherIssuedData,
  VoucherRevokedData,
  VoucherUpdatedData,
} from './GearEventData.ts';

export interface GearEvent<D extends GenericEventData> extends GenericEvent {
  data: D;
}

export type MessageQueued = GearEvent<MessageQueuedData>;

export type UserMessageSent = GearEvent<UserMessageSentData>;

export type UserMessageRead = GearEvent<UserMessageReadData>;

export type MessagesDispatched = GearEvent<MessagesDispatchedData>;

export type MessageWaited = GearEvent<MessageWaitedData>;

export type MessageWaken = GearEvent<MessageWakenData>;

export type CodeChanged = GearEvent<CodeChangedData>;

export type ProgramChanged = GearEvent<ProgramChangedData>;

export type Transfer = GearEvent<TransferData>;

export type ProgramResumeSessionStarted = GearEvent<ProgramResumeSessionStartedData>;

export type VoucherIssued = GearEvent<VoucherIssuedData>;

export type VoucherUpdated = GearEvent<VoucherUpdatedData>;

export type VoucherRevoked = GearEvent<VoucherRevokedData>;

export type VoucherDeclined = GearEvent<VoucherDeclinedData>;
