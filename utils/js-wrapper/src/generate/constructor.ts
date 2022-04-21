import { Target } from '../interfaces.js';
import { getType } from './utils.js';

export function generateConstructor(ts: boolean, target: Target) {
  const overloads = [
    `constructor(api${getType(': GearApi', ts)}, programId${getType(': `0x${string}`', ts)})\n`,
    `  constructor(providerAddress${getType(': string', ts)}, programId${getType(': `0x${string}`', ts)})\n`,
  ];

  const constructor = `  constructor(providerAddressOrApi${getType(': string | GearApi', ts)}, programId${getType(
    ': `0x${string}`',
    ts,
  )}) {
    this.programId = programId;
    if (typeof providerAddressOrApi === 'string') {
      this.providerAddress = providerAddressOrApi;
    } else {
      this.api = providerAddressOrApi;
    }
    this.isReady = new Promise((resolve, reject) => {
      this.init().then(() => resolve('ready')).catch((error) => reject(error))
    });
  }\n`;
  return target !== 'nodejs' ? [...overloads, constructor].join('\n') : constructor;
}