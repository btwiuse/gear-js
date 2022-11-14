import { KeyringPair$Json } from 'https://deno.land/x/polkadot@0.2.15/keyring/types.ts';

export interface CreateKeyring {
  keyPairJson?: KeyringPair$Json | string;
  seed?: Uint8Array | string;
  mnemonic?: string;
  suri?: string;
}
