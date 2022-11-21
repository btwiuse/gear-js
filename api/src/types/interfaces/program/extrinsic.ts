import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.17/types/types/index.ts';
import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.17/api/types/index.ts';
import { AnyJson } from 'https://deno.land/x/polkadot@0.2.17/types/types/index.ts';

import { GasLimit, Hex, Value } from '../../common.ts';

export interface IProgramUploadOptions {
  code: Buffer | Uint8Array;
  salt?: `0x${string}`;
  initPayload?: AnyJson;
  gasLimit: GasLimit;
  value?: Value;
}

export interface IProgramCreateOptions extends Omit<IProgramUploadOptions, 'code'> {
  codeId: Hex | Uint8Array;
}

export interface IProgramUploadResult {
  programId: Hex;
  codeId: Hex;
  salt: Hex;
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>;
}

export type IProgramCreateResult = Omit<IProgramUploadResult, 'codeId'>;
