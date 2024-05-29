import * as rpc from './rpc.json' assert { type: 'json' };
import * as typesCommon from './types-common.json' assert { type: 'json' };
import * as typesMessage from './types-message.json' assert { type: 'json' };
import * as typesMetadata from './types-metadata.json' assert { type: 'json' };
import * as typesProgram from './types-program.json' assert { type: 'json' };
import { transformTypes } from '../utils/index.ts';

const gearRpc = transformTypes(rpc).rpc;
const gearTypes = {
  ...transformTypes(typesMetadata).types,
  ...transformTypes(typesProgram).types,
  ...transformTypes(typesMessage).types,
  ...transformTypes(typesCommon).types,
};
export { gearRpc, gearTypes };
