import { BigNumber } from 'bignumber.js';

import { useAccount, useApi, useAlert } from './context';

import {
  useReadFullState,
  useReadWasmState,
  useSendMessage,
  useUploadProgram,
  useCreateProgram,
  useUploadCalculateGas,
  useCreateCalculateGas,
  useHandleCalculateGas,
  useReplyCalculateGas,
  useIsVoucherExists,
  useVoucher,
  useIsAccountVoucherExists,
  useAccountVoucher,
  useVouchers,
  useAccountVouchers,
  useBalance,
  useBalanceFormat,
  useDeriveBalancesAll,
  useAccountDeriveBalancesAll,
  useCreateHandler,
  useSendMessageWithGas,
  useApproxBlockTimestamp,
  useGetApproxBlockTimestamp,
  useVoucherStatus,
  useGetVoucherStatus,
  useIsAnyVoucherActive,
  useIsAnyAccountVoucherActive,
  useIssuedVouchers,
  useAccountIssuedVouchers,
  SendMessageOptions,
  UseSendMessageOptions,
  UseSendMessageWithGasOptions,
  SendMessageWithGasOptions,
  useSails,
  UseSailsParameters,
  useProgram,
  UseProgramParameters,
  usePrepareProgramTransaction,
  UsePrepareProgramTransactionParameters,
  useSendProgramTransaction,
  UseSendProgramTransactionParameters,
  useProgramQuery,
  UseProgramQueryParameters,
  useProgramEvent,
  UseProgramEventParameters,
} from './hooks';

import { withoutCommas, getVaraAddress, getTypedEntries } from './utils';

import { AccountProvider, ApiProvider, AlertProvider } from './context';

import {
  DEFAULT_OPTIONS,
  DEFAULT_INFO_OPTIONS,
  DEFAULT_ERROR_OPTIONS,
  DEFAULT_SUCCESS_OPTIONS,
  DEFAULT_LOADING_OPTIONS,
  VARA_SS58_FORMAT,
} from './consts';

import {
  AlertType,
  AlertOptions,
  TemplateAlertOptions,
  AlertInstance,
  AlertTimer,
  AlertTemplateProps,
  AlertContainerFactory,
  DefaultTemplateOptions,
  ProviderProps,
  Account,
  Entries,
} from './types';

export {
  BigNumber,
  useReadFullState,
  useReadWasmState,
  useSendMessage,
  useUploadProgram,
  useCreateProgram,
  useUploadCalculateGas,
  useCreateCalculateGas,
  useHandleCalculateGas,
  useReplyCalculateGas,
  useIsVoucherExists,
  useVoucher,
  useIsAccountVoucherExists,
  useAccountVoucher,
  useVouchers,
  useAccountVouchers,
  useBalance,
  useBalanceFormat,
  useDeriveBalancesAll,
  useAccountDeriveBalancesAll,
  useAccount,
  useAlert,
  useApi,
  AccountProvider,
  ApiProvider,
  AlertProvider,
  useCreateHandler,
  useSendMessageWithGas,
  withoutCommas,
  getVaraAddress,
  getTypedEntries,
  useApproxBlockTimestamp,
  useGetApproxBlockTimestamp,
  useVoucherStatus,
  useGetVoucherStatus,
  useIsAnyVoucherActive,
  useIsAnyAccountVoucherActive,
  useIssuedVouchers,
  useAccountIssuedVouchers,
  useProgram,
  usePrepareProgramTransaction,
  useSendProgramTransaction,
  useProgramQuery,
  useProgramEvent,
  DEFAULT_OPTIONS,
  DEFAULT_INFO_OPTIONS,
  DEFAULT_ERROR_OPTIONS,
  DEFAULT_SUCCESS_OPTIONS,
  DEFAULT_LOADING_OPTIONS,
  VARA_SS58_FORMAT,
  AlertType,
};

export type {
  AlertOptions,
  TemplateAlertOptions,
  AlertInstance,
  AlertTimer,
  AlertTemplateProps,
  AlertContainerFactory,
  DefaultTemplateOptions,
  ProviderProps,
  Account,
  SendMessageOptions,
  UseSendMessageOptions,
  Entries,
  UseSendMessageWithGasOptions,
  SendMessageWithGasOptions,
  UseSailsParameters,
  UseProgramParameters,
  UsePrepareProgramTransactionParameters,
  UseSendProgramTransactionParameters,
  UseProgramQueryParameters,
  UseProgramEventParameters,
};
