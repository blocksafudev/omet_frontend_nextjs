import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Web3EVMModal } from "@/components/Web3EVMModal";
import Web3Provider from "@/hooks/Web3Provider";
import { CustomProvider } from "rsuite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../components/wallet/wagmi.js";

export const dynamic = "force-static";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Web3Provider>
        <CustomProvider theme="light">
          <Component {...pageProps} />
          {/*<GoogleAnalytics gaId="G-EC0W17C16N"></GoogleAnalytics>*/}
          <ToastContainer
            position={"bottom-center"}
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            icon={"🚀"}
          />
        </CustomProvider>
      </Web3Provider>
    </QueryClientProvider>
  );
}
