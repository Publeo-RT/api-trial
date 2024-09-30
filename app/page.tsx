// app/page.tsx

'use client';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function Home() {
  const { publicKey } = useWallet(); 
  const [balance, setBalance] = useState<number | null>(null);
 
  const fetchBalance = async (walletAddress: string) => {
    try {
      const response = await fetch(`/api/getBalance?walletAddress=${walletAddress}`);
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance); 
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    if (publicKey) {
      fetchBalance(publicKey.toString());
    }
  }, [publicKey]); 

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded p-4">
        <WalletMultiButton />
        {publicKey ? (
          <div>
            <p>Wallet Address: {publicKey.toString()}</p>
            {balance !== null ? (
              <p>Balance: {balance} SOL</p>
            ) : (
              <p>Loading balance...</p>
            )}
          </div>
        ) : (
          <p>Please connect your wallet.</p>
        )}
      </div>
    </main>
  );
}
