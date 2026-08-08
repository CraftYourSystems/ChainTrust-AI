import { NextResponse } from "next/server";
import { checkAlgodHealth } from "@/services/algorand/client";
import { checkIndexerHealth } from "@/services/algorand/indexer";

export async function GET() {
  const algodHealth = await checkAlgodHealth();
  const indexerHealth = await checkIndexerHealth();

  const isHealthy = algodHealth.healthy && indexerHealth.healthy;
  const status = isHealthy ? "healthy" : "unhealthy";

  const payload = {
    network: algodHealth.network,
    round: algodHealth.round,
    status,
    latency: algodHealth.latency, // primary node latency
    details: {
      node: algodHealth,
      indexer: indexerHealth
    }
  };

  // algosdk v3 returns round numbers as BigInt, which JSON.stringify cannot
  // serialize — including the copies nested under details. Same conversion as
  // /api/ledger/record.
  const serialized = JSON.parse(JSON.stringify(payload, (key, value) =>
    typeof value === "bigint" ? value.toString() : value
  ));

  return NextResponse.json(serialized, { status: isHealthy ? 200 : 503 });
}
