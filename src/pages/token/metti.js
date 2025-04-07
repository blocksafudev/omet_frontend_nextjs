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

      <div className="p-4 space-y-4 pt-28">
        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
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
      </div>
      <Footer />
    </>
  );
}
