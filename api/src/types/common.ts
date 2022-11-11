import { AnyNumber } from 'https://deno.land/x/polkadot@0.2.11/types/types/index.ts';
import { u128, u64 } from 'https://deno.land/x/polkadot@0.2.11/types/mod.ts';

export type Hex = `0x${string}`;

export type Value = AnyNumber | u128;

export type GasLimit = AnyNumber | u64;
