import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SimpleSolanaContractPlayground } from "../target/types/simple_solana_contract_playground";
import { Keypair, SystemProgram } from "@solana/web3.js";

describe("simple_solana_contract_playground", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SimpleSolanaContractPlayground as Program<SimpleSolanaContractPlayground>;

  const baseAccount = Keypair.generate();

  it("Initializes the counter", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([baseAccount])
      .rpc();

    console.log("Transaction Signature (Initialize):", tx);
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Counter initialized with value:", account.counter.toString());
  });

  it("Increments the counter", async () => {
    const tx = await program.methods
      .increment()
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
      .rpc();

    console.log("Transaction Signature (Increment):", tx);
    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log("Counter incremented to:", account.counter.toString());
  });
});
