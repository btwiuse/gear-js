import { GearCommonStoragePrimitivesInterval, GearCoreMessageUserUserStoredMessage } from '../../lookup.ts';
import { ITuple } from 'https://deno.land/x/polkadot@0.2.45/types-codec/types/index.ts';
import { Option } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';

export type MailboxItem = Option<ITuple<[GearCoreMessageUserUserStoredMessage, GearCommonStoragePrimitivesInterval]>>;

export type WaitlistItem = ITuple<[GearCoreMessageUserUserStoredMessage, GearCommonStoragePrimitivesInterval]>;
