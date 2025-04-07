import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiFlashlightFill,
  RiFlashlightLine,
  RiMacbookLine,
  RiPriceTag3Line,
  RiShareLine,
  RiShoppingCartLine,
  RiTimeLine,
} from "react-icons/ri";
import Link from "next/link";
import MiningBreadcrumb from "@/components/breadcrumb/mining-breadcrumb";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Custom404 from "@/pages/404";
import Spinner from "@/components/Spinner";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { Dialog, Transition } from "@headlessui/react";
import { getAppByChainId } from "@/libs/Env";
import { BigNumber } from "bignumber.js";
import { toast } from "react-toastify";
import ButtonSpinner from "@/components/ButtonSpinner";
import { WalletConnectEVM } from "@/components/WalletConnectEVM";
import useERC20 from "@/hooks/useERC20";
import useEVMContract from "@/hooks/useEVMContract";

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

export default function Mining({ slug }) {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const {
    data: miner,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["miners", slug],
    queryFn: async () => {
      const response = await fetch(`/api/ai-investment/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  let [isModalBuyOpen, setIsModalBuyOpen] = useState(false);
  const {
    setTokenAddress,
    isNeedApprove,
    isLoading: isLoadingMettiToken,
    handleApprove,
    checkIsNeedApprove,
    tokenDecimal,
    tokenSymbol,
  } = useERC20("Ai Investment");
  const {
    isLoading: isLoadingPaymentGateway,
    setContractAddress,
    setAbi,
    callFunction,
  } = useEVMContract();

  function closeModalBuy() {
    setIsModalBuyOpen(false);
  }

  function openModalBuy() {
    setIsModalBuyOpen(true);
  }

  //region function
  const handleBuy = async () => {
    try {
      await callFunction(
        "Submit Ai Investment",
        ethers
          .parseUnits(miner.data.price_in_tokens.toString(), tokenDecimal)
          .toString(),
        tokenSymbol,
        "paymentInToken",
        [
          2,
          miner.data.id,
          ethers
            .parseUnits(miner.data.price_in_tokens.toString(), tokenDecimal)
            .toString(),
          "0x1c73DB7f440BA45C75bE0bfb2D55F6FD1127411e", //referral
        ]
      );
      checkIsNeedApprove(
        getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
        ethers
          .parseUnits(miner.data.price_in_tokens.toString(), tokenDecimal)
          .toString()
      ).then();

      toast.success("Transaction submitted successfully!");
      closeModalBuy();
    } catch (e) {
      console.error("Error buying:", e);
      toast.error("Transaction failed!");
    }
  };
  //endregion

  //region effect
  useEffect(() => {
    if (!isConnected || !chainId) return;
    setTokenAddress(getAppByChainId(chainId).METTI_ADDRESS);
    setContractAddress(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS);
    setAbi(getAppByChainId(chainId).PAYMENT_GATEWAY_ABI);
  }, [isConnected, chainId]);

  useEffect(() => {
    if (!isConnected || !chainId || !miner || !tokenDecimal) return;
    checkIsNeedApprove(
      getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS,
      ethers
        .parseUnits(miner.data.price_in_tokens.toString(), tokenDecimal)
        .toString()
    ).then();
  }, [miner, isConnected, chainId, tokenDecimal]);
  //endregion

  if (isError) {
    return <Custom404 />;
  }

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
            <div>
              <RiArrowRightSLine className="text-blackn-400 w-max" />
            </div>
            <div className="text-white font-semibold whitespace-nowrap">
              Miners Shop
            </div>
            <div>
              <RiArrowRightSLine className="text-blackn-400 w-max" />
            </div>
            <div className="text-white font-semibold whitespace-nowrap">
              Miners Shop Details
            </div>
          </div>
        </div>
      </div>
      <MiningBreadcrumb />

      <div className="bg-white border-b border-blackn-200 px-6 py-12 md:px-12 lg:px-20">
        <h1 className="text-black text-2xl font-semibold mb-6">
          Miners Shop Details
        </h1>

        {miner && (
          <div className="w-full flex flex-col md:flex-row lg:flex-row justify-start gap-4">
            <div className="lg:w-3/12 md:w-5/12 w-full space-y-4">
              <div className="border-2 border-blackn-200 hover:border-blackn-400 rounded-2xl bg-blackn-1000">
                <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-blackn-200/10">
                  <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(90%_90%_at_50%_30%,#B0B0B0_4%,#E7E7E7_40%)]">
                    <div className="flex justify-center items-center w-full h-full">
                      <Image
                        src={miner?.data?.image || "/images/nft/miner-1.webp"}
                        className="mb-32 hover:scale-105"
                        width="185"
                        height="185"
                        alt="Miners"
                      />
                    </div>
                  </div>
                  <div className="absolute z-20 w-full bottom-0">
                    <div className="p-2">
                      <div className="bg-white space-y-3 p-4 rounded-2xl">
                        <div className={"flex flex-row justify-between"}>
                          <div className="text-black">#{miner.data.id}</div>
                          <div className="text-black text-sm font-semibold flex flex-row gap-2 items-center">
                            <RiPriceTag3Line className="text-black" />
                            {miner.data.price_in_tokens} MTT
                          </div>
                        </div>

                        <div className="text-black text-lg font-semibold">
                          {miner.data.name}
                        </div>
                        <div className="flex w-full flex-wrap gap-3 justify-between items-center">
                          <div className="flex justify-start gap-1 items-center">
                            <RiFlashlightFill className="text-black" />
                            <div className="text-black whitespace-nowrap">
                              {miner?.data?.energy}
                            </div>
                          </div>
                          <div className="flex justify-start gap-1 items-center">
                            <RiMacbookLine className="text-black" />
                            <div className="text-black whitespace-nowrap">
                              {miner?.data?.computing_power}
                            </div>
                          </div>
                          <div className="flex justify-start gap-1 items-center">
                            <RiTimeLine className="text-black" />
                            <div className="text-black whitespace-nowrap">
                              {miner?.data?.duration_in_days} days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <button
                  onClick={openModalBuy}
                  className="bg-blackn-1000 hover:bg-blackn-1000 flex justify-center items-center gap-1 text-white text-center p-4 rounded-xl w-full"
                >
                  <RiShoppingCartLine /> Buy Miner
                </button>
                <div className="bg-transparent hover:border-blackn-800 hover:text-blackn-900 flex justify-center items-center gap-1 border border-blackn-1000 text-center p-4 rounded-xl text-blackn-1000 w-full">
                  <RiShareLine /> Share
                </div>
              </div>
            </div>
            <div className="lg:w-9/12 md:w-7/12 w-full space-y-6">
              <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between gap-4">
                <div className="p-3 border border-blackn-200 flex justify-start items-start gap-4 rounded-xl w-full bg-blackn-50 flex-wrap">
                  <div className="bg-blackn-1000 h-14 w-14 rounded-md text-white flex justify-center items-center">
                    <RiFlashlightLine />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-black">Energy Efficiency</div>
                    <div className="text-black text-lg font-semibold">
                      {miner?.data?.energy}
                    </div>
                  </div>
                </div>
                <div className="p-3 border border-blackn-200 flex justify-start items-start gap-4 rounded-xl w-full bg-blackn-50 flex-wrap">
                  <div className="bg-blackn-1000 h-14 w-14 rounded-md text-white flex justify-center items-center">
                    <RiMacbookLine />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-black">Computing Power</div>
                    <div className="text-black text-lg font-semibold">
                      {miner?.data?.computing_power}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blackn-50 border border-blackn-200 p-6 w-full space-y-4 rounded-xl text-black">
                <div className="text-black font-semibold">
                  {miner?.data?.name}
                </div>
                <div>{miner?.data?.description}</div>
              </div>
            </div>

            {/* Start Modal Section */}
            <Transition appear show={isModalBuyOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={closeModalBuy}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-white/75" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-blackn-200 bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-black"
                        >
                          Buy Miner
                        </Dialog.Title>
                        <div className="mt-4">
                          <div className="border-2 border-blackn-200 hover:border-blackn-400 rounded-2xl bg-white">
                            <div className="relative min-h-[280px] w-full overflow-hidden rounded-xl ring-1 ring-blackn-200/10">
                              <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(90%_90%_at_50%_30%,#B0B0B0_4%,#E7E7E7_40%)]">
                                <div className="flex justify-center items-center w-full h-full">
                                  <Image
                                    src={
                                      miner?.data?.image ||
                                      "/images/nft/miner-1.webp"
                                    }
                                    className="mb-32 hover:scale-105"
                                    width="185"
                                    height="185"
                                    alt="Miners"
                                  />
                                </div>
                              </div>
                              <div className="absolute z-20 w-full bottom-0">
                                <div className="p-2">
                                  <div className="bg-white space-y-3 p-4 rounded-2xl">
                                    <div
                                      className={
                                        "flex flex-row justify-between"
                                      }
                                    >
                                      <div className="text-black">
                                        #{miner.data.order}
                                      </div>
                                      <div className="text-black text-sm font-semibold flex flex-row gap-2 items-center">
                                        <RiPriceTag3Line className="text-black" />
                                        {miner.data.price_in_tokens} MTT
                                      </div>
                                    </div>
                                    <div className="text-black text-lg font-semibold">
                                      {miner?.data?.name}
                                    </div>
                                    <div className="flex w-full justify-between items-center">
                                      <div className="flex justify-start gap-1 items-center">
                                        <RiFlashlightFill className="text-black" />
                                        <div className="text-black">
                                          {miner?.data?.energy}
                                        </div>
                                      </div>
                                      <div className="flex justify-start gap-1 items-center">
                                        <RiMacbookLine className="text-black" />
                                        <div className="text-black">
                                          {miner?.data?.computing_power}
                                        </div>
                                      </div>
                                      <div className="flex justify-start gap-1 items-center">
                                        <RiTimeLine className="text-black" />
                                        <div className="text-black">
                                          {miner?.data?.duration_in_days} days
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full justify-between gap-2 mt-4 items-center">
                          {isConnected && (
                            <>
                              {isNeedApprove && (
                                <ButtonSpinner
                                  isLoading={isLoadingMettiToken}
                                  label={"Approve"}
                                  onClick={() =>
                                    handleApprove(
                                      getAppByChainId(chainId)
                                        .PAYMENT_GATEWAY_ADDRESS
                                    )
                                  }
                                  btnClassName={
                                    "inline-flex w-full justify-center rounded-full border border-transparent bg-blackn-1000 px-4 py-2.5 text-sm font-medium text-white hover:bg-blackn-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-salem-500 focus-visible:ring-offset-2"
                                  }
                                />
                              )}
                              {!isNeedApprove && (
                                <ButtonSpinner
                                  isLoading={
                                    isLoadingMettiToken ||
                                    isLoadingPaymentGateway
                                  }
                                  label={"Buy Miner"}
                                  onClick={handleBuy}
                                  btnClassName={
                                    "inline-flex w-full justify-center rounded-lg border border-transparent bg-blackn-1000 px-4 py-2.5 text-sm font-medium text-white hover:bg-blackn-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-salem-500 focus-visible:ring-offset-2"
                                  }
                                />
                              )}
                            </>
                          )}
                          {!isConnected && <WalletConnectEVM />}
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-full border border-transparent bg-red-500 px-2 py-2.5 text-sm font-medium text-black hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                            onClick={closeModalBuy}
                          >
                            Cancel
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            {/* End Modal Section */}
          </div>
        )}
        {!miner && <Spinner />}
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ res, query }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=15, stale-while-revalidate=59"
  );

  const { slug = "" } = query;
  return {
    props: {
      slug: slug,
    },
  };
}
