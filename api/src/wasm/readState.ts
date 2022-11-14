import { u64 } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';
import { BlockNumber } from 'https://deno.land/x/polkadot@0.2.15/types/interfaces/index.ts';

import { getExportValue, PAGE_SIZE } from './utils.ts';
import { IGearPages } from '../types/index.ts';
import importObj from './importObj.ts';

export async function readState(
  wasmBytes: Buffer,
  initialSize: number,
  pages: IGearPages,
  inputValue?: Uint8Array,
  blockTimestamp?: u64,
  blockNumber?: BlockNumber,
): Promise<Uint8Array> {
  const memory = new WebAssembly.Memory({ initial: initialSize });
  const module = await WebAssembly.instantiate(
    wasmBytes,
    importObj(memory, false, inputValue, blockTimestamp, blockNumber),
  );
  Object.keys(pages).forEach((pageNumber: string) => {
    const start = +pageNumber * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const page = pages[pageNumber];
    for (let i = start; i < end; i++) {
      new Uint8Array(memory.buffer)[i] = page[i % PAGE_SIZE];
    }
  });
  const { exports } = module.instance;
  return exports?.meta_state ? new Uint8Array(getExportValue(memory, exports.meta_state)) : null;
}
