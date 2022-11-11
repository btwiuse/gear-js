import { Enum, u32, Map, BTreeSet, BTreeMap } from 'https://deno.land/x/polkadot@0.2.11/types/mod.ts';
import { Hash } from 'https://deno.land/x/polkadot@0.2.11/types/interfaces/index.ts';

import { MessageId, ProgramId } from '../ids/index.ts';
import { GasReservationSlot } from '../gas.ts';
import { DispatchKind } from '../message/index.ts';
import { WasmPageNumber } from './pages.ts';

export interface IProgram extends Enum {
  isActive: boolean;
  asActive: ActiveProgram;
  isTerminated: boolean;
  asTerminated: ProgramId;
  isExited: boolean;
  asExited: ProgramId;
}

export interface ActiveProgram extends Map {
  allocations: BTreeSet<WasmPageNumber>;
  pages_with_data: BTreeSet<u32>;
  gas_reservation_map: BTreeMap<Hash, GasReservationSlot>;
  code_hash: Uint8Array;
  code_length_bytes: u32;
  code_exports: BTreeSet<DispatchKind>;
  static_pages: WasmPageNumber;
  state: IProgramState;
}

export interface IProgramState {
  isUninitialized: boolean;
  asUninitialized: { messageId: MessageId };
  isInitialized: boolean;
  asInitialized: null;
}
