import React, { useEffect, useState } from "react";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useWeb3Context } from "@/hooks/Web3Context";
import { ethers, formatEther } from "ethers";
import BLOCKSAFU_ABI from "../ABI/usdt-abi.json";

export function WalletConnectEVM() {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { setAddress, setAddressGlobal, setChainId, setUsdtBalanceGlobal } =
    useWeb3Context();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const fetchData = async () => {
        try {
          setAddress(address);
          setAddressGlobal(address);
          setChainId(chainId);
          const BSC_RPC_URL = "https://bsc-dataseed2.defibit.io/";
          const bscProvider = new ethers.JsonRpcProvider(BSC_RPC_URL);
          const BLOCKSAFU_TOKEN_ADDRESS =
            "0x32bFd701655EDF95809EaA5e525F0024ea571267";

          const tokenContractOnBSC = new ethers.Contract(
            BLOCKSAFU_TOKEN_ADDRESS,
            BLOCKSAFU_ABI,
            bscProvider
          );
          const blockSafuBalanceOnBSC = await tokenContractOnBSC.balanceOf(
            address || "0x0000000000000000000000000000000000000001"
          );
          const formattedBalance = formatEther(blockSafuBalanceOnBSC);
          setUsdtBalanceGlobal(formattedBalance);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setAddress(null);
      setAddressGlobal(null);
      setChainId(null);
      setLoading(false);
    }
  }, [address, chainId, isConnected, setAddress, setAddressGlobal, setChainId]);

  return (
    <div className="">
      {loading ? (
        <div>Loading...</div> // Placeholder saat data sedang dimuat
      ) : (
        <appkit-button size="md" />
      )}
    </div>
  );
}
