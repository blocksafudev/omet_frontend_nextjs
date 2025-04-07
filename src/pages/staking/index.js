import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import {
  RiArrowRightSLine,
  RiInformationLine,
  RiRefreshLine,
  RiUser5Line,
  RiWalletLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Image from "next/image";
import StakingBreadcrumb from "@/components/breadcrumb/staking-breadcrumb";
import { useEffect, useState } from "react";
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import useERC20 from "@/hooks/useERC20";
import useEVMContract from "@/hooks/useEVMContract";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { BigNumber } from "bignumber.js";
import { getAppByChainId } from "@/libs/Env";
import { formatCurrency } from "@/lib/utils";
import ButtonSpinner from "@/components/ButtonSpinner";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import ListTransaction from "@/components/ListTransaction";
import useReferral from "@/hooks/useReferral";

const { Column, HeaderCell, Cell } = Table;

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

export default function Staking() {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [clientConnected, setClientConnected] = useState(false);
  const [estimateInDollar, setEstimateInDollar] = useState(0);
  const [isCanStake, setIsCanStake] = useState(false);
  const { referralCode, setReferralCode, sponsor } = useReferral();

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
  } = useERC20("Staking");
  const {
    setTokenAddress: setTokenAddressUsdt,
    tokenDecimal: tokenDecimalUsdt,
  } = useERC20("Staking");
  const [amountStake, setAmountStake] = useState(0);
  const {
    contractInstance: contractInstancePaymentGateway,
    setContractAddress: setPaymentGatewayAddress,
    setAbi: setPaymentGatewayAbi,
    callFunction,
    isLoading: isLoadingPaymentGateway,
  } = useEVMContract();

  const { data: history } = useQuery({
    queryKey: ["tx_hash"],
    queryFn: async () => {
      const response = await fetch("/api/tx_hash");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  const { data: config } = useQuery({
    queryKey: ["config-stake"],
    queryFn: async () => {
      const response = await fetch(
        "/api/tools/config?key=MINIMUM_STAKE_IN_DOLLAR"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  const handleOnStake = async () => {
    try {
      const _amountStake = ethers
        .parseUnits((amountStake || 0).toString(), tokenDecimal)
        .toString();

      await callFunction(
        "Submit Staking",
        _amountStake,
        tokenSymbol,
        "paymentInToken",
        [
          4, // for staking
          1,
          _amountStake,
          sponsor?.address ?? "0x0000000000000000000000000000000000000000", //referral
        ]
      );
      setAmountStake(0);
      toast.success("Transaction submitted successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to stake");
    }
  };

  const handleOnPercent = async (percent) => {
    if (!balance) return;
    const currentBalance = new BigNumber(balance);
    const halfBalance = currentBalance.multipliedBy(percent).dividedBy(100);
    setAmountStake(
      ethers.formatEther(halfBalance.toFixed().toString() || "0", tokenDecimal)
    );
  };

  const handleOnAmountChange = async (amount) => {
    if (!amountStake || isNaN(amountStake) || !config) return;
    await checkIsNeedApprove(
      getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
      ethers.parseUnits((amountStake || 0).toString(), tokenDecimal)
    );

    const _estimateInDollar =
      await contractInstancePaymentGateway.getAmountInDollar(
        ethers.parseUnits((amountStake || 0).toString(), tokenDecimal)
      );
    const _estimateInDollarBigNumber = new BigNumber(
      ethers
        .formatEther(_estimateInDollar.toString(), tokenDecimalUsdt)
        .toString()
    );
    const _minimumStakeInDollar = new BigNumber(config?.data?.config[0]?.value);
    if (
      _estimateInDollarBigNumber.isGreaterThanOrEqualTo(_minimumStakeInDollar)
    ) {
      setIsCanStake(true);
    } else {
      setIsCanStake(false);
    }
    setEstimateInDollar(_estimateInDollarBigNumber.toFixed(4));
  };

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected || !chainId) return;
    setTokenAddress(getAppByChainId(chainId).METTI_ADDRESS);
    setPaymentGatewayAddress(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS);
    setPaymentGatewayAbi(getAppByChainId(chainId).PAYMENT_GATEWAY_ABI);
    setTokenAddressUsdt(getAppByChainId(chainId).USDT_ADDRESS);
  }, [isConnected, chainId]);

  useEffect(() => {
    if (!tokenDecimal) return;
    handleOnAmountChange().then();
  }, [tokenDecimal, amountStake]);

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  const BadgeCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "GAS"
        ? "bg-blue-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
        : rowData[dataKey] === "CLAIM REWARD"
        ? "bg-blackn-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
        : "bg-black py-1 px-3 -mt-1.5 text-sm rounded-md w-max";

    return (
      <Cell {...props}>
        <div className={bgColor}>{rowData[dataKey]}</div>
      </Cell>
    );
  };

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
              className="text-white font-semibold"
            >
              Home
            </Link>
            <div>
              <RiArrowRightSLine className="text-blackn-400 w-max" />
            </div>
            <div className="text-white font-semibold whitespace-nowrap">
              Staking
            </div>
          </div>
        </div>
      </div>

      <StakingBreadcrumb />

      {!config && <Spinner />}
      {config && (
        <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
            <div className="rounded-xl border border-blackn-200 p-5 text-black w-full space-y-5">
              <a
                href="/"
                className="underline flex w-max items-center gap-2 text-black hover:text-blackn-800 font-semibold"
              >
                Use a referral code <RiInformationLine />
              </a>
              <div className="flex w-full items-center gap-2">
                <input
                  type="text"
                  className="w-full focus:ring-blackn-800 focus:border-blackn-500 bg-blackn-50 text-black border border-blackn-200 rounded-lg py-3 px-6 placeholder:text-blackn-500"
                  placeholder="Use a referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                {sponsor?.address &&
                  sponsor?.address.toLowerCase() !== address?.toLowerCase() && (
                    <div className="bg-blackn-500 py-3 px-6 rounded-lg">
                      Valid
                    </div>
                  )}
                {(!sponsor?.address ||
                  sponsor?.address.toLowerCase() ===
                    address?.toLowerCase()) && (
                  <div className="bg-red-600 text-black py-3 px-6 rounded-lg">
                    Invalid
                  </div>
                )}
              </div>
              <a
                href="/"
                className="flex w-max items-center gap-1 text-black hover:text-blackn-800 font-semibold"
              >
                <RiRefreshLine /> Get Metti
              </a>
              <div className="bg-blackn-50 space-y-4 rounded-lg p-3">
                <div className="flex w-full justify-between items-center">
                  <div className="flex items-center justify-start gap-2">
                    <button
                      className="bg-white hover:bg-blackn-200 text-sm rounded-md py-1 px-2 text-black"
                      type={"button"}
                      onClick={() => handleOnPercent(25)}
                    >
                      25%
                    </button>
                    <button
                      className="bg-white hover:bg-blackn-200 text-sm rounded-md py-1 px-2 text-black"
                      type={"button"}
                      onClick={() => handleOnPercent(50)}
                    >
                      50%
                    </button>
                    <button
                      className="bg-white hover:bg-blackn-200 text-sm rounded-md py-1 px-2 text-black"
                      type={"button"}
                      onClick={() => handleOnPercent(75)}
                    >
                      75%
                    </button>
                    <button
                      className="bg-white hover:bg-blackn-200 text-sm rounded-md py-1 px-2 text-black"
                      type={"button"}
                      onClick={() => handleOnPercent(100)}
                    >
                      Max
                    </button>
                  </div>

                  <div className="flex justify-end items-center gap-2">
                    <RiWalletLine />
                    <div>
                      {" "}
                      {formatCurrency(
                        ethers.formatEther(balance, tokenDecimal),
                        4
                      )}{" "}
                      {tokenSymbol || "MTT"}
                    </div>
                  </div>
                </div>

                <div className="flex w-full gap-3 justify-between items-center">
                  <input
                    type="text"
                    placeholder="0"
                    className="rounded-lg focus:ring-blackn-800 focus:border-blackn-500 flex-grow bg-blackn-50 border border-none text-blackn-1000 placeholder:text-blackn-500"
                    value={amountStake}
                    onChange={(e) => setAmountStake(e.target.value)}
                  />
                  <div className="flex gap-4 justify-end items-center">
                    <div className="text-black">~${estimateInDollar}</div>
                    <div className="flex items-center bg-blackn-1000 rounded-md py-2 px-3 gap-1">
                      <Image
                        src="/images/icon-reward/metti.svg"
                        width="20"
                        height="20"
                        alt="Metti"
                      />{" "}
                      <span className="hidden lg:block text-white">
                        {tokenSymbol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-blackn-50 border border-blackn-200 p-3 text-center text-blackn-500 font-semibold w-full">
                Minimum Stake is ~ {config?.data?.config[0]?.value} USDT
              </div>

              {clientConnected ? (
                <div className="flex justify-between gap-5 items-center">
                  {isCanStake && (
                    <div className={"w-full"}>
                      {isNeedApprove && (
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
                      {!isNeedApprove && (
                        <ButtonSpinner
                          label={"Stake"}
                          btnClassName="w-full p-3 text-center rounded-lg bg-blackn-1000 text-white border border-blackn-1000"
                          isLoading={isLoading || isLoadingPaymentGateway}
                          onClick={handleOnStake}
                        />
                      )}
                    </div>
                  )}
                  {/*<div className="w-full p-3 text-center rounded-lg bg-blackn-500 text-white border border-blackn-500">*/}
                  {/*  Approve*/}
                  {/*</div>*/}
                  {/*<div className="w-full p-3 text-center rounded-lg bg-blackn-950 text-blackn-500 border border-blackn-500">*/}
                  {/*  Stake*/}
                  {/*</div>*/}
                </div>
              ) : (
                <div className="rounded-xl bg-blackn-1000 border border-blackn-1000 p-3 text-center text-white font-semibold w-full">
                  Connect Wallet First
                </div>
              )}

              <div className="bg-blackn-50 px-4 rounded-lg">
                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Stake Amount</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start gap-2 items-center">
                      <Image
                        src="/images/icon-reward/metti.svg"
                        width="20"
                        height="20"
                        alt="Metti"
                      />
                      <div>0.00</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start gap-2 items-center">
                      <Image
                        src="/images/icon-reward/metti.svg"
                        width="20"
                        height="20"
                        alt="Metti"
                      />
                      <div>0.00</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Can get rewards?</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Can create proposals?</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Can vote proposals?</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start gap-2 items-center">
                      <div>No</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Status</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start text-lg gap-2 items-center text-blackn-900">
                      <RiUser5Line className="w-5 h-5" />
                      <div>Staker</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start text-lg gap-2 items-center text-blackn-900">
                      <RiUser5Line className="w-5 h-5" />
                      <div>Staker</div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                  <div>Voting Power</div>
                  <div className="flex items-center gap-1">
                    <div className="flex justify-start gap-2 items-center">
                      <div>0.00%</div>
                    </div>
                    <RiArrowRightSLine />
                    <div className="flex justify-start gap-2 items-center">
                      <div>0.00%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-blackn-200 text-black w-full space-y-5">
              <ListTransaction />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
