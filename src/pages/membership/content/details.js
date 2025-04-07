import dynamic from "next/dynamic";
import Head from "next/head";
import "rsuite/Tooltip/styles/index.css";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { Tab } from "@headlessui/react";

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

export default function detail() {
  const courseData = [
    {
      title: "Bab 1: Introduce",
      videoUrl: "https://www.youtube.com/embed/dummyUrl1",
    },
    {
      title: "Bab 2: Basic Knowledge",
      videoUrl: "https://www.youtube.com/embed/dummyUrl2",
    },
    {
      title: "Bab 3: Next Step",
      videoUrl: "https://www.youtube.com/embed/dummyUrl3",
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
          <Link
            href="/membership/content"
            prefetch={false}
            className="text-amber-500 font-semibold"
          >
            Membership Content
          </Link>
          <RiArrowRightSLine className="text-amber-500" />
          <div className="text-white font-semibold">Detail</div>
        </div>
      </div>

      <div className="bg-blackn-1000 border-b border-blackn-900 px-6 py-12 md:px-12 lg:px-20 space-y-10">
        <h1 className="text-amber-500 text-2xl font-semibold mb-4">
          Course Content
        </h1>

        <Tab.Group>
          <div className="flex">
            <Tab.List className="flex flex-col bg-blackn-950 p-4 rounded-xl w-1/4 h-96 overflow-x-scroll">
              {courseData.map((course, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    selected
                      ? "bg-amber-500 p-3 rounded-lg text-black text-left"
                      : "text-amber-500 p-3 rounded-lg text-left"
                  }
                >
                  {course.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="w-3/4">
              {courseData.map((course, index) => (
                <Tab.Panel key={index} className="px-4">
                  <div className="p-5 bg-blackn-950 rounded-xl">
                    <h1 className="text-amber-500 text-xl font-semibold mb-6">
                      {course.title}
                    </h1>
                    <iframe
                      width="100%"
                      height="400"
                      src={course.videoUrl}
                      title={course.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
}
