import algosdk from "algosdk";
import prisma from "./src/lib/db";

async function generateTestUsers() {
  console.log("=== ChainTrust-AI Test User Generator ===\n");

  // Generate 2 fresh test Algorand wallets
  const user1Account = algosdk.generateAccount();
  const user2Account = algosdk.generateAccount();

  const user1Mnemonic = algosdk.secretKeyToMnemonic(user1Account.sk);
  const user2Mnemonic = algosdk.secretKeyToMnemonic(user2Account.sk);

  const addr1 = typeof user1Account.addr === "string" ? user1Account.addr : (user1Account.addr as any).toString();
  const addr2 = typeof user2Account.addr === "string" ? user2Account.addr : (user2Account.addr as any).toString();

  console.log("👤 Test User 1 (Auditor Alpha):");
  console.log(` -> Wallet Address: ${addr1}`);
  console.log(` -> Mnemonic Seed:  ${user1Mnemonic}\n`);

  console.log("👤 Test User 2 (Client Beta):");
  console.log(` -> Wallet Address: ${addr2}`);
  console.log(` -> Mnemonic Seed:  ${user2Mnemonic}\n`);

  // Seed into database if Prisma DB is active
  try {
    const dbUser1 = await prisma.user.upsert({
      where: { walletAddress: addr1 },
      update: {},
      create: {
        walletAddress: addr1,
        status: "ACTIVE"
      }
    });

    const dbUser2 = await prisma.user.upsert({
      where: { walletAddress: addr2 },
      update: {},
      create: {
        walletAddress: addr2,
        status: "ACTIVE"
      }
    });

    console.log("✅ Database Test Users Created Successfully!");
    console.log(` -> DB User 1 ID: ${dbUser1.id}`);
    console.log(` -> DB User 2 ID: ${dbUser2.id}\n`);
  } catch (e: any) {
    console.log("ℹ Note: Database seeding skipped (Prisma running in mock/offline mode).");
  }

  console.log("=== Ready for Presentation ===");
}

generateTestUsers().catch(console.error);
