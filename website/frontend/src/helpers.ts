import { Hex } from '@gear-js/api';
import { Metadata } from '@polkadot/types';
import { localPrograms } from 'services/LocalDBService';
import { GetMetaResponse } from 'api/responses';
import { DEVELOPMENT_CHAIN, LOCAL_STORAGE } from 'consts';
import { NODE_ADDRESS_REGEX } from 'regexes';
import { InitialValues as SendMessageInitialValues } from './components/pages/SendMessage/children/MessageForm/types';
import { InitialValues as UploadInitialValues } from './components/pages/Programs/children/Upload/children/UploadForm/types';
import { SetFieldValue } from 'types/common';
import { EventTypes } from 'types/alerts';
import { ProgramModel, ProgramPaginationModel, ProgramStatus } from 'types/program';
import { AddAlert } from 'store/actions/actions';

export const fileNameHandler = (filename: string) => {
  const transformedFileName = filename;

  return transformedFileName.length > 24
    ? `${transformedFileName.slice(0, 12)}…${transformedFileName.slice(-12)}`
    : transformedFileName;
};

export const formatDate = (rawDate: string) => {
  const date = new Date(rawDate);
  const time = date.toLocaleTimeString('en-GB');
  const formatedDate = date.toLocaleDateString('en-US').replaceAll('/', '-');
  return `${formatedDate} ${time}`;
};

export const generateRandomId = () => Math.floor(Math.random() * 1000000000);

export function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

export const toShortAddress = (_address: string) => {
  const address = (_address || '').toString();

  return address.length > 13 ? `${address.slice(0, 6)}…${address.slice(-6)}` : address;
};

export const copyToClipboard = (key: string, alert: any, successfulText?: string) => {
  try {
    navigator.clipboard.writeText(key);
    alert.success(successfulText || 'Copied');
  } catch (err) {
    alert.error('Copy error');
  }
};

export const signPayload = async (injector: any, address: string, payload: any, callback: any) => {
  try {
    const { signature } = await injector.signer.signRaw!({
      address,
      data: payload,
      type: 'payload',
    });

    callback(signature);
  } catch (err) {
    console.error(err);
  }
};

export const getLocalPrograms = (params: any) => {
  const result: ProgramPaginationModel = {
    count: 0,
    programs: [],
  };
  const data = { result };

  return localPrograms
    .iterate((elem: ProgramModel, key, iterationNumber) => {
      const newLimit = params.offset + params.limit;

      data.result.count = iterationNumber;

      if (params.term) {
        if (
          (elem.name?.includes(params.term) || elem.id?.includes(params.term)) &&
          iterationNumber <= newLimit &&
          iterationNumber > params.offset
        ) {
          data.result.programs.push(elem);
        }
      } else if (iterationNumber <= newLimit && iterationNumber > params.offset) {
        data.result.programs.push(elem);
      }
    })
    .then(() => {
      data.result.programs.sort((prev, next) => (prev.timestamp > next.timestamp ? -1 : 1));

      return data;
    });
};

export const getLocalProgram = (id: string) => {
  const result: ProgramModel = {
    id: '',
    timestamp: '',
    initStatus: ProgramStatus.Success,
  };
  const data = { result };

  return localPrograms
    .getItem<ProgramModel>(id)
    .then((response) => {
      if (response) {
        data.result = response;
      }
    })
    .then(() => data);
};

export const getLocalProgramMeta = (id: string) => {
  const result: GetMetaResponse = {
    meta: '',
    metaFile: '',
    program: '',
  };
  const data = { result };

  return localPrograms
    .getItem<ProgramModel>(id)
    .then((response) => {
      if (response) {
        data.result.meta = response.meta.meta;
        data.result.metaFile = response.meta.metaFile;
        data.result.program = id;
      }
    })
    .then(() => data);
};

export const isDevChain = () => localStorage.getItem(LOCAL_STORAGE.CHAIN) === DEVELOPMENT_CHAIN;

export const isNodeAddressValid = (address: string) => NODE_ADDRESS_REGEX.test(address);

export const checkFileFormat = (file: File) => {
  const fileExt = file.name.split('.').pop()?.toLowerCase();

  return fileExt === 'wasm';
};

export const getPreformattedText = (data: any) => JSON.stringify(data, null, 4);

export const calculateGas = async (
  method: string,
  api: any,
  isManualPayload: boolean,
  values: UploadInitialValues | SendMessageInitialValues,
  setFieldValue: SetFieldValue,
  dispatch: any,
  meta: any,
  code?: Uint8Array | null,
  programId?: String | null
) => {
  const payload = isManualPayload ? values.payload : values.fields;

  if (isManualPayload && payload === '') {
    dispatch(AddAlert({ type: EventTypes.ERROR, message: `Error: payload can't be empty` }));
    return;
  }

  if (!isManualPayload && Object.keys(payload).length === 0) {
    dispatch(AddAlert({ type: EventTypes.ERROR, message: `Error: form can't be empty` }));
    return;
  }

  try {
    const metaOrTypeOfPayload: Metadata | string = meta || 'String';

    const estimatedGas = await api.program.gasSpent[method](
      localStorage.getItem(LOCAL_STORAGE.PUBLIC_KEY_RAW) as Hex,
      method === 'init' ? code : programId,
      payload,
      values.value,
      metaOrTypeOfPayload
    );

    dispatch(AddAlert({ type: EventTypes.INFO, message: `Estimated gas ${estimatedGas.toHuman()}` }));
    setFieldValue('gasLimit', estimatedGas.toNumber());
  } catch (error) {
    dispatch(AddAlert({ type: EventTypes.ERROR, message: `${error}` }));
  }
};

export const isHex = (value: unknown) => {
  const isString = typeof value === 'string';
  const hexRegex = /^0x[\da-fA-F]+/;
  return isString && hexRegex.test(value);
};
