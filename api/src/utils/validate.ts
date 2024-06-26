import { BN, u8aToBigInt } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';
import { u128, u64 } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { GearCoreMessageUserUserStoredMessage } from '../types/index.ts';
import { HexString } from 'https://deno.land/x/polkadot@0.2.45/util/types.ts';

import { GasLimit, Value } from '../types/index.ts';
import { GearApi } from '../GearApi.ts';
import { ValidationError } from '../errors/index.ts';

export function validateValue(value: Value | undefined, api: GearApi) {
  if (!value) return;

  const existentialDeposit = api.existentialDeposit;

  const bigintValue =
    value instanceof Uint8Array
      ? u8aToBigInt(value)
      : value instanceof u128 || value instanceof BN
        ? BigInt(value.toString())
        : BigInt(value);

  if (bigintValue > 0 && bigintValue < existentialDeposit.toBigInt()) {
    throw new ValidationError(`Value less than minimal. Minimal value: ${existentialDeposit.toHuman()}`);
  }
}

export function validateGasLimit(gas: GasLimit, api: GearApi) {
  if (gas === undefined) throw new ValidationError("Gas limit doesn't specified");
  const bigintGas =
    gas instanceof Uint8Array
      ? u8aToBigInt(gas)
      : gas instanceof u64 || gas instanceof BN
        ? BigInt(gas.toString())
        : BigInt(gas);
  if (bigintGas > api.blockGasLimit.toBigInt()) {
    throw new ValidationError(`GasLimit too high. Maximum gasLimit value is ${api.blockGasLimit.toHuman()}`);
  }
}

export async function validateCodeId(codeId: HexString, api: GearApi) {
  if (await api.code.exists(codeId)) {
    throw new ValidationError('Code already exists');
  }
}

export async function validateProgramId(programId: HexString, api: GearApi) {
  const isExist = await api.program.exists(programId);
  if (!isExist) {
    throw new ValidationError(`Program with id ${programId} doesn't exist`);
  }
}

export async function validateMailboxItem(
  account: HexString,
  messageId: HexString,
  api: GearApi,
): Promise<GearCoreMessageUserUserStoredMessage> {
  const mailbox = await api.mailbox.read(account, messageId);

  if (!mailbox) {
    throw new Error(`There is no message with id ${messageId} in the mailbox`);
  }

  return mailbox[0];
}
