import {createConfig, http} from "wagmi";
import {base, bsc, bscTestnet, mainnet, polygon} from "wagmi/chains";
import {useState} from "react";
import {walletConnectConfig} from "./walletConnectConfig";
import {injected} from "@wagmi/core";
import {defineChain} from "viem";

const projectId = "a256ffa9bc86473be8025c3db33038ca";
// const projectId = "bd330e0387216caf3a534c90a2e623d1";

const safePalConnector = new injected({
  chains: [mainnet, bsc, bscTestnet, polygon],
  options: {
    name: 'SafePal',
    shimDisconnect: true,
    getProvider: () => typeof window !== 'undefined' ? window.safepalProvider : undefined,
  },
});

const twtConnector = new injected({
  chains: [mainnet, bsc, bscTestnet, polygon],
  options: {
    name: 'SafePal',
    shimDisconnect: true,
    getProvider: () => typeof window !== 'undefined' ? window?.trustwallet?.ethereum : undefined,
  },
});

const phantomConnector = new injected({
  chains: [mainnet, bsc, bscTestnet, polygon],
  options: {
    name: 'Phantom',
    shimDisconnect: true,
    getProvider: () => typeof window !== 'undefined' ? window.phantom : undefined,
  },
});
const foundry = defineChain({
  id: 31337,
  name: 'Foundry',
  nativeCurrency: {
    name: 'FDRY',
    symbol: 'FDRY',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://etherscan.io' },
  },
  contracts: {
    multicall3: {
    },
  },
})

export const config = createConfig({
  chains: [
    mainnet,
      foundry
    // base,
    // bsc,
    // bscTestnet,
    // polygon
  ],
  connectors: [
    // injected(),
    safePalConnector,
    // phantomConnector,
    walletConnectConfig,
    // metaMask(),
    // safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [foundry.id]: http(),
  },
  dappMetadata: {
    name: "Safupump",
    url: "https://safupump.com",
    description: "Safupump",
    icons: ["https://safupump.com/android-icon-192x192.webp"],
    enableAnalytics: true,
  },
});

export const useWagmiState = () => {
  const [wagmiState, setWagmiState] = useState(null);
  return {wagmiState, setWagmiState};
};
