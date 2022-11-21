import { ApiOptions } from 'https://deno.land/x/polkadot@0.2.17/api/types/index.ts';

export interface GearApiOptions extends ApiOptions {
  providerAddress?: string;
}
