// app/api/getBalance/route.js

import { Connection, PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
  }

  try {
    const connection = new Connection('https://api.devnet.solana.com');     
    const publicKey = new PublicKey(walletAddress);    
    const balance = await connection.getBalance(publicKey);    
    const balanceInSol = balance / 1e9;
    return NextResponse.json({ balance: balanceInSol });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}
