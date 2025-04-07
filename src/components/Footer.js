import useDarkMode from "./useDarkMode";
import {
  RiGithubLine,
  RiMediumLine,
  RiTelegramFill,
  RiTelegramLine,
  RiTwitterLine,
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const [colorTheme, setTheme] = useDarkMode();
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="transition-all duration-500 bg-blackn-1000 bg-featurebg bg-no-repeat bg-contain lg:bg-cover lg:bg-center">
      <section className="mx-auto lg:px-20 md:px-12 px-4 py-8 md:py-12 lg:py-20">
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 lg:gap-12">
          <div className="w-full">
            <div className="flex items-center justify-start gap-1 mb-5 text-white">
              {colorTheme === "dark" ? (
                <Image
                  priority
                  src="/images/logo-dark.webp"
                  width="140"
                  height="39"
                  placeholder="blur"
                  blurDataURL="/images/logo-dark.webp"
                  alt="logo-dark"
                />
              ) : (
                <Image
                  priority
                  src="/images/logo-light.webp"
                  width="140"
                  height="39"
                  placeholder="blur"
                  blurDataURL="/images/logo-light.webp"
                  alt="logo-white"
                />
              )}
            </div>
            <div className="text-white">
              THE NEXT GENERATION OF DECENTRALIZED EXCHANGES
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-white font-semibold text-lg mt-6 lg:mt-0">
              About
            </div>

            <div className="flex flex-col gap-2 text-blackn-200">
              <Link href="/token/metti" prefetch={false}>
                Metti
              </Link>
              <Link href="/token/tokenomics" prefetch={false}>
                Tokenomics
              </Link>
              <Link href="/" prefetch={false}>
                Roadmap
              </Link>
              <Link href="/" prefetch={false}>
                Contacts
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-white font-semibold text-lg mt-6 lg:mt-0">
              Products
            </div>
            <div className="flex flex-col gap-2 text-blackn-200">
              <Link href="/" prefetch={false}>
                Swap
              </Link>
              <Link href="/earning" prefetch={false}>
                Earning
              </Link>
              <Link href="/staking" prefetch={false}>
                Staking
              </Link>
              <Link href="/mining" prefetch={false}>
                Mining
              </Link>
              <Link href="/affiliate" prefetch={false}>
                Affiliate
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-white font-semibold text-lg mt-6 lg:mt-0">
              Partner
            </div>
            <div className="flex flex-col gap-2 text-blackn-200">
              <Link href="/" prefetch={false}>
                Partner Program
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-white font-semibold text-lg mt-6 lg:mt-0">
              Help
            </div>
            <div className="flex flex-col gap-2 text-blackn-200">
              <Link href="/" prefetch={false}>
                Customer Help
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-start md:items-center lg:items-center xl:items-center px-4 md:px-20 lg:px-20 xl:px-20 py-6 bg-blackn-1000 border-t border-blackn-950 space-y-5 lg:space-y-0">
        <nav className="flex flex-col items-center font-semibold justify-center text-white dark:text-white lg:flex-row">
          <p>Copyright © {getYear()} Metti Token. All rights reserved.</p>
        </nav>

        <div
          className="flex items-center mb-4 space-x-2 font-medium text-white title-font lg:mb-0 md:mb-0"
          style={{ cursor: "pointer" }}
        >
          <a
            href="https://t.me/omet_group"
            className="px-3 py-3 text-white bg-blackn-950 rounded-lg dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
            aria-label="telegram"
          >
            <RiTelegramLine className="w-5 h-5" />
          </a>
          <a
            href="https://t.me/omet_channel"
            className="px-3 py-3 text-white bg-blackn-950 rounded-lg dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
            aria-label="telegram channel"
          >
            <RiTelegramLine className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/omet_official"
            className="px-3 py-3 text-white bg-blackn-950 rounded-lg dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
            aria-label="twitter"
          >
            <RiTwitterLine className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/"
            className="px-3 py-3 text-white bg-blackn-950 rounded-lg dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
            aria-label="github"
          >
            <RiGithubLine className="w-5 h-5" />
          </a>
          <a
            href="https://medium.com/"
            className="px-3 py-3 text-white bg-blackn-950 rounded-lg dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
            aria-label="medium"
          >
            <RiMediumLine className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
