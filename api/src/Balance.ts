import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.17/api/types/index.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.17/types/types/index.ts';
import { Balance } from 'https://deno.land/x/polkadot@0.2.17/types/interfaces/index.ts';
import { BN } from 'https://deno.land/x/polkadot@0.2.17/util/mod.ts';

import { GearTransaction } from './Transaction.ts';
import { ISystemAccountInfo } from './types/index.ts';

export class GearBalance extends GearTransaction {
  async findOut(publicKey: string): Promise<Balance> {
    const { data: balance } = (await this._api.query.system.account(publicKey)) as ISystemAccountInfo;
    return this._api.createType('Balance', balance.free) as Balance;
  }

  transfer(to: string, value: number | BN): SubmittableExtrinsic<'promise', ISubmittableResult> {
    this.extrinsic = this._api.tx.balances.transfer(to, value);
    return this.extrinsic;
  }
}
