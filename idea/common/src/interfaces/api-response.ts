import { IMessage } from './message';
import { IPaginationResult } from './pagination';
import { IProgram } from './program';
import { ICode } from './code';
import { RpcErrorCode } from '../enums';
import { IState } from './state';

interface AllMessagesResult extends IPaginationResult {
  messages: IMessage[];
  programNames?: Record<string, string>;
}

interface GetAllProgramsResult extends IPaginationResult {
  programs: IProgram[];
}

interface GetStatesResult extends IPaginationResult {
  states: IState[];
}

interface GetAllCodeResult extends IPaginationResult {
  listCode: ICode[];
}

interface AddMetaResult {
  status: 'Metadata added';
}

interface AddStateResult {
  status: 'State added';
  state: IState;
}

interface GetAllStateResult {
  states: IState[];
}

interface ProgramDataResult extends Omit<IProgram, 'meta'> {
  meta?: { meta?: string };
}

interface AddSailsResult {
  status: 'Sails idl added';
}

interface IRpcResponse {
  jsonrpc: '2.0';
  id: number;
  result?:
    | AllMessagesResult
    | GetAllProgramsResult
    | IProgram
    | IMessage
    | IProgram[]
    | IMessage[]
    | AddMetaResult
    | GetAllCodeResult
    | GetStatesResult
    | AddSailsResult;
  error?: IRpcError;
}

interface IRpcError {
  code: RpcErrorCode;
  message: string;
}

export {
  AllMessagesResult,
  GetAllProgramsResult,
  GetAllCodeResult,
  AddMetaResult,
  AddStateResult,
  GetAllStateResult,
  ProgramDataResult,
  IRpcResponse,
  IRpcError,
  GetStatesResult,
  AddSailsResult,
};
