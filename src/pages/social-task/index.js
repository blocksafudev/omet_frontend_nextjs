import dynamic from "next/dynamic";
import Head from "next/head";
import { Banner } from "@/components/Banner";
import "rsuite/Tooltip/styles/index.css";
import Image from "next/image";
import {
  RiArrowDownLine,
  RiArrowRightLine,
  RiArrowRightSLine,
  RiArrowUpDownLine,
  RiBox1Line,
  RiHandCoinLine,
  RiNftLine,
  RiUserAddLine,
} from "react-icons/ri";
import Link from "next/link";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

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

export default function SocialTask() {
  let [isOpenBug, setIsOpenBug] = useState(false);

  function closeModalBug() {
    setIsOpenBug(false);
  }

  function openModalBug() {
    setIsOpenBug(true);
  }

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
              Social Tasks
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Step 1
            </div>
            <div className="text-xl absolute -mt-6 font-normal text-blackn-400">
              Step 1
            </div>
            <div className="text-3xl lg:text-5xl absolute mt-4 max-w-xl leading-tight font-semibold text-blackn-900">
              Connect Wallet & Receive Testnet Tokens
            </div>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <ul className="text-black relative mt-32 lg:mt-40 space-y-2">
                <li>
                  ● Requirement: A Web3 wallet (MetaMask, Trust Wallet, etc.).
                </li>
                <li>
                  ● Action: Connect your wallet & claim testnet tokens via the
                  faucet.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl text-end">
                  Connect Wallet & Receive Testnet Tokens
                </h1>
                <h1 className="font-semibold text-5xl mb-5">01</h1>
              </div>

              <div className="place-content-end flex gap-4 pb-8 place-items-end place-self-end w-full h-full flex-wrap mt-4 lg:mt-0">
                <div className="py-4 px-8 flex justify-center items-center bg-black text-white rounded-full">
                  Faucet Now
                </div>
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Connect Wallet First
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Step 2
            </div>
            <div className="text-xl absolute -mt-6 font-normal text-blackn-400">
              Step 2!
            </div>
            <div className="text-3xl lg:text-5xl absolute mt-4 max-w-xl leading-tight font-semibold text-blackn-900">
              Complete All Testnet Tasks
            </div>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <ul className="text-black relative mt-32 lg:mt-40 space-y-2">
                <li>Mining – Explore resource mining on the platform.</li>
                <li>Staking – Stake tokens to test functionality.</li>
                <li>Earning – Try out the earning mechanics.</li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl text-end">
                  Complete All Testnet Tasks
                </h1>
                <h1 className="font-semibold text-5xl mb-5">02</h1>
              </div>

              <div className="place-content-end flex gap-4 pb-8 place-items-end place-self-end w-full h-full flex-wrap mt-4 lg:mt-0">
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Mining
                </div>
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Staking
                </div>
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Earning
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Step 3
            </div>
            <div className="text-xl absolute -mt-6 font-normal text-blackn-400">
              Step 3!
            </div>
            <div className="text-3xl lg:text-5xl absolute mt-4 max-w-xl leading-tight font-semibold text-blackn-900">
              Complete Social & On-Platform Tasks
            </div>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <ul className="text-black relative mt-32 lg:mt-40 space-y-2">
                <li>
                  Follow, retweet, and engage on Twitter/X, Telegram, and
                  Discord.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl text-end">
                  Complete Social & On-Platform Tasks
                </h1>
                <h1 className="font-semibold text-5xl mb-5">03</h1>
              </div>

              <div className="place-content-end flex gap-4 pb-8 place-items-end place-self-end w-full h-full flex-wrap mt-4 lg:mt-0">
                <a
                  href="https://x.com/omet_official"
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full"
                >
                  Twitter / X
                </a>
                <div
                  href="https://t.me/omet_group"
                  target="_blank"
                  rel="noreferrer"
                  className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full"
                >
                  Telegram
                </div>
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Discord
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Step 4
            </div>
            <div className="text-xl absolute -mt-6 font-normal text-blackn-400">
              Step 4!
            </div>
            <div className="text-3xl lg:text-5xl absolute mt-4 max-w-xl leading-tight font-semibold text-blackn-900">
              Invite Friends (Optional)
            </div>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <ul className="text-black relative mt-32 lg:mt-40 space-y-2">
                <li>
                  Referral program: Invite friends via a referral link (not
                  mandatory but may provide priority rewards).
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl text-end">
                  Invite Friends (Optional)
                </h1>
                <h1 className="font-semibold text-5xl mb-5">04</h1>
              </div>

              <div className="place-content-end flex gap-4 pb-8 place-items-end place-self-end w-full h-full flex-wrap mt-4 lg:mt-0">
                <div className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full">
                  Referral Code
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blackn-50 px-6 py-8 lg:pb-16 lg:pt-16 md:px-12 lg:px-16 rounded-3xl border border-blackn-100">
          <div className="relative">
            <div className="text-4xl lg:text-9xl absolute font-semibold text-transparent text-stroke text-stroke-[#E7E7E7] hover:text-stroke-[#FFDB1D]">
              Step 5
            </div>
            <div className="text-xl absolute -mt-6 font-normal text-blackn-400">
              Step 5!
            </div>
            <div className="text-3xl lg:text-5xl absolute mt-4 max-w-xl leading-tight font-semibold text-blackn-900">
              Report Bugs & Receive Rewards
            </div>
          </div>

          <div className="relative flex flex-col gap-8 md:flex-row justify-between">
            <div className="relative w-full lg:w-8/12">
              <ul className="text-black relative mt-32 lg:mt-40 space-y-2">
                <li>
                  ● Submit bug reports: If you find any issues while using the
                  Testnet, submit a bug report form for a chance to earn
                  additional rewards.
                </li>
                <li>
                  ● Reward distribution: Tokens will be distributed after the
                  Testnet phase concludes.
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-4/12 place-items-end">
              <div className="flex items-center gap-10">
                <h1 className="font-semibold text-xl text-end">
                  Report Bugs & Receive Rewards
                </h1>
                <h1 className="font-semibold text-5xl mb-5">05</h1>
              </div>

              <div className="place-content-end flex gap-4 pb-8 place-items-end place-self-end w-full h-full flex-wrap mt-4 lg:mt-0">
                <div
                  onClick={openModalBug}
                  className="py-4 px-8 flex justify-center items-center border border-black text-black bg-transparent rounded-full"
                >
                  Submit Bugs
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

        {/* Modal Report Bug */}
        <Transition appear show={isOpenBug} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalBug}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Submit Bugs
                    </Dialog.Title>
                    <form action="" className="space-y-4">
                      <div className="mt-2">
                        <textarea
                          name=""
                          id=""
                          rows="8"
                          className="rounded-md w-full"
                          placeholder="Explain bug here..."
                        ></textarea>
                      </div>

                      <div className="mt-4 flex gap-2 items-center">
                        <button
                          type="submit"
                          className="bg-black border border-black rounded-lg text-white py-3 px-6"
                        >
                          Submit Bugs
                        </button>
                        <div
                          className="bg-transparent border border-black rounded-lg text-black py-3 px-6"
                          onClick={closeModalBug}
                        >
                          Cancel Submit
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        {/* End Modal Report Bug */}
      </div>
      <Footer />
    </>
  );
}
