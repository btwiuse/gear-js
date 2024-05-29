import { Balance, Header } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';

export interface IBlocksCallback {
  (event: Header): void | Promise<void>;
}

export interface IBalanceCallback {
  (event: Balance): void | Promise<void>;
}

export type TransactionStatusCb = (result: ISubmittableResult, extra: undefined) => void | Promise<void>;
