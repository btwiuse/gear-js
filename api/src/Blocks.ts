import { AnyTuple, AnyNumber } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';
import { BlockHash, BlockNumber, Header, SignedBlock } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';
import { Compact, GenericExtrinsic, Vec, u64 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { isHex, isNumber, isU8a } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';
import { FrameSystemEventRecord } from 'https://deno.land/x/polkadot@0.2.45/types/lookup.ts';
import { HeaderExtended } from 'https://deno.land/x/polkadot@0.2.45/api-derive/types.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';
import { Observable } from 'https://deno.land/x/rxjs/mod.ts';
import { PromiseResult } from 'https://deno.land/x/polkadot@0.2.45/api/types/index.ts';

import { CreateType } from './metadata/index.ts';
import { GearApi } from './GearApi.ts';
import { GetBlockError } from './errors/index.ts';

export class GearBlock {
  subscribeNewHeads: PromiseResult<() => Observable<HeaderExtended>>;

  constructor(private api: GearApi) {
    api.isReady.then(() => {
      this.subscribeNewHeads = api.derive.chain.subscribeNewHeads;
    });
  }

  /**
   * Get data of particular block by blockHash
   * @param hash
   * @returns
   */
  async get(hash: HexString | Uint8Array): Promise<SignedBlock>;

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
  async get(hashOrNumber: HexString | Uint8Array | number): Promise<SignedBlock>;

  /**
   * Get data of particular block by blockNumber or blockHash
   * @param hashOrNumber
   * @returns
   */
  async get(hashOrNumber: HexString | Uint8Array | number): Promise<SignedBlock> {
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
  async getBlockTimestamp(hash: HexString | Uint8Array): Promise<Compact<u64>>;

  /**
   * ### Get block's timestamp by blockNumber
   * @param number
   */
  async getBlockTimestamp(number: number): Promise<Compact<u64>>;

  async getBlockTimestamp(blockOrHashOrNumber: HexString | Uint8Array | number | SignedBlock): Promise<Compact<u64>> {
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

  async subscribeToHeadsFrom(
    from: number | HexString,
    cb: (header: Header) => Promise<void> | void,
    blocks: 'finalized' | 'latest' = 'latest',
  ): Promise<() => void> {
    let blockNumber = typeof from === 'string' ? (await this.getBlockNumber(from)).toNumber() : from;

    const lastHeader =
      blocks === 'finalized'
        ? await this.api.rpc.chain.getHeader(await this.getFinalizedHead())
        : await this.api.rpc.chain.getHeader();

    let lastHeadNumber = lastHeader.number.toNumber();

    let unsubscribed = false;

    const unsub = await this.api.rpc.chain[blocks === 'finalized' ? 'subscribeFinalizedHeads' : 'subscribeNewHeads'](
      (header) => {
        lastHeadNumber = header.number.toNumber();
        if (blockNumber >= lastHeadNumber) {
          cb(header);
        }
      },
    );

    let oldBlocksSub = async () => {
      while (!unsubscribed && lastHeadNumber > blockNumber) {
        const hash = await this.api.rpc.chain.getBlockHash(blockNumber);
        const header = await this.api.rpc.chain.getHeader(hash);
        await cb(header);
        blockNumber++;
      }
    };

    oldBlocksSub();

    return () => {
      unsubscribed = true;
      oldBlocksSub = null;
      unsub();
    };
  }
}
