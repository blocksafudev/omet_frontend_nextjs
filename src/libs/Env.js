export const getEnv = () => {
    return require("../configs/app.json");
}
export const getAppByChainId = (chainId) => {
    if (chainId === 97) return require("../configs/appChain97.json");
    if (chainId === 56) return require("../configs/appChain56.json");
    if (chainId === 1337) return require("../configs/appChain1337.json");
    if (chainId === 31337) return require("../configs/appChain31337.json");
    if (chainId === 31338) return require("../configs/appChain31338.json");
}