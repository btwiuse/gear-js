import {
  ApiPromise,
  WsProvider,
} from "https://deno.land/x/polkadot@0.2.11/api/mod.ts";
import { GearApi } from "./src/index.ts";

async function initApi() {
  const PROVIDER = Deno.env.get("PROVIDER") ?? "wss://rpc.vara-network.io";
  const provider = new WsProvider(PROVIDER);
  return await ApiPromise.create({ provider });
}

console.log("api is initializing. Please hold on...");

const api = await initApi();

async function initGearApi() {
  const PROVIDER = Deno.env.get("PROVIDER") ?? "wss://rpc.vara-network.io";
  return await GearApi.create({ providerAddress: PROVIDER });
}

console.log("gearApi is initializing. Please hold on...");

const gearApi = await initGearApi();
