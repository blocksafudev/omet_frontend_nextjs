import dynamic from "next/dynamic";
import Head from "next/head";
import { Banner } from "@/components/Banner";
import "rsuite/Tooltip/styles/index.css";
import Image from "next/image";
import {
  RiArrowLeftSLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiArrowUpDownLine,
  RiBox1Line,
  RiFlashlightFill,
  RiHandCoinLine,
  RiMacbookLine,
  RiNftLine,
  RiThunderstormsLine,
  RiTimeLine,
  RiUserAddLine,
} from "react-icons/ri";
import Link from "next/link";
import MiningBreadcrumb from "@/components/breadcrumb/mining-breadcrumb";

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

export default function MiningInventory() {
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
              NFT Mining
            </div>
            <div>
              <RiArrowRightSLine className="text-blackn-400 w-max" />
            </div>
            <div className="text-white font-semibold whitespace-nowrap">
              My Miners
            </div>
          </div>
        </div>
      </div>
      <MiningBreadcrumb />

      <div className="bg-white border-b border-blackn-200 px-6 py-12 md:px-12 lg:px-20">
        <h1 className="text-black text-2xl font-semibold mb-6">
          Miners Investory
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/mining/inventory/details"
            prefetch={false}
            className="border-2 border-blackn-200 hover:border-blackn-400 rounded-2xl bg-blackn-1000"
          >
            <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-blackn-200/10">
              <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(90%_90%_at_50%_30%,#B0B0B0_4%,#E7E7E7_40%)]">
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src="/images/nft/miner-1.webp"
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
                    <div className="text-black">#0001</div>
                    <div className="text-black text-lg font-semibold">
                      Metti USB Miner
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex justify-start gap-1 items-center">
                        <RiFlashlightFill className="text-black" />
                        <div className="text-black">18 TH</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center">
                        <RiMacbookLine className="text-black" />
                        <div className="text-black">20 W/TH</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center">
                        <RiTimeLine className="text-black" />
                        <div className="text-black">30 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href="/mining/inventory/details"
            prefetch={false}
            className="border-2 border-blackn-200 hover:border-blackn-400 rounded-2xl bg-blackn-1000"
          >
            <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-blackn-200/10">
              <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(90%_90%_at_50%_30%,#B0B0B0_4%,#E7E7E7_40%)]">
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src="/images/nft/miner-2.webp"
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
                    <div className="text-black">#0002</div>
                    <div className="text-black text-lg font-semibold">
                      Metti Miner Box
                    </div>
                    <div className="flex w-full justify-between items-center">
                      <div className="flex justify-start gap-1 items-center">
                        <RiFlashlightFill className="text-blackn-500" />
                        <div className="text-black">12 TH</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center">
                        <RiMacbookLine className="text-blackn-500" />
                        <div className="text-black">24 W/TH</div>
                      </div>
                      <div className="flex justify-start gap-1 items-center">
                        <RiTimeLine className="text-blackn-500" />
                        <div className="text-black">20 days</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex justify-start gap-2 mt-6">
          <div className="w-12 h-12 text-white flex justify-center items-center bg-blackn-1000 rounded-full border border-blackn-500">
            <RiArrowLeftSLine className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 text-black flex justify-center items-center bg-white rounded-full border border-blackn-500">
            1
          </div>
          <div className="w-12 h-12 text-black flex justify-center items-center bg-white rounded-full border border-blackn-500">
            2
          </div>
          <div className="w-12 h-12 text-black flex justify-center items-center bg-white rounded-full border border-blackn-500">
            3
          </div>
          <div className="w-12 h-12 text-black flex justify-center items-center bg-white rounded-full border border-blackn-500">
            ...
          </div>
          <div className="w-12 h-12 text-black flex justify-center items-center bg-white rounded-full border border-blackn-500">
            12
          </div>
          <div className="w-12 h-12 text-white flex justify-center items-center bg-blackn-1000 rounded-full border border-blackn-500">
            <RiArrowRightSLine className="w-5 h-5" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
