import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import {
  RiArrowRightSLine,
  RiLinksLine,
  RiQrCodeLine,
  RiRefreshLine,
  RiUser5Line,
  RiWalletLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Image from "next/image";
import useERC20 from "@/hooks/useERC20";
import { getAppByChainId } from "@/libs/Env";
import { formatCurrency } from "@/lib/utils";
import { ethers } from "ethers";
import ButtonSpinner from "@/components/ButtonSpinner";
import { toast } from "react-toastify";
import useEVMContract from "@/hooks/useEVMContract";
import { BigNumber } from "bignumber.js";
import { useQuery } from "@tanstack/react-query";
import useProfile from "@/hooks/useProfile";

const Header = dynamic(
  () => import("@/components/Header").then((mod) => mod.Header),
  {
    ssr: false,
  }
);
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  {
    ssr: false,
  }
);

export default function Earning() {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const { profile, refetchProfile } = useProfile();
  const [clientConnected, setClientConnected] = useState(false);
  const {
    setTokenAddress,
    tokenSymbol,
    tokenName,
    tokenDecimal,
    balance,
    isNeedApprove,
    checkIsNeedApprove,
    handleApprove,
    isLoading,
  } = useERC20("Earning");
  const [amountStake, setAmountStake] = useState(0);
  const {
    contractInstance: contractInstancePaymentGateway,
    setContractAddress: setPaymentGatewayAddress,
    setAbi: setPaymentGatewayAbi,
    callFunction,
    isLoading: isLoadingPaymentGateway,
  } = useEVMContract();

  const handleOnStake = async () => {
    try {
      const _amountStake = ethers
        .parseUnits((amountStake || 0).toString(), tokenDecimal)
        .toString();
      await callFunction(
        "Submit Earning",
        _amountStake,
        tokenSymbol,
        "paymentInToken",
        [
          3, // for earning
          1,
          _amountStake,
          "0x1c73DB7f440BA45C75bE0bfb2D55F6FD1127411e", //referral
        ]
      );
      setAmountStake(0);
      toast.success("Transaction submitted successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to stake");
    }
  };

  const handleOnHalf = async () => {
    if (!balance) return;
    const currentBalance = new BigNumber(balance);
    const halfBalance = currentBalance.div(2);
    setAmountStake(
      ethers.formatEther(halfBalance.toFixed().toString() || "0", tokenDecimal)
    );
  };

  const handleOnMax = (async) => {
    if (!balance) return;
    setAmountStake(ethers.formatEther(balance.toString() || "0", tokenDecimal));
  };

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected || !chainId) return;
    setTokenAddress(getAppByChainId(chainId).METTI_ADDRESS);
    setPaymentGatewayAddress(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS);
    setPaymentGatewayAbi(getAppByChainId(chainId).PAYMENT_GATEWAY_ABI);
  }, [isConnected, chainId]);

  useEffect(() => {
    if (!tokenDecimal) return;
    checkIsNeedApprove(
      getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
      ethers.parseUnits((amountStake || 0).toString(), tokenDecimal)
    );
  }, [tokenDecimal, amountStake]);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover Metti, a revolutionary digital asset driving DeFi adoption with a reliable blockchain protocol and exceptional value token."
        />
        <meta
          name="keywords"
          content="Metti, digital asset, DeFi, blockchain protocol, cryptocurrency, tokenomics, token listing, secure platform, swap, minting, earning, farming, staking"
        />
        <meta name="author" content="Metti" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" href="https://www.metti.com" />
        <meta
          property="og:title"
          content="Metti: Revolutionizing Digital Assets with DeFi"
        />
        <meta
          property="og:description"
          content="Explore Metti, a cutting-edge digital asset that enhances DeFi adoption through a robust blockchain protocol and valuable token."
        />
        <meta
          property="og:image"
          content="https://metti.com/images/hero.jpeg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.metti.com" />
        <meta property="og:site_name" content="Metti" />
        <meta
          name="twitter:title"
          content="Metti: Revolutionizing Digital Assets with DeFi"
        />
        <meta
          name="twitter:description"
          content="Explore Metti, a cutting-edge digital asset that enhances DeFi adoption through a robust blockchain protocol and valuable token."
        />
        <meta
          name="twitter:image"
          content="https://metti.com/images/hero.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Metti" />
        <meta name="twitter:creator" content="@Metti" />
        <meta name="application-name" content="Metti" />
        <meta name="apple-mobile-web-app-title" content="Metti" />
        <link
          rel="preconnect"
          href="https://70c64d66e728804e3edd880dfb150846@o4504710970146816.ingest.us.sentry.io"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://pulse.walletconnect.com" />
        <link rel="preconnect" href="https://api.web3modal.com" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            name: "Metti",
            url: "https://metti.com",
            description:
              "Metti offers a secure and innovative platform for digital asset management, including features like swap, minting, earning, farming, and staking.",
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            serviceType: "Digital Asset Management",
            provider: {
              "@type": "Organization",
              name: "Metti",
            },
            description:
              "Metti provides a comprehensive platform for digital asset management with features such as swap, minting, earning, farming, and staking.",
            areaServed: "Global",
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Does Metti support BSC networks for digital asset management?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Metti provides full support for managing digital assets on Binance Smart Chain networks.",
                },
              },
              {
                "@type": "Question",
                name: "What features does the Metti platform offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Metti offers several features, including swap, minting, earning, farming, and staking.",
                },
              },
            ],
          })}
        </script>

        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/webp"
          sizes="192x192"
          href="/android-icon-192x192.webp"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <title>Metti - Innovative Digital Asset Management Platform</title>
      </Head>

      <Header />

      <div className="pt-28">
        <div className="bg-black px-6 py-8 lg:py-6 md:px-12 lg:px-20 overflow-x-scroll">
          <div className="flex justify-start gap-4 items-center">
            <Link
              href="/"
              prefetch={false}
              className="text-white font-semibold whitespace-nowrap"
            >
              Home
            </Link>
            <RiArrowRightSLine className="text-blackn-200 w-max" />
            <div className="text-white font-semibold whitespace-nowrap">
              Earning
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        <div className="bg-blackn-1000 bg-plusbg bg-no-repeat bg-fill lg:bg-cover lg:bg-center border p-5 border-blackn-200 rounded-lg flex flex-col lg:flex-row lg:justify-between items-center">
          <div className="flex flex-col lg:flex-row justify-start items-center gap-3">
            <Image
              src="/images/icon-reward/metti.svg"
              width="40"
              height="40"
              alt="Metti Icon"
            />
            <div className="text-lg text-white font-semibold whitespace-nowrap">
              Hi {profile?.data?.address}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center gap-3 w-full lg:w-max">
            <div className="border lg:w-max w-full lg:mt-0 mt-4 border-white rounded-lg flex gap-6 justify-start items-center p-4 bg-blackn-1000">
              <div className="text-white">Marketcap:</div>
              <div className="text-white">$1,000,000</div>
            </div>
            <div className="border lg:w-max w-full border-white rounded-lg flex flex-col lg:flex-row gap-3 justify-start items-center p-4 bg-blackn-1000">
              <div className="text-white">Total Value Locked:</div>
              <div className="text-white flex justify-start items-center gap-1">
                <Image
                  src="/images/icon-reward/metti.svg"
                  width="20"
                  height="20"
                  alt="Metti Icon"
                />{" "}
                $1,000,000
              </div>
              <div className="text-white">≈</div>
              <div className="text-white flex justify-start items-center gap-1">
                <Image
                  src="/images/icon-reward/usdt.svg"
                  width="20"
                  height="20"
                  alt="USDT Icon"
                />
                $1,000,000
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex flex-col gap-6 w-full">
            <div className="rounded-xl border border-blackn-200 p-5 text-black w-full space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-9 h-9 flex justify-center items-center border border-blackn-200 text-blackn-1000 rounded-lg bg-blackn-50">
                    <RiRefreshLine />
                  </div>
                  <button
                    type={"button"}
                    className="px-6 py-2 text-sm border border-blackn-200 text-blackn-1000 rounded-lg bg-blackn-50 hover:bg-blackn-700"
                    onClick={handleOnHalf}
                  >
                    Half
                  </button>
                  <button
                    type={"button"}
                    onClick={handleOnMax}
                    className="px-6 py-2 text-sm border border-blackn-200 text-blackn-1000 rounded-lg bg-blackn-50 hover:bg-blackn-700"
                  >
                    Max
                  </button>
                </div>

                <div className="flex justify-end items-center gap-2">
                  <RiWalletLine className="text-black w-5 h-5" />
                  <div className="text-black">
                    {formatCurrency(
                      ethers.formatEther(balance, tokenDecimal),
                      4
                    )}
                    &nbsp;{tokenSymbol || "MTT"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-between items-center">
                <input
                  type="number"
                  className="bg-blackn-50 border border-blackn-200 text-blackn-1000 w-full rounded-lg py-3"
                  placeholder="0.00"
                  value={amountStake}
                  onChange={(e) => setAmountStake(e.target.value)}
                />
                <div className="text-black font-semibold">
                  {tokenSymbol || "MTT"}
                </div>
              </div>

              <div className="flex flex-col w-full gap-4">
                {/*<div className="flex justify-between items-center">*/}
                {/*    <div className="text-white">Pay: 0.00</div>*/}
                {/*    <div className="text-white">Stake: 0.00</div>*/}
                {/*</div>*/}
                {/*<div className="flex justify-between items-center">*/}
                {/*    <div className="text-white">APR</div>*/}
                {/*    <div className="text-white">146%</div>*/}
                {/*</div>*/}
                <div className="flex justify-between items-center">
                  <div className="text-black">Wallet Balance</div>
                  <div className="text-black">
                    {formatCurrency(
                      ethers.formatEther(balance, tokenDecimal),
                      4
                    )}{" "}
                    {tokenSymbol || "MTT"}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-black">Staking Balance</div>
                  <div className="text-black">0.00</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-black">Claimed Reward</div>
                  <div className="text-black">0.00</div>
                </div>
              </div>

              {clientConnected ? (
                <div className="flex justify-between gap-5 items-center">
                  {(isNeedApprove || amountStake === 0 || !amountStake) && (
                    <ButtonSpinner
                      label={"Approve"}
                      btnClassName="w-full p-3 text-center rounded-lg bg-blackn-1000 text-white border border-blackn-1000"
                      isLoading={isLoading}
                      onClick={() =>
                        handleApprove(
                          getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
                          ethers.parseUnits(
                            (amountStake || 0).toString(),
                            tokenDecimal
                          )
                        )
                      }
                    />
                  )}
                  {!isNeedApprove && amountStake !== 0 && amountStake && (
                    <ButtonSpinner
                      label={"Stake"}
                      btnClassName="w-full p-3 text-center rounded-lg text-white border border-blackn-1000"
                      isLoading={isLoading || isLoadingPaymentGateway}
                      onClick={handleOnStake}
                    />
                  )}

                  {/*<div*/}
                  {/*    className="w-full p-3 text-center rounded-lg bg-blackn-950 text-blackn-500 border border-blackn-200">*/}
                  {/*    Stake*/}
                  {/*</div>*/}
                </div>
              ) : (
                <div className="rounded-xl bg-blackn-1000 border border-blackn-1000 p-3 text-center text-white font-semibold w-full">
                  Connect Wallet First
                </div>
              )}
            </div>

            {/*<div className="rounded-xl space-y-6 border border-blackn-200 p-5 text-white w-full">*/}
            {/*    <div className="flex flex-col w-full gap-4">*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-black font-semibold tetx-lg">*/}
            {/*                Rewards*/}
            {/*            </div>*/}
            {/*            <div className="text-black font-semibold tetx-lg">*/}
            {/*                Amount*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Daily Interest Rewards</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Direct Referral Rewards</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Sponsor Level Rewards</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Ranking Rewards</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Same Level Rewards</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*        <div className="flex justify-between items-center">*/}
            {/*            <div className="text-white">Estimated Earning Value</div>*/}
            {/*            <div className="text-white">0.00</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    {clientConnected ? (*/}
            {/*        <div className="flex flex-col justify-start gap-5 items-center">*/}
            {/*            <div*/}
            {/*                className="w-full p-3 text-center rounded-lg bg-blackn-500 text-white border border-blackn-200">*/}
            {/*                Harvest Reward*/}
            {/*            </div>*/}
            {/*            <div*/}
            {/*                className="w-full p-3 text-center rounded-lg bg-blackn-950 text-blackn-500 border border-blackn-200">*/}
            {/*                No redeemable rewards*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div*/}
            {/*            className="rounded-xl bg-blackn-950 border border-blackn-200 p-3 text-center text-blackn-500 font-semibold w-full">*/}
            {/*            Connect Wallet First*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
          </div>

          <div className="rounded-xl space-y-4 border border-blackn-200 p-2 lg:p-5 text-black w-full">
            <h1>Your Referral Code</h1>
            <div className="rounded-xl space-y-0 flex justify-center gap-2 items-center border border-blackn-400 px-4 py-8 text-black w-full">
              {/*<div className="text-2xl font-semibold">0.00</div>*/}
              {/*<Image*/}
              {/*    src="/images/icon-reward/metti.svg"*/}
              {/*    width="20"*/}
              {/*    height="20"*/}
              {/*    alt="Metti"*/}
              {/*/>*/}
              <div className="text-2xl font-semibold text-black">
                {profile?.data?.referral_code}
              </div>
            </div>
            <h1>Your Referral Link</h1>
            <div className="rounded-xl gap-2 flex justify-between bg-blackn-50 items-center border border-blackn-200 p-2 text-black w-full">
              <input
                type="text"
                className="w-full rounded-md border border-transparent text-blackn-1000 bg-blackn-50 placeholder:text-blackn-600"
                placeholder="https://metti.com/earning?reff=000"
                value={
                  address
                    ? "https://metti.io/earning?reff=" +
                      profile?.data?.referral_code
                    : "Please Connect Wallet First"
                }
              />

              <div className="flex gap-2">
                <div className="p-3 border border-blackn-400 bg-white rounded-lg">
                  <RiLinksLine />
                </div>
                {/*<div className="p-3 border border-blackn-200 rounded-lg">*/}
                {/*    <RiQrCodeLine/>*/}
                {/*</div>*/}
              </div>
            </div>

            {/*<div className="bg-blackn-500 py-3 px-4 text-center rounded-lg">*/}
            {/*    View Deposit Status*/}
            {/*</div>*/}

            <div className="rounded-xl gap-2 flex flex-col space-y-3 items-start border border-blackn-200 p-5 text-black w-full">
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">
                  Start: Invalid date
                </div>
                <div className="text-black font-semibold">
                  End: Invalid date
                </div>
              </div>
              <div>
                You will continue to receive rewards from the pool for Invalid
                date.
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">Deposit Amount</div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  {" "}
                  <Image
                    src="/images/icon-reward/metti.svg"
                    width="20"
                    height="20"
                    alt="Metti"
                  />{" "}
                  0.00
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">
                  Active Deposit Amount
                </div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  {" "}
                  <Image
                    src="/images/icon-reward/metti.svg"
                    width="20"
                    height="20"
                    alt="Metti"
                  />{" "}
                  0.00
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">
                  Expired Deposit Amount
                </div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  {" "}
                  <Image
                    src="/images/icon-reward/metti.svg"
                    width="20"
                    height="20"
                    alt="Metti"
                  />{" "}
                  0.00
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">Level</div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  {" "}
                  <Image
                    src="/images/icon-reward/metti.svg"
                    width="20"
                    height="20"
                    alt="Metti"
                  />{" "}
                  0.00
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">
                  Direct Sponsor Count
                </div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  <RiUser5Line className="text-black w-5 h-5" />
                  0.00
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <div className="text-black font-semibold">
                  Total Sponsor Count
                </div>
                <div className="text-black font-semibold flex items-center justify-start gap-2">
                  <RiUser5Line className="text-black w-5 h-5" />
                  0.00
                </div>
              </div>
            </div>

            <div className="rounded-xl gap-2 flex flex-col space-y-3 items-start border border-blackn-200 p-5 text-black w-full">
              <div className="text-black font-semibold">Direct Sponsors</div>
              <div className="flex justify-between items-center w-full">
                <div className="text-black font-semibold">#</div>
                <div className="text-black font-semibold">WALLET</div>
                <div className="text-black font-semibold">LEVEL</div>
                <div className="text-black font-semibold">DEPOSIT</div>
              </div>
              <div className="bg-blackn-50 p-5 w-full text-center rounded-lg">
                No direct sponsors
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
