import { Option, u32 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { H256 } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';
import { ITuple } from 'https://deno.land/x/polkadot@0.2.45/types-codec/types/index.ts';
import { u8aToU8a } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';

import { GearCommonActiveProgram, GearCommonProgram, IGearPages, PausedProgramBlockAndHash } from './types/index.ts';
import {
  PausedProgramDoesNotExistError,
  ProgramDoesNotExistError,
  ProgramExitedError,
  ProgramTerminatedError,
} from './errors/index.ts';
import { GearApi } from './GearApi.ts';
import { SPEC_VERSION } from './consts.ts';

export class GearProgramStorage {
  constructor(protected _api: GearApi) {}

  /**
   * ### Get program from chain
   * @param id Program id
   * @param at _(optional)_ Hash of block to query at
   * @returns
   */
  async getProgram(id: HexString, at?: HexString): Promise<GearCommonActiveProgram> {
    const api = at ? await this._api.at(at) : this._api;
    const programOption = (await api.query.gearProgram.programStorage(id)) as Option<GearCommonProgram>;

    if (programOption.isNone) {
      throw new ProgramDoesNotExistError(id);
    }

    const program = programOption.unwrap();

    if (program.isTerminated) throw new ProgramTerminatedError(program.asTerminated.toHex());

    if (program.isExited) throw new ProgramExitedError(program.asExited.toHex());

    return program.asActive;
  }

  /**
   * Get list of pages for program
   * @param programId
   * @param gProg
   * @returns
   */
  async getProgramPages(programId: HexString, program: GearCommonActiveProgram, at?: HexString): Promise<IGearPages> {
    const pages = {};
    const query =
      this._api.specVersion >= SPEC_VERSION.V1100
        ? this._api.query.gearProgram.memoryPages
        : this._api.query.gearProgram.memoryPageStorage;

    const args = this._api.specVersion >= SPEC_VERSION.V1100 ? [programId, program.memoryInfix] : [programId];

    for (const [start, end] of program.pagesWithData.inner) {
      for (let page = start.toNumber(); page <= end.toNumber(); page++) {
        pages[page] = u8aToU8a(await this._api.provider.send('state_getStorage', [query.key(...args, page), at]));
      }
    }
    return pages;
  }

  /**
   * ### Get block number and hash of paused program
   * @param id paused program id
   * @param at _(optional)_ Hash of block to query at
   * @returns
   */
  async getPausedProgramHashAndBlockNumber(id: HexString, at?: HexString): Promise<PausedProgramBlockAndHash> {
    const storageOption = (await this._api.query.gearProgram.pausedProgramStorage(id, at)) as Option<
      ITuple<[u32, H256]>
    >;

    if (storageOption.isNone) {
      throw new PausedProgramDoesNotExistError(id);
    }

    const storage = storageOption.unwrap();

    return {
      blockNumber: storage[0],
      hash: storage[1],
    };
  }
}
