import { Enum } from 'https://deno.land/x/polkadot@0.2.16/types/mod.ts';

export interface Reason<R extends Enum, S extends Enum> extends Enum {
  isRuntime: boolean;
  isSystem: boolean;
  asRuntime: R;
  asSystem: S;
}
