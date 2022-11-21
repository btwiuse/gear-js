import { Enum, Null } from 'https://deno.land/x/polkadot@0.2.17/types/mod.ts';

export interface DispatchStatus extends Enum {
  isSuccess: boolean;
  isFailed: boolean;
  isNotExecuted: boolean;
  asSuccess: Null;
  asFailed: Null;
  asNotExecuted: Null;
}
