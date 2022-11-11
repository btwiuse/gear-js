import { SubmittableExtrinsic, UnsubscribePromise } from 'https://deno.land/x/polkadot@0.2.11/api/types/index.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.11/types/types/index.ts';

import { GearTransaction } from './Transaction.ts';
import { DebugDataSnapshot } from './events/index.ts';

export class DebugMode extends GearTransaction {
  enabled: SubmittableExtrinsic<'promise', ISubmittableResult>;

  enable() {
    this.enabled = this._api.tx.sudo.sudo(this._api.tx.gearDebug.enableDebugMode(true));
  }

  disable() {
    this.enabled = this._api.tx.sudo.sudo(this._api.tx.gearDebug.enableDebugMode(false));
  }

  snapshots(callback: (event: DebugDataSnapshot) => void | Promise<void>): UnsubscribePromise {
    return this._api.query.system.events((events) => {
      events
        .filter(({ event }) => this._api.events.gearDebug.DebugDataSnapshot.is(event))
        .forEach(({ event }) => callback(event as DebugDataSnapshot));
    });
  }
}
