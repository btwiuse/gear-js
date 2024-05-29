import { ProgramMetadata } from './programMetadata.ts';
import { StateMetadata } from './stateMetadata.ts';

export function isProgramMeta(arg: unknown): arg is ProgramMetadata {
  if (typeof arg !== 'object') {
    return false;
  }
  return arg instanceof ProgramMetadata;
}

export function isStateMeta(arg: unknown): arg is StateMetadata {
  if (typeof arg !== 'object') {
    return false;
  }
  return arg instanceof StateMetadata;
}
