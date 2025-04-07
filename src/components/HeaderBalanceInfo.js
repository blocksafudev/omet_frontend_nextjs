import Image from "next/image";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { ethers } from "ethers";
import { getAppByChainId } from "@/libs/Env";
import { useEffect, useState } from "react";
import { BigNumber } from "bignumber.js";
import { formatCurrency } from "@/lib/utils";
import { Popover } from "@headlessui/react";

const HeaderBalanceInfo = () => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [tokenAmount, setTokenAmount] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState(0);
  const [usdtName, setUsdtName] = useState("");

  const initialize = async () => {
    if (!chainId) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const {
        METTI_ADDRESS,
        USDT_ADDRESS,
        ERC20_ABI,
        PAYMENT_GATEWAY_ABI,
        PAYMENT_GATEWAY_ADDRESS,
      } = getAppByChainId(chainId);

      const [mettiToken, paymentGateway, usdtToken] = await Promise.all([
        new ethers.Contract(METTI_ADDRESS, ERC20_ABI, signer),
        new ethers.Contract(
          PAYMENT_GATEWAY_ADDRESS,
          PAYMENT_GATEWAY_ABI,
          signer
        ),
        new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer),
      ]);

      const [usdtDecimals, usdtSymbol, balanceInWei, tokenDecimal] =
        await Promise.all([
          usdtToken.decimals(),
          usdtToken.symbol(),
          mettiToken.balanceOf(address),
          mettiToken.decimals(),
        ]);

      setUsdtName(usdtSymbol);

      const balanceInBigNumber = new BigNumber(balanceInWei.toString());
      const amountInEther = balanceInBigNumber.div(
        new BigNumber(10).pow(tokenDecimal)
      );

      const estimateInWei = new BigNumber(
        await paymentGateway.getAmountInDollar(balanceInWei)
      );
      const estimateInEther = estimateInWei.div(
        new BigNumber(10).pow(usdtDecimals)
      );

      setTokenAmount(formatCurrency(amountInEther.toString(), 4));
      setUsdtAmount(formatCurrency(estimateInEther.toString(), 4));
    } catch (error) {
      console.error("Initialization failed:", error);
    }
  };

  useEffect(() => {
    if (isConnected && chainId) {
      initialize().then();
    }
  }, [isConnected]);

  if (!isConnected) return <></>;

  return (
    <Popover className="relative">
      <Popover.Button className="p-1.5 border border-blackn-500 rounded-full">
        <Image
          src="/images/icon-reward/metti.svg"
          width="24"
          height="24"
          alt="Metti"
        />
      </Popover.Button>
      <Popover.Panel className="absolute mt-2 space-y-2 w-max z-10 bg-blackn-1000 p-4 rounded shadow-lg">
        <div className="text-white font-semibold">Balance Metti:</div>
        <div className="flex justify-start gap-2">
          <Image
            src="/images/icon-reward/metti.svg"
            width="24"
            height="24"
            alt="Metti"
          />
          <div className="text-white whitespace-nowrap">
            {tokenAmount} METTI
          </div>
        </div>
        <div className="text-gray-400">
          Est:({usdtAmount} {usdtName})
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default HeaderBalanceInfo;
