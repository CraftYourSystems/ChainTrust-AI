import { NextResponse } from "next/server";
import { checkAlgodHealth } from "@/services/algorand/client";
import { checkIndexerHealth } from "@/services/algorand/indexer";

export async function GET() {
  const algodHealth = await checkAlgodHealth();
  const indexerHealth = await checkIndexerHealth();

  const isHealthy = algodHealth.healthy && indexerHealth.healthy;
  const status = isHealthy ? "healthy" : "unhealthy";

  return NextResponse.json(
    {
      network: algodHealth.network,
      round: algodHealth.round,
      status,
      latency: algodHealth.latency, // primary node latency
      details: {
        node: algodHealth,
        indexer: indexerHealth
      }
    },
    { status: isHealthy ? 200 : 503 }
  );
}
