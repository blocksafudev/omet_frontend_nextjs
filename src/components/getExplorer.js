export const getExplorerApiUrl = (chain, address) => {
    // console.log('Chain Id get', chain);
    switch (chain) {
        case '1': // ethereum
            return `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=H74JNUTV7GG3MSJIJY9FVDS3QUV9M7W6S3`;
        case '5': // goerli
            return `https://api-goerli.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=H74JNUTV7GG3MSJIJY9FVDS3QUV9M7W6S3`;
        case '1115511': // sepolia
            return `https://api-sepolia.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=H74JNUTV7GG3MSJIJY9FVDS3QUV9M7W6S3`;
        case '10': // optimistic
            return `https://api-optimistic.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=352BSBZBC1GFSX4SYHX4HHFTKH3IT8U1QJ`;
        case '420': // optimistic
            return `https://api-goerli-optimistic.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=352BSBZBC1GFSX4SYHX4HHFTKH3IT8U1QJ`;
        case '25': // cronos
            return `https://api.cronoscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=MBFZAH4WV1A3TJP3BPIFHNA6AUH1YSUUU8`;
        case '42220': // celo
            return `https://api.celoscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=93TYWBIM9QZHIY6Q2369ZBAEG7S47TKE4G`;
        case '100': // gnosis
            return `https://api.gnosisscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=B5BRMZJSX48CCKZ7268C85F3D4CXZR5B39`;
        case '1284': // moonbeam
            return `https://api-moonbeam.moonscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=GK6MJ65CPI3ZQ7XFM5ESI9IIK486DSB5FN`;
        case '1285': // moonriver
            return `https://api-moonriver.moonscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=MXTZACHV6S1P98BPZW48XQ6V1WWBCVWHFB`;
        case '56': // binance smart chain
            return `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=NA4XYPE4QGPI7KPFNJYCZMM5JUI2A64XQF`;
        case '97': // testnet binance smart chain
            return `https://api-testnet.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=NA4XYPE4QGPI7KPFNJYCZMM5JUI2A64XQF`;
        case '137': // polygon
            return `https://api.polygonscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=WN7H195PU59BN1TIZTNSJ9ZVQS76ZPNXYI`;
        case '80001': // testnet polygon
            return `https://api-testnet.polygonscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=WN7H195PU59BN1TIZTNSJ9ZVQS76ZPNXYI`;
        case '43114': // Avalanche Mainnet
            return `https://api.snowtrace.io/api?module=contract&action=getsourcecode&address=${address}&apikey=ZM3T8I43K82711MRKXR9EHTI9U6VYYDX1N`;
        case '43113': // Avalanche Fuji Testnet
            return `https://api-testnet.snowtrace.io//api?module=contract&action=getsourcecode&address=${address}&apikey=ZM3T8I43K82711MRKXR9EHTI9U6VYYDX1N`;
        case '250': // Fantom Mainnet
            return `https://api.ftmscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=5WE7EW4CXKP9HA6JUWPTMAZYV7WK4BAVXC`;
        case '4002': // Fantom Testnet
            return `https://api-testnet.ftmscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=5WE7EW4CXKP9HA6JUWPTMAZYV7WK4BAVXC`;
        case '42161': // Arbitrum Mainnet
            return `https://api.arbiscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=REBAMM9GXZTWT5416BB3JTNFKPSCCFP1T5`;
        case '42170': // Arbitrum Rinkeby Testnet
            return `https://api-goerli.arbiscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=REBAMM9GXZTWT5416BB3JTNFKPSCCFP1T5`;
        case '4200': // Merlin Mainnet
            return `https://scan.merlinchain.io/api?address=${address}&api_key=e6a1875f-e85e-46da-bb24-05b19588f740&module=contract&action=getsourcecode`;
        case '1116': // Coredao Mainnet
            return `https://openapi.coredao.org/api?module=contract&action=getsourcecode&address=${address}&apikey=0357cdc116a84442b35572c47b6a971e`;
        case '8453': // Coredao Mainnet
            return `https://api.basescan.org/api?module=contract&action=getsourcecode&address=${address}&apikey=1P9BQQSPD85XR261A4RANHANC2NQPS9R35`;
        default:
            return `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${address}&apikey=NA4XYPE4QGPI7KPFNJYCZMM5JUI2A64XQF`;
    }
};