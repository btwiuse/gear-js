import { Enum } from 'https://deno.land/x/polkadot@0.2.45/types/index.ts';
import { Hash } from 'https://deno.land/x/polkadot@0.2.45/types/interfaces/index.ts';

export type ReservationId = Hash;

export interface GasNodeId<T, U> extends Enum {
  isNode: boolean;
  asNode: { Node: T };
  isReservation: boolean;
  asReservation: { Reservation: U };
}
