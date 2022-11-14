import { HeaderExtended } from 'https://deno.land/x/polkadot@0.2.15/api-derive/types.ts';
import { PromiseResult } from 'https://deno.land/x/polkadot@0.2.15/api/types/index.ts';
import { u64, Compact, GenericExtrinsic, Vec } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';
import { SignedBlock, BlockNumber, BlockHash } from 'https://deno.land/x/polkadot@0.2.15/types/interfaces/index.ts';
import { FrameSystemEventRecord } from 'https://deno.land/x/polkadot@0.2.15/types/lookup.ts';
import { AnyTuple, AnyNumber } from 'https://deno.land/x/polkadot@0.2.15/types/types/index.ts';
import { isHex, isU8a, isNumber } from 'https://deno.land/x/polkadot@0.2.15/util/mod.ts';
import { Observable } from 'https://deno.land/x/rxjs/mod.ts';

import { CreateType } from './create-type/index.ts';
import { GetBlockError } from './errors/index.ts';
import { GearApi } from './GearApi.ts';
import { Hex } from './types/index.ts';

export class GearBlock {
  subscribeNewHeads: PromiseResult<() => Observable<HeaderExtended>>;

  constructor(private api: GearApi) {
    this.subscribeNewHeads = api.derive.chain.subscribeNewHeads;
  }

  /**
   * Get data of particular block by blockHash
   * @param hash
   * @returns
   */
  async get(hash: Hex | Uint8Array): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber
   * @param number
   * @returns
   */
  async get(number: number): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber or blockHash
   * @param hashOrNumber
   * @returns
   */
  async get(hashOrNumber: Hex | Uint8Array | number): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber or blockHash
   * @param hashOrNumber
   * @returns
   */
  async get(hashOrNumber: Hex | Uint8Array | number): Promise<SignedBlock> {
    const hash = isU8a(hashOrNumber) || isHex(hashOrNumber) ? hashOrNumber : await this.getBlockHash(+hashOrNumber);
    try {
      return await this.api.rpc.chain.getBlock(hash);
    } catch (error) {
      throw new GetBlockError(error.message, hash);
    }
  }

  /**
   * Get blockHash by number
   * @param number number of block
   * @returns blockHash
   */
  async getBlockHash(number: AnyNumber | BlockNumber): Promise<BlockHash> {
    return await this.api.rpc.chain.getBlockHash(number);
  }

  /**
   * Get block number
   * @param hash
   * @returns Compact<BlockNumber>
   */
  async getBlockNumber(hash: `0x${string}` | Uint8Array): Promise<Compact<BlockNumber>> {
    const block = await this.get(hash);
    return block.block.header.number;
  }

  /**
   * ### Get block's timestamp
   * @param block
   */
  async getBlockTimestamp(block: SignedBlock): Promise<Compact<u64>>;

  /**
   * ### Get block's timestamp by blockHash
   * @param hash
   */
  async getBlockTimestamp(hash: Hex | Uint8Array): Promise<Compact<u64>>;

  /**
   * ### Get block's timestamp by blockNumber
   * @param number
   */
  async getBlockTimestamp(number: number): Promise<Compact<u64>>;

  async getBlockTimestamp(blockOrHashOrNumber: Hex | Uint8Array | number | SignedBlock): Promise<Compact<u64>> {
    const block =
      isHex(blockOrHashOrNumber) || isU8a(blockOrHashOrNumber) || isNumber(blockOrHashOrNumber)
        ? await this.get(blockOrHashOrNumber)
        : blockOrHashOrNumber;

    const tsAsU8a = block.block.extrinsics.find(
      (value) => value.method.method === 'set' && value.method.section === 'timestamp',
    ).data;
    const ts = CreateType.create('Compact<u64>', tsAsU8a);
    return ts as Compact<u64>;
  }

  /**
   * Get all extrinsic of particular block
   * @param blockHash hash of particular block
   * @returns Vec of extrinsics
   */
  async getExtrinsics(blockHash: `0x${string}` | Uint8Array): Promise<Vec<GenericExtrinsic<AnyTuple>>> {
    return (await this.get(blockHash)).block.extrinsics;
  }

  /**
   * Get all events of particular block
   * @param blockHash hash of particular block
   * @returns Vec of events
   */
  async getEvents(blockHash: `0x${string}` | Uint8Array): Promise<Vec<FrameSystemEventRecord>> {
    const apiAt = await this.api.at(blockHash);
    return apiAt.query.system.events();
  }

  /**
   * Get hash of last finalized block
   * @returns Hash of finalized head
   */
  async getFinalizedHead(): Promise<BlockHash> {
    return this.api.rpc.chain.getFinalizedHead();
  }
}
