import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import {
  RiArrowRightSLine,
  RiCalendar2Line,
  RiCheckLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiInformationLine,
  RiRefreshLine,
  RiShoppingCart2Line,
  RiTimeLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";

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
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import AvatarWallet from "@/components/AvatarWallet";
import { useQuery } from "@tanstack/react-query";
import { truncate, truncateTxHash } from "@/libs/WebooLib";
import { getAppByChainId } from "@/libs/Env";
import { formatCurrency } from "@/lib/utils";
import { ethers } from "ethers";

const { Column, HeaderCell, Cell } = Table;

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

export default function Settlement() {
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  const [clientConnected, setClientConnected] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(0);
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
      return response.json();
    },
  });

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const formatEstimateAmount = (amount) => {
    return formatCurrency(ethers.formatEther(amount), 4);
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
            <RiArrowRightSLine className="text-blackn-400" />
            <div className="text-white font-semibold">Settlement</div>
          </div>
        </div>
      </div>

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-black font-semibold text-lg">Settlement</h1>
          <button className="bg-blackn-900 hover:bg-blackn-800 text-white flex items-center gap-2 py-2 px-4 rounded-lg">
            <RiRefreshLine />
            Settlement
          </button>
        </div>
        <Table
          rowHeight={70}
          autoHeight={true}
          height={400}
          maxHeight={610}
          data={history?.data ?? []}
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
                <a
                  href={
                    getAppByChainId(chainId).EXPLORER_URL +
                    "/address/" +
                    rowData.address
                  }
                  className="flex items-center gap-2 -mt-1 border border-blackn-800 py-0.5 px-1.5 rounded-md"
                >
                  <AvatarWallet address={rowData.address} diameter={20} />
                  <div className="text-white w-full">
                    {truncate(rowData.address, 8, "...", 50)}
                  </div>
                  <RiExternalLinkLine className="text-white" />
                </a>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={150}>
            <HeaderCell>Estimated Amount</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex items-center gap-2 -mt-1">
                  <div className="text-white">
                    {formatEstimateAmount(rowData.amount)} {rowData?.token}
                  </div>
                </div>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={200}>
            <HeaderCell>Tx Hash</HeaderCell>
            <Cell>
              {(rowData) => (
                <a
                  href={
                    getAppByChainId(chainId).EXPLORER_URL +
                    "/tx/" +
                    rowData.tx_hash
                  }
                  className="flex items-center gap-2 -mt-1 rounded-md border border-blackn-800 py-0.5 px-1.5"
                >
                  <div className="text-blackn-500">
                    {truncateTxHash(rowData.tx_hash, 8, "...", 66)}
                  </div>
                  <RiExternalLinkLine className="text-blackn-500" />
                </a>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={150}>
            <HeaderCell>Status</HeaderCell>
            <BadgeStatusCell dataKey="status" />
          </Column>

          <Column verticalAlign="middle" width={200}>
            <HeaderCell>Source</HeaderCell>
            <BadgeSourceCell dataKey="type" />
          </Column>

          <Column verticalAlign="middle" width={250} align="right">
            <HeaderCell>Settlement At (UTC)</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex items-center gap-2 -mt-1">
                  <RiCalendar2Line className="text-white" />
                  <div className="text-white">{rowData.created_at}</div>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      <Footer />
    </>
  );
}
