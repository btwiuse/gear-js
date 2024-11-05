import * as rpc from './rpc.json' with { type: 'json' };
import * as typesCommon from './types-common.json' with { type: 'json' };
import * as typesMessage from './types-message.json' with { type: 'json' };
import * as typesMetadata from './types-metadata.json' with { type: 'json' };
import * as typesProgram from './types-program.json' with { type: 'json' };
import { transformTypes } from '../utils/index.ts';

const gearRpc = transformTypes(rpc).rpc;
const gearTypes = {
  ...transformTypes(typesMetadata).types,
  ...transformTypes(typesProgram).types,
  ...transformTypes(typesMessage).types,
  ...transformTypes(typesCommon).types,
};
export { gearRpc, gearTypes };
