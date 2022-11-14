import { isHex, isU8a } from 'https://deno.land/x/polkadot@0.2.15/util/mod.ts';
import { Codec, Registry } from 'https://deno.land/x/polkadot@0.2.15/types/types/index.ts';
import { Bytes, TypeRegistry } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';
import { RegistryTypes } from 'https://deno.land/x/polkadot@0.2.15/types-codec/types/registry.ts';

import { getTypeAndPayload, typeIsGeneric, typeIsString } from '../utils/types.ts';
import { TypeInfoRegistry } from './TypeInfoReg.ts';
import { toJSON, isJSON } from '../utils/json.ts';
import { Hex, Metadata } from '../types/index.ts';

export class CreateType {
  registry: Registry;

  constructor(registryOrRegistryTypes?: TypeRegistry | Registry | Hex | Uint8Array) {
    if (!registryOrRegistryTypes) {
      this.registry = new TypeRegistry();
    } else if (isHex(registryOrRegistryTypes) || isU8a(registryOrRegistryTypes)) {
      const typeInfoReg = new TypeInfoRegistry(registryOrRegistryTypes);
      this.registry = typeInfoReg.registry;
    } else if (registryOrRegistryTypes) {
      this.registry = registryOrRegistryTypes;
    }
  }

  /**
   * Register custom types in case of use custom types without
   * @param types
   * @example
   * ```javascript
   * const types = {
   *    CustomStruct: {
   *      fieldA: 'String',
   *      fieldB: 'u8'
   *    },
   *    CustomEnum: {
   *      _enum: {
   *        optionA: 'Option<CustomStruct>',
   *        optionB: 'BTreeSet<i32>'
   *      }
   *    }
   * };
   * const createType = new CreateType();
   * createType.registerTypes(types);
   * createType.create('CustomStruct', { fieldA: 'Hello', fieldB: 255 });
   * ```
   */
  public registerTypes(types?: RegistryTypes) {
    this.registry.setKnownTypes({ types: { ...types } });
    this.registry.register({ ...types });
  }

  public create(type: string, payload: unknown, metadata?: Metadata): Codec;

  /**
   *
   * @param type `TypeName` to encode or decode payload
   * @param payload `Payload` that have to be encoded or decoded
   * @param registryTypes Types encoded by TypeInfo
   * @returns Codec
   * @example
   * ```javascript
   * const createType = new CreateType();
   * const encoded = createType.create('String', 'Hello, World');
   * console.log(encoded.toHex()); // 0x48656c6c6f2c20576f726c6421
   *
   * const decoded = createType.create('String', '0x48656c6c6f2c20576f726c6421');
   * console.log(decoded.toHuman()); // "Hello, World!"
   *
   * // create type with metadata
   * const metadata = fs.readFileSync('path/to/file/with/metadata/*.meta.wasm);
   * const encoded = create(metadata.handle_input, somePayload, metadata);
   * console.log(encoded.toHex());
   * ```
   */
  public create(type: string, payload: unknown, registryTypes?: Hex | Uint8Array): Codec;

  public create(type: string, payload: unknown, registryTypesOrMetadata?: Hex | Uint8Array | Metadata): Codec;

  public create(type: string, payload: unknown, registryTypesOrMetadata?: Hex | Uint8Array | Metadata): Codec {
    [type, payload] = getTypeAndPayload(type, payload);
    if (registryTypesOrMetadata) {
      const registryTypes =
        isHex(registryTypesOrMetadata) || isU8a(registryTypesOrMetadata)
          ? registryTypesOrMetadata
          : registryTypesOrMetadata.types;
      const typeInfoReg = new TypeInfoRegistry(registryTypes);
      this.registry = typeInfoReg.registry;
      type = typeIsGeneric(type) ? typeInfoReg.getGenericName(type) : typeInfoReg.getShortName(type);
    }
    return this.createType(type, isJSON(payload) ? toJSON(payload) : payload);
  }

  /**
   *
   * @param type `TypeName` to encode or decode payload
   * @param payload `Payload` that have to be encoded or decoded
   * @param registryTypesOrMetadata
   * @returns Codec
   * @example
   * ```javascript
   * const encoded = CreateType.create('String', 'Hello, World');
   * console.log(encoded.toHex()); // 0x48656c6c6f2c20576f726c6421
   * ```
   */
  static create(type: string, payload: unknown, registryTypesOrMetadata?: Hex | Uint8Array | Metadata): Codec {
    const createType = new CreateType();
    return createType.create(type, payload, registryTypesOrMetadata);
  }

  private createType(type: string, data: unknown): Codec {
    if (typeIsString(type)) {
      return this.registry.createType('String', data);
    } else if (type.toLowerCase() === 'bytes') {
      if (data instanceof Uint8Array) {
        return this.registry.createType('Bytes', Array.from(data));
      } else if (data instanceof Bytes) {
        return data;
      }
      return this.registry.createType('Bytes', data);
    } else {
      return this.registry.createType(type, data);
    }
  }
}
