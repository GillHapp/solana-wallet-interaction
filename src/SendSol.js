import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

const SendSol = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    const sendSol = async event => {
        event.preventDefault();

        if (!publicKey) {
            console.error("Wallet not connected");
            return;
        }

        try {
            const recipientPubKey = new PublicKey(event.target.recipient.value);

            const transaction = new Transaction();
            const sendSolInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: recipientPubKey,
                lamports: 0.1 * LAMPORTS_PER_SOL, // Sending 0.1 SOL
            });

            transaction.add(sendSolInstruction);

            const signature = await sendTransaction(transaction, connection);
            console.log(`Transaction signature: ${signature}`);
        } catch (error) {
            console.error("Transaction failed", error);
        }
    };

    return (
        <form onSubmit={sendSol}>
            <input type="text" name="recipient" placeholder="Recipient Public Key" required />
            <button type="submit">Send 0.1 SOL</button>
        </form>
    );
};

export default SendSol;
