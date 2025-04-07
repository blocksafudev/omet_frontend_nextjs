"use client";

import {
  createWeb3Modal as createWeb3ModalSolana,
  defaultSolanaConfig,
} from "@web3modal/solana/react";

const projectId = "bd330e0387216caf3a534c90a2e623d1";

const metadata = {
  name: "AuditDeFi",
  description: "AuditDeFi Audit Platform",
  url: "https://auditdefi.com", // origin must match your domain & subdomain
  icons: ["https://auditdefi.com/android-icon-192x192.webp"],
};

const solanaChains = [
  {
    chainId: "mainnet-beta",
    name: "Solana Mainnet",
    currency: "SOL",
    explorerUrl: "https://solscan.io",
    rpcUrl: "https://api.mainnet-beta.solana.com",
  },
  {
    chainId: "testnet",
    name: "Solana Testnet",
    currency: "SOL",
    explorerUrl: "https://explorer.solana.com/?cluster=testnet",
    rpcUrl: "https://api.testnet.solana.com",
  },
  {
    chainId: "devnet",
    name: "Solana Devnet",
    currency: "SOL",
    explorerUrl: "https://explorer.solana.com/?cluster=devnet",
    rpcUrl: "https://api.devnet.solana.com",
  },
];

const solanaConfig = defaultSolanaConfig({
  chains: solanaChains,
  projectId,
  metadata,
});

createWeb3ModalSolana({
  solanaConfig,
  projectId,
  metadata,
  chains: solanaChains,
  enableAnalytics: false,
  termsConditionsUrl: "https://walletconnect.com/terms",
  privacyPolicyUrl: "https://walletconnect.com/privacy",
});

export function Web3SolanaModal({ children }) {
  return children;
}
