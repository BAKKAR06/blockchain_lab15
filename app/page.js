"use client";

import { useState } from "react";
import { ethers } from "ethers";

// 👉 ТВОИ АДРЕСА
const CONTRACT_ADDRESS = "0xC516a4fd6a9B288bb939b3a90905147ED119815C";
const TOKEN_ADDRESS = "0x502131368999e4130b9c5AB68d32B6Ac844fE541";

export default function Home() {

  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");

  // 🔗 Подключение кошелька
  const connect = async () => {
    const acc = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(acc[0]);
  };

  // ✅ APPROVE
  const approve = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const token = new ethers.Contract(
      TOKEN_ADDRESS,
      ["function approve(address,uint256)"],
      signer
    );

    const tx = await token.approve(
      CONTRACT_ADDRESS,
      ethers.parseUnits(amount, 18)
    );

    await tx.wait();
    alert("Approved!");
  };

  // 🔥 STAKE
  const stake = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ["function stake(uint256)"],
      signer
    );

    const tx = await contract.stake(
      ethers.parseUnits(amount, 18)
    );

    await tx.wait();
    alert("Staked!");
  };

  // 💰 UNSTAKE
  const unstake = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ["function unstake()"],
      signer
    );

    const tx = await contract.unstake();
    await tx.wait();

    alert("Unstaked!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🔥 Staking DApp</h1>

      <button onClick={connect}>
        {account || "Connect Wallet"}
      </button>

      <br /><br />

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      {/* 👇 ПРАВИЛЬНЫЙ ПОРЯДОК */}
      <button onClick={approve}>Approve</button>
      <button onClick={stake}>Stake</button>
      <button onClick={unstake}>Unstake</button>
    </div>
  );
}