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
  RiUser5Line,
  RiWalletLine,
} from "react-icons/ri";
import Link from "next/link";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AvatarWallet from "@/components/AvatarWallet";
import { Table, Pagination } from "rsuite";
import "rsuite/Table/styles/index.css";
import "rsuite/Pagination/styles/index.css";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { ethers } from "ethers";
import { getAppByChainId } from "@/libs/Env";
import { truncate, truncateTxHash } from "@/libs/WebooLib";

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

export default function Claim() {
  const { address, isConnected } = useAppKitAccount();
  const [clientConnected, setClientConnected] = useState(false);

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
      return data.filter(
        (item) =>
          item.type === "Approve Staking" ||
          item.type === "Submit Staking" ||
          item.type === "Approve Unstake" ||
          item.type === "Submit Unstake" ||
          item.type === "Approve Claim" ||
          item.type === "Submit Claim"
      );
    },
  });

  const formatEstimateAmount = (amount) => {
    return formatCurrency(ethers.formatEther(amount), 4);
  };

  useEffect(() => {
    setClientConnected(isConnected);
  }, [isConnected]);

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
            <RiArrowRightSLine className="text-blackn-400 w-max" />
            <div className="text-white font-semibold whitespace-nowrap">
              Claim Reward
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white space-y-6 px-3 py-4 lg:py-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between gap-6 w-full">
          <div className="rounded-xl border border-blackn-200 p-5 text-black w-full space-y-5">
            <div className="flex gap-4 flex-col py-4 items-center justify-center text-black font-semibold">
              <div className="text-2xl text-black">Total Rewards</div>
              <div className="flex gap-2">
                <div className="text-xl">0.00</div>
                <Image
                  src="/images/icon-reward/metti.svg"
                  width={20}
                  height={20}
                  alt="Metti"
                />
                <div className="text-xl">≈ $102 </div>
              </div>
            </div>

            {clientConnected ? (
              <div className="flex flex-col lg:flex-row justify-between gap-5 items-center">
                <div className="w-full p-3 text-center rounded-lg bg-blackn-1000 text-white border border-blackn-1000">
                  Claim Reward
                </div>
                <div className="w-full p-3 text-center rounded-lg bg-white text-blackn-1000 border border-blackn-1000">
                  Claim Referral Rewards
                </div>
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
                <div>Claimed Reward</div>
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
                <div>Unclaimed Reward</div>
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
            </div>

            <div className="bg-blackn-50 px-4 rounded-lg">
              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Mining Amount</div>
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
                <div>Claimed Reward</div>
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
                <div>Unclaimed Reward</div>
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
            </div>

            <div className="bg-blackn-50 px-4 rounded-lg">
              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Earning Amount</div>
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
                <div>Claimed Reward</div>
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
                <div>Unclaimed Reward</div>
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
            </div>

            <div className="bg-blackn-50 px-4 rounded-lg">
              <div className="flex w-full justify-between border-b py-4 border-dashed border-blackn-200">
                <div>Referral Amount</div>
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
                <div>Claimed Reward</div>
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
                <div>Unclaimed Reward</div>
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
            </div>
          </div>
          <div className="rounded-xl border border-blackn-200 text-black w-full space-y-5">
            <div className="flex justify-between items-center px-5 pt-5">
              <h1 className="text-black">Latest Transaction</h1>
            </div>

            <div className="overflow-x-scroll">
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
                <Column verticalAlign="middle" width={200} align="left">
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
                        <div className="text-black w-full">
                          {truncate(rowData.address, 8, "...", 50)}
                        </div>
                        <RiExternalLinkLine className="text-black" />
                      </a>
                    )}
                  </Cell>
                </Column>

                <Column verticalAlign="middle" width={150}>
                  <HeaderCell>Estimated Amount</HeaderCell>
                  <Cell>
                    {(rowData) => (
                      <div className="flex items-center gap-2 -mt-1">
                        <div className="text-black">
                          {formatEstimateAmount(rowData.amount)}{" "}
                          {rowData?.token}
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
                        <RiCalendar2Line className="text-black" />
                        <div className="text-black">{rowData.created_at}</div>
                      </div>
                    )}
                  </Cell>
                </Column>
              </Table>
            </div>

            <div className="px-4 pb-4">
              <Pagination
                lengthMenu={[
                  { value: 10, label: 10 },
                  { value: 20, label: 20 },
                ]}
                activePage={1}
                displayLength={10}
                total={history?.data.length ?? 0}
                onChangePage={() => {}}
                onChangeLength={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
