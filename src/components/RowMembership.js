import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { getAppByChainId } from "@/libs/Env";
import { ethers } from "ethers";
import { BigNumber } from "bignumber.js";
import Spinner from "@/components/Spinner";
import ButtonSpinner from "@/components/ButtonSpinner";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useERC20 from "@/hooks/useERC20";
import useEVMContract from "@/hooks/useEVMContract";
import { formatCurrency } from "@/lib/utils";

const RowMembership = ({ membership }) => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [estimateInToken, setEstimateInToken] = useState(null);
  const {
    isNeedApprove,
    isLoading,
    handleApprove,
    setTokenAddress,
    tokenDecimal,
    checkIsNeedApprove,
    tokenSymbol,
    tokenInstance,
  } = useERC20("Membership");
  const {
    setTokenAddress: setTokenAddressUsdt,
    tokenDecimal: tokenDecimalUsdt,
  } = useERC20("Membership");
  const [isLoadingBuy, setIsLoadingBuy] = useState(false);
  const {
    contractInstance: contractInstancePaymentGateway,
    setContractAddress: setPaymentGatewayAddress,
    setAbi: setPaymentGatewayAbi,
    callFunction,
  } = useEVMContract();

  //region function
  const checkEstimateInToken = async () => {
    const amount = BigNumber(membership.price_per_month_in_dollars)
      .multipliedBy(membership.duration_in_month)
      .toString();
    const estimate = await contractInstancePaymentGateway.getAmountInToken(
      ethers.parseUnits(amount, tokenDecimalUsdt).toString()
    );

    setEstimateInToken(estimate.toString());

    await checkIsNeedApprove(
      getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
      estimate.toString()
    );
  };

  useEffect(() => {
    if (!isConnected || !chainId) return;
    setTokenAddress(getAppByChainId(chainId).METTI_ADDRESS);
    setTokenAddressUsdt(getAppByChainId(chainId).USDT_ADDRESS);
    setPaymentGatewayAddress(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS);
    setPaymentGatewayAbi(getAppByChainId(chainId).PAYMENT_GATEWAY_ABI);
  }, [isConnected, chainId, address]);

  useEffect(() => {
    if (!contractInstancePaymentGateway || !tokenInstance || !tokenDecimalUsdt)
      return;
    checkEstimateInToken().then();
  }, [tokenInstance, contractInstancePaymentGateway, tokenDecimalUsdt]);

  const handleBuy = async () => {
    try {
      setIsLoadingBuy(true);
      await callFunction(
        "Submit Membership",
        estimateInToken,
        tokenSymbol,
        "paymentInToken",
        [
          1, // for membership
          membership.id,
          estimateInToken,
          "0x1c73DB7f440BA45C75bE0bfb2D55F6FD1127411e", //referral
        ]
      );
      await checkEstimateInToken();
      toast.success("Transaction submitted successfully!");
    } catch (e) {
      console.error("Error buying:", e);
      toast.error("Transaction failed!");
    } finally {
      setIsLoadingBuy(false);
    }
  };
  //endregion

  return (
    <div className="p-8 bg-blackn-50 border border-blackn-200 text-center rounded-3xl shadow-xl">
      <h1 className="text-blackn-1000 font-semibold text-2xl">
        {membership?.name}
      </h1>
      <p className="pt-2 tracking-wide">
        <span className="text-black align-top">$ </span>
        <span className="text-3xl text-blackn-1000 font-semibold">
          {membership?.price_per_month_in_dollars}
        </span>
        <span className="text-blackn-800 font-medium">/ month</span>
        <div className={"text-sm text-black"}>
          Est:{" "}
          {formatCurrency(
            ethers.formatEther(estimateInToken || 0, tokenDecimal)
          )}{" "}
          {tokenSymbol}
        </div>
      </p>
      <hr className="mt-4 border-1" />
      <div className="pt-8">
        <p className="font-semibold text-blackn-900 text-left">
          {membership?.description}
        </p>

        {isNeedApprove && (
          <ButtonSpinner
            label={"Approve"}
            isLoading={isLoading || isLoadingBuy}
            onClick={() =>
              handleApprove(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS)
            }
            btnClassName={
              "w-full py-4 bg-blackn-1000 mt-8 rounded-xl text-white"
            }
          />
        )}
        {!isNeedApprove && (
          <ButtonSpinner
            label={"Choose Plan"}
            isLoading={isLoading || isLoadingBuy}
            onClick={handleBuy}
            btnClassName={
              "w-full py-4 bg-blackn-1000 mt-8 rounded-xl text-white"
            }
          />
        )}
      </div>
    </div>
  );
};

export default RowMembership;
