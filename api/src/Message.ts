import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.11/types/types/index.ts';
import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.11/api/types/index.ts';

import { IMessageSendOptions, IMessageSendReplyOptions, Metadata } from './types/index.ts';
import { SendMessageError, SendReplyError } from './errors/index.ts';
import { validateGasLimit, validateValue } from './utils/validate.ts';
import { GearTransaction } from './Transaction.ts';
import { createPayload } from './create-type/index.ts';

export class GearMessage extends GearTransaction {
  /**
   * ## Send Message
   * @param message
   * @param meta Metadata
   * @param messageType MessageType
   * @returns Submitted result
   * ```javascript
   * const api = await GearApi.create()
   * const programId = '0xd7540ae9da85e33b47276e2cb4efc2f0b58fef1227834f21ddc8c7cb551cced6'
   * const tx = api.message.send({
   *  destination: messageId,
   *  payload: 'Hello, World!',
   *  gasLimit: 20_000_000
   * }, undefiend, 'String')
   * tx.signAndSend(account, (events) => {
   *  events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  send(
    message: IMessageSendOptions,
    meta?: Metadata,
    messageType?: string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    validateValue(message.value, this._api);
    validateGasLimit(message.gasLimit, this._api);

    const payload = createPayload(message.payload, messageType || meta?.handle_input, meta?.types);
    try {
      this.extrinsic = this._api.tx.gear.sendMessage(
        message.destination,
        payload,
        message.gasLimit,
        message.value || 0,
      );
      return this.extrinsic;
    } catch (error) {
      throw new SendMessageError(error.message);
    }
  }

  /**
   * Sends reply message
   * @param message Message parameters
   * @param meta Metadata
   * @param messageType MessageType
   * @returns Submitted result
   * @example
   * ```javascript
   * const api = await GearApi.create()
   * const messageId = '0xd7540ae9da85e33b47276e2cb4efc2f0b58fef1227834f21ddc8c7cb551cced6'
   * const tx = api.message.sendReply({
   *  replyToId: messageId,
   *  payload: 'Reply message',
   *  gasLimit: 20_000_000
   * }, undefiend, 'String')
   * tx.signAndSend(account, (events) => {
   *  events.forEach(({event}) => console.log(event.toHuman()))
   * })
   * ```
   */
  sendReply(
    message: IMessageSendReplyOptions,
    meta?: Metadata,
    messageType?: string,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    validateValue(message.value, this._api);
    validateGasLimit(message.gasLimit, this._api);

    const payload = createPayload(
      message.payload,
      messageType || meta?.async_handle_input || meta?.async_init_input,
      meta?.types,
    );

    try {
      this.extrinsic = this._api.tx.gear.sendReply(message.replyToId, payload, message.gasLimit, message.value);
      return this.extrinsic;
    } catch (error) {
      throw new SendReplyError();
    }
  }
}
