import { Struct, bool, u64 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';

export interface GasInfo extends Struct {
  min_limit: u64;
  reserved: u64;
  burned: u64;
  may_be_returned: u64;
  waited: bool;
}
