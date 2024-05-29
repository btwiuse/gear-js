import { Codec } from 'https://deno.land/x/polkadot@0.2.45/types/types/index.ts';

import { CreateType, MetadataVersion, ProgramMetadata, StateMetadata } from './metadata/index.ts';
import { HumanTypesRepr, ReadStateBatchParams, ReadStateParams, ReadStateUsingWasmParams } from './types/index.ts';
import { Bytes } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { GearProgramStorage } from './Storage.ts';
import { encodePayload } from './utils/index.ts';

export class GearProgramState extends GearProgramStorage {
  /**
   * ## Read state using meta wasm file
   * @param args
   * @param meta StateMetadata returned from getStateMetadata function
   */
  async readUsingWasm(
    params: ReadStateUsingWasmParams,
    stateMeta: StateMetadata,
    programMeta: ProgramMetadata,
  ): Promise<Codec> {
    const fnTypes = stateMeta?.functions[params.fn_name];

    const argument =
      fnTypes?.input !== undefined && fnTypes?.input !== null
        ? Array.from(stateMeta.createType(fnTypes.input, params.argument).toU8a())
        : null;

    const payload =
      programMeta.version === MetadataVersion.V2Rust ? encodePayload(params.payload, programMeta, 'state') : [];

    const code =
      typeof params.wasm === 'string' ? params.wasm : CreateType.create<Bytes>('Bytes', Array.from(params.wasm));

    const state = await this._api.rpc.gear.readStateUsingWasm(
      params.programId,
      payload,
      params.fn_name,
      code,
      argument,
      params.at,
    );
    return stateMeta && fnTypes ? stateMeta.createType(fnTypes.output, state) : state;
  }

  /**
   * ### Read state of program (calls `gear_readState` rpc call)
   * @param args ProgramId, payload and hash of block where it's necessary to read state (optional)
   * @param meta (optional) Program metadata returned from `ProgramMetadata.from` method. If not specified, payload will be sent and state will be returned as `Bytes`
   * @param type (optional) Index of type to decode state. metadata.types.state.input is uesd by default
   *
   * @example
   * const meta = ProgramMetadata.from('0x...');
   * const programId = '0x...';
   *
   * const result = await api.programState.read({ programId, payload: { id: 1 } }, meta);
   * console.log(result.toJSON());
   */
  async read<T extends Codec = Codec>(args: ReadStateParams, meta?: ProgramMetadata, type?: number): Promise<T> {
    const payload = meta
      ? meta.version === MetadataVersion.V2Rust
        ? encodePayload(args.payload, meta, 'state', type)
        : []
      : (args.payload as Bytes | Uint8Array | number[] | string);

    const state = await this._api.rpc.gear.readState(args.programId, payload, args.at || null);

    if (!meta) {
      return state as T;
    }

    if (type !== undefined) {
      return meta.createType<T>(type, state);
    }

    if (meta.version === MetadataVersion.V1Rust) {
      return meta.createType<T>(meta.types.state as number, state);
    }

    return meta.createType<T>((meta.types.state as HumanTypesRepr).output, state);
  }

  async readBatch(args: ReadStateBatchParams): Promise<Bytes[]> {
    return this._api.rpc.gear.readStateBatch(args.idPayloadBatch, args.at || null);
  }
}
