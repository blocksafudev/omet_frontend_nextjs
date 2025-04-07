import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import { RiArrowRightSLine, RiRefreshLine, RiWalletLine } from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Image from "next/image";
import StakingBreadcrumb from "@/components/breadcrumb/staking-breadcrumb";
import { useEffect, useState } from "react";
import { Table } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import ListTransaction from "@/components/ListTransaction";
import useProfile from "@/hooks/useProfile";
import { formatCurrency } from "@/lib/utils";
import { BigNumber } from "bignumber.js";
import { getAppByChainId } from "@/libs/Env";
import { ethers } from "ethers";
import useERC20 from "@/hooks/useERC20";
import useEVMContract from "@/hooks/useEVMContract";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonSpinner from "@/components/ButtonSpinner";

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

export default function Unstake() {
  const { address, isConnected } = useAppKitAccount();
  const [clientConnected, setClientConnected] = useState(false);
  const { chainId } = useAppKitNetwork();
  const [amountUnstakes, setAmountUnstakes] = useState(0);

  const [estimateInDollar, setEstimateInDollar] = useState(0);
  const { profile, accessToken, handleAuthorize, refetchProfile } =
    useProfile();
  const [isLoadingUnstakes, setIsLoadingUnstakes] = useState(false);
  const { setTokenAddress, tokenDecimal, tokenSymbol } = useERC20("Staking");
  const {
    setTokenAddress: setTokenAddressUsdt,
    tokenDecimal: tokenDecimalUsdt,
  } = useERC20("Staking");
  const {
    contractInstance: contractInstancePaymentGateway,
    setContractAddress: setPaymentGatewayAddress,
    setAbi: setPaymentGatewayAbi,
    callFunction,
    isLoading: isLoadingPaymentGateway,
  } = useEVMContract();

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

  const handleOnPercent = async (percent) => {
    if (!profile) return;
    const balance = new BigNumber(profile?.data?.total_stake_active_in_token);
    const amount = balance.multipliedBy(percent).dividedBy(100);
    setAmountUnstakes(amount);
  };

  const handleOnAmountChange = async (amount) => {
    const _estimateInDollar =
      await contractInstancePaymentGateway.getAmountInDollar(
        ethers.parseUnits((amountUnstakes || 0).toString(), tokenDecimal)
      );
    const _estimateInDollarBigNumber = new BigNumber(
      ethers
        .formatEther(_estimateInDollar.toString(), tokenDecimalUsdt)
        .toString()
    );
    setEstimateInDollar(_estimateInDollarBigNumber.toFixed(4));
  };

  useEffect(() => {
    if (!tokenDecimal || !amountUnstakes || isNaN(amountUnstakes)) return;
    handleOnAmountChange().then();
  }, [tokenDecimal, amountUnstakes]);

  const handleOnUnstake = async () => {
    if (!amountUnstakes || isNaN(amountUnstakes)) return;
    setIsLoadingUnstakes(true);
    try {
      await axios.post(
        "/api/unstakes",
        {
          amount: amountUnstakes,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Submit Unstake Success");
    } catch (e) {
      toast.error("Submit Unstake Failed");
    } finally {
      refetchProfile();
      setAmountUnstakes(0);
      setIsLoadingUnstakes(false);
    }
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
              <RiArrowRightSLine className="text-blackn-400" />
            </div>
            <div className="text-white font-semibold">Staking</div>
          </div>
        </div>
      </div>

      <StakingBreadcrumb />

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
          <div className="rounded-xl border border-blackn-200 p-5 text-black w-full space-y-5">
            <a
              href="/"
              className="flex items-center gap-1 text-black hover:text-blackn-800 font-semibold"
            >
              <RiRefreshLine /> Get Metti
            </a>
            <div className="bg-blackn-50 space-y-4 rounded-lg p-3">
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center justify-start gap-2">
                  <button
                    className="bg-white hover:bg-blackn-1000 text-sm rounded-md py-1 px-2 text-black hover:text-white"
                    onClick={() => handleOnPercent(25)}
                  >
                    25%
                  </button>
                  <button
                    className="bg-white hover:bg-blackn-1000 text-sm rounded-md py-1 px-2 text-black hover:text-white"
                    onClick={() => handleOnPercent(50)}
                  >
                    50%
                  </button>
                  <button
                    className="bg-white hover:bg-blackn-1000 text-sm rounded-md py-1 px-2 text-black hover:text-white"
                    onClick={() => handleOnPercent(75)}
                  >
                    75%
                  </button>
                  <button
                    className="bg-white hover:bg-blackn-1000 text-sm rounded-md py-1 px-2 text-black hover:text-white"
                    onClick={() => handleOnPercent(100)}
                  >
                    Max
                  </button>
                </div>

                <div className="flex justify-end items-center gap-2">
                  <RiWalletLine />
                  <div>
                    {formatCurrency(profile?.data?.total_stake_active_in_token)}
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-3 justify-between items-center">
                <input
                  type="text"
                  placeholder="0"
                  className="rounded-lg focus:ring-blackn-400 focus:border-blackn-400 flex-grow bg-blackn-50 border border-none text-blackn-1000 placeholder:text-blackn-500"
                  value={amountUnstakes}
                  onChange={(e) => setAmountUnstakes(e.target.value)}
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
                    <span className="hidden lg:block text-white">METTI</span>
                  </div>
                </div>
              </div>
            </div>

            {profile && !accessToken && isConnected && (
              <div className="flex flex-col lg:flex-row justify-between gap-5 items-center">
                <button
                  className="w-full p-3 text-center rounded-lg bg-red-600 text-white border border-red-500"
                  onClick={handleAuthorize}
                >
                  Authorize Account
                </button>
              </div>
            )}
            {profile && accessToken && isConnected && (
              <div className="flex flex-col lg:flex-row justify-between gap-5 items-center">
                <ButtonSpinner
                  btnClassName="w-full p-3 text-center rounded-lg bg-red-600 text-white border border-red-500"
                  isLoading={isLoadingUnstakes}
                  label={"Unstake"}
                  onClick={handleOnUnstake}
                />
              </div>
            )}
            {!isConnected && (
              <div className="rounded-xl bg-blackn-100 border border-blackn-200 p-3 text-center text-black font-semibold w-full">
                Connect Wallet First
              </div>
            )}

            <div className="bg-blackn-50 px-4 rounded-lg">
              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Stake Amount</div>
                <div className="flex items-center gap-1">
                  <div className="flex justify-start gap-2 items-center">
                    <div>
                      {formatCurrency(profile?.data?.stake_total_in_token)}
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Stake Amount est In Dollar</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>{formatCurrency(profile?.data?.total_stake_active_in_token)} USDT</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Unstake In Processing</div>
                <div className="flex items-center gap-1">
                  <div className="flex justify-start gap-2 items-center">
                    <div>
                      {formatCurrency(
                        profile?.data?.total_unstake_token_processing
                      )}{" "}
                      {tokenSymbol}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Unstake Successfully</div>
                <div className="flex items-center gap-1">
                  <div className="flex justify-start gap-2 items-center">
                    <div>
                      {formatCurrency(
                        profile?.data?.total_unstake_token_successfully
                      )}{" "}
                      {tokenSymbol}
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Unclaimed Stake Reward</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>MTT</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Claimed Stake Reward</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>MTT</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>You will get</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <Image*/}
              {/*          src="/images/icon-reward/metti.svg"*/}
              {/*          width="20"*/}
              {/*          height="20"*/}
              {/*          alt="Metti"*/}
              {/*      />*/}
              {/*      <div>0.00</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <Image*/}
              {/*          src="/images/icon-reward/metti.svg"*/}
              {/*          width="20"*/}
              {/*          height="20"*/}
              {/*          alt="Metti"*/}
              {/*      />*/}
              {/*      <div>0.00</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Can get rewards?</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Can create proposals?</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Can vote proposals?</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>No</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Status</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start text-lg gap-2 items-center text-blackn-500">*/}
              {/*      <RiUser5Line className="w-5 h-5"/>*/}
              {/*      <div>Staker</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start text-lg gap-2 items-center text-blackn-500">*/}
              {/*      <RiUser5Line className="w-5 h-5"/>*/}
              {/*      <div>Staker</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">*/}
              {/*  <div>Voting Power</div>*/}
              {/*  <div className="flex items-center gap-1">*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>0.00%</div>*/}
              {/*    </div>*/}
              {/*    <RiArrowRightSLine/>*/}
              {/*    <div className="flex justify-start gap-2 items-center">*/}
              {/*      <div>0.00%</div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="rounded-xl border border-blackn-200 text-black w-full space-y-5">
            <ListTransaction />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
