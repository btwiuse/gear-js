import { u8aToHex } from "https://deno.land/x/polkadot@0.2.45/util/index.ts";

const encoder = new TextEncoder();

export function toHex(s: string): string {
  let ab = encoder.encode(s);
  return u8aToHex(ab, -1, false);
}
