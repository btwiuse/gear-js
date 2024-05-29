import { BTreeSet, u32 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { AnyJson } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';
import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.45/api/types/index.ts';

import { GasLimit, Value } from '../../common.ts';
import { PayloadType } from '../../payload.ts';

export interface V1010ProgramUploadOptions {
  code: HexString | Buffer | Uint8Array;
  salt?: `0x${string}`;
  initPayload?: PayloadType;
  gasLimit: GasLimit;
  value?: Value;
  keepAlive?: boolean;
}

export type ProgramUploadOptions = V1010ProgramUploadOptions;

export interface V1010ProgramCreateOptions extends Omit<V1010ProgramUploadOptions, 'code'> {
  codeId: HexString | Uint8Array;
}

export type ProgramCreateOptions = V1010ProgramCreateOptions;

export interface IProgramUploadResult {
  programId: HexString;
  codeId: HexString;
  salt: HexString;
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>;
}

export type IProgramCreateResult = Omit<IProgramUploadResult, 'codeId'>;

export interface IResumeSessionInitArgs {
  /**
   * Program ID to resume
   */
  programId: HexString;
  /**
   * Allocations obtained with `api.programStorage.getProgramPages` method
   */
  allocations: Array<number | string | bigint> | BTreeSet<u32> | HexString;
  /**
   * Hash of the code of the program
   */
  codeHash: HexString;
}

export type GearPageNumberHuman = string | number | bigint;

export interface IResumeSessionPushArgs {
  /**
   * Session ID recieved during `resumeSessionInit` transaction
   */
  sessionId: string | number | bigint;
  /**
   * Program pages with data
   */
  memoryPages: Array<[GearPageNumberHuman, HexString | Uint8Array]>;
}

export interface IResumeSessionCommitArgs {
  /**
   * Session ID recieved during `resumeSessionInit` transaction
   */
  sessionId: string | number | bigint;
  /**
   * Count of blocks till program will be paused
   */
  blockCount: string | number | bigint;
}
