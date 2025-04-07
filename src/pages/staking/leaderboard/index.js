import dynamic from "next/dynamic";
import Head from "next/head";
import { RiArrowRightSLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount } from "@reown/appkit/react";
import StakingBreadcrumb from "@/components/breadcrumb/staking-breadcrumb";
import { useEffect, useState } from "react";
import AvatarWallet from "@/components/AvatarWallet";
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";

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
      ? "text-blackn-400 bg-blackn-900 py-1 text-white px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : rowData[dataKey] === "Inactive"
      ? "text-red-400 bg-red-800 py-1 text-white px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
      : "text-gray-400 bg-gray-900 py-1 text-white px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

  return (
    <Cell {...props}>
      <div className={bgColor}>
        {rowData[dataKey] === "Active" ? <RiCheckLine /> : <RiCloseLine />}
        {rowData[dataKey]}
      </div>
    </Cell>
  );
};

const BadgeRank = ({ rowData, dataKey, ...props }) => {
  const bgColor =
    rowData[dataKey] === "1"
      ? "bg-blue-500 py-1 px-3 -mt-1.5 text-sm text-white rounded-md w-max"
      : rowData[dataKey] === "2"
      ? "bg-blackn-500 py-1 px-3 -mt-1.5 text-sm text-white rounded-md w-max"
      : rowData[dataKey] === "3"
      ? "bg-purple-500 py-1 px-3 -mt-1.5 text-sm text-white rounded-md w-max"
      : "bg-black py-1 px-3 -mt-1.5 text-sm text-white rounded-md w-max";

  return (
    <Cell {...props}>
      <div className={bgColor}>{rowData[dataKey]}</div>
    </Cell>
  );
};

export default function Leaderboard() {
  const { address, isConnected } = useAppKitAccount();
  const [clientConnected, setClientConnected] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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

  const data = [
    {
      rank: "1",
      user: "0x12...3243",
      staked: 12454.12,
      referrerReward: 12,
      claimedReward: 6,
      claimableReward: 6,
      status: "Active",
    },
    {
      rank: "2",
      user: "0x12...3243",
      staked: 12454.12,
      referrerReward: 12,
      claimedReward: 6,
      claimableReward: 6,
      status: "Inactive",
    },
  ];

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
            <RiArrowRightSLine className="text-blackn-400 w-max" />
            <div className="text-white font-semibold whitespace-nowrap">
              Staking
            </div>
          </div>
        </div>
      </div>
      <StakingBreadcrumb />

      <div className="bg-white space-y-6 px-6 py-8 lg:py-6 md:px-12 lg:px-20">
        <div className="rounded-xl border border-blackn-200 text-black w-full space-y-2">
          <div className="flex justify-between items-center px-4 py-4">
            <h1 className="text-black font-semibold text-lg">
              Top Leaderboard
            </h1>

            <select
              name="filter"
              id="filter"
              className="appearance-none bg-blackn-50 text-blackn-1000 border border-blackn-200 ring-blackn-200 fill-blackn-500 rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="px-4 overflow-x-scroll">
            <Table
              rowHeight={70}
              autoHeight={true}
              height={400}
              width={1400}
              maxHeight={610}
              data={filteredData}
              onRowClick={(data) => {
                console.log(data);
              }}
            >
              <Column verticalAlign="middle" align="left">
                <HeaderCell>Rank</HeaderCell>
                <BadgeRank dataKey="rank" />
              </Column>

              <Column verticalAlign="middle" flexGrow={1} width={200} resizable>
                <HeaderCell>User</HeaderCell>
                <Cell>
                  {(rowData) => (
                    <div className="flex items-center gap-2 border rounded-md border-dashed border-blackn-1000 p-2">
                      <AvatarWallet address={rowData.user} diameter={20} />
                      <div className="">{rowData.user}</div>
                    </div>
                  )}
                </Cell>
              </Column>

              <Column verticalAlign="middle" flexGrow={1}>
                <HeaderCell>Staked</HeaderCell>
                <Cell dataKey="staked" />
              </Column>

              <Column verticalAlign="middle" flexGrow={1}>
                <HeaderCell>Referrer Reward</HeaderCell>
                <Cell dataKey="referrerReward" />
              </Column>

              <Column verticalAlign="middle" flexGrow={1}>
                <HeaderCell>Claimed</HeaderCell>
                <Cell dataKey="claimedReward" />
              </Column>

              <Column verticalAlign="middle" flexGrow={1}>
                <HeaderCell>Claimable</HeaderCell>
                <Cell dataKey="claimableReward" />
              </Column>

              <Column verticalAlign="middle" flexGrow={1} align="right">
                <HeaderCell>Status</HeaderCell>
                <BadgeStatusCell dataKey="status" />
              </Column>
            </Table>
          </div>

          <div className="p-4">
            <Pagination
              lengthMenu={[
                { value: 10, label: 10 },
                { value: 20, label: 20 },
              ]}
              activePage={1}
              displayLength={10}
              total={filteredData.length}
              onChangePage={() => {}}
              onChangeLength={() => {}}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
