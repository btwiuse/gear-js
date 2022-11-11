import { transformTypes } from '../utils/index.ts';
import * as rpc from './rpc.json' assert { type: 'json' };
import * as typesProgram from './types-program.json' assert { type: 'json' };
import * as typesMessage from './types-message.json' assert { type: 'json' };
import * as typesDebug from './types-debug.json' assert { type: 'json' };

const gearRpc = transformTypes(rpc).rpc;
const gearTypes = {
  ...transformTypes(typesProgram).types,
  ...transformTypes(typesMessage).types,
  ...transformTypes(typesDebug).types,
};
export { gearRpc, gearTypes };
