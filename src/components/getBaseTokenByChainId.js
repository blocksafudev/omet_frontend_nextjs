export const getBaseTokenByChainId = (chain) => {
    // console.log('Chain Id get', chain);
    switch (chain) {
        case 1:
            return {
                'token': 'ETH',
                'icon': '/images/network/ethereum.svg'
            }
        case 56:
            return {
                'token': 'BNB',
                'icon': '/images/network/bsc.svg'
            }
        case 97:
            return {
                'token': 'TBNB',
                'icon': '/images/network/bsctestnet.svg'
            }
        case 1337:
            return {
                'token': 'GETH',
                'icon': '/images/network/ethereumtestnet.svg'
            }
        default:
            return {
                'token': 'NAN',
                'icon': '/images/network/eth.svg'
            };
    }
};