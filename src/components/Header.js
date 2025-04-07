import { useRouter } from "next/router";
import { Fragment, memo, useEffect, useState } from "react";
import useDarkMode from "./useDarkMode";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import {
  RiApps2Line,
  RiArrowDownSLine,
  RiCheckLine,
  RiCloseLine,
  RiCoinLine,
  RiFileCodeLine,
  RiFileTextLine,
  RiFileUserLine,
  RiGithubLine,
  RiHandCoinLine,
  RiHomeLine,
  RiMessage2Line,
  RiMoneyDollarCircleLine,
  RiNftLine,
  RiPlantLine,
  RiShieldCheckLine,
  RiTelegramLine,
  RiTwitterLine,
  RiUserAddLine,
  RiVideoLine,
} from "react-icons/ri";
import Image from "next/image";
import { useWeb3Modal as useWeb3SolanaModal } from "@web3modal/solana/react";
import { WalletConnectEVM } from "./WalletConnectEVM";
import { classNames } from "@/utils";
import Web3WalletWagmi from "@/components/wallet/Web3WalletWagmi";
import HeaderBalanceInfo from "@/components/HeaderBalanceInfo";

const solutions = [
  {
    name: "Home",
    description: "Home.",
    href: "/",
    icon: RiHomeLine,
  },
  {
    name: "Mining",
    description: "Mining Features",
    href: "/mining",
    icon: RiCoinLine,
  },
  {
    name: "Staking",
    description: "Staking Features",
    href: "/staking",
    icon: RiPlantLine,
  },
  {
    name: "Earning",
    description: "Earning Features",
    href: "/earning",
    icon: RiHandCoinLine,
  },
  {
    name: "Affiliates",
    description: "Affiliates Features",
    href: "/affiliate",
    icon: RiUserAddLine,
  },
  {
    name: "Membership",
    description: "Membership Content",
    href: "/membership",
    icon: RiVideoLine,
  },
  {
    name: "Settlement",
    description: "Membership Content",
    href: "/settlement",
    icon: RiFileTextLine,
  },
  {
    name: "Claim",
    description: "Membership Content",
    href: "/claim",
    icon: RiHandCoinLine,
  },
  {
    name: "Social Tasks",
    description: "Social task",
    href: "/social-task",
    icon: RiCheckLine,
  },
];
const resources = [
  {
    name: "Telegram Chat",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://t.me/omet_group",
    icon: RiTelegramLine,
  },
  {
    name: "Telegram Channel",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "https://t.me/omet_channel",
    icon: RiMessage2Line,
  },
  {
    name: "Twitter",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://x.com/omet_official",
    icon: RiTwitterLine,
  },
  {
    name: "Medium",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://medium.com/",
    icon: RiTwitterLine,
  },
  {
    name: "Instagram",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://www.instagram.com/",
    icon: RiTwitterLine,
  },
  {
    name: "Github",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "https://github.com/",
    icon: RiGithubLine,
  },
];

const earn = [
  {
    name: "Mining",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "/mining",
    icon: RiNftLine,
  },
  {
    name: "Staking",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/staking",
    icon: RiHandCoinLine,
  },
  {
    name: "Earning",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/earning",
    icon: RiPlantLine,
  },
  {
    name: "Membership",
    description: "Membership Content",
    href: "/membership",
    icon: RiVideoLine,
  },
  {
    name: "Social Tasks",
    description: "Social task",
    href: "/social-task",
    icon: RiCheckLine,
  },
];
const settlement = [
  {
    name: "Settlement",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "/settlement",
    icon: RiFileTextLine,
  },
  {
    name: "Claim",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/claim",
    icon: RiHandCoinLine,
  },
];

const NavLink = memo(({ item }) => (
  <Link href={item.href} prefetch={false}>
    <div className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
      <item.icon
        className="flex-shrink-0 w-6 h-6 text-blackn-500"
        aria-hidden="true"
      />
      <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-400">
        {item.name}
      </span>
    </div>
  </Link>
));

function ConnectButtonSolana() {
  // 4. Use modal hook
  const { open } = useWeb3SolanaModal();

  return (
    <>
      <button onClick={() => open()}>Solana Modal</button>
      {/* <w3m-button /> */}
      {/* <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button> */}
    </>
  );
}

