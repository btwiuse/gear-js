import { Codec } from 'https://deno.land/x/polkadot@0.2.15/types/types/index.ts';
import { BN } from 'https://deno.land/x/polkadot@0.2.15/util/mod.ts';

export interface ISystemAccountInfo extends Codec {
  nonce: Codec;
  consumers: Codec;
  providers: Codec;
  sufficients: Codec;
  data: {
    free: BN;
    reserved: BN;
    miscFrozen: BN;
    feeFrozen: BN;
  };
}
