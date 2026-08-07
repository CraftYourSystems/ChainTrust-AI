import { algorandConfig } from "@/services/algorand/config";
import { walletRepository } from "../repository/wallet.repository";
import { WalletInfo, AssetInfo, AppOptIn, LocalState } from "../types/wallet.types";
import { emitBalanceLookupFailed } from "../events/wallet.events";
import { validateAlgorandAddress } from "../middleware/validation.middleware";

export class WalletService {
  /**
   * Fetches comprehensive wallet info using Algod and formats it into WalletInfo DTO.
   */
  async getWalletInfo(address: string): Promise<WalletInfo> {
    validateAlgorandAddress(address);
    
    try {
      const accountData = await walletRepository.getAccountInformation(address);
      
      const account: any = accountData;
      const rawAssets = account.assets || [];
      const appsLocalState = account.appsLocalState || account["apps-local-state"] || [];
      const minBal = account.minBalance || account["min-balance"] || 0;
      const pendingRew = account.pendingRewards || account["pending-rewards"] || 0;
      const createdRound = account.createdAtRound || account["created-at-round"] || 0;

      const assets: AssetInfo[] = rawAssets.map((a: any) => ({
        assetId: Number(a.assetId || a["asset-id"]),
        amount: BigInt(a.amount),
        isFrozen: Boolean(a.isFrozen || a["is-frozen"]),
      }));

      const appsOptedIn: AppOptIn[] = appsLocalState.map((app: any) => ({
        appId: Number(app.id),
        isCreator: false,
      }));

      const localStates: LocalState[] = appsLocalState.map((app: any) => ({
        appId: Number(app.id),
        keyValue: app.keyValue || app["key-value"] || [],
      }));

      const baseMinBalance = BigInt(100000);
      const assetAppMinBalance = BigInt(assets.length + appsOptedIn.length) * BigInt(100000);
      const minimumBalance = baseMinBalance + assetAppMinBalance + BigInt(minBal);
      const actualMinBalance = minBal ? BigInt(minBal) : minimumBalance;

      return {
        address,
        network: algorandConfig.network as any,
        balance: BigInt(account.amount || 0),
        minimumBalance: actualMinBalance,
        assets,
        createdRound: Number(createdRound),
        status: account.status || "Offline",
        isOnline: account.status === "Online",
        pendingRewards: BigInt(pendingRew),
        totalAssets: assets.length,
        appsOptedIn,
        localStates
      };
    } catch (error: any) {
      emitBalanceLookupFailed(address, error.message);
      throw error;
    }
  }

  /**
   * Returns just the balance in microAlgos.
   */
  async getBalance(address: string): Promise<bigint> {
    const info = await this.getWalletInfo(address);
    return info.balance;
  }
}

export const walletService = new WalletService();
