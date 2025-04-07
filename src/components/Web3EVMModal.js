"use client";

import React from "react";
import { createAppKit } from "@reown/appkit/react";
import {
  mainnet,
  arbitrum,
  bsc,
  polygon,
  fantom,
  bscTestnet,
} from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "viem";

const projectId = "a256ffa9bc86473be8025c3db33038ca";

const foundryLocal = defineChain({
  id: 31337,
  name: "Local",
  nativeCurrency: {
    name: "LCL",
    symbol: "LCL",
    decimals: 18,
  },
  chainNamespace: "eip155",
  caipNetworkId: "eip155:31337",
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8546"] },
    public: { http: ["http://127.0.0.1:8546"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
  contracts: {},
});

const foundryNetwork = defineChain({
  id: 31338,
  name: "Blocksafu Dev",
  nativeCurrency: {
    name: "BDEV",
    symbol: "BDEV",
    decimals: 18,
  },
  chainNamespace: "eip155",
  caipNetworkId: "eip155:31337",
  rpcUrls: {
    default: { http: ["https://cats.blocksafu.com"] },
    public: { http: ["https://cats.blocksafu.com"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://etherscan.io" },
  },
  contracts: {},
});

const metadata = {
  name: "Metti",
  description: "Metti DeFi Platform",
  url: "https://metti.com",
  icons: ["https://metti.com/android-512x512.png"],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [
    mainnet,
    bsc,
    bscTestnet,
    // polygon,
    // arbitrum,
    // fantom,
    foundryLocal,
    foundryNetwork,
  ],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
  themeVariables: {
    "--w3m-accent": "#292929",
    "--w3m-font-size-master": "10px",
  },
});

export function Web3EVMModal({ children }) {
  return <div className="text-black">{children}</div>;
}
