import { BN } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';
import { Balance } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';
import { FrameSystemAccountInfo } from 'https://deno.land/x/polkadot@0.2.45/types/lookup.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.45/api/types/index.ts';

import { GearTransaction } from './Transaction.ts';

export class GearBalance extends GearTransaction {
  async findOut(publicKey: string): Promise<Balance> {
    const { data: balance } = (await this._api.query.system.account(publicKey)) as FrameSystemAccountInfo;
    return this._api.createType('Balance', balance.free) as Balance;
  }

  transfer(
    to: string,
    value: number | BN,
    keepAlive = true,
  ): SubmittableExtrinsic<'promise', ISubmittableResult> {
    this.extrinsic = this._api.tx.balances[keepAlive ? 'transferKeepAlive' : 'transferAllowDeath'](to, value);
    return this.extrinsic;
  }
}
