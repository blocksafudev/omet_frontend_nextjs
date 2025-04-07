const NetworkIconByChain = (chainId) => {
  switch (chainId) {
    default:
      return "/images/network/bsc.svg";
    case 1: // ETHEREUM
      return "/images/network/ethereum.svg";
    case 8453: // BASE
      return "/images/network/base.svg";
    case 5: // ETHEREUMTESTNETGOERLI
      return "/images/network/ethereumtestnet.svg";
    case 1337: // ETHEREUMTESTNETSEPOLIA
      return "/images/network/ethereumtestnet.svg";
    case 56: // BSC
      return "/images/network/bsc.svg";
    case 97: // BSCTESTNET
      return "/images/network/bsctestnet.svg";
    case 1116: // COREDAO
      return "/images/network/coredao.svg";
    case 1115: // COREDAOTESTNET
      return "/images/network/coredao.svg";
    case 42161: // ARBITRUM
      return "/images/network/arbitrum.svg";
    case 421611: // ARBITRUMTESTNET
      return "/images/network/arbitrum.svg";
    case 4200: // MERLIN
      return "/images/network/merlin.svg";
    case 660279: // XAI
      return "/images/network/xai.svg";
    case 250: // FANTOM
      return "/images/network/fantom.svg";
    case 4002: // FANTOMTESTNET
      return "/images/network/fantom.svg";
    case 137: // POLYGON
      return "/images/network/polygon.svg";
    case 80001: // POLYGONTESTNET
      return "/images/network/polygon.svg";
    case 43114: // AVALANCHE
      return "/images/network/avalanche.svg";
    case 43113: // AVALANCHETESTNET
      return "/images/network/avalanche.svg";
    case 25: // CRONOS
      return "/images/network/cronos.svg";
    case 338: // CRONOSTESTNET
      return "/images/network/cronos.svg";
    case 128: // HECO
      return "/images/network/heco.svg";
    case 256: // HECOTESTNET
      return "/images/network/heco.svg";
    case 106: // VELAS
      return "/images/network/velas.svg";
    case 42262: // OASIS
      return "/images/network/oasis.svg";
    case 42261: // OASISTESTNET
      return "/images/network/oasis.svg";
    case 10: // OPTIMISM
      return "/images/network/optimism.svg";
    case 69: // OPTIMISMTESTNET
      return "/images/network/optimism.svg";
    case 1284: // MOONBEAM
      return "/images/network/moonbeam.svg";
    case 1313161554: // AURORA
      return "/images/network/aurora.svg";
    case 1313161555: // AURORATESTNET
      return "/images/network/aurora.svg";
    case 3797: // ALVEY
      return "/images/network/alvey.svg";
    case 2000: // DOGECHAIN
      return "/images/network/dogechain.svg";
    case 568: // DOGECHAINTESTNET
      return "/images/network/dogechain.svg";
    case 34443: // MODEMAINNET
      return "/images/network/mode.svg";
  }
};
export default NetworkIconByChain;
