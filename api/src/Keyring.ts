import { KeyringPair, KeyringPair$Json } from 'https://deno.land/x/polkadot@0.2.45/keyring/types.ts';
import { hexToU8a, isString, isU8a, stringToU8a, u8aToHex } from 'https://deno.land/x/polkadot@0.2.45/util/index.ts';
import { mnemonicGenerate, mnemonicToMiniSecret } from 'https://deno.land/x/polkadot@0.2.45/util-crypto/index.ts';
import { Keypair } from 'https://deno.land/x/polkadot@0.2.45/util-crypto/types.ts';
import { Keyring } from 'https://deno.land/x/polkadot@0.2.45/api/index.ts';
import { waitReady } from 'https://deno.land/x/polkadot@0.2.45/wasm-crypto/index.ts';

import { decodeAddress } from './utils/index.ts';

export class GearKeyring {
  private static unlock(keyring: KeyringPair, passphrase?: string) {
    if (keyring.isLocked) {
      keyring.unlock(passphrase);
    }
    return keyring;
  }

  static async fromSuri(suri: string, name?: string): Promise<KeyringPair> {
    const keyring = new Keyring({ type: 'sr25519' });
    await waitReady();
    const keyPair = keyring.addFromUri(suri, { name });
    return keyPair;
  }

  static fromKeyPair(pair: Keypair, name?: string): KeyringPair {
    const keyring = new Keyring({ type: 'sr25519' });
    return GearKeyring.unlock(keyring.addFromPair(pair, { name }));
  }

  static fromJson(keypairJson: KeyringPair$Json | string, passphrase?: string): KeyringPair {
    const json: KeyringPair$Json = isString(keypairJson) ? JSON.parse(keypairJson) : keypairJson;
    const keyring = new Keyring().addFromJson(json);
    return GearKeyring.unlock(keyring, passphrase);
  }

  static async fromSeed(seed: Uint8Array | string, name?: string): Promise<KeyringPair> {
    const keyring = new Keyring({ type: 'sr25519' });
    await waitReady();

    const keypair = isU8a(seed) ? keyring.addFromSeed(seed, { name }) : keyring.addFromSeed(hexToU8a(seed), { name });
    return keypair;
  }

  static async fromMnemonic(mnemonic: string, name?: string): Promise<KeyringPair> {
    return await GearKeyring.fromSuri(mnemonic, name);
  }

  static toJson(keyring: KeyringPair, passphrase?: string): KeyringPair$Json {
    return keyring.toJson(passphrase);
  }

  static async create(
    name: string,
    passphrase?: string,
  ): Promise<{
    keyring: KeyringPair;
    mnemonic: string;
    seed: string;
    json: KeyringPair$Json;
  }> {
    const mnemonic = mnemonicGenerate();
    const seed = mnemonicToMiniSecret(mnemonic);
    const keyring = await GearKeyring.fromSeed(seed, name);
    return {
      keyring,
      mnemonic: mnemonic,
      seed: u8aToHex(seed),
      json: keyring.toJson(passphrase),
    };
  }

  static generateMnemonic(): string {
    return mnemonicGenerate();
  }

  static generateSeed(mnemonic?: string): { seed: `0x${string}`; mnemonic: string } {
    if (!mnemonic) {
      mnemonic = mnemonicGenerate();
    }
    return { seed: u8aToHex(mnemonicToMiniSecret(mnemonic)), mnemonic };
  }

  static sign(keyring: KeyringPair, message: string) {
    return keyring.sign(stringToU8a(message));
  }

  static checkPublicKey(publicKey: string): boolean {
    try {
      decodeAddress(publicKey);
    } catch (error) {
      return false;
    }
    return true;
  }
}
