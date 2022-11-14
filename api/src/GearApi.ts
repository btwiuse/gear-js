import { SpRuntimeDispatchError } from 'https://deno.land/x/polkadot@0.2.15/types/lookup.ts';
import { RegistryError } from 'https://deno.land/x/polkadot@0.2.15/types-codec/types/index.ts';
import { ApiPromise, WsProvider } from 'https://deno.land/x/polkadot@0.2.15/api/mod.ts';
import { Event } from 'https://deno.land/x/polkadot@0.2.15/types/interfaces/index.ts';
import { u128, u64 } from 'https://deno.land/x/polkadot@0.2.15/types/mod.ts';

import { gearRpc, gearTypes } from './default/index.ts';
import { GearProgramState } from './State.ts';
import { GearWaitlist } from './Waitlist.ts';
import { GearClaimValue } from './Claim.ts';
import { GearApiOptions } from './types/index.ts';
import { GearProgram } from './Program.ts';
import { GearStorage } from './Storage.ts';
import { GearMailbox } from './Mailbox.ts';
import { GearMessage } from './Message.ts';
import { GearBalance } from './Balance.ts';
import { GearEvents } from './events/index.ts';
import { GearBlock } from './Blocks.ts';
import { GearCode } from './Code.ts';

export class GearApi extends ApiPromise {
  public program: GearProgram;
  public programState: GearProgramState;
  public message: GearMessage;
  public balance: GearBalance;
  public gearEvents: GearEvents;
  public defaultTypes: Record<string, unknown>;
  public blocks: GearBlock;
  public storage: GearStorage;
  public mailbox: GearMailbox;
  public claimValueFromMailbox: GearClaimValue;
  public code: GearCode;
  public waitlist: GearWaitlist;

  constructor(options: GearApiOptions = {}) {
    const { types, providerAddress, ...restOptions } = options;
    const provider = restOptions?.provider || new WsProvider(providerAddress ?? 'ws://127.0.0.1:9944');
    const defaultTypes = types ? { ...types, ...gearTypes } : gearTypes;

    super({
      provider,
      derives: {},
      types: {
        ...defaultTypes,
      },
      rpc: {
        ...gearRpc,
      },
      // it's temporarily necessary to avoid the warning "API/INIT: Not decorating unknown runtime apis: GearApi/1"
      runtime: {
        GearApi: [
          {
            methods: {},
            version: 1,
          },
        ],
      },
      ...restOptions,
    });

    this.isReady.then(() => {
      this.program = new GearProgram(this);
      this.message = new GearMessage(this);
      this.balance = new GearBalance(this);
      this.gearEvents = new GearEvents(this);
      this.defaultTypes = defaultTypes;
      this.programState = new GearProgramState(this);
      this.blocks = new GearBlock(this);
      this.storage = new GearStorage(this);
      this.claimValueFromMailbox = new GearClaimValue(this);
      this.mailbox = new GearMailbox(this);
      this.code = new GearCode(this);
      this.waitlist = new GearWaitlist(this);
    });
  }

  static async create(options?: GearApiOptions): Promise<GearApi> {
    const api = new GearApi(options);
    await api.isReady;
    return api;
  }

  async totalIssuance(): Promise<string> {
    return (await this.query.balances.totalIssuance()).toHuman() as string;
  }

  async chain(): Promise<string> {
    return (await this.rpc.system.chain()).toHuman();
  }

  async nodeName(): Promise<string> {
    return (await this.rpc.system.name()).toHuman();
  }

  async nodeVersion(): Promise<string> {
    return (await this.rpc.system.version()).toHuman();
  }

  get existentialDeposit(): u128 {
    return this.consts.balances.existentialDeposit;
  }

  get blockGasLimit(): u64 {
    return this.consts.gearGas.blockGasLimit as u64;
  }

  get mailboxTreshold(): u64 {
    return this.consts.gear.mailboxThreshold as u64;
  }

  get waitlistCost(): u64 {
    return this.consts.gearScheduler.waitlistCost as u64;
  }
  /**
   * Method provides opportunity to get informations about error occurs in ExtrinsicFailed event
   * @param event
   * @returns
   */
  getExtrinsicFailedError(event: Event): RegistryError {
    const error = event.data[0] as SpRuntimeDispatchError;
    const { isModule, asModule } = error;
    return isModule ? this.registry.findMetaError(asModule) : null;
  }
}
