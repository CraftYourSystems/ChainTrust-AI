"use client";

import React from "react";
import { useWalletIdentity } from "../hooks/useWalletIdentity";

export function WalletConnectButton() {
  const { status, address, providers, disconnect } = useWalletIdentity();

  if (status === "connected" && address) {
    const shortAddr = `${address.slice(0, 4)}...${address.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-green-500 bg-green-500/10 px-2 py-1 rounded">
          Connected: {shortAddr}
        </span>
        <button 
          onClick={disconnect}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      {providers?.map((provider: any) => (
        <button
          key={provider.metadata.id}
          onClick={() => provider.connect()}
          disabled={status === "connecting"}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Connect {provider.metadata.name}
        </button>
      ))}
    </div>
  );
}
