import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.11/api/types/index.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.11/types/types/index.ts';

import { GearTransaction } from './Transaction.ts';
import { ClaimValueError } from './errors/index.ts';
import { Hex } from './types/index.ts';

/**
 * Claim value from mailbox
 */
export class GearClaimValue extends GearTransaction {
  /**
   * Submit `claimValueFromMailbox` extrinsic
   * @param messageId MessageId with value to be claimed
   */
  submit(messageId: Hex): SubmittableExtrinsic<'promise', ISubmittableResult> {
    try {
      this.extrinsic = this._api.tx.gear.claimValue(messageId);
      return this.extrinsic;
    } catch (error) {
      throw new ClaimValueError();
    }
  }
}
