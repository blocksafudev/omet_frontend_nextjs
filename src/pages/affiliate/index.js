import { Fragment, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import {
  RiArrowRightSLine,
  RiCheckLine,
  RiCloseLine,
  RiHandCoinLine,
  RiHistoryLine,
  RiNftLine,
  RiPlantLine,
  RiSearch2Line,
  RiTreeLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Image from "next/image";
import AvatarWallet from "@/components/AvatarWallet";
import { Tab } from "@headlessui/react";
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import { ethers } from "ethers";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import useProfile from "@/hooks/useProfile";
import { formatCurrency } from "@/lib/utils";
import useERC20 from "@/hooks/useERC20";
import { getAppByChainId } from "@/libs/Env";
import useEVMContract from "@/hooks/useEVMContract";

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

const BadgeStatusCell = ({ rowData, dataKey, ...props }) => {
  const bgColor =
    rowData[dataKey] === "Active"
      ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : rowData[dataKey] === "Inactive"
      ? "text-red-400 bg-red-800 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

  return (
    <Cell {...props}>
      <div className={bgColor}>
        {rowData[dataKey] === "Active" ? <RiCheckLine /> : <RiCloseLine />}
        {rowData[dataKey]}
      </div>
    </Cell>
  );
};

const BadgeSourceCell = ({ rowData, dataKey, ...props }) => {
  const bgColor =
    rowData[dataKey] === "Staking"
      ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : rowData[dataKey] === "Mining"
      ? "text-red-300 bg-red-800 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : rowData[dataKey] === "Earning"
      ? "text-orange-300 bg-orange-800 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

  return (
    <Cell {...props}>
      <div className={bgColor}>
        {rowData[dataKey] === "Staking" ? (
          <RiHandCoinLine />
        ) : rowData[dataKey] === "Mining" ? (
          <RiNftLine />
        ) : (
          <RiPlantLine />
        )}
        {rowData[dataKey]}
      </div>
    </Cell>
  );
};

const DetailAffiliate = ({ accessToken }) => {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [clientConnected, setClientConnected] = useState(false);
  const { profile } = useProfile();
  const [estimateInDollar, setEstimateInDollar] = useState(0);
  const { setTokenAddress, tokenInstance, tokenDecimal, balance } =
    useERC20("Earning");
  const {
    setTokenAddress: setTokenAddressUSDT,
    tokenDecimal: tokenDecimalUSDT,
  } = useERC20("Earning");
  const { setContractAddress, setAbi, contractInstance } = useEVMContract();

  useEffect(() => {
    if (!isConnected || !chainId) return;
    setTokenAddress(getAppByChainId(chainId).METTI_ADDRESS);
    setContractAddress(getAppByChainId(chainId).PAYMENT_GATEWAY_ADDRESS);
    setAbi(getAppByChainId(chainId).PAYMENT_GATEWAY_ABI);
    setTokenAddressUSDT(getAppByChainId(chainId).USDT_ADDRESS);
  }, [chainId]);

  useEffect(() => {
    if (!contractInstance || !balance) return;
    contractInstance.getAmountInDollar(balance).then((result) => {
      setEstimateInDollar(result.toString());
    });
  }, [contractInstance, balance]);

  return (
    <div>
      <div className="bg-blackn-1000 bg-plusbg bg-no-repeat bg-fill lg:bg-cover lg:bg-center border p-5 border-blackn-500 rounded-lg flex flex-col lg:flex-row lg:justify-between items-center">
        <div className="flex flex-col lg:flex-row justify-start items-center gap-3">
          <Image
            src="/images/icon-reward/metti.svg"
            width="40"
            height="40"
            alt="Metti Icon"
          />
          <div className="text-lg text-white font-semibold whitespace-nowrap">
            {formatCurrency(ethers.formatEther(balance || "0", tokenDecimal))} ≈
            $
            {formatCurrency(
              ethers.formatEther(estimateInDollar || "0", tokenDecimalUSDT)
            )}
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
              {formatCurrency(profile?.data?.total_locked_active_in_token)}
            </div>
            <div className="text-white">≈</div>
            <div className="text-white flex justify-start items-center gap-1">
              <Image
                src="/images/icon-reward/usdt.svg"
                width="20"
                height="20"
                alt="USDT Icon"
              />
              {formatCurrency(profile?.data?.total_locked_active_in_dollar)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full mt-4 mb-4">
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Level</div>
          <div className="text-lg font-semibold text-black">
            {profile?.data?.level}
          </div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Earn Amount</div>
          <div className="text-lg font-semibold text-black flex text-center items-center gap-1 justify-center">
            <Image
              src="/images/icon-reward/metti.svg"
              width="20"
              height="20"
              alt="Metti"
            />
            {formatCurrency(profile?.data?.earn_total_in_token)}
          </div>
          <div
            className={
              "text-sm flex text-center gap-1 justify-center items-center"
            }
          >
            Est:
            <Image
              src="/images/icon-reward/usdt.svg"
              width="15"
              height="15"
              alt="USDT Icon"
            />
            {formatCurrency(profile?.data?.earn_total_in_dollar)}
          </div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Stake Amount</div>
          <div className="text-lg font-semibold text-black flex text-center items-center gap-1 justify-center">
            <Image
              src="/images/icon-reward/metti.svg"
              width="20"
              height="20"
              alt="Metti"
            />
            {formatCurrency(profile?.data?.total_stake_active_in_token)}
          </div>
          <div
            className={
              "text-sm flex text-center gap-1 justify-center items-center"
            }
          >
            Est:
            <Image
              src="/images/icon-reward/usdt.svg"
              width="15"
              height="15"
              alt="USDT Icon"
            />
            {formatCurrency(profile?.data?.stake_total_in_dollar)}
          </div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Expired Deposit</div>
          <div className="text-lg font-semibold text-black">$0</div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Accumulate Profit</div>
          <div className="text-lg font-semibold text-black flex text-center items-center gap-1 justify-center">
            <Image
              src="/images/icon-reward/metti.svg"
              width="20"
              height="20"
              alt="Metti"
            />
            {formatCurrency(profile?.data?.acc_profit_total_in_token)}
          </div>
          <div
            className={
              "text-sm flex text-center gap-1 justify-center items-center"
            }
          >
            Est:
            <Image
              src="/images/icon-reward/usdt.svg"
              width="15"
              height="15"
              alt="USDT Icon"
            />
            {formatCurrency(profile?.data?.acc_profit_total_in_dollar)}
          </div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Direct Referrals</div>
          <div className="text-lg font-semibold text-black">
            {profile?.data?.total_direct_sponsor} Users
          </div>
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">Membership</div>
          <div className="text-lg font-semibold text-black">
            {profile?.data?.membership_active ? "Active" : "Inactive"}
          </div>
          {profile?.data?.membership_active && (
            <div
              className={
                "text-sm flex text-center gap-1 justify-center items-center"
              }
            >
              Till: {profile?.data?.membership_active?.end_at} UTC
            </div>
          )}
        </div>
        <div className="rounded-xl border text-center border-blackn-200 bg-blackn-50 p-5 text-black w-full space-y-5">
          <div className="text-black">AI Bot Investment</div>
          <div className="text-lg font-semibold text-black">
            {profile?.data?.ai_investment_active ? "Active" : "Inactive"}
          </div>
          {profile?.data?.ai_investment_active && (
            <div
              className={
                "text-sm flex text-center gap-1 justify-center items-center"
              }
            >
              Till: {profile?.data?.ai_investment_active?.end_at} UTC
            </div>
          )}
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex w-full gap-4">
          {/*<Tab as={Fragment}>*/}
          {/*    {({selected}) => (*/}
          {/*        <button*/}
          {/*            className={*/}
          {/*                selected*/}
          {/*                    ? "bg-amber-500 py-2.5 px-4 flex items-center gap-1 rounded-xl font-semibold outline-none border border-amber-500"*/}
          {/*                    : "bg-transparent text-black py-2.5 px-4 flex items-center gap-1 rounded-xl font-semibold outline-none border border-amber-500"*/}
          {/*            }*/}
          {/*        >*/}
          {/*            <RiHistoryLine/> Referral History*/}
          {/*        </button>*/}
          {/*    )}*/}
          {/*</Tab>*/}
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "bg-blackn-1000 py-2.5 px-4  text-white flex items-center gap-1 rounded-xl font-semibold outline-none border border-blackn-1000"
                    : "bg-transparent text-black py-2.5 px-4 flex items-center gap-1 rounded-xl font-semibold outline-none border border-blackn-200"
                }
              >
                <RiTreeLine /> Referral Tree
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/*<Tab.Panel className={"pt-4"}>*/}
          {/*    <div className="rounded-xl border p-5 border-amber-500 text-white w-full space-y-5 mb-4">*/}
          {/*        <div className="flex w-full justify-between items-center">*/}
          {/*            <div className="text-black font-semibold flex items-center gap-1">*/}
          {/*                <RiHistoryLine/> Referral History*/}
          {/*            </div>*/}
          {/*            <div*/}
          {/*                className="bg-blackn-900 text-blackn-500 flex justify-center items-center p-2 rounded-md text-lg">*/}
          {/*                <RiSearch2Line/>*/}
          {/*            </div>*/}
          {/*        </div>*/}

          {/*        <Table*/}
          {/*            rowHeight={70}*/}
          {/*            autoHeight={true}*/}
          {/*            height={400}*/}
          {/*            maxHeight={610}*/}
          {/*            data={dataReferral}*/}
          {/*            onRowClick={(dataReferral) => {*/}
          {/*                console.log(dataReferral);*/}
          {/*            }}*/}
          {/*        >*/}
          {/*            <Column*/}
          {/*                verticalAlign="middle"*/}
          {/*                flexGrow={1}*/}
          {/*                width={450}*/}
          {/*                align="left"*/}
          {/*                fixed*/}
          {/*            >*/}
          {/*                <HeaderCell>USER</HeaderCell>*/}
          {/*                <Cell>*/}
          {/*                    {(rowData) => (*/}
          {/*                        <div className="flex items-center gap-2 -mt-1">*/}
          {/*                            <AvatarWallet address={rowData.user} diameter={20}/>*/}
          {/*                            <div className="">{rowData.user}</div>*/}
          {/*                        </div>*/}
          {/*                    )}*/}
          {/*                </Cell>*/}
          {/*            </Column>*/}

          {/*            <Column verticalAlign="middle" width={200}>*/}
          {/*                <HeaderCell>DEPOSIT</HeaderCell>*/}
          {/*                <Cell dataKey="deposit"/>*/}
          {/*            </Column>*/}

          {/*            <Column verticalAlign="middle" width={200}>*/}
          {/*                <HeaderCell>Tx Hash</HeaderCell>*/}
          {/*                <Cell dataKey="hash"/>*/}
          {/*            </Column>*/}

          {/*            <Column verticalAlign="middle" width={200}>*/}
          {/*                <HeaderCell>Status</HeaderCell>*/}
          {/*                <BadgeStatusCell dataKey="status"/>*/}
          {/*            </Column>*/}

          {/*            <Column verticalAlign="middle" width={200}>*/}
          {/*                <HeaderCell>Source</HeaderCell>*/}
          {/*                <BadgeSourceCell dataKey="source"/>*/}
          {/*            </Column>*/}

          {/*            <Column verticalAlign="middle" width={150} align="right">*/}
          {/*                <HeaderCell>Join At</HeaderCell>*/}
          {/*                <Cell dataKey="join_at"/>*/}
          {/*            </Column>*/}
          {/*        </Table>*/}
          {/*    </div>*/}
          {/*</Tab.Panel>*/}
          <Tab.Panel className={"pt-4"}>
            <div className="rounded-xl border p-5 border-blackn-200 text-black w-full space-y-5">
              <div className="flex w-full justify-between items-center">
                <div className="text-black font-semibold">Referral Tree</div>
                <div className="bg-blackn-50 text-blackn-1000 flex justify-center items-center p-3 border border-blackn-200 rounded-md text-lg">
                  <RiSearch2Line />
                </div>
              </div>

              <Table
                rowHeight={70}
                autoHeight={true}
                height={400}
                maxHeight={610}
                data={profile?.data?.down_lines}
                onRowClick={(data) => {
                  console.log(data);
                }}
              >
                <Column
                  verticalAlign="middle"
                  flexGrow={1}
                  width={450}
                  align="left"
                  fixed
                >
                  <HeaderCell>USER</HeaderCell>
                  <Cell>
                    {(rowData) => (
                      <div className="flex items-center gap-2 -mt-1">
                        <AvatarWallet address={rowData.user} diameter={20} />
                        <div className="">{rowData.address}</div>
                      </div>
                    )}
                  </Cell>
                </Column>

                {/*<Column verticalAlign="middle" width={200}>*/}
                {/*    <HeaderCell>Estimated Balance</HeaderCell>*/}
                {/*    <Cell dataKey="amount"/>*/}
                {/*</Column>*/}

                <Column verticalAlign="middle" width={200}>
                  <HeaderCell>Tx Hash</HeaderCell>
                  <Cell dataKey="tx_hash" />
                </Column>

                <Column verticalAlign="middle" width={150} align="right">
                  <HeaderCell>Join At</HeaderCell>
                  <Cell dataKey="created_at" />
                </Column>
              </Table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default function Index() {
  const { address, isConnected } = useAppKitAccount();
  const [clientConnected, setClientConnected] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { mutate, isPending, isError } = useMutation({
    mutationKey: "authorize account",
    mutationFn: async (userData) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error("Failed to authorize");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setAccessToken(data?.data?.access_token);
    },
    onError: (error) => {
      alert("Failed authorize");
    },
  });

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  const handleAuthorize = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "Authorize Metti Index";
    const signature = await signer.signMessage(message);
    mutate({
      address: await signer.getAddress(),
      signature,
      message,
    });
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
              href="/public"
              prefetch={false}
              className="text-white font-semibold whitespace-nowrap"
            >
              Home
            </Link>
            <RiArrowRightSLine className="text-blackn-400 w-max" />
            <div className="text-white font-semibold whitespace-nowrap">
              Affiliates
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        {accessToken && <DetailAffiliate accessToken={accessToken} />}

        {!accessToken && (
          <div className="flex justify-center items-center py-20">
            {isPending && <Spinner isFullScreen={false} />}
            {!isPending && (
              <button
                className="py-3 px-6 bg-blackn-1000 rounded-md text-white"
                onClick={handleAuthorize}
              >
                Authorize Account
              </button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
