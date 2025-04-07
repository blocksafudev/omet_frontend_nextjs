import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import Image from "next/image";
import {
  RiArrowRightSLine,
  RiCalendarLine,
  RiMacbookLine,
  RiTimeLine,
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

export default function Content() {
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

      <div className="bg-blackn-900 px-6 py-8 lg:pt-24 lg:pb-6 md:px-12 lg:px-20">
        <div className="flex justify-start gap-4 items-center">
          <Link
            href="/"
            prefetch={false}
            className="text-blackn-500 font-semibold"
          >
            Home
          </Link>
          <RiArrowRightSLine className="text-amber-500" />
          <div className="text-white font-semibold">Membership Content</div>
        </div>
      </div>

      <div className="bg-blackn-1000 border-b border-blackn-900 px-6 py-12 md:px-12 lg:px-20 space-y-20">
        <div>
          <h1 className="text-amber-500 text-2xl font-semibold mb-6">
            Membership Course
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Link
              href="/membership/content/details"
              prefetch={false}
              className="border-2 border-blackn-400 hover:border-amber-500 rounded-2xl bg-blackn-1000"
            >
              <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(85%_85%_at_50%_10%,#23A66F_40%,#10553C_100%)]">
                  <div className="flex justify-center items-center w-full h-full">
                    <Image
                      src="/images/membership/course.webp"
                      className="mb-32 w-full hover:scale-105"
                      width="185"
                      height="185"
                      alt="Miners"
                    />
                  </div>
                </div>
                <div className="absolute z-20 w-full bottom-0">
                  <div className="p-2">
                    <div className="bg-blackn-1000 border border-blackn-500 space-y-3 p-4 rounded-2xl">
                      <div className="text-amber-500">#0001</div>
                      <div className="text-white text-lg font-semibold">
                        Course Title
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex justify-start gap-1 items-center">
                          <RiTimeLine className="text-amber-500" />
                          <div className="text-white">23 Hours</div>
                        </div>
                        <div className="flex justify-start gap-1 items-center">
                          <RiMacbookLine className="text-amber-500" />
                          <div className="text-white">Expert</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/membership/content/details"
              prefetch={false}
              className="border-2 border-blackn-400 hover:border-amber-500 rounded-2xl bg-blackn-1000"
            >
              <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(85%_85%_at_50%_10%,#23A66F_40%,#10553C_100%)]">
                  <div className="flex justify-center items-center w-full h-full">
                    <Image
                      src="/images/membership/course.webp"
                      className="mb-32 w-full hover:scale-105"
                      width="185"
                      height="185"
                      alt="Miners"
                    />
                  </div>
                </div>
                <div className="absolute z-20 w-full bottom-0">
                  <div className="p-2">
                    <div className="bg-blackn-1000 border border-blackn-500 space-y-3 p-4 rounded-2xl">
                      <div className="text-amber-500">#0001</div>
                      <div className="text-white text-lg font-semibold">
                        Course Title
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex justify-start gap-1 items-center">
                          <RiTimeLine className="text-amber-500" />
                          <div className="text-white">23 Hours</div>
                        </div>
                        <div className="flex justify-start gap-1 items-center">
                          <RiMacbookLine className="text-amber-500" />
                          <div className="text-white">Expert</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-amber-500 text-2xl font-semibold my-6">
            Membership Content
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Link
              href="/membership/post/details"
              prefetch={false}
              className="border-2 border-blackn-400 hover:border-amber-500 rounded-2xl bg-blackn-1000"
            >
              <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(85%_85%_at_50%_10%,#23A66F_40%,#10553C_100%)]">
                  <div className="flex justify-center items-center w-full h-full">
                    <Image
                      src="/images/membership/new-project.webp"
                      className="mb-32 w-full hover:scale-105"
                      width="185"
                      height="185"
                      alt="Miners"
                    />
                  </div>
                </div>
                <div className="absolute z-20 w-full bottom-0">
                  <div className="p-2">
                    <div className="bg-blackn-1000 border border-blackn-500 space-y-3 p-4 rounded-2xl">
                      <div className="text-amber-500">#0001</div>
                      <div className="text-white text-lg font-semibold">
                        New Project Release
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex justify-start gap-1 items-center">
                          <RiCalendarLine className="text-amber-500" />
                          <div className="text-white">2 Minutes ago</div>
                        </div>
                        <div className="flex justify-start gap-1 items-center">
                          <RiMacbookLine className="text-amber-500" />
                          <div className="text-white">BSC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="/membership/post/details"
              prefetch={false}
              className="border-2 border-blackn-400 hover:border-amber-500 rounded-2xl bg-blackn-1000"
            >
              <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <div className="absolute inset-0 z-10 h-full w-full bg-white [background:radial-gradient(85%_85%_at_50%_10%,#23A66F_40%,#10553C_100%)]">
                  <div className="flex justify-center items-center w-full h-full">
                    <Image
                      src="/images/membership/airdrop.webp"
                      className="mb-32 w-full hover:scale-105"
                      width="185"
                      height="185"
                      alt="Miners"
                    />
                  </div>
                </div>
                <div className="absolute z-20 w-full bottom-0">
                  <div className="p-2">
                    <div className="bg-blackn-1000 border border-blackn-500 space-y-3 p-4 rounded-2xl">
                      <div className="text-amber-500">#0001</div>
                      <div className="text-white text-lg font-semibold">
                        Airdrop
                      </div>
                      <div className="flex w-full justify-between items-center">
                        <div className="flex justify-start gap-1 items-center">
                          <RiCalendarLine className="text-amber-500" />
                          <div className="text-white">1 Minutes</div>
                        </div>
                        <div className="flex justify-start gap-1 items-center">
                          <RiMacbookLine className="text-amber-500" />
                          <div className="text-white">BSC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
