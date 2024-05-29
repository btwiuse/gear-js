import { Struct, Vec, u128, u64, u8 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { AnyNumber } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { GearCoreErrorsSimpleReplyCode } from './lookup.ts';
import { Perquintill } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';

export type Value = AnyNumber | u128;

export type GasLimit = AnyNumber | u64;

export interface InflationInfo extends Struct {
  inflation: Perquintill;
  roi: Perquintill;
}
