import {
  ApiPromise,
  WsProvider,
} from "https://deno.land/x/polkadot@0.2.45/api/index.ts";
import { GearApi } from "./src/index.ts";
import { gearRpc } from "./src/default/index.ts";

async function initApi() {
  const PROVIDER = Deno.env.get("PROVIDER") ?? "wss://rpc.vara.network";
  const provider = new WsProvider(PROVIDER);
  // it's temporarily necessary to avoid the warning "API/INIT: Not decorating unknown runtime apis: GearApi/1"
  const runtime = {
    GearApi: [
      {
        methods: {},
        version: 1,
      },
    ],
  };
  return await ApiPromise.create({
    provider,
    rpc: gearRpc,
    runtime,
  });
}

console.log("api is initializing. Please hold on...");

const api = await initApi();

async function initGearApi() {
  const PROVIDER = Deno.env.get("PROVIDER") ?? "wss://rpc.vara-network.io";
  const provider = new WsProvider(PROVIDER);
  return await GearApi.create({ provider });
}

console.log("gearApi is initializing. Please hold on...");

const gearApi = await initGearApi();
