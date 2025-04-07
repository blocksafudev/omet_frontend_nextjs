export const getExplorerUrl = (chain) => {
    // console.log('Chain Id get', chain);
    switch (chain) {
        case '1': // ethereum
            return `https://etherscan.io`;
        case '5': // goerli
            return `https://etherscan.io`;
        case '1115511': // sepolia
            return `https://sepolia.etherscan.io`;
        case '10': // optimistic
            return `https://optimistic.etherscan.io`;
        case '420': // optimistic
            return `https://goerli-optimistic.etherscan.io`;
        case '25': // cronos
            return `https://cronoscan.com`;
        case '42220': // celo
            return `https://celoscan.io`;
        case '100': // gnosis
            return `https://gnosisscan.io`;
        case '1284': // moonbeam
            return `https://moonbeam.moonscan.io`;
        case '1285': // moonriver
            return `https://moonriver.moonscan.io`;
        case '56': // binance smart chain
            return `https://bscscan.com`;
        case '97': // testnet binance smart chain
            return `https://testnet.bscscan.com`;
        case '137': // polygon
            return `https://polygonscan.com`;
        case '80001': // testnet polygon
            return `https://testnet.polygonscan.com`;
        case '43114': // Avalanche Mainnet
            return `https://snowtrace.io`;
        case '43113': // Avalanche Fuji Testnet
            return `https://testnet.snowtrace.io/`;
        case '250': // Fantom Mainnet
            return `https://ftmscan.com`;
        case '4002': // Fantom Testnet
            return `https://testnet.ftmscan.com`;
        case '42161': // Arbitrum Mainnet
            return `https://arbiscan.io`;
        case '42170': // Arbitrum Rinkeby Testnet
            return `https://arbiscan.io`;
        case '4200': // Merlin
            return `https://scan.merlinchain.io`;
        case '660279': // XAI
            return `https://explorer.xai-chain.net`;
        case '1116': // Coredao Mainnet
            return `https://scan.coredao.org`
        case '8453': // Coredao Mainnet
            return `https://basescan.org`
        default:
            return `https://bscscan.com`;
    }
};