export function Header() {
  const [colorTheme, setTheme] = useDarkMode();
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  let pathname = router.pathname;
  useEffect(() => {
    pathname = router.pathname;
  }, [router.pathname]);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activ = usePathname();

  return (
    <>
      <div className="fixed w-full z-50">
        <Popover className="m-4 rounded-xl bg-blackn-1000/50 dark:bg-blackn-800/50 backdrop-filter backdrop-blur-lg bg-opacity-10">
          <section className="px-4 w-full rounded-xl py-4 bg-blackn-1000/50 lg:px-20 md:px-12 border-b border-mid-gray-950/50 sm:px-8 md:py-2 lg:py-2 xl:py-2 dark:bg-blackn-800/50">
            <div className="flex items-center w-full justify-between md:justify-between md:space-x-4">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ === "/"
                    ? "text-blackn-500 font-medium w-max"
                    : "text-white dark:text-white font-medium w-max"
                }
                aria-label="logo this"
              >
                {colorTheme === "dark" ? (
                  <Image
                    src="/images/logo-dark.webp"
                    width="125"
                    height="38"
                    placeholder="blur"
                    alt="logo-dark"
                    priority={true}
                    quality={90}
                    blurDataURL="/images/logo-dark.webp"
                  />
                ) : (
                  <Image
                    src="/images/logo-light.webp"
                    width="125"
                    height="38"
                    placeholder="blur"
                    alt="logo-white"
                    priority={true}
                    quality={90}
                    blurDataURL="/images/logo-light.webp"
                  />
                )}
              </Link>
              <div className="flex items-center self-end justify-end w-full gap-2 -mr-2 flex-end lg:hidden">
                <WalletConnectEVM />
                <Popover.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-blackn-900 rounded-md dark:bg-gray-800 hover:black hover:bg-blackn-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <RiApps2Line className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Popover.Group
                as="nav"
                className="hidden space-x-16 lg:flex justify-center text-center w-full"
              >
                <Link
                  href="/"
                  prefetch={false}
                  className="text-white flex flex-col justify-center items-center"
                >
                  <div className="py-2">Home</div>
                  <div
                    className={
                      activ === "/"
                        ? "bg-amber-500 h-1 w-8"
                        : "bg-transparent h-1 w-8"
                    }
                  ></div>
                </Link>

                <a
                  href="https://metti-swap.blocksafu.com/"
                  target="_blank"
                  className="text-white flex flex-col justify-center items-center"
                >
                  <div className="py-2">Swap</div>
                  <div
                    className={
                      activ === "/swap"
                        ? "bg-amber-500 h-1 w-8"
                        : "bg-transparent h-1 w-8"
                    }
                  ></div>
                </a>

                <Popover className="">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open
                            ? "text-white dark:text-blue-500 "
                            : "text-white ",
                          "group rounded-md hover:text-white inline-flex focus:outline-none dark:hover:text-blue-400 items-center text-base font-medium "
                        )}
                      >
                        <span className="py-2">Earn</span>
                        <RiArrowDownSLine
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-1 h-5 w-5 group-hover:black"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-8 transform -translate-x-1/2 left-1/2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 px-2 py-3 bg-blackn-1000 border border-gray-900 dark:bg-bsafu-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                              {earn.map((item, earnIndex) => (
                                <a
                                  key={earnIndex}
                                  href={item.href}
                                  // href={item.href}
                                  className="flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-amber-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>

                <Link
                  href="/affiliate"
                  prefetch={false}
                  className="text-white flex flex-col justify-center items-center"
                >
                  <div className="py-2">Affiliate</div>
                  <div
                    className={
                      activ === "/affiliate"
                        ? "bg-amber-500 h-1 w-8"
                        : "bg-transparent h-1 w-8"
                    }
                  ></div>
                </Link>

                <Popover className="">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open
                            ? "text-white dark:text-blue-500 "
                            : "text-white ",
                          "group rounded-md hover:text-white inline-flex focus:outline-none dark:hover:text-blue-400 items-center text-base font-medium "
                        )}
                      >
                        <span className="py-2">Settlement</span>
                        <RiArrowDownSLine
                          className={classNames(
                            open ? "text-gray-600" : "text-gray-400",
                            "ml-1 h-5 w-5 group-hover:black"
                          )}
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-8 transform -translate-x-1/2 left-1/2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-6 px-2 py-3 bg-blackn-1000 border border-gray-900 dark:bg-bsafu-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                              {settlement.map((item, settlementIndex) => (
                                <a
                                  key={settlementIndex}
                                  href={item.href}
                                  // href={item.href}
                                  className="flex items-start rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-amber-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>

              <div className="relative items-center justify-end hidden w-10/12 gap-2 md:hidden lg:flex md:flex-1 lg:w-max">
                <div className="py-2 w-max md:p-2 flex items-center gap-2">
                  <HeaderBalanceInfo />
                  <WalletConnectEVM />
                  {/* <Web3WalletWagmi /> */}
                </div>
              </div>
            </div>
          </section>

          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="relative inset-x-0 -mt-2 top-0 p-0 transition origin-top-right transform lg:hidden"
            >
              <div className="absolute w-full -mt-16 md:-mt-14 rounded-2xl z-50 bg-blackn-1000 divide-y border-t border-blackn-800 shadow-lg dark:bg-blackn-800 ring-1 ring-black ring-opacity-5 divide-codgray-900 dark:divide-gray-900">
                <div className="px-5 pt-5 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white">
                      {colorTheme === "dark" ? (
                        <Image
                          src="/images/logo-dark.webp"
                          width="125"
                          height="38"
                          placeholder="blur"
                          alt="logo-dark"
                          priority={true}
                          quality={90}
                          blurDataURL="/images/logo-dark.webp"
                        />
                      ) : (
                        <Image
                          src="/images/logo-light.webp"
                          width="125"
                          height="38"
                          placeholder="blur"
                          alt="logo-white"
                          priority={true}
                          quality={90}
                          blurDataURL="/images/logo-light.webp"
                        />
                      )}
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-blackn-900 rounded-md dark:bg-gray-900 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <RiCloseLine className="w-6 h-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-end mt-2 gap-2">
                      {/* <WalletConnectButton /> */}
                      {/*<WalletConnectEVM />*/}
                      {/*<WalletConnectEVM />*/}
                    </div>
                  </div>
                  <div className="mt-1">
                    <HeaderBalanceInfo />
                    <nav className="grid gap-y-1">
                      {solutions.map((item, solutionsIndex) => (
                        <Link
                          key={solutionsIndex}
                          href={item.href}
                          prefetch={false}
                        >
                          <div className="flex items-center p-3 border border-blackn-900 rounded-md hover:bg-blackn-900">
                            <item.icon
                              className="flex-shrink-0 w-6 h-6 text-blackn-500"
                              aria-hidden="true"
                            />
                            <span className="ml-3 text-base font-medium text-white dark:text-gray-400">
                              {item.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className="px-5 py-6 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {resources.map((item, resourcesIndex) => (
                      <a
                        key={resourcesIndex}
                        href={item.href}
                        className="text-base font-medium text-white hover:text-gray-700 dark:text-gray-400"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </>
  );
}
