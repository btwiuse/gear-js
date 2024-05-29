import { Struct, Vec, u128, u8 } from 'https://deno.land/x/polkadot@0.2.45/types-codec/index.ts';
import { AnyNumber } from 'https://deno.land/x/polkadot@0.2.45/types-codec/types/index.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';

import { GearCoreErrorsSimpleReplyCode } from '../../lookup.ts';

export interface ICalculateReplyForHandleOptions {
  /** Origin of the message */
  origin: string;
  /** Destination of the message */
  destination: string;
  /** Payload of the message */
  payload: any;
  /** Gas limit of the message (optional) */
  gasLimit?: AnyNumber;
  /** Value of the message (optional) */
  value?: AnyNumber;
  /** Hash of the block at wich rpc call should be executed */
  at?: HexString;
}

/** The struct contains results of `calculateReplyForHandle` RPC call. */
export interface ReplyInfo extends Struct {
  /** Payload of the reply. */
  payload: Vec<u8>;
  /** Value sent with reply. */
  value: u128;
  /** Reply code of the reply. */
  code: GearCoreErrorsSimpleReplyCode;
}
