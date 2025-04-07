export const getContractHolderList = (chain, address) => {
  return `https://api-scanner.blocksafu.com/scan?address=${address}&chainid=${chain}`;
};
