import { walletConnect } from "wagmi/connectors";

const projectId = "c177617b0f4b2b392d700ff660d251e2";

export const walletConnectConfig = new walletConnect({
  projectId: projectId,
  options: {
    projectId: projectId,
    metadata: {
      name: "Metti",
      description: "Metti",
      url: "https://metti.com",
      icons: ["https://metti.com/android-icon-192x192.webp"],
    },
    qrModalOptions: {
      themeMode: "dark",
    },
    relayUrl: `https://relay.walletconnect.com?projectId=${projectId}`,
    explorerRecommendedWalletIds: `https://explorer-api.walletconnect.com/w3m/v1/getDesktopListings?projectId=${projectId}&sdkType=wcm&sdkVersion=js-2.7.0&page=1&entries=9&version=2`,
  },
});
