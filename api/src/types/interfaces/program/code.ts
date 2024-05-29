import { ISubmittableResult } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { SubmittableExtrinsic } from 'https://deno.land/x/polkadot@0.2.45/api/types/index.ts';

import { HexString } from '../../index.ts';

export interface CodeUploadResult {
  /**
   * Code hash
   */
  codeHash: HexString;
  /**
   * Submittable extrinsic
   */
  extrinsic: SubmittableExtrinsic<'promise', ISubmittableResult>;
  /**
   * @deprecated will be removed in next major version
   */
  submitted: SubmittableExtrinsic<'promise', ISubmittableResult>;
}
