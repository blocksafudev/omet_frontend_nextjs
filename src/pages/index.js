import dynamic from "next/dynamic";
import Head from "next/head";
import { Banner } from "@/components/Banner";
import "rsuite/Tooltip/styles/index.css";
import Image from "next/image";
import {
  RiArrowDownLine,
  RiArrowRightLine,
  RiArrowUpDownLine,
  RiBox1Line,
  RiHandCoinLine,
  RiNftLine,
  RiUserAddLine,
} from "react-icons/ri";
import Link from "next/link";

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

export default function Home() {
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
        <link rel="preload" as="image" href="/images/icon-reward/metti.svg" />
        <link
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Flogo-dark.webp&w=1920&q=90"
        />
        <link rel="preload" as="image" href="/images/logo-dark.webp" />
        <link
          rel="preload"
          as="image"
          href="/_next/static/media/banner-background.f73331d8.webp"
        />

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

      <div className="p-4 space-y-4">
        <Banner />

        <div className="bg-blackn-50 px-6 py-8 lg:py-12 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Meet Metti
            </div>
            <div className="text-xl absolute mt-8 font-normal text-blackn-400">
              Meet METTI!
            </div>
            <div className="text-5xl absolute mt-16 font-semibold text-blackn-900">
              What Is Metti?
            </div>
          </div>

          <div className="relative flex flex-col gap-4 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <p className="text-black relative mt-40">
                OMET represents a revolutionary advancement in digital assets,
                driving DeFi adoption with a reliable blockchain protocol and a
                token of exceptional value. OMET not only offers a modern
                trading platform but also provides customers and investors with
                insights into trends and developments in the cryptocurrency
                sector.
              </p>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl">
                  Meet Up WIth Metti Token
                </h1>
                <h1 className="font-semibold text-5xl mb-5">01</h1>
              </div>

              <div className="place-content-end pb-8 place-items-end place-self-end w-full h-full">
                <div className="w-12 h-12 md:w-20 md:h-20 flex justify-center items-center bg-black text-white rounded-full">
                  <RiArrowDownLine className="w-6 h-6" />
                </div>
              </div>
              {/* <div className="relative flex justify-end mt-8 lg:mt-0">
                <Image
                  src="/images/illustration/metti-illustration.webp"
                  width="225"
                  height="341"
                  alt="Metti Illustration"
                />
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-blackn-1000 bg-featurebg rounded-3xl bg-no-repeat bg-contain lg:bg-cover lg:bg-center to-salem-700 relative px-6 py-8 lg:py-20 md:px-12 lg:px-20">
          <div className="relative flex justify-center w-full h-full">
            <div className="text-5xl lg:text-9xl text-center absolute font-semibold text-transparent text-stroke text-stroke-[#292929] hover:text-stroke-[#3D3D3D] w-full h-full">
              Meet Metti
            </div>
            <div className="text-xl absolute text-center mt-8 font-normal text-blackn-300 w-full h-full">
              Meet METTI!
            </div>
            <div className="text-3xl md:text-4xl absolute text-center mt-20 font-semibold text-white w-full h-full max-w-md leading-tight">
              Learn More About Our Blockchain Products
            </div>

            <div className="mt-52 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
              <div className="bg-featuremenubg rounded-3xl bg-no-repeat bg-cover lg:bg-cover lg:bg-center p-5 w-full overflow-hidden border-2 border-transparent hover:border-amber-500">
                <div className="relative space-y-5">
                  <div className="">
                    <RiArrowUpDownLine className="text-white text-5xl" />
                  </div>
                  <div className="text-white mb-2 text-xl font-semibold">
                    Swap
                  </div>

                  <div className="text-blackn-200 mb-2">
                    Instantly exchange your crypto assets securely and
                    seamlessly—no hassle, just simple swaps.
                  </div>

                  <Link
                    href="/"
                    prefetch={false}
                    className="flex justify-between items-center"
                  >
                    <div className="text-white">Learn more</div>
                    <div className="bg-transparent hover:bg-blackn-500 p-2 rounded-lg text-blackn-500 hover:text-black">
                      <RiArrowRightLine className="" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-featuremenubg rounded-3xl bg-no-repeat bg-cover lg:bg-cover lg:bg-center p-5 w-full overflow-hidden border-2 border-transparent hover:border-amber-500">
                <div className="relative space-y-5">
                  <div className="">
                    <RiBox1Line className="text-white text-5xl" />
                  </div>
                  <div className="text-white mb-2 text-xl font-semibold">
                    Staking
                  </div>
                  <div className="text-blackn-200 mb-2">
                    Earn passive income by staking your crypto—let your tokens
                    do the work while you relax.
                  </div>
                  <Link
                    href="/"
                    prefetch={false}
                    className="flex justify-between items-center"
                  >
                    <div className="text-white">Learn more</div>
                    <div className="bg-transparent hover:bg-blackn-500 p-2 rounded-lg text-blackn-500 hover:text-black">
                      <RiArrowRightLine className="" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-featuremenubg rounded-3xl bg-no-repeat bg-cover lg:bg-cover lg:bg-center p-5 w-full overflow-hidden border-2 border-transparent hover:border-amber-500">
                <div className="relative space-y-5">
                  <div className="">
                    <RiHandCoinLine className="text-white text-5xl" />
                  </div>
                  <div className="text-white mb-2 text-xl font-semibold">
                    Earning
                  </div>
                  <div className="text-blackn-200 mb-2">
                    Grow your wealth effortlessly by earning attractive yields
                    on your crypto holdings every day.
                  </div>
                  <Link
                    href="/"
                    prefetch={false}
                    className="flex justify-between items-center"
                  >
                    <div className="text-white">Learn more</div>
                    <div className="bg-transparent hover:bg-blackn-500 p-2 rounded-lg text-blackn-500 hover:text-black">
                      <RiArrowRightLine className="" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-featuremenubg rounded-3xl bg-no-repeat bg-cover lg:bg-cover lg:bg-center p-5 w-full overflow-hidden border-2 border-transparent hover:border-amber-500">
                <div className="relative space-y-5">
                  <div className="">
                    <RiNftLine className="text-white text-5xl" />
                  </div>
                  <div className="text-white mb-2 text-xl font-semibold">
                    Mining
                  </div>
                  <div className="text-blackn-200 mb-2">
                    Unlock rewards by mining tokens—participate easily and watch
                    your crypto portfolio flourish.
                  </div>
                  <Link
                    href="/"
                    prefetch={false}
                    className="flex justify-between items-center"
                  >
                    <div className="text-white">Learn more</div>
                    <div className="bg-transparent hover:bg-blackn-500 p-2 rounded-lg text-blackn-500 hover:text-black">
                      <RiArrowRightLine className="" />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="bg-featuremenubg rounded-3xl bg-no-repeat bg-cover lg:bg-cover lg:bg-center p-5 w-full overflow-hidden border-2 border-transparent hover:border-amber-500">
                <div className="relative space-y-5">
                  <div className="">
                    <RiUserAddLine className="text-white text-5xl" />
                  </div>
                  <div className="text-white mb-2 text-xl font-semibold">
                    Affiliate
                  </div>
                  <div className="text-blackn-200 mb-2">
                    Share, refer, and earn together—boost your profits with
                    generous commissions through our affiliate program.
                  </div>
                  <Link
                    href="/"
                    prefetch={false}
                    className="flex justify-between items-center"
                  >
                    <div className="text-white">Learn more</div>
                    <div className="bg-transparent hover:bg-blackn-500 p-2 rounded-lg text-blackn-500 hover:text-black">
                      <RiArrowRightLine className="" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white relative px-6 py-8 lg:pt-16 lg:pb-16 md:px-12 lg:px-20">
          <div className="relative flex justify-center w-full h-full">
            <div className="text-4xl lg:text-9xl text-center absolute font-semibold text-transparent text-stroke text-stroke-[#e7e7e7] hover:text-stroke-[#d1d1d1] w-full h-full">
              Tokenomics
            </div>
            <div className="text-xl absolute text-center mt-8 font-normal text-blackn-800 w-full h-full">
              METTI Token
            </div>
            <div className="text-3xl md:text-4xl max-w-md leading-snug absolute text-center mt-16 font-semibold text-black w-full h-full">
              Learn More About Our Token Allocation
            </div>

            <div className="mt-52 w-full space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 w-full">
                <div className="border border-blackn-200 rounded-xl w-full">
                  <div className="bg-blackn-1000 text-white font-semibold text-lg p-4 rounded-t-xl w-full">
                    <div className="flex w-full justify-between items-center">
                      Token Information
                      <Image
                        src="/images/illustration/diamond.webp"
                        width="42"
                        height="38"
                        alt="Diamond"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-b-xl w-full space-y-4">
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Token Name:</div>
                      <div className="text-black">Metti</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Token Symbol:</div>
                      <div className="text-black">MTT</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Token Decimals:</div>
                      <div className="text-black">18 Decimals</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Total Supply:</div>
                      <div className="text-black">5,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="border border-blackn-200 rounded-xl w-full">
                  <div className="bg-blackn-1000 text-white font-semibold text-lg p-4 rounded-t-xl w-full">
                    <div className="flex w-full justify-between items-center">
                      Tax Information
                      <Image
                        src="/images/illustration/diamond.webp"
                        width="42"
                        height="38"
                        alt="Diamond"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-b-xl w-full space-y-4">
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Stake Pool:</div>
                      <div className="text-black">1%</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Treasury:</div>
                      <div className="text-black">2%</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Token Type:</div>
                      <div className="text-black">Utility, Governance</div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <div className="text-black">Network:</div>
                      <div className="text-black">BNB Chain</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">20%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">Liquidity</h1>
                      <div>1,000,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">20%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">
                        Ecosystem & Growth
                      </h1>
                      <div>1,000,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">15%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">
                        Staking & Rewards
                      </h1>
                      <div>750,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">10%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">Private Sale</h1>
                      <div>500,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">10%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">
                        Public Sale (IDO/IEO)
                      </h1>
                      <div>500,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">10%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">Team & Advisors</h1>
                      <div>500,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">5%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">
                        Marketing & Comm
                      </h1>
                      <div>250,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">5%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">Reserve</h1>
                      <div>250,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
                <div className="flex justify-between items-center bg-blackn-50 rounded-3xl border border-blackn-200 p-3">
                  <div className="flex justify-start items-center gap-4">
                    <div className="text-4xl font-semibold">5%</div>

                    <div className="flex flex-col gap-4">
                      <h1 className="text-lg font-semibold">Seed Sale</h1>
                      <div>250,000</div>
                    </div>
                  </div>
                  <Image
                    src="/images/illustration/coin.webp"
                    width="83"
                    height="122"
                    alt="Coin"
                  />
                </div>
              </div>

              <div className="rounded-xl overflow-x-auto relative">
                <table className="w-full rounded-xl border border-blackn-200 table-fixed min-w-[600px]">
                  <thead className="w-full">
                    <tr className="bg-blackn-1000 text-white">
                      <td
                        width="20%"
                        className="p-4 font-semibold border border-blackn-200 rounded-tl-xl"
                      >
                        SEGMENT
                      </td>
                      <td
                        width="20%"
                        className="p-4 font-semibold border border-blackn-200"
                      >
                        TOKENS
                      </td>
                      <td
                        width="20%"
                        className="p-4 font-semibold border border-blackn-200"
                      >
                        PERCENTAGE
                      </td>
                      <td
                        width="40%"
                        className="p-4 font-semibold border border-blackn-200 rounded-tr-xl"
                      >
                        Conditions
                      </td>
                    </tr>
                  </thead>

                  <tbody className="rounded-xl w-full">
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Liquidity
                      </td>
                      <td width="20%" className="p-4 text-black">
                        1,000,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        20%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        Liquidity Lock: A portion of tokens will be locked for a
                        period of 24 months to ensure stability.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Staking & Rewards
                      </td>
                      <td width="20%" className="p-4 text-black">
                        750,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        15%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        Gradual distribution: Tokens will be gradually released
                        through reward programs.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Private Sale
                      </td>
                      <td width="20%" className="p-4 text-black">
                        500,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        10%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Discounted Price: $6 <br />
                        II. Vesting Period: Locked for 12 months <br />
                        III. TGE: 10% release after 3 months <br />
                        IV. Cycle: Every 30 days, 7.5% release
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Marketing & Community
                      </td>
                      <td width="20%" className="p-4 text-black">
                        250,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        5%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Flexible use: For marketing campaigns, events, and
                        airdrops. <br />
                        II. Vesting: Gradual allocation to align with the
                        marketing strategy.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Reserve
                      </td>
                      <td width="20%" className="p-4 text-black">
                        250,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        5%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Use as needed: Only used with approval from the
                        community or DAO (Decentralized Autonomous
                        Organization). <br />
                        II. Lock: May be locked or not, depending on governance
                        structure.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Seed Sale
                      </td>
                      <td width="20%" className="p-4 text-black">
                        250,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        5%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Discounted Price: $3 <br />
                        II. Vesting Period: Locked for 24 months <br />
                        III. TGE (Token Generation Event): 10% release after 6
                        months <br />
                        IV. Cycle: Every 30 days, 5% release
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Ecosystem & Growth
                      </td>
                      <td width="20%" className="p-4 text-black">
                        1,000,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        20%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Flexible use: For partnership projects, grants, or
                        technology integrations. <br />
                        II. Vesting: Unlock according to demand and development
                        plans.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Public Sale (IDO/IEO)
                      </td>
                      <td width="20%" className="p-4 text-black">
                        500,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        10%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. TGE (Token Generation Event): 100% unlocked.
                      </td>
                    </tr>
                    <tr className="bg-white rounded-xl items-start justify-start">
                      <td width="20%" className="p-4 text-black rounded-bl-xl">
                        Team & Advisors
                      </td>
                      <td width="20%" className="p-4 text-black">
                        500,000
                      </td>
                      <td width="20%" className="p-4 text-black">
                        10%
                      </td>
                      <td width="40%" className="p-4 text-black rounded-br-xl">
                        I. Lock: Tokens locked for 24 months. <br />
                        II. Vesting: Gradually unlocked on a quarterly basis.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="absolute inset-0 flex justify-center items-center">
                  <Image
                    src="/images/illustration/blocksquare.webp"
                    width="700"
                    height="700"
                    alt="Blocksquare"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blackn-1000 bg-featurebg rounded-3xl bg-no-repeat bg-contain lg:bg-cover lg:bg-center relative px-6 py-8 lg:pt-16 lg:pb-16 md:px-12 lg:px-20">
          <div className="relative flex justify-center w-full h-full">
            <div className="text-5xl lg:text-9xl text-center absolute font-semibold text-transparent text-stroke text-stroke-[#292929] hover:text-stroke-[#3D3D3D] w-full h-full">
              Presale Token
            </div>
            <div className="text-xl absolute text-center mt-8 font-normal text-amber-500 w-full h-full">
              Metti Token
            </div>
            <div className="text-4xl lg:text-5xl absolute text-center mt-16 font-semibold text-white w-full h-full">
              Presale Information
            </div>

            <div className="mt-52 mb-28 w-full">
              <div className="flex w-full justify-center absolute items-center gap-4">
                <Link
                  href="/"
                  prefetch={false}
                  className="py-3 px-6 bg-white rounded-full text-black"
                >
                  Join Presale
                </Link>
                <Link
                  href="/"
                  prefetch={false}
                  className="py-3 px-6 bg-transparent border border-white rounded-full text-white"
                >
                  Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
