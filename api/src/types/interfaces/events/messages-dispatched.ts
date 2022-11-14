import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';

export interface DispatchStatus extends Enum {
  isSuccess: boolean;
  isFailed: boolean;
  isNotExecuted: boolean;
  asSuccess: Null;
  asFailed: Null;
  asNotExecuted: Null;
}
