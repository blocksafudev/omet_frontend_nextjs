import dynamic from "next/dynamic";
import Head from "next/head";
import {
  RiArrowRightSLine,
  RiCalendar2Line,
  RiCheckLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiEyeFill,
  RiEyeLine,
  RiFileCopyLine,
  RiInformationLine,
  RiQrCodeLine,
  RiRefreshLine,
  RiShoppingCart2Line,
  RiTimeLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import StakingBreadcrumb from "@/components/breadcrumb/staking-breadcrumb";
import { useEffect, useState } from "react";
import AvatarWallet from "@/components/AvatarWallet";
import { truncate, truncateTxHash } from "@/libs/WebooLib";
import { Tab } from "@headlessui/react";
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import { ClipboardCopy } from "@/utils";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { ethers } from "ethers";
import { getAppByChainId } from "@/libs/Env";
import ListTransaction from "@/components/ListTransaction";
import useERC20 from "@/hooks/useERC20";
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

const BadgeCell = ({ rowData, dataKey, ...props }) => {
  const bgColor =
    rowData[dataKey] === "STAKE"
      ? "bg-blue-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : rowData[dataKey] === "CLAIM REWARD"
      ? "bg-blackn-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : rowData[dataKey] === "UNSTAKE"
      ? "bg-red-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : rowData[dataKey] === "CLAIM REFERRER REWARD"
      ? "bg-purple-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : "bg-black py-1 px-3 -mt-1.5 text-sm rounded-md w-max";

  return (
    <Cell {...props}>
      <div className={bgColor}>{rowData[dataKey]}</div>
    </Cell>
  );
};

const BadgeFamily = ({ rowData, dataKey, ...props }) => {
  const bgColor =
    rowData[dataKey] === "F1"
      ? "bg-blue-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : rowData[dataKey] === "F2"
      ? "bg-blackn-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : rowData[dataKey] === "F3"
      ? "bg-purple-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
      : "bg-black py-1 px-3 -mt-1.5 text-sm rounded-md w-max";

  return (
    <Cell {...props}>
      <div className={bgColor}>{rowData[dataKey]}</div>
    </Cell>
  );
};

export default function Profile() {
  const { address, isConnected } = useAppKitAccount();
  const [clientConnected, setClientConnected] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterReferrer, setFilterReferrer] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredDataReferrer, setFilteredDataReferrer] = useState([]);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const router = useRouter();

  const { chainId } = useAppKitNetwork();

  const {
    data: history,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["tx_hash"],
    queryFn: async () => {
      const response = await fetch("/api/tx_hash");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    },
  });

  const formatEstimateAmount = (amount) => {
    return formatCurrency(ethers.formatEther(amount), 4);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (filter === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.kind === filter));
    }
  }, [filter]);

  useEffect(() => {
    if (filterReferrer === "") {
      setFilteredDataReferrer(referrer);
    } else {
      setFilteredDataReferrer(
        referrer.filter((item) => item.kind === filterReferrer)
      );
    }
  }, [filterReferrer]);

  const handleReload = () => {
    router.reload();
  };
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

  const data = [
    {
      date: "a minute ago",
      kind: "CLAIM REWARD",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "STAKE",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "CLAIM REWARD",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "STAKE",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "CLAIM REFERRER REWARD",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "STAKE",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "UNSTAKE",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "STAKE",
      hash: "0x47...2323",
      amount: 15.24747,
    },
    {
      date: "a minute ago",
      kind: "CLAIM REFERRER REWARD",
      hash: "0x47...2323",
      amount: 15.24747,
    },
  ];

  const referrer = [
    {
      date: "a minute ago",
      kind: "F1",
      hash: "0x47...2323",
      amount: 5.24747,
      accumulatedAmount: 15.24747,
    },
    {
      date: "15 minutes ago",
      kind: "F2",
      hash: "0x47...2323",
      amount: 1,
      accumulatedAmount: 12,
    },
    {
      date: "a hours ago",
      kind: "F3",
      hash: "0x47...2323",
      amount: 4,
      accumulatedAmount: 12,
    },
  ];

  const BadgeStatusCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "Success"
        ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : rowData[dataKey] === "Pending"
        ? "text-red-300 bg-red-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

    return (
      <Cell {...props}>
        <div className={bgColor}>
          {rowData[dataKey] === "Success" ? (
            <RiCheckLine />
          ) : rowData[dataKey] === "Pending" ? (
            <RiTimeLine />
          ) : (
            <RiCloseLine />
          )}
          {rowData[dataKey]}
        </div>
      </Cell>
    );
  };

  const BadgeSourceCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "SUBMIT MINER"
        ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : rowData[dataKey] === "APPROVE MINER"
        ? "text-blue-300 bg-blue-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

    return (
      <Cell {...props}>
        <div className={bgColor}>
          {rowData[dataKey] === "SUBMIT MINER" ? (
            <RiShoppingCart2Line />
          ) : rowData[dataKey] === "APPROVE MINER" ? (
            <RiCheckLine />
          ) : (
            <RiInformationLine />
          )}
          {rowData[dataKey]}
        </div>
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
              className="text-white font-semibold whitespace-nowrap"
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

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        <div className="flex items-center gap-8">
          {address ? (
            <AvatarWallet address={address} diameter={100} />
          ) : (
            <AvatarWallet address="0x12345678910111213141516" diameter={100} />
          )}

          <div className="w-full space-y-4">
            <div className="flex flex-col gap-3 lg:flex-row items-start w-full justify-between lg:items-center">
              <div
                className="text-black font-semibold text-xl"
                suppressHydrationWarning
              >
                {address
                  ? truncate(address, 4, "...", 50)
                  : "Please Connect Wallet First"}
              </div>
              <div className="text-black font-semibold">
                View on{" "}
                <a
                  href={
                    address !== undefined
                      ? `https://bscscan.com/address/` + address
                      : `https://bscscan.com/address/0x`
                  }
                  className="text-blackn-900"
                >
                  BSCSCAN
                </a>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start w-full gap-3 justify-between lg:items-center">
              <div className="text-black flex gap-1 items-center">
                Total Balance{" "}
                <button
                  onClick={toggleBalanceVisibility}
                  aria-label="toggle balance visibility"
                >
                  <RiEyeFill />
                </button>
              </div>
              <div className="text-black font-semibold flex gap-3 justify-end items-center">
                <ClipboardCopy
                  copyText={
                    address !== undefined
                      ? address
                      : "Please Connect Wallet First"
                  }
                />
                <RiQrCodeLine />
                <div onClick={handleReload}>
                  <RiRefreshLine className="text-black hover:text-blackn-800" />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="text-black">
                {isBalanceVisible ? (
                  <span className="text-black font-semibold text-xl">
                    {formatCurrency(
                      ethers.formatEther(balance || "0", tokenDecimal)
                    )}
                  </span>
                ) : (
                  <span className="text-black font-semibold text-xl">****</span>
                )}{" "}
                Metti
              </div>
            </div>
            <div className="flex w-full justify-between items-center">
              <div className="text-blackn-800">
                {isBalanceVisible
                  ? `≈ ${formatCurrency(
                      ethers.formatEther(estimateInDollar, tokenDecimalUSDT)
                    )}`
                  : "****"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="bg-white border-b border-blackn-200 px-3 py-0 md:px-12 lg:px-20">
          <div className="flex justify-start gap-10 items-center">
            <Tab
              className={({ selected }) =>
                selected
                  ? "py-6 font-semibold outline-none text-black border-b-2 border-blackn-1000"
                  : "py-6 font-semibold outline-none text-black border-b-2 border-transparent"
              }
            >
              Transactions
            </Tab>
            {/*<Tab*/}
            {/*  className={({ selected }) =>*/}
            {/*    selected*/}
            {/*      ? "py-6 font-semibold outline-none text-black border-b-2 border-blackn-200"*/}
            {/*      : "py-6 font-semibold outline-none text-black border-b-2 border-transparent"*/}
            {/*  }*/}
            {/*>*/}
            {/*  Referrals*/}
            {/*</Tab>*/}
          </div>
        </Tab.List>
        <Tab.Panels className="bg-white border-b border-blackn-200 px-3 py-4 lg:py-0 md:px-12 lg:px-20">
          <Tab.Panel className="py-3 lg:py-12">
            <div className="rounded-xl border border-blackn-200 text-black w-full space-y-2">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-2 lg:items-center px-4 py-4">
                <h1 className="text-black">Latest Transaction</h1>

                <select
                  name="filter"
                  id="filter"
                  className="bg-blackn-50 text-black border border-blackn-200 rounded-md"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="STAKE">Stake</option>
                  <option value="UNSTAKE">Unstake</option>
                  <option value="CLAIM REWARD">Claim Reward</option>
                  <option value="CLAIM REFERRER REWARD">
                    Claim Referrer Reward
                  </option>
                </select>
              </div>

              <div className="px-4">
                <ListTransaction hideLabel={true} />
              </div>
            </div>
          </Tab.Panel>
          {/*<Tab.Panel className="py-3 lg:py-12">*/}
          {/*  <div className="rounded-xl border border-amber-500 text-white w-full space-y-2">*/}
          {/*    <div className="flex justify-between items-center px-4 py-4">*/}
          {/*      <h1 className="text-amber-500">Referrer</h1>*/}

          {/*      <select*/}
          {/*        name="filter"*/}
          {/*        id="filter"*/}
          {/*        className="bg-blackn-1000 text-amber-500 border border-amber-500 rounded-md"*/}
          {/*        value={filterReferrer}*/}
          {/*        onChange={(e) => setFilterReferrer(e.target.value)}*/}
          {/*      >*/}
          {/*        <option value="">All</option>*/}
          {/*        <option value="F1">F1</option>*/}
          {/*        <option value="F2">F2</option>*/}
          {/*        <option value="F3">F3</option>*/}
          {/*      </select>*/}
          {/*    </div>*/}

          {/*    <div className="px-4">*/}
          {/*      <Table*/}
          {/*        rowHeight={70}*/}
          {/*        autoHeight={true}*/}
          {/*        height={400}*/}
          {/*        maxHeight={610}*/}
          {/*        data={history?.data ?? []}*/}
          {/*        onRowClick={(data) => {*/}
          {/*          console.log(data);*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <Column verticalAlign="middle" width={250} align="left">*/}
          {/*          <HeaderCell>USER</HeaderCell>*/}
          {/*          <Cell>*/}
          {/*            {(rowData) => (*/}
          {/*              <a*/}
          {/*                href={*/}
          {/*                  getAppByChainId(chainId).EXPLORER_URL +*/}
          {/*                  "/address/" +*/}
          {/*                  rowData.address*/}
          {/*                }*/}
          {/*                className="flex items-center gap-2 -mt-1 border border-blackn-800 py-0.5 px-1.5 rounded-md"*/}
          {/*              >*/}
          {/*                <AvatarWallet*/}
          {/*                  address={rowData.address}*/}
          {/*                  diameter={20}*/}
          {/*                />*/}
          {/*                <div className="text-white w-full">*/}
          {/*                  {truncate(rowData.address, 8, "...", 50)}*/}
          {/*                </div>*/}
          {/*                <RiExternalLinkLine className="text-white" />*/}
          {/*              </a>*/}
          {/*            )}*/}
          {/*          </Cell>*/}
          {/*        </Column>*/}

          {/*        <Column verticalAlign="middle" width={150}>*/}
          {/*          <HeaderCell>Estimated Amount</HeaderCell>*/}
          {/*          <Cell>*/}
          {/*            {(rowData) => (*/}
          {/*              <div className="flex items-center gap-2 -mt-1">*/}
          {/*                <div className="text-white">*/}
          {/*                  {formatEstimateAmount(rowData.amount)}{" "}*/}
          {/*                  {rowData?.token}*/}
          {/*                </div>*/}
          {/*              </div>*/}
          {/*            )}*/}
          {/*          </Cell>*/}
          {/*        </Column>*/}

          {/*        <Column verticalAlign="middle" width={200}>*/}
          {/*          <HeaderCell>Tx Hash</HeaderCell>*/}
          {/*          <Cell>*/}
          {/*            {(rowData) => (*/}
          {/*              <a*/}
          {/*                href={*/}
          {/*                  getAppByChainId(chainId).EXPLORER_URL +*/}
          {/*                  "/tx/" +*/}
          {/*                  rowData.tx_hash*/}
          {/*                }*/}
          {/*                className="flex items-center gap-2 -mt-1 rounded-md border border-blackn-800 py-0.5 px-1.5"*/}
          {/*              >*/}
          {/*                <div className="text-blackn-500">*/}
          {/*                  {truncateTxHash(rowData.tx_hash, 8, "...", 66)}*/}
          {/*                </div>*/}
          {/*                <RiExternalLinkLine className="text-blackn-500" />*/}
          {/*              </a>*/}
          {/*            )}*/}
          {/*          </Cell>*/}
          {/*        </Column>*/}

          {/*        <Column verticalAlign="middle" width={150}>*/}
          {/*          <HeaderCell>Status</HeaderCell>*/}
          {/*          <BadgeStatusCell dataKey="status" />*/}
          {/*        </Column>*/}

          {/*        <Column verticalAlign="middle" width={200}>*/}
          {/*          <HeaderCell>Source</HeaderCell>*/}
          {/*          <BadgeSourceCell dataKey="type" />*/}
          {/*        </Column>*/}

          {/*        <Column verticalAlign="middle" width={250} align="right">*/}
          {/*          <HeaderCell>Settlement At (UTC)</HeaderCell>*/}
          {/*          <Cell>*/}
          {/*            {(rowData) => (*/}
          {/*              <div className="flex items-center gap-2 -mt-1">*/}
          {/*                <RiCalendar2Line className="text-white" />*/}
          {/*                <div className="text-white">{rowData.created_at}</div>*/}
          {/*              </div>*/}
          {/*            )}*/}
          {/*          </Cell>*/}
          {/*        </Column>*/}
          {/*      </Table>*/}
          {/*    </div>*/}

          {/*    <div className="px-4 pb-5">*/}
          {/*      <Pagination*/}
          {/*        lengthMenu={[*/}
          {/*          { value: 10, label: 10 },*/}
          {/*          { value: 20, label: 20 },*/}
          {/*        ]}*/}
          {/*        activePage={1}*/}
          {/*        displayLength={10}*/}
          {/*        total={data.length}*/}
          {/*        onChangePage={() => {}}*/}
          {/*        onChangeLength={() => {}}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Tab.Panel>*/}
        </Tab.Panels>
      </Tab.Group>
      <Footer />
    </>
  );
}
