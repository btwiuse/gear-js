import { H256 } from 'https://deno.land/x/polkadot@0.2.16/types/interfaces/index.ts';

import { GasLimit, Hex, Value } from '../../common.ts';
import { PayloadType } from '../../payload.ts';

export interface IMessageSendOptions {
  destination: Hex | H256;
  payload: PayloadType;
  gasLimit: GasLimit;
  value?: Value;
}

export interface IMessageSendReplyOptions extends Omit<IMessageSendOptions, 'destination'> {
  replyToId: Hex;
}
