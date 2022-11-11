import { Hex } from '../types/index.ts';
import { TypeInfoRegistry } from './TypeInfoReg.ts';

export function decodeHexTypes(hexTypes: Hex | Uint8Array) {
  const typeInfoReg = new TypeInfoRegistry(hexTypes);
  return typeInfoReg.getTypes();
}
