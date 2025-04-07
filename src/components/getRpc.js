export const getRpcUrl = (chain) => {
    // console.log('Chain Id get', chain);
    switch (chain) {
        case '1':
            return "https://mainnet.infura.io/v3/c6b754e60c1c47fba1e01316a010b17c";
        case '3':
            return "https://ropsten.infura.io/v3/c6b754e60c1c47fba1e01316a010b17c";
        case '4':
            return "https://rinkeby.infura.io/v3/c6b754e60c1c47fba1e01316a010b17c";
        case '5':
            return "https://goerli.infura.io/v3/c6b754e60c1c47fba1e01316a010b17c";
        case '42':
            return "https://kovan.infura.io/v3/c6b754e60c1c47fba1e01316a010b17c";
        case '56':
            return "https://bsc-dataseed1.defibit.io";
        case '97':
            return "https://bsc-testnet.public.blastapi.io/";
        case '137':
            return "https://rpc-mainnet.maticvigil.com";
        case '80001':
            return "https://rpc-mumbai.maticvigil.com";
        case '43114': // Avalanche Mainnet
            return "https://api.avax.network/ext/bc/C/rpc";
        case '43113': // Avalanche Fuji Testnet
            return "https://api.avax-test.network/ext/bc/C/rpc";
        case '250': // Fantom Mainnet
            return "https://rpcapi.fantom.network";
        case '4002': // Fantom Testnet
            return "https://rpc.testnet.fantom.network";
        case '42161': // Arbitrum Mainnet
            return "https://arb1.arbitrum.io/rpc";
        case '42170': // Arbitrum Rinkeby Testnet
            return "https://rinkeby.arbitrum.io/rpc";
        case '4200': // Merlin Testnet
            return "https://rpc.merlinchain.io";
        case '660279': //XAI
            return "https://xai-chain.net/rpc";
        case '1116': // Coredao Mainnet
            return "https://rpc.coredao.org";
        case '8453': // Coredao Mainnet
            return "https://mainnet.base.org";
        default:
            return "https://bsc-dataseed1.defibit.io";
    }
};