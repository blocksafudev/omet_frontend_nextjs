import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  RiAlertLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpCircleLine,
  RiArticleLine,
  RiBarChartHorizontalLine,
  RiCloseLine,
  RiCodeSSlashLine,
  RiCopperDiamondLine,
  RiExternalLinkLine,
  RiFileCodeLine,
  RiFileCopy2Line,
  RiFilePdfFill,
  RiFilePdfLine,
  RiFileShield2Line,
  RiFileUserLine,
  RiFlagLine,
  RiFlashlightLine,
  RiGalleryFill,
  RiGithubLine,
  RiGlobalLine,
  RiGlobeLine,
  RiGroupLine,
  RiHandCoinLine,
  RiHomeLine,
  RiInformationLine,
  RiLandscapeLine,
  RiMailLine,
  RiMessage2Line,
  RiMoneyDollarCircleLine,
  RiNotification3Line,
  RiOrganizationChart,
  RiPercentLine,
  RiQuestionLine,
  RiRotateLockLine,
  RiSearch2Line,
  RiShieldCheckLine,
  RiShieldKeyholeLine,
  RiShieldLine,
  RiShutDownLine,
  RiTelegramLine,
  RiTerminalBoxLine,
  RiTwitterLine,
  RiUser5Line,
  RiUserAddLine,
  RiWallet2Line,
  RiWalletLine,
} from "react-icons/ri";

import { Popover, Transition, Menu } from "@headlessui/react";
import { Context } from "../Store";
import { useWeb3React, useDispatch } from "@web3-react/core";
import { injected, walletconnect } from "../libs/ConnectorWeb3";
import { useEagerConnect, useInactiveListener } from "../hooks/hooks";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { getEnv } from "../libs/Env";
import useDarkMode from "./useDarkMode";
import { toast } from "react-toastify";

import WalletLink from "walletlink";
import { providers, utils } from "ethers";
import USDT_ABI from "../ABI/usdt-abi.json";
import NetworkIconByChain from "./NetworkIconByChain";
import { useWeb3Context } from "@/hooks/Web3Context";
import NetworkIcon from "./NetworkIcon";
import SearchAdvancedThree from "./SearchAdvancedThree";

const solutions = [
  {
    name: "Home",
    description: "Farm Homepage.",
    href: "/",
    icon: RiHomeLine,
  },
  {
    name: "Pricing",
    description: "List Bounty Scammer.",
    href: "/pricing",
    icon: RiMoneyDollarCircleLine,
  },
  {
    name: "Token Scanner",
    description: "List Bounty Scammer.",
    href: "/token-scanner",
    icon: RiCopperDiamondLine,
  },
  {
    name: "NFT Scanner",
    description: "List Bounty Scammer.",
    href: "/nft-scanner",
    icon: RiGalleryFill,
  },
  {
    name: "Audit List",
    description: "List Audit.",
    href: "/audit-list",
    icon: RiFilePdfFill,
  },
  {
    name: "Audit Solana List",
    description: "List Audit.",
    href: "/audit-solana-list",
    icon: RiFilePdfFill,
  },
  {
    name: "Safu List",
    description: "Safu Audit.",
    href: "/safu-list",
    icon: RiFilePdfFill,
  },
  {
    name: "Scam Report",
    description: "Safu Audit.",
    href: "/scam-report",
    icon: RiFlagLine,
  },
];
const resources = [
  {
    name: "Telegram Chat",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://t.me/Audit_DeFi",
    icon: RiTelegramLine,
  },
  {
    name: "Telegram Channel",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "https://t.me/Announcementauditdefi",
    icon: RiMessage2Line,
  },
  {
    name: "Twitter",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://x.com/Audit_DeFi",
    icon: RiTwitterLine,
  },
  {
    name: "Github",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "https://github.com/auditdefiblockchain",
    icon: RiGithubLine,
  },
];

const earn = [
  {
    name: "Staking",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "https://earn.blocksafu.com/",
    icon: RiHandCoinLine,
  },
  {
    name: "Registering Referral",
    description: "Register Referral Program",
    href: "https://earn.blocksafu.com/referral",
    icon: RiUserAddLine,
  },
];

const knowledge = [
  {
    name: "Security Audit",
    description:
      "Get all of your questions answered in our forums or contact support.",
    // href: "/register-bounty",
    href: "/security-audit",
    icon: RiShieldCheckLine,
  },
  {
    name: "KYC",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/bounty-scammers",
    icon: RiFileUserLine,
  },
  {
    name: "Blog",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/bounty-scammers",
    icon: RiArticleLine,
  },
  {
    name: "How To Use",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/bounty-scammers",
    icon: RiQuestionLine,
  },
];

const products = [
  {
    name: "Pricing",
    description:
      "Get all of your questions answered in our forums or contact support.",
    // href: "/register-bounty",
    href: "/pricing",
    icon: RiMoneyDollarCircleLine,
  },
  {
    name: "Audit List",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/audit-list",
    icon: RiFileCodeLine,
  },
  {
    name: "Audit Solana List",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/audit-solana-list",
    icon: RiFileCodeLine,
  },
  {
    name: "Safu List",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/safu-list",
    icon: RiFileShield2Line,
  },
  {
    name: "KYC List",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/kyc-list",
    icon: RiFileUserLine,
  },
  {
    name: "dApps List",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/dapps-list",
    icon: RiGlobalLine,
  },
  {
    name: "Bounty Scammer",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/bounty-scammers",
    icon: RiSearch2Line,
  },
];

const productsScanner = [
  {
    name: "Token Scanner",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/token-scanner",
    icon: RiCopperDiamondLine,
  },
  {
    name: "NFT Scanner",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/nft-scanner",
    icon: RiLandscapeLine,
  },
  {
    name: "Report Scam",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/scam-report",
    icon: RiFlagLine,
  },
  {
    name: "Token Research",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/research",
    icon: RiFilePdfLine,
  },
];

const networks = [
  { value: "bsc", label: "Binance Smart Chain", testnet: false },
  { value: "bsctestnet", label: "Binance Smart Chain Testnet", testnet: true },
  { value: "ethereum", label: "Ethereum", testnet: false },
  { value: "ethereumtestnet", label: "Ethereum Testnet", testnet: true },
  { value: "arbitrum", label: "Arbitrum", testnet: false },
  { value: "arbitrumtestnet", label: "Arbitrum Testnet", testnet: true },
  { value: "polygon", label: "Polygon", testnet: false },
  { value: "polygontestnet", label: "Polygon Testnet", testnet: true },
  { value: "avalanche", label: "Avalanche", testnet: false },
  { value: "avalanchetestnet", label: "Avalanche Testnet", testnet: true },
  { value: "fantom", label: "Fantom", testnet: false },
  { value: "fantomtestnet", label: "Fantom Testnet", testnet: true },
  { value: "okc", label: "OKC", testnet: false },
  { value: "okctestnet", label: "OKC Testnet", testnet: true },
  { value: "heco", label: "HECO", testnet: false },
  { value: "hecotestnet", label: "HECO Testnet", testnet: true },
  { value: "oasis", label: "Oasis", testnet: false },
  { value: "oasistestnet", label: "Oasis Testnet", testnet: true },
  { value: "velas", label: "Velas", testnet: false },
  { value: "velastestnet", label: "Velas Testnet", testnet: true },
  { value: "optimism", label: "Optimism", testnet: false },
  { value: "optimismtestnet", label: "Optimism Testnet", testnet: true },
  { value: "cronos", label: "Cronos", testnet: false },
  { value: "cronostestnet", label: "Cronos Testnet", testnet: true },
  { value: "moonbeam", label: "Moonbeam", testnet: false },
  { value: "moonbeamtestnet", label: "Moonbeam Testnet", testnet: true },
  { value: "aurora", label: "Aurora", testnet: false },
  { value: "auroratestnet", label: "Aurora Testnet", testnet: true },
  { value: "coredao", label: "COREDAO", testnet: false },
  { value: "coredaotestnet", label: "COREDAO Testnet", testnet: true },
  { value: "zksync", label: "ZKSYNC", testnet: false },
  { value: "zksynctestnet", label: "ZKSYNC Testnet", testnet: true },
];

const company = [
  {
    name: "About",
    description:
      "Get all of your questions answered in our forums or contact support.",
    // href: "/register-bounty",
    href: "/about",
    icon: RiInformationLine,
  },
  {
    name: "Team",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/team",
    icon: RiGroupLine,
  },
  {
    name: "Disclaimer",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/disclaimer",
    icon: RiRotateLockLine,
  },
  {
    name: "Privacy Policy",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/privacy-policy",
    icon: RiShieldKeyholeLine,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const INFURA_ID = "c6b754e60c1c47fba1e01316a010b17c";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  "custom-walletlink": {
    display: {
      logo: "/images/coinbase-logo.webp",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase",
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button aria-label="Copy" onClick={handleCopyClick}>
      <span>
        {isCopied ? (
          <div className="flex items-center gap-1">
            <RiFileCopy2Fill className="w-6 h-6 text-lg text-white" />{" "}
            <span>Copied</span>
          </div>
        ) : (
          <RiFileCopy2Line className="w-6 h-6 text-lg text-white" />
        )}
      </span>
    </button>
  );
}

function WalletConnectButton({ onConnect, onDisconnect }) {
  const {
    address,
    setAddress,
    addressGlobal,
    setAddressGlobal,
    chainId,
    setChainId,
    usdtBalanceGlobal,
    setUsdtBalanceGlobal,
  } = useWeb3Context();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [balance, setBalance] = useState(null);

  const BSC_RPC_URL = "https://bsc-dataseed2.defibit.io/"; // This is the BSC mainnet RPC. Change if you want to use another endpoint.
  const bscProvider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL);
  const USDT_TOKEN_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

  const web3Modal = useMemo(() => {
    return new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });
  }, []);

  useEffect(() => {
    if (web3Provider) {
      const fetchData = async () => {
        const signer = web3Provider.getSigner();
        setAddress(await signer.getAddress());
        setAddressGlobal(await signer.getAddress());
        const network = await web3Provider.getNetwork();
        setChainId(network.chainId);
        const balanceWei = await signer.getBalance();
        setBalance(utils.formatEther(balanceWei));
        const tokenContractOnBSC = new ethers.Contract(
          USDT_TOKEN_ADDRESS,
          USDT_ABI,
          bscProvider
        );
        const usdtBalanceOnBSC = await tokenContractOnBSC.balanceOf(
          signer.getAddress()
        );
        // setUsdtBalanceGlobal(utils.formatUnits(usdtBalanceOnBSC, 18)); // assuming 18 decimals
        // console.log(utils.formatUnits(usdtBalanceOnBSC, 18))
        const formattedBalance = utils.formatUnits(usdtBalanceOnBSC, 18);
        setUsdtBalanceGlobal(formattedBalance);
        // if (utils.formatUnits(usdtBalanceOnBSC, 18) !== null) {
        // }
      };
      fetchData();
      onConnect && onConnect(web3Provider);
    } else {
      setAddress(null);
      setChainId(null);
      setBalance(null);
      setUsdtBalanceGlobal(null);
      onDisconnect && onDisconnect();
    }
  }, [web3Provider]);

  useEffect(() => {
    // console.log('usdtBalanceGlobal:', usdtBalanceGlobal);
  }, [usdtBalanceGlobal]);

  const connect = async () => {
    const provider = await web3Modal.connect();
    const ethersProvider = new providers.Web3Provider(provider);
    setWeb3Provider(ethersProvider);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    if (web3Provider.disconnect) {
      await web3Provider.disconnect();
    }
    setWeb3Provider(null);
  };

  const addToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // First, make sure the user is on the BSC network in MetaMask
        const networkId = parseInt(
          await window.ethereum.request({ method: "net_version" })
        );
        if (networkId !== 56) {
          // 56 is the ID for BSC Mainnet. Adjust if you're using Testnet.
          alert("Please switch to Binance Smart Chain on MetaMask first.");
          return;
        }

        // Add Token to MetaMask
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: USDT_TOKEN_ADDRESS,
              symbol: "USDT",
              decimals: 18,
              image: "https://token.blocksafu.com/images/logo-circle.png",
            },
          },
        });

        if (wasAdded) {
          console.log("Token was added!");
        } else {
          console.log("Token was not added");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  return (
    <div>
      {web3Provider ? (
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={
            "rounded-lg text-white bg-blackn-500 border-2 border-blackn-500 px-1 py-1 md:px-3 md:py-2 lg:px-3 lg:py-2 whitespace-nowrap flex items-center gap-2"
          }
        >
          <RiWallet2Line /> {getSimpleAddress(address ? address : "")} (
          {chainId})
        </button>
      ) : (
        <button
          onClick={connect}
          className={
            "rounded-lg whitespace-nowrap text-white bg-blackn-500 border-2 border-blackn-500 px-2 py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 flex items-center gap-2"
          }
        >
          <RiWallet2Line /> Connect Wallet
        </button>
      )}

      {dropdownOpen && (
        <div className="absolute w-full p-6 transform bg-white shadow-2xl md:w-4/12 lg:w-6/12 xl:w-6/12 -mt-3/12 lg:mt-4 rounded-3xl -left-1/2 md:left-1/2 lg:left-1/2">
          <div className="flex items-center justify-between w-full">
            <h1 className="mb-4 text-xl font-semibold text-blackn-800">
              Account Details
            </h1>
            <a onClick={() => setDropdownOpen(false)}>
              <RiCloseLine />
            </a>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r to-indigo-500 from-blue-600">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-2 text-white bg-blackn-700 bg-opacity-50 rounded-xl w-max">
                  <div className="p-1 bg-white rounded-full bg-opacity-10">
                    <Image
                      className=""
                      src={NetworkIconByChain(chainId)}
                      width="20"
                      height="20"
                      alt="coin"
                    />
                  </div>
                  {getSimpleAddress(address ? address : "")}
                  <ClipboardCopy copyText={address} />
                </div>
              </div>
              <a
                onClick={() => {
                  disconnect();
                  setDropdownOpen(false);
                }}
              >
                <RiShutDownLine className="w-6 h-6 text-lg text-white" />
              </a>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm text-white">
                Balance: {balance} {chainId === 1 ? "ETH" : "BNB"}
              </p>
              <p className="mb-2 text-sm text-white">
                USDT Balance: {usdtBalanceGlobal} USDT
              </p>
            </div>
            <div className="w-full mt-6">
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center text-center">
                  <a
                    href="https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955"
                    className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full bg-opacity-10"
                  >
                    <RiWalletLine className="w-6 h-6 text-lg text-white" />
                  </a>
                  <h1 className="mt-2 text-sm text-white">Buy USDT</h1>
                </div>
                <div className="flex flex-col items-center text-center">
                  <a
                    onClick={addToMetaMask}
                    className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full"
                  >
                    <img
                      src="/images/metamask.png"
                      className="w-6 h-6"
                      alt="metamask"
                    />
                  </a>
                  <h1 className="mt-2 text-sm text-white">Add USDT</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WalletConnectButtonMobile({ onConnect, onDisconnect }) {
  const {
    address,
    setAddress,
    chainId,
    setChainId,
    usdtBalanceGlobal,
    setUsdtBalanceGlobal,
  } = useWeb3Context();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [balance, setBalance] = useState(null);

  const BSC_RPC_URL = "https://bsc-dataseed2.defibit.io/"; // This is the BSC mainnet RPC. Change if you want to use another endpoint.
  const bscProvider = new ethers.providers.JsonRpcProvider(BSC_RPC_URL);
  const USDT_TOKEN_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

  const web3Modal = useMemo(() => {
    return new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
      providerOptions,
    });
  }, []);

  useEffect(() => {
    if (web3Provider) {
      const fetchData = async () => {
        const signer = web3Provider.getSigner();
        setAddress(await signer.getAddress());
        const network = await web3Provider.getNetwork();
        setChainId(network.chainId);
        const balanceWei = await signer.getBalance();
        setBalance(utils.formatEther(balanceWei));
        const tokenContractOnBSC = new ethers.Contract(
          USDT_TOKEN_ADDRESS,
          USDT_ABI,
          bscProvider
        );
        const usdtBalanceOnBSC = await tokenContractOnBSC.balanceOf(
          signer.getAddress()
        );
        // setUsdtBalanceGlobal(utils.formatUnits(usdtBalanceOnBSC, 18)); // assuming 18 decimals
        // console.log(utils.formatUnits(usdtBalanceOnBSC, 18))
        const formattedBalance = utils.formatUnits(usdtBalanceOnBSC, 18);
        setUsdtBalanceGlobal(formattedBalance);
        // if (utils.formatUnits(usdtBalanceOnBSC, 18) !== null) {
        // }
      };
      fetchData();
      onConnect && onConnect(web3Provider);
    } else {
      setAddress(null);
      setChainId(null);
      setBalance(null);
      setUsdtBalanceGlobal(null);
      onDisconnect && onDisconnect();
    }
  }, [web3Provider]);

  useEffect(() => {
    // console.log('usdtBalanceGlobal:', usdtBalanceGlobal);
  }, [usdtBalanceGlobal]);

  const connect = async () => {
    const provider = await web3Modal.connect();
    const ethersProvider = new providers.Web3Provider(provider);
    setWeb3Provider(ethersProvider);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    if (web3Provider.disconnect) {
      await web3Provider.disconnect();
    }
    setWeb3Provider(null);
  };

  const addToMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // First, make sure the user is on the BSC network in MetaMask
        const networkId = parseInt(
          await window.ethereum.request({ method: "net_version" })
        );
        if (networkId !== 56) {
          // 56 is the ID for BSC Mainnet. Adjust if you're using Testnet.
          alert("Please switch to Binance Smart Chain on MetaMask first.");
          return;
        }

        // Add Token to MetaMask
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: USDT_TOKEN_ADDRESS,
              symbol: "USDT",
              decimals: 18,
              image: "https://token.blocksafu.com/images/logo-circle.png",
            },
          },
        });

        if (wasAdded) {
          console.log("Token was added!");
        } else {
          console.log("Token was not added");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getSimpleAddress = (str) => {
    return str.substr(0, 4) + "..." + str.substr(str.length - 1, str.length);
  };

  return (
    <div className="flex justify-end w-full flex-end">
      {web3Provider ? (
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={
            "rounded-lg text-white bg-blackn-500 border-2 border-blackn-500 px-2 py-1.5 md:px-3 md:py-2 lg:px-3 lg:py-2 flex items-center gap-2"
          }
        >
          <RiWallet2Line /> {getSimpleAddress(address ? address : "")}
        </button>
      ) : (
        <button
          onClick={connect}
          className={
            "rounded-lg text-white bg-blackn-500 border-2 border-blackn-500 px-2.5 py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 flex items-center gap-2"
          }
        >
          <RiWallet2Line /> Connect
        </button>
      )}

      {dropdownOpen && (
        <div className="absolute p-6 transform -translate-x-1/2 bg-white shadow-2xl w-max md:w-4/12 lg:w-4/12 xl:w-4/12 -mt-9/12 lg:mt-6 rounded-3xl left-1/3 md:left-1/2 lg:left-1/2">
          <div className="flex items-center justify-between w-full min-w-xl">
            <h1 className="mb-4 text-xl font-semibold text-blackn-800">
              Account Details
            </h1>
            <a onClick={() => setDropdownOpen(false)}>
              <RiCloseLine />
            </a>
          </div>
          <div className="w-full p-4 rounded-xl bg-gradient-to-r to-indigo-500 from-blue-600">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-2 text-white bg-blackn-700 bg-opacity-50 rounded-xl w-max">
                  <div className="p-1 bg-white rounded-full bg-opacity-10">
                    <Image
                      className=""
                      src={NetworkIconByChain(chainId)}
                      width="20"
                      height="20"
                      alt="coin"
                    />
                  </div>
                  {getSimpleAddress(address ? address : "")}
                  <ClipboardCopy copyText={address} />
                </div>
              </div>
              <a
                onClick={() => {
                  disconnect();
                  setDropdownOpen(false);
                }}
              >
                <RiShutDownLine className="w-6 h-6 text-lg text-white" />
              </a>
            </div>
            <div className="mt-6">
              <p className="mb-2 text-sm text-white">
                Balance: {balance} {chainId === 1 ? "ETH" : "BNB"}
              </p>
              <p className="mb-2 text-sm text-white">
                AuditDeFi Balance: {usdtBalanceGlobal} USDT
              </p>
            </div>
            <div className="w-full mt-6">
              <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center text-center">
                  <a
                    href="https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955"
                    className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full bg-opacity-10"
                  >
                    <RiWalletLine className="w-6 h-6 text-lg text-white" />
                  </a>
                  <h1 className="mt-2 text-sm text-white">Buy USDT</h1>
                </div>
                <div className="flex flex-col items-center text-center">
                  <a
                    onClick={addToMetaMask}
                    className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-full"
                  >
                    <img
                      src="/images/metamask.png"
                      className="w-6 h-6"
                      alt="metamask"
                    />
                  </a>
                  <h1 className="mt-2 text-sm text-white">Add USDT</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletConnectButton;

export function Header() {
  // const [state, dispatch] = useContext(Context);
  const [colorTheme, setTheme] = useDarkMode();
  const [balanceWeboo, setBalanceWeboo] = useState(0);
  const [balanceBNB, setBalanceBNB] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // useEffect(()=>{
  //   const button = document.querySelector('#menu-button');
  //   const menu = document.querySelector('#menu');
  //   button.addEventListener('click', () => {
  //     menu.classList.toggle('hidden');
  //   });
  // },[])

  // useEffect(async () => {
  //     if (state.web3 && state.account) {
  //         const bnb = await state.web3.eth.getBalance(state.account);
  //         const newBNB = new BigNumber(state.web3.utils.fromWei(bnb));
  //         setBalanceBNB(newBNB.toFormat(4));

  //         const token = await new state.web3.eth.Contract(
  //             getAppByChainId(state.chainId).ERC20_ABI,
  //             state.web3.utils.toHex(getAppByChainId(state.chainId).TOKEN_ADDRESS)
  //         );
  //         const weboo = await token.methods
  //             .balanceOf(state.web3.utils.toHex(state.account))
  //             .call();
  //         const newWeboo = new BigNumber(state.web3.utils.fromWei(weboo));
  //         setBalanceWeboo(newWeboo.toFormat(4));
  //     }
  // }, [state]);

  const doLogout = async () => {
    dispatch({
      type: "LOGOUT_WALLET_CONNECT",
      payload: true,
    });
  };

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
      <Popover className="fixed z-50 w-full bg-white/90 dark:bg-blackn-800/10 dark:backdrop-filter dark:backdrop-blur-lg dark:bg-opacity-10">
        <div
          className={
            scrolled ? "hidden" : "block px-6 py-2 text-white bg-blackn-500"
          }
        >
          <marquee>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center justify-center w-3 h-3">
                <span className="absolute inline-flex w-3 h-3 bg-white rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
              </span>
              <div>
                Best Price for all high quality blockchain security products -
                always make sure not only about audit but all investor need to
                check unlocked tokens, many scammer use unlocked tokens for dump
                token, Always DYOR.
              </div>
            </div>
          </marquee>
        </div>
        <div className="px-4 py-4 mx-auto bg-white rounded-t-2xl lg:px-20 md:px-12 sm:px-8 md:py-0 lg:py-0 xl:py-0 dark:bg-blackn-800/10 backdrop-filter backdrop-blur-lg bg-opacity-10">
          <div className="flex items-center justify-between md:justify-between md:space-x-4">
            <div className="flex items-center justify-start gap-2">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ === "/"
                    ? "text-blackn-500 font-medium mr-6 flex items-center gap-1"
                    : "text-gray-900 dark:text-white mr-6 font-medium flex items-center gap-1"
                }
                aria-label="logo this"
              >
                {colorTheme === "dark" ? (
                  <Image
                    priority
                    src="/images/logo-dark.webp"
                    width="140"
                    height="39"
                    alt="logo-dark"
                  />
                ) : (
                  <Image
                    priority
                    src="/images/logo-white.webp"
                    width="140"
                    height="39"
                    alt="logo-white"
                  />
                )}
              </Link>
            </div>
            <div className="flex items-center self-end justify-end w-full gap-2 -mr-2 flex-end lg:hidden">
              <Menu
                as="div"
                className="relative inline-block w-full py-2 text-left md:p-2"
              >
                <WalletConnectButtonMobile />
                {/* <Menu.Button as="div">
                                    <BtnWalletConnect>
                                        <button
                                            className={
                                                "rounded-lg text-white bg-blackn-600 border-2 border-blackn-500 px-1 py-1 md:px-3 md:py-2 lg:px-3 lg:py-1"
                                            }
                                        >
                                            {getSimpleAddress(state.account ? state.account : "")}
                                        </button>
                                    </BtnWalletConnect>
                                </Menu.Button> */}
                {/* <Menu.Items className="absolute left-0 w-56 px-4 py-4 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:divide-gray-800 dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <>
                                                <div className="pb-2 text-sm font-bold text-black dark:text-white">
                                                    Balance
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/weboo.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceWeboo} WEBOO
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/bnb.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceBNB} BNB
                                                    </span>
                                                </div>
                                                <div className="flex pt-3">
                                                    <button
                                                        className="flex items-center gap-2 text-sm font-bold text-blackn-500"
                                                        type="button"
                                                        onClick={() => doLogout()}
                                                    >
                                                        <RiArrowRightLine className="w-3 h-3" /> Disconnect
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </Menu.Item>
                                </Menu.Items> */}
              </Menu>

              <Popover.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-800 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <RiBarChartHorizontalLine
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-8 lg:flex">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ === "/"
                    ? "text-blackn-500 font-medium bg-tear bg-no-repeat py-5 active"
                    : "dark:text-white text-gray-900 font-medium py-5"
                }
              >
                Home
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-blackn-500 font-medium py-5"
                          : "dark:text-white black py-5",
                        "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900",
                        pathname.match("/pricing") ||
                          pathname.match("/audit-list") ||
                          pathname.match("/kyc-list") ||
                          pathname.match("/bounty-scammers") ||
                          pathname.match("/token-scanner") ||
                          pathname.match("/nft-scanner")
                          ? "bg-tear bg-no-repeat bg-top"
                          : ""
                      )}
                    >
                      <span>Products</span>
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
                      <Popover.Panel className="absolute z-20 px-2 mt-3 transform -translate-x-1/3 w-max left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid grid-cols-3 gap-6 px-3 py-3 bg-white border dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Products
                              </h1>
                              {products.map((item, productIndex) => (
                                <Link
                                  href={item.href}
                                  key={productIndex}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Service
                              </h1>
                              {productsScanner.map((item, productIndex) => (
                                <Link
                                  href={item.href}
                                  key={productIndex}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}

                              <h1 className="my-4 font-semibold text-fullblack dark:text-white">
                                Network Non EVM
                              </h1>
                              <div className="h-auto overflow-y-scroll">
                                <Link
                                  href={"/audit-solana-list"}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <NetworkIcon network="SOLANA" />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      Solana
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Network (Support All Network)
                              </h1>
                              <div className="overflow-y-scroll h-72">
                                {networks.map((network, networkIndex) => (
                                  <Link
                                    href={
                                      "/audit-list?platformSort=" +
                                      network.value
                                    }
                                    key={networkIndex}
                                    prefetch={false}
                                    className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                  >
                                    <NetworkIcon
                                      network={network.value.toUpperCase()}
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900 dark:text-white">
                                        {network.label}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500 py-5"
                          : "dark:text-white black py-5",
                        "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900",
                        pathname.match("/security-audit") ||
                          pathname.match("/kyc") ||
                          pathname.match("/blog") ||
                          pathname.match("/how-to-use")
                          ? "bg-tear bg-no-repeat bg-top"
                          : ""
                      )}
                    >
                      <span>Knowledge</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid grid-cols-2 gap-6 px-5 py-6 bg-white border dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            <div>
                              {knowledge.map((item, knowledgeIndex) => (
                                <Link
                                  href={item.href}
                                  prefetch={false}
                                  key={knowledgeIndex}
                                  // href={item.href}
                                  className="flex items-start p-4 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            <div>
                              {company.map((item, companyIndex) => (
                                <Link
                                  key={companyIndex}
                                  href={item.href}
                                  prefetch={false}
                                  // href={item.href}
                                  className="flex items-start p-4 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500 py-5"
                          : "dark:text-white black py-5",
                        "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900"
                      )}
                    >
                      <span>Earn</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white border dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            {earn.map((item, earnIndex) => (
                              <a
                                key={earnIndex}
                                href={item.href}
                                // href={item.href}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
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
            <div className="relative items-center justify-end hidden w-10/12 gap-2 md:hidden lg:flex md:flex-1 lg:w-0">
              <SearchAdvancedThree />
              <div className="py-2 w-max md:p-2">
                <WalletConnectButton />
              </div>

              <div className="">
                {colorTheme === "light" ? (
                  <div className="px-2.5 py-2.5 text-black bg-white rounded-lg dark:bg-blackn-800 dark:text-white">
                    <svg
                      onClick={() => setTheme("light")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="px-2.5 py-2.5 text-white bg-blackn-900 rounded-lg">
                    <svg
                      onClick={() => setTheme("dark")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
            className="relative inset-x-0 top-0 p-2 transition origin-top-right transform lg:hidden"
          >
            <div className="z-20 bg-white divide-y-2 rounded-lg shadow-lg dark:bg-blackn-800 ring-1 ring-black ring-opacity-5 divide-gray-50 dark:divide-gray-900">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g fill="#0d3b6f">
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41 3.8 2.11 6.83 2.94 11.27 3.41 0 11.33-2.1 18.03-11.05 23.38-.11.07-.17.1-.22.11v-.01h0z" />
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41v26.89z" />
                      </g>
                      <g fill="#07203d">
                        <path d="M16.68 26.9c.05-.01.11-.04.22-.11 8.95-5.35 11.05-12.05 11.05-23.38-4.44-.47-7.47-1.3-11.27-3.41v26.9z" />
                        <path d="M9.78 16.36l13.76-7.9 3.74 3.74-10.6 11.06-6.9-6.9z" />
                      </g>
                      <path
                        d="M23.1 16.14l-3.21 1.91-3.22 1.92-3.2-1.83-3.21-1.83.01-3.74.01-3.74 3.22-1.91 3.21-1.91 3.2 1.82 3.21 1.83-.01 3.74-.01 3.74z"
                        fill="#fefefe"
                      />
                      <path
                        d="M29.95 29.93c.47-2.47-2.59-8.12-5.22-8.91-1.32-.4-14.81-1.55-14.52 1.81.3 3.46 5.68 1.4 7.74 2.13-.09 1.24-1.75.97-2.43.96-1.79-.03-7.22.46-5.99-3.82-1.68-1.74-3.44-3.46-5.15-5.17-2.49-2.49-4.31-.5-4.38.96-.08 1.58 8.66 10.58 10.99 11.48 2.45.94 15.66.54 18.96.56h0z"
                        fill="#ecc5b0"
                      />
                      <path
                        d="M21.601 9.698v2.972l.586-.307.013-2.994-.6.329z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.487 8.182c.189-.21 2.952-1.663 3.507-2.017.296-.188.175-.519.743-.449.217.027.479.179.317.424-.126.191-.384.102-.629.195-.764.289-2.423 1.392-3.21 1.846.182.303.462.202.797.316.377.128.251.499-.155.536-.604.054-.444-.231-.69-.418-.154-.118-.6-.262-.681-.434h0zm-2.437.572l.68.389c.148-.114.88-.503 1.075-.577.283.062.468.255.731.368.341.146.698-.022.724.418-.111.203-.277.265-.559.227-.473-.063-.491-.746-1.008-.548-.142.054-.499.24-.585.329l1.565.894 2.588-1.512c-.443-.364-.967-.192-1.014-.508.062-.42.72-.434.913-.11.259.436.5.286.821.618-.077.118-.009.04-.132.126l-2.827 1.585 2.518 1.44c.283-.141 1.548-.786 1.661-.965-.143-.114-1.392-.829-1.489-.835-.088-.005-.291.099-.37.156-.214.154-.09.202-.269.346-.454.364-1.387-.33-.338-.501.219-.036.326-.097.504-.202.65-.384.449-.229 1.829.519l.867.579-1.948 1.157.661.377 2.622-1.489c-.173-.179-1.114-.675-1.411-.844l-1.494-.89c.11-.199.647-.42.864-.545.297-.172.623-.379.926-.5-.166-.386-.692-.252-1.003-.46l-.005-.295c.395-.191.707-.266.937.127.162.277.57.337.787.555-.075.154-.702.463-.88.563-.218.122-.783.398-.91.555.062.081 2.348 1.43 2.573 1.516l.612-.348c-.086-.148-1.408-.839-1.693-.884-.905-.143-.32-.754.245-.547.263.097.144.268.5.475l1.295.759.622-.353c-.115-.142-1.42-.827-1.563-.862-.368-.09-.281.056-.597-.204-.009-.338.229-.441.591-.387.418.062.218.26.587.479l1.349.752.6-.329c-.391-.299-2.453-1.365-3.086-1.742l-1.498-.832c-.092-.007-1.334.704-1.514.828.287.48.838.076 1.013.559-.097.393-.701.423-.919.087-.137-.212-.115-.196-.384-.333-.182-.093-.37-.165-.442-.313.151-.129.68-.406.864-.506 1.75-.951.962-.988 2.726.001l3.606 2.047.68-.39L16.695 5 10.05 8.754h0z"
                        fill="#f9c309"
                      />
                      <path
                        d="M21.596 16.424l-2.157 1.223-1.082.61c-.196.118-.374.191-.491.328-.177.208-.179.384-.558.319-.108-.191-.109-.354.034-.58.192-.305.259-.165.616-.26l3.273-1.843c.015-.139.036-.33.011-.467-.049-.271-.126-.127-.154-.359-.03-.257.204-.582.412-.609.474-.062.194.49.144.658-.072.239-.001.682-.048.98h0zm-1.413-.29c-.022-.032-.03-.019-.052-.102-.047-.173.004-.237.068-.38.116-.258.077-.306.07-.609-.016-.618.071-.53.536-.777.353-.188 1.473-.909 1.768-.957l.004 1.839c.03.336.315.258.098.708-.248.513-.826.4-.558-.192.171-.379.107-1.302.078-1.732-.132.015-1.387.714-1.476.815-.287.324.112.622.093.9-.02.29-.305.646-.629.488h0zm-.632-2.709c-.309.05-.287-.049-.541.086l-1.247.749-.012 2.8c.151-.03 1.424-.741 1.546-.885.157-.533-.178-.519-.137-.872.069-.586.812-.712.662-.129-.035.135-.101.183-.127.335-.194 1.105.539.633-1.153 1.559-.24.131-.946.596-1.149.598l-.013-3.62c.243-.217 1.22-.704 1.597-.921.354-.205.357-.595.693-.508.181.047.193.238.14.412-.056.184-.166.245-.259.397h0zm3.018-4.261l-.025 3.401-1.31.714.001-3.361-.622.353c-.067.559.123 3.145 0 3.376-.167.235-1.557.892-1.888 1.151-.093.809.273.484.125.988-.098.332-.367.49-.634.307-.096-.404.1-.366.132-.694.068-.684-.187-.743.284-.991l.688-.388.952-.553-.006-2.999-.612.347.001 1.2c-.034.103-1.035.629-1.216.729-.197.11-.47.248-.586.388s-.268.463-.526.277c-.227-.171-.069-.51.087-.662.258-.25.334-.006.697-.227l1.158-.711v-.776l-2.622 1.489-.017 7.475 6.655-3.736c.092-.485.022-1.768.021-2.338l-.017-2.389-.041-2.763-.68.39h0z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.065 16.216l2.509 1.372v-1.68c-.436-.417-.505-.164-.805-.314-.197-.099-.468-.51-.219-.763.354-.161.455.252.641.401s.534.289.739.432l.01 2.54c-.332-.013-2.695-1.552-3.245-1.776-.096-.794.101-1.736-.096-2.198-.302-.709.397-.653.577-.16.131.359-.049.354-.106.579-.039.153-.027 1.364-.005 1.568h0zm-.965-.775c.027.181.105.216.137.378.087.438-.327.401-.514.189-.346-.394-.085-.512-.018-.775.073-.291-.049-2.393.033-3.023.16.031 2.115 1.149 2.284 1.283l.019 2.16c.435.359.573.145.825.303a.6.6 0 0 1 .199.755c-.462.087-.442-.258-.715-.448-.919-.641-.696.216-.715-2.599l-1.536-.84.002 2.615h0zm3.963-.38c-.445.146-.46-.225-.735-.424-.205-.148-.655-.271-.704-.516l-.006-2.432c.339.003.533.38.983.388.394.007.586.409.475.804-.644.153-.288-.343-1.086-.592l.028 1.738c.432.351.504.137.795.28.262.128.333.468.25.754h0zM10 16.279l6.63 3.722.017-7.475-.66-.377-.062 6.092c.074.292.245.346.053.664-.327.048-.494-.136-.579-.396-.12-.369.134-.285.14-.716v-5.899l-2.519-1.44v2.291l-2.288-1.271-.003-2.329-.68-.389-.05 7.524h0zm2.667-4.13l.004-1.896-1.565-.894-.001 1.91 1.561.88z"
                        fill="#fd8c0a"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="101"
                      height="25"
                      shapeRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="nonzero"
                    >
                      <path
                        d="M9.75 12.3c0 3.06-2.48 4.29-5.21 4.29H.63c-.49 0-.74-.34-.74-.81V2.44c0-.46.25-.8.74-.8h3.4c2.58 0 4.78.84 4.78 3.77 0 1.42-.67 2.61-1.99 3.18 1.83.35 2.93 1.88 2.93 3.71zM6.77 5.61c0-1.85-1.17-2.36-2.84-2.36H1.88V8.1h2.26c1.6 0 2.63-.85 2.63-2.49zm.9 6.81c0-2.12-1.54-2.74-3.42-2.74H1.88v5.28h2.88c1.6 0 2.91-.8 2.91-2.54zm6.79 3.88c0 .13-.08.22-.2.27-.31.12-1.21.12-1.52 0-.13-.06-.2-.13-.2-.27V.87c0-.54 1.92-.52 1.92 0V16.3zm13.17-5.32c0 3.36-1.77 5.82-5.31 5.82-3.55 0-5.08-2.26-5.08-5.61 0-3.38 1.73-5.82 5.3-5.82 3.53 0 5.09 2.26 5.09 5.61zm-1.99.12c0-2.15-.68-4.14-3.18-4.14-2.42 0-3.23 1.96-3.23 4.09 0 2.16.68 4.14 3.19 4.14 2.44 0 3.22-1.96 3.22-4.09zm12.16 4.36c-.48.86-2.52 1.34-3.45 1.34-3.38 0-4.63-2.52-4.63-5.57 0-2.24.67-4.61 2.94-5.49 1.37-.52 4.14-.48 5.08.9.21.36.25 1.6-.22 1.6-.36 0-1.37-1.23-2.97-1.23-2.31 0-2.85 2.21-2.85 4.11 0 1.96.57 4.02 2.89 4.02 1.58 0 2.69-1.32 3.03-1.32.43 0 .34 1.34.18 1.64zm11.15.99c-.2.29-1.83.39-2.2-.16l-4.38-5.76v5.77c0 .51-1.92.52-1.92 0V.87c0-.54 1.92-.52 1.92 0v9.4l3.91-4.32c.43-.52 1.95-.55 2.24-.23.18.22-.12.61-.28.77l-3.74 3.77 4.22 5.48c.12.18.38.49.23.71zm10.99-4.35c0 3.25-2.63 4.75-5.54 4.75-1.12 0-3.1-.35-3.95-1.17-.42-.44-.45-2.52.16-2.52.37 0 2.01 1.23 3.81 1.23 1.21 0 2.37-.52 2.37-1.89 0-2.71-6.36-1.89-6.36-6.82 0-2.93 2.32-4.3 5.01-4.3.79 0 3.09.33 3.5 1.09.15.29.33 2.29-.27 2.29-.34 0-1.77-1.02-3.19-1.02-1.03 0-1.98.46-1.98 1.61 0 2.62 6.44 2 6.44 6.75zm14.35 4.38c-.28.26-2.75.29-3.01-.05-.18-.23-.94-2.77-1.09-3.25h-5.64l-1.07 3.2c-.24.38-2.5.38-2.76.08-.43-.5 4.18-12.81 4.7-14.3.31-.92 3.86-.95 4.16.04.51 1.44 5.15 13.84 4.71 14.28zm-6.95-12h-.01l-2.08 6.36h4.2l-2.11-6.36zm16.91-.36h-4.9v4.02h4.59c.66 0 .63 2.44 0 2.44h-4.59v5.57c0 .72-3.05.72-3.05 0V2.59c0-.58.3-.95.9-.95h7.05c.64 0 .62 2.48 0 2.48zm15.09 6.9c0 3.89-2.43 5.83-6.19 5.83-3.74 0-6.02-1.85-6.02-5.71V2.05c0-.69 3.03-.68 3.03 0v8.83c0 1.99.91 3.48 3.11 3.48 2.04 0 3.07-1.35 3.07-3.3V2.05c0-.69 3-.69 3 0v8.97z"
                        fill="#07203d"
                      />
                      <path
                        d="M84.02 22.84h-3.41c0 1.16.44 1.89 1.69 1.89.71 0 1.44-.39 1.71-.39.23 0 .19.6.06.74-.27.27-1.5.42-1.86.42-1.83 0-2.6-1.09-2.6-2.83 0-1.57.79-2.88 2.5-2.88 1.52 0 2.28 1.01 2.28 2.46 0 .28 0 .59-.37.59zm-.59-.7c.02-.92-.38-1.61-1.37-1.61-.92 0-1.43.75-1.45 1.61h2.82zm6.34 3.12c0 .24-.82.25-.82 0v-.52c-1.13 1.2-3.45 1-3.45-.82 0-1.77 2.07-1.73 3.32-1.73 0-.92-.01-1.63-1.19-1.63-.76 0-1.5.54-1.68.54-.27 0-.22-.61-.07-.75.37-.36 1.34-.56 1.84-.56 1.37 0 2.05.56 2.05 1.96v3.51zm-.95-2.38c-.77 0-2.34-.17-2.34.99 0 1.38 1.61.93 2.34.11v-1.1zm5.59-2.04a.26.26 0 0 1-.11-.03c-.27-.1-.57-.18-.84-.06-.4.17-.76.73-.98 1.08v3.42c0 .26-.96.26-.96 0v-5.2c0-.26.86-.26.86 0v.76c.25-.37.64-.85 1.09-.98.24-.06.81-.05 1.01.11.11.09.15.9-.07.9zm5.7 4.41c0 .26-.95.26-.95 0v-3.04c0-.75-.18-1.59-1.1-1.59-.6 0-1.12.57-1.46 1v3.63c0 .26-.96.26-.96 0v-5.2c0-.26.87-.26.87 0v.69c.45-.51 1.03-.95 1.75-.95 1.43 0 1.85 1.03 1.85 2.29v3.17z"
                        fill="#fd8c0a"
                      />
                    </svg>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <RiCloseLine className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                <div>
                  <div className="py-2 md:p-2">
                    {/*<ModalWallet />*/}
                    {/*<ModalWeb3 />*/}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <WalletConnectButton />
                    {colorTheme === "light" ? (
                      <div className="px-2 py-2 text-black bg-white border-2 border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                        <svg
                          onClick={() => setTheme("light")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="px-2 py-2 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
                        <svg
                          onClick={() => setTheme("dark")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item, solutionsIndex) => (
                      <Link
                        key={solutionsIndex}
                        href={item.href}
                        prefetch={false}
                      >
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
                      className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400"
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
      {/* <ModalWeb3 /> */}
    </>
  );
}

export function HeaderFixed() {
  // const [state, dispatch] = useContext(Context);
  const [colorTheme, setTheme] = useDarkMode();
  const [balanceWeboo, setBalanceWeboo] = useState(0);
  const [balanceBNB, setBalanceBNB] = useState(0);

  // useEffect(()=>{
  //   const button = document.querySelector('#menu-button');
  //   const menu = document.querySelector('#menu');
  //   button.addEventListener('click', () => {
  //     menu.classList.toggle('hidden');
  //   });
  // },[])

  // useEffect(async () => {
  //     if (state.web3 && state.account) {
  //         const bnb = await state.web3.eth.getBalance(state.account);
  //         const newBNB = new BigNumber(state.web3.utils.fromWei(bnb));
  //         setBalanceBNB(newBNB.toFormat(4));

  //         const token = await new state.web3.eth.Contract(
  //             getAppByChainId(state.chainId).ERC20_ABI,
  //             state.web3.utils.toHex(getAppByChainId(state.chainId).TOKEN_ADDRESS)
  //         );
  //         const weboo = await token.methods
  //             .balanceOf(state.web3.utils.toHex(state.account))
  //             .call();
  //         const newWeboo = new BigNumber(state.web3.utils.fromWei(weboo));
  //         setBalanceWeboo(newWeboo.toFormat(4));
  //     }
  // }, [state]);
  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  const doLogout = async () => {
    dispatch({
      type: "LOGOUT_WALLET_CONNECT",
      payload: true,
    });
  };

  const router = useRouter();
  let pathname = router.pathname;
  useEffect(() => {
    pathname = router.pathname;
  }, [router.pathname]);

  const activ = usePathname();

  const [scrolled, setScrolled] = useState(false);
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

  const { asPath } = router;
  const dynamicId = asPath.split("#")[1];

  return (
    <div className="fixed z-20 w-full bg-white shadow-lg -mt-28 dark:bg-gray-900 md:-mt-32 lg:-mt-32 shadow-gray-400/30 dark:shadow-gray-900">
      <Popover className="relative bg-white dark:bg-gray-900">
        <div
          className={
            scrolled
              ? "hidden"
              : "block px-6 py-2 text-white bg-blackn-500 h-24"
          }
        >
          <marquee>
            <div className="flex items-center gap-3">
              <span className="flex w-3 h-3">
                <span className="absolute inline-flex w-3 h-3 bg-white rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex w-3 h-3 bg-white rounded-full"></span>
              </span>
              <div>
                Best Price for all high quality blockchain security products -
                always make sure not only about audit but all investor need to
                check unlocked tokens, many scammer use unlocked tokens for dump
                token, Always DYOR.
              </div>
            </div>
          </marquee>
        </div>
        <div
          className={
            scrolled
              ? "px-4 py-2 mx-auto mt-0 bg-white rounded-t-2xl lg:px-20 md:px-12 md:py-0 lg:py-0 xl:py-0 dark:bg-gray-800"
              : "px-4 py-2 mx-auto -mt-12 bg-white rounded-t-2xl lg:px-20 md:px-12 md:py-0 lg:py-0 xl:py-0 dark:bg-gray-800"
          }
        >
          <div className="flex items-center justify-between py-2 dark:border-gray-900 md:justify-start md:space-x-4">
            <div className="flex items-center justify-start gap-2">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ === "/"
                    ? "text-blackn-500 font-medium mr-6 flex items-center gap-1"
                    : "text-gray-900 dark:text-white mr-6 font-medium flex items-center gap-1"
                }
                aria-label="logo this"
              >
                {colorTheme === "dark" ? (
                  <Image
                    priority
                    src="/images/logo-dark.webp"
                    width="140"
                    height="39"
                    alt="logo-dark"
                  />
                ) : (
                  <Image
                    priority
                    src="/images/logo-white.webp"
                    width="140"
                    height="39"
                    alt="logo-white"
                  />
                )}
              </Link>
            </div>
            <div className="flex items-center gap-2 -my-2 -mr-2 md:hidden">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button as="div">
                  {/* <BtnWalletConnect>
                                        <button
                                            className={
                                                "rounded-lg text-white bg-blackn-600 border-2 border-blackn-500 px-1 py-1 md:px-3 md:py-2 lg:px-3 lg:py-2"
                                            }
                                        >
                                            {getSimpleAddress(state.account ? state.account : "")}
                                        </button>
                                    </BtnWalletConnect> */}
                </Menu.Button>
                <Menu.Items className="absolute left-0 w-56 px-4 py-4 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:divide-gray-800 dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* <Menu.Item>
                                        {({ active }) => (
                                            <>
                                                <div className="pb-2 text-sm font-bold text-black dark:text-white">
                                                    Balance
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/weboo.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceWeboo} WEBOO
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/bnb.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceBNB} BNB
                                                    </span>
                                                </div>
                                                <div className="flex pt-3">
                                                    <button
                                                        className="flex items-center gap-2 text-sm font-bold text-blackn-500"
                                                        type="button"
                                                        onClick={() => doLogout()}
                                                    >
                                                        <RiArrowRightLine className="w-3 h-3" /> Disconnect
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </Menu.Item> */}
                </Menu.Items>
              </Menu>

              {colorTheme === "light" ? (
                <div className="p-2 text-black bg-white rounded-lg dark:bg-gray-800 dark:text-white">
                  <svg
                    onClick={() => setTheme("light")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="p-2 text-white bg-gray-900 rounded-lg">
                  <svg
                    onClick={() => setTheme("dark")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
              )}

              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg dark:bg-gray-800 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <RiBarChartHorizontalLine
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-8 lg:flex">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ
                    ? "text-blackn-500 font-medium"
                    : "dark:text-white text-gray-900 font-medium"
                }
              >
                Home
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-800 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Products</span>
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
                      <Popover.Panel className="absolute z-20 px-2 mt-3 transform -translate-x-1/3 w-max left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid grid-cols-3 gap-6 px-3 py-3 bg-white border rounded-lg dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Products
                              </h1>
                              {products.map((item, productIndex) => (
                                <Link
                                  href={item.href}
                                  key={productIndex}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Service
                              </h1>
                              {productsScanner.map((item, productIndex) => (
                                <Link
                                  href={item.href}
                                  key={productIndex}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}

                              <h1 className="my-4 font-semibold text-fullblack dark:text-white">
                                Network Non EVM
                              </h1>
                              <div className="h-auto overflow-y-scroll">
                                <Link
                                  href={"/audit-solana-list"}
                                  prefetch={false}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <NetworkIcon network="SOLANA" />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      Solana
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </div>
                            <div>
                              <h1 className="mb-4 font-semibold text-fullblack dark:text-white">
                                Network (Support All Network)
                              </h1>
                              <div className="overflow-y-scroll h-72">
                                {networks.map((network, networkIndex) => (
                                  <Link
                                    href={
                                      "/audit-list?platformSort=" +
                                      network.value
                                    }
                                    key={networkIndex}
                                    prefetch={false}
                                    className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                  >
                                    <NetworkIcon
                                      network={network.value.toUpperCase()}
                                    />
                                    <div className="ml-4">
                                      <p className="text-base font-medium text-gray-900 dark:text-white">
                                        {network.label}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-800 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Knowledge</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid grid-cols-2 gap-6 px-5 py-6 bg-white border rounded-lg dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            <div>
                              {knowledge.map((item, knowledgeIndex) => (
                                <Link
                                  href={item.href}
                                  prefetch={false}
                                  key={knowledgeIndex}
                                  // href={item.href}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            <div>
                              {company.map((item, companyIndex) => (
                                <Link
                                  key={companyIndex}
                                  href={item.href}
                                  prefetch={false}
                                  // href={item.href}
                                  className="flex items-start p-5 -m-3 rounded-lg hover:bg-gray-50"
                                >
                                  <item.icon
                                    className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                    aria-hidden="true"
                                  />
                                  <div className="ml-4">
                                    <p className="text-base font-medium text-gray-900 dark:text-white">
                                      {item.name}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-800 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Earn</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white border rounded-lg dark:bg-blackn-800 dark:border-gray-700 sm:gap-8 sm:p-8">
                            {earn.map((item, earnIndex) => (
                              <a
                                key={earnIndex}
                                href={item.href}
                                // href={item.href}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
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
            <div className="relative items-center justify-end hidden w-10/12 gap-2 md:hidden lg:flex md:flex-1 lg:w-0">
              <SearchAdvancedThree />
              <div className="py-2 w-max md:p-2">
                <WalletConnectButton />
              </div>

              <div className="">
                {colorTheme === "light" ? (
                  <div className="px-2.5 py-2.5 text-black bg-white border-2 border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                    <svg
                      onClick={() => setTheme("light")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="px-2.5 py-2.5 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
                    <svg
                      onClick={() => setTheme("dark")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg lg:hidden dark:bg-gray-800 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <RiBarChartHorizontalLine
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>
        </div>

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
            className="relative inset-x-0 top-0 p-2 transition origin-top-right transform lg:hidden"
          >
            <div className="z-20 bg-white divide-y-2 rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-gray-50 dark:divide-gray-900">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g fill="#0d3b6f">
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41 3.8 2.11 6.83 2.94 11.27 3.41 0 11.33-2.1 18.03-11.05 23.38-.11.07-.17.1-.22.11v-.01h0z" />
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41v26.89z" />
                      </g>
                      <g fill="#07203d">
                        <path d="M16.68 26.9c.05-.01.11-.04.22-.11 8.95-5.35 11.05-12.05 11.05-23.38-4.44-.47-7.47-1.3-11.27-3.41v26.9z" />
                        <path d="M9.78 16.36l13.76-7.9 3.74 3.74-10.6 11.06-6.9-6.9z" />
                      </g>
                      <path
                        d="M23.1 16.14l-3.21 1.91-3.22 1.92-3.2-1.83-3.21-1.83.01-3.74.01-3.74 3.22-1.91 3.21-1.91 3.2 1.82 3.21 1.83-.01 3.74-.01 3.74z"
                        fill="#fefefe"
                      />
                      <path
                        d="M29.95 29.93c.47-2.47-2.59-8.12-5.22-8.91-1.32-.4-14.81-1.55-14.52 1.81.3 3.46 5.68 1.4 7.74 2.13-.09 1.24-1.75.97-2.43.96-1.79-.03-7.22.46-5.99-3.82-1.68-1.74-3.44-3.46-5.15-5.17-2.49-2.49-4.31-.5-4.38.96-.08 1.58 8.66 10.58 10.99 11.48 2.45.94 15.66.54 18.96.56h0z"
                        fill="#ecc5b0"
                      />
                      <path
                        d="M21.601 9.698v2.972l.586-.307.013-2.994-.6.329z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.487 8.182c.189-.21 2.952-1.663 3.507-2.017.296-.188.175-.519.743-.449.217.027.479.179.317.424-.126.191-.384.102-.629.195-.764.289-2.423 1.392-3.21 1.846.182.303.462.202.797.316.377.128.251.499-.155.536-.604.054-.444-.231-.69-.418-.154-.118-.6-.262-.681-.434h0zm-2.437.572l.68.389c.148-.114.88-.503 1.075-.577.283.062.468.255.731.368.341.146.698-.022.724.418-.111.203-.277.265-.559.227-.473-.063-.491-.746-1.008-.548-.142.054-.499.24-.585.329l1.565.894 2.588-1.512c-.443-.364-.967-.192-1.014-.508.062-.42.72-.434.913-.11.259.436.5.286.821.618-.077.118-.009.04-.132.126l-2.827 1.585 2.518 1.44c.283-.141 1.548-.786 1.661-.965-.143-.114-1.392-.829-1.489-.835-.088-.005-.291.099-.37.156-.214.154-.09.202-.269.346-.454.364-1.387-.33-.338-.501.219-.036.326-.097.504-.202.65-.384.449-.229 1.829.519l.867.579-1.948 1.157.661.377 2.622-1.489c-.173-.179-1.114-.675-1.411-.844l-1.494-.89c.11-.199.647-.42.864-.545.297-.172.623-.379.926-.5-.166-.386-.692-.252-1.003-.46l-.005-.295c.395-.191.707-.266.937.127.162.277.57.337.787.555-.075.154-.702.463-.88.563-.218.122-.783.398-.91.555.062.081 2.348 1.43 2.573 1.516l.612-.348c-.086-.148-1.408-.839-1.693-.884-.905-.143-.32-.754.245-.547.263.097.144.268.5.475l1.295.759.622-.353c-.115-.142-1.42-.827-1.563-.862-.368-.09-.281.056-.597-.204-.009-.338.229-.441.591-.387.418.062.218.26.587.479l1.349.752.6-.329c-.391-.299-2.453-1.365-3.086-1.742l-1.498-.832c-.092-.007-1.334.704-1.514.828.287.48.838.076 1.013.559-.097.393-.701.423-.919.087-.137-.212-.115-.196-.384-.333-.182-.093-.37-.165-.442-.313.151-.129.68-.406.864-.506 1.75-.951.962-.988 2.726.001l3.606 2.047.68-.39L16.695 5 10.05 8.754h0z"
                        fill="#f9c309"
                      />
                      <path
                        d="M21.596 16.424l-2.157 1.223-1.082.61c-.196.118-.374.191-.491.328-.177.208-.179.384-.558.319-.108-.191-.109-.354.034-.58.192-.305.259-.165.616-.26l3.273-1.843c.015-.139.036-.33.011-.467-.049-.271-.126-.127-.154-.359-.03-.257.204-.582.412-.609.474-.062.194.49.144.658-.072.239-.001.682-.048.98h0zm-1.413-.29c-.022-.032-.03-.019-.052-.102-.047-.173.004-.237.068-.38.116-.258.077-.306.07-.609-.016-.618.071-.53.536-.777.353-.188 1.473-.909 1.768-.957l.004 1.839c.03.336.315.258.098.708-.248.513-.826.4-.558-.192.171-.379.107-1.302.078-1.732-.132.015-1.387.714-1.476.815-.287.324.112.622.093.9-.02.29-.305.646-.629.488h0zm-.632-2.709c-.309.05-.287-.049-.541.086l-1.247.749-.012 2.8c.151-.03 1.424-.741 1.546-.885.157-.533-.178-.519-.137-.872.069-.586.812-.712.662-.129-.035.135-.101.183-.127.335-.194 1.105.539.633-1.153 1.559-.24.131-.946.596-1.149.598l-.013-3.62c.243-.217 1.22-.704 1.597-.921.354-.205.357-.595.693-.508.181.047.193.238.14.412-.056.184-.166.245-.259.397h0zm3.018-4.261l-.025 3.401-1.31.714.001-3.361-.622.353c-.067.559.123 3.145 0 3.376-.167.235-1.557.892-1.888 1.151-.093.809.273.484.125.988-.098.332-.367.49-.634.307-.096-.404.1-.366.132-.694.068-.684-.187-.743.284-.991l.688-.388.952-.553-.006-2.999-.612.347.001 1.2c-.034.103-1.035.629-1.216.729-.197.11-.47.248-.586.388s-.268.463-.526.277c-.227-.171-.069-.51.087-.662.258-.25.334-.006.697-.227l1.158-.711v-.776l-2.622 1.489-.017 7.475 6.655-3.736c.092-.485.022-1.768.021-2.338l-.017-2.389-.041-2.763-.68.39h0z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.065 16.216l2.509 1.372v-1.68c-.436-.417-.505-.164-.805-.314-.197-.099-.468-.51-.219-.763.354-.161.455.252.641.401s.534.289.739.432l.01 2.54c-.332-.013-2.695-1.552-3.245-1.776-.096-.794.101-1.736-.096-2.198-.302-.709.397-.653.577-.16.131.359-.049.354-.106.579-.039.153-.027 1.364-.005 1.568h0zm-.965-.775c.027.181.105.216.137.378.087.438-.327.401-.514.189-.346-.394-.085-.512-.018-.775.073-.291-.049-2.393.033-3.023.16.031 2.115 1.149 2.284 1.283l.019 2.16c.435.359.573.145.825.303a.6.6 0 0 1 .199.755c-.462.087-.442-.258-.715-.448-.919-.641-.696.216-.715-2.599l-1.536-.84.002 2.615h0zm3.963-.38c-.445.146-.46-.225-.735-.424-.205-.148-.655-.271-.704-.516l-.006-2.432c.339.003.533.38.983.388.394.007.586.409.475.804-.644.153-.288-.343-1.086-.592l.028 1.738c.432.351.504.137.795.28.262.128.333.468.25.754h0zM10 16.279l6.63 3.722.017-7.475-.66-.377-.062 6.092c.074.292.245.346.053.664-.327.048-.494-.136-.579-.396-.12-.369.134-.285.14-.716v-5.899l-2.519-1.44v2.291l-2.288-1.271-.003-2.329-.68-.389-.05 7.524h0zm2.667-4.13l.004-1.896-1.565-.894-.001 1.91 1.561.88z"
                        fill="#fd8c0a"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="101"
                      height="25"
                      shapeRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="nonzero"
                    >
                      <path
                        d="M9.75 12.3c0 3.06-2.48 4.29-5.21 4.29H.63c-.49 0-.74-.34-.74-.81V2.44c0-.46.25-.8.74-.8h3.4c2.58 0 4.78.84 4.78 3.77 0 1.42-.67 2.61-1.99 3.18 1.83.35 2.93 1.88 2.93 3.71zM6.77 5.61c0-1.85-1.17-2.36-2.84-2.36H1.88V8.1h2.26c1.6 0 2.63-.85 2.63-2.49zm.9 6.81c0-2.12-1.54-2.74-3.42-2.74H1.88v5.28h2.88c1.6 0 2.91-.8 2.91-2.54zm6.79 3.88c0 .13-.08.22-.2.27-.31.12-1.21.12-1.52 0-.13-.06-.2-.13-.2-.27V.87c0-.54 1.92-.52 1.92 0V16.3zm13.17-5.32c0 3.36-1.77 5.82-5.31 5.82-3.55 0-5.08-2.26-5.08-5.61 0-3.38 1.73-5.82 5.3-5.82 3.53 0 5.09 2.26 5.09 5.61zm-1.99.12c0-2.15-.68-4.14-3.18-4.14-2.42 0-3.23 1.96-3.23 4.09 0 2.16.68 4.14 3.19 4.14 2.44 0 3.22-1.96 3.22-4.09zm12.16 4.36c-.48.86-2.52 1.34-3.45 1.34-3.38 0-4.63-2.52-4.63-5.57 0-2.24.67-4.61 2.94-5.49 1.37-.52 4.14-.48 5.08.9.21.36.25 1.6-.22 1.6-.36 0-1.37-1.23-2.97-1.23-2.31 0-2.85 2.21-2.85 4.11 0 1.96.57 4.02 2.89 4.02 1.58 0 2.69-1.32 3.03-1.32.43 0 .34 1.34.18 1.64zm11.15.99c-.2.29-1.83.39-2.2-.16l-4.38-5.76v5.77c0 .51-1.92.52-1.92 0V.87c0-.54 1.92-.52 1.92 0v9.4l3.91-4.32c.43-.52 1.95-.55 2.24-.23.18.22-.12.61-.28.77l-3.74 3.77 4.22 5.48c.12.18.38.49.23.71zm10.99-4.35c0 3.25-2.63 4.75-5.54 4.75-1.12 0-3.1-.35-3.95-1.17-.42-.44-.45-2.52.16-2.52.37 0 2.01 1.23 3.81 1.23 1.21 0 2.37-.52 2.37-1.89 0-2.71-6.36-1.89-6.36-6.82 0-2.93 2.32-4.3 5.01-4.3.79 0 3.09.33 3.5 1.09.15.29.33 2.29-.27 2.29-.34 0-1.77-1.02-3.19-1.02-1.03 0-1.98.46-1.98 1.61 0 2.62 6.44 2 6.44 6.75zm14.35 4.38c-.28.26-2.75.29-3.01-.05-.18-.23-.94-2.77-1.09-3.25h-5.64l-1.07 3.2c-.24.38-2.5.38-2.76.08-.43-.5 4.18-12.81 4.7-14.3.31-.92 3.86-.95 4.16.04.51 1.44 5.15 13.84 4.71 14.28zm-6.95-12h-.01l-2.08 6.36h4.2l-2.11-6.36zm16.91-.36h-4.9v4.02h4.59c.66 0 .63 2.44 0 2.44h-4.59v5.57c0 .72-3.05.72-3.05 0V2.59c0-.58.3-.95.9-.95h7.05c.64 0 .62 2.48 0 2.48zm15.09 6.9c0 3.89-2.43 5.83-6.19 5.83-3.74 0-6.02-1.85-6.02-5.71V2.05c0-.69 3.03-.68 3.03 0v8.83c0 1.99.91 3.48 3.11 3.48 2.04 0 3.07-1.35 3.07-3.3V2.05c0-.69 3-.69 3 0v8.97z"
                        fill="#07203d"
                      />
                      <path
                        d="M84.02 22.84h-3.41c0 1.16.44 1.89 1.69 1.89.71 0 1.44-.39 1.71-.39.23 0 .19.6.06.74-.27.27-1.5.42-1.86.42-1.83 0-2.6-1.09-2.6-2.83 0-1.57.79-2.88 2.5-2.88 1.52 0 2.28 1.01 2.28 2.46 0 .28 0 .59-.37.59zm-.59-.7c.02-.92-.38-1.61-1.37-1.61-.92 0-1.43.75-1.45 1.61h2.82zm6.34 3.12c0 .24-.82.25-.82 0v-.52c-1.13 1.2-3.45 1-3.45-.82 0-1.77 2.07-1.73 3.32-1.73 0-.92-.01-1.63-1.19-1.63-.76 0-1.5.54-1.68.54-.27 0-.22-.61-.07-.75.37-.36 1.34-.56 1.84-.56 1.37 0 2.05.56 2.05 1.96v3.51zm-.95-2.38c-.77 0-2.34-.17-2.34.99 0 1.38 1.61.93 2.34.11v-1.1zm5.59-2.04a.26.26 0 0 1-.11-.03c-.27-.1-.57-.18-.84-.06-.4.17-.76.73-.98 1.08v3.42c0 .26-.96.26-.96 0v-5.2c0-.26.86-.26.86 0v.76c.25-.37.64-.85 1.09-.98.24-.06.81-.05 1.01.11.11.09.15.9-.07.9zm5.7 4.41c0 .26-.95.26-.95 0v-3.04c0-.75-.18-1.59-1.1-1.59-.6 0-1.12.57-1.46 1v3.63c0 .26-.96.26-.96 0v-5.2c0-.26.87-.26.87 0v.69c.45-.51 1.03-.95 1.75-.95 1.43 0 1.85 1.03 1.85 2.29v3.17z"
                        fill="#fd8c0a"
                      />
                    </svg>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <RiCloseLine className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item, solutionsIndex) => (
                      <Link
                        key={solutionsIndex}
                        href={item.href}
                        prefetch={false}
                      >
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
                      className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div>
                  <div className="py-2 md:p-2">
                    {/*<ModalWallet />*/}
                    {/*<ModalWeb3 />*/}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* <WalletConnectButton /> */}
                    {colorTheme === "light" ? (
                      <div className="px-2 py-2 text-black bg-white border-2 border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                        <svg
                          onClick={() => setTheme("light")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="px-2 py-2 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
                        <svg
                          onClick={() => setTheme("dark")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="relative overflow-x-scroll bg-white scrollbar-hide dark:bg-gray-900">
        <div className="px-4 md:px-8 lg:px-24">
          <div className="flex items-center w-full gap-2 px-0 py-2 md:px-3 lg:px-3 whitespace-nowrap">
            <Link
              className={
                dynamicId === "safetyScore" || dynamicId === undefined
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#safetyScore"
            >
              <RiShieldLine /> Trust Score
            </Link>
            <Link
              className={
                dynamicId === "overviewInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#overviewInformation"
            >
              <RiShieldCheckLine /> Security Overview
            </Link>
            <Link
              className={
                dynamicId === "taxInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#taxInformation"
            >
              <RiPercentLine /> Tax Information
            </Link>
            <Link
              className={
                dynamicId === "manualInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#manualInformation"
            >
              <RiCodeSSlashLine /> Manual Analysis
            </Link>
            <Link
              className={
                dynamicId === "auditInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#auditInformation"
            >
              <RiFileShield2Line /> Audit Overview
            </Link>
            <Link
              className={
                dynamicId === "detailInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#detailInformation"
            >
              <RiFlashlightLine /> Dapps Information
            </Link>
            <Link
              className={
                dynamicId === "contractInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#contractInformation"
            >
              <RiOrganizationChart /> Contract Inheritance
            </Link>
            <Link
              className={
                dynamicId === "websiteInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#websiteInformation"
            >
              <RiGlobalLine /> Website Information
            </Link>
            <Link
              className={
                dynamicId === "liquidityInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#liquidityInformation"
            >
              <RiUser5Line /> Liquidity & Holder
            </Link>
            <Link
              className={
                dynamicId === "autoInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#autoInformation"
            >
              <RiAlertLine /> Automatic Vulnerability Scan
            </Link>
            <Link
              className={
                dynamicId === "functionInformation"
                  ? "bg-blackn-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold flex items-center gap-1"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-800 dark:text-gray-500 font-semibold flex items-center gap-1"
              }
              scroll={true}
              href="#functionInformation"
            >
              <RiTerminalBoxLine /> Function Summary
            </Link>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderFixedSafu() {
  // const [state, dispatch] = useContext(Context);
  const [colorTheme, setTheme] = useDarkMode();
  const [balanceWeboo, setBalanceWeboo] = useState(0);
  const [balanceBNB, setBalanceBNB] = useState(0);

  // useEffect(()=>{
  //   const button = document.querySelector('#menu-button');
  //   const menu = document.querySelector('#menu');
  //   button.addEventListener('click', () => {
  //     menu.classList.toggle('hidden');
  //   });
  // },[])

  // useEffect(async () => {
  //     if (state.web3 && state.account) {
  //         const bnb = await state.web3.eth.getBalance(state.account);
  //         const newBNB = new BigNumber(state.web3.utils.fromWei(bnb));
  //         setBalanceBNB(newBNB.toFormat(4));

  //         const token = await new state.web3.eth.Contract(
  //             getAppByChainId(state.chainId).ERC20_ABI,
  //             state.web3.utils.toHex(getAppByChainId(state.chainId).TOKEN_ADDRESS)
  //         );
  //         const weboo = await token.methods
  //             .balanceOf(state.web3.utils.toHex(state.account))
  //             .call();
  //         const newWeboo = new BigNumber(state.web3.utils.fromWei(weboo));
  //         setBalanceWeboo(newWeboo.toFormat(4));
  //     }
  // }, [state]);
  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  const doLogout = async () => {
    dispatch({
      type: "LOGOUT_WALLET_CONNECT",
      payload: true,
    });
  };

  const router = useRouter();
  let pathname = router.pathname;
  useEffect(() => {
    pathname = router.pathname;
  }, [router.pathname]);

  const activ = usePathname();

  const { asPath } = router;
  const dynamicId = asPath.split("#")[1];

  return (
    <div className="fixed z-10 w-full bg-white shadow-lg -mt-28 dark:bg-gray-900 md:-mt-32 lg:-mt-32 shadow-gray-400/30 dark:shadow-gray-900">
      <Popover className="relative bg-white dark:bg-gray-900">
        <div className="px-4 py-2 mx-auto lg:px-20 md:px-8 sm:px-8 md:py-0 lg:py-0 xl:py-1">
          <div className="flex items-center justify-between py-2 dark:border-gray-900 md:justify-start md:space-x-4">
            <div className="flex items-center justify-start gap-2">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ
                    ? "text-blackn-500 font-medium mr-6 flex items-center gap-1 "
                    : "text-gray-900 dark:text-white font-medium flex items-center gap-1"
                }
              >
                {colorTheme === "dark" ? (
                  <Image
                    priority
                    src="/images/logo-dark.webp"
                    width="140"
                    height="39"
                    alt="logo-dark"
                  />
                ) : (
                  <Image
                    priority
                    src="/images/logo-white.webp"
                    width="140"
                    height="39"
                    alt="logo-white"
                  />
                )}
              </Link>
            </div>
            <div className="flex items-center gap-2 -my-2 -mr-2 md:hidden">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button as="div">
                  {/* <BtnWalletConnect>
                                        <button
                                            className={
                                                "rounded-lg text-white bg-blackn-600 border-2 border-blackn-500 px-1 py-1 md:px-3 md:py-2 lg:px-3 lg:py-2"
                                            }
                                        >
                                            {getSimpleAddress(state.account ? state.account : "")}
                                        </button>
                                    </BtnWalletConnect> */}
                </Menu.Button>
                <Menu.Items className="absolute left-0 w-56 px-4 py-4 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:divide-gray-800 dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* <Menu.Item>
                                        {({ active }) => (
                                            <>
                                                <div className="pb-2 text-sm font-bold text-black dark:text-white">
                                                    Balance
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/weboo.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceWeboo} WEBOO
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-start gap-2 py-2 border-0">
                                                    <img
                                                        src="./images/icon-reward/bnb.svg"
                                                        className="w-5 h-5"
                                                        alt=""
                                                    />
                                                    <span className="text-sm text-black dark:text-white">
                                                        {balanceBNB} BNB
                                                    </span>
                                                </div>
                                                <div className="flex pt-3">
                                                    <button
                                                        className="flex items-center gap-2 text-sm font-bold text-blackn-500"
                                                        type="button"
                                                        onClick={() => doLogout()}
                                                    >
                                                        <RiArrowRightLine className="w-3 h-3" /> Disconnect
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </Menu.Item> */}
                </Menu.Items>
              </Menu>

              {colorTheme === "light" ? (
                <div className="p-2 text-black bg-white rounded-lg dark:bg-gray-800 dark:text-white">
                  <svg
                    onClick={() => setTheme("light")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              ) : (
                <div className="p-2 text-white bg-gray-900 rounded-lg">
                  <svg
                    onClick={() => setTheme("dark")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
              )}

              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg dark:bg-gray-800 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <RiBarChartHorizontalLine
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-8 lg:flex">
              <Link
                href="/"
                prefetch={false}
                className={
                  activ
                    ? "text-blackn-500 font-medium"
                    : "dark:text-white text-gray-900 font-medium"
                }
              >
                Home
              </Link>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Products</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white dark:bg-gray-900 sm:gap-8 sm:p-8">
                            {products.map((item, productIndex) => (
                              <Link
                                href={item.href}
                                key={productIndex}
                                prefetch={false}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Knowledge</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white dark:bg-gray-900 sm:gap-8 sm:p-8">
                            {knowledge.map((item, knowledgeIndex) => (
                              <Link
                                href={item.href}
                                prefetch={false}
                                key={knowledgeIndex}
                                // href={item.href}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Company</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white dark:bg-gray-900 sm:gap-8 sm:p-8">
                            {company.map((item, companyIndex) => (
                              <Link
                                key={companyIndex}
                                href={item.href}
                                prefetch={false}
                                // href={item.href}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open
                          ? "text-gray-900 dark:text-blackn-500"
                          : "dark:text-white black",
                        "group bg-white dark:bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-900"
                      )}
                    >
                      <span>Earn</span>
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
                      <Popover.Panel className="absolute z-20 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 px-5 py-6 bg-white dark:bg-gray-900 sm:gap-8 sm:p-8">
                            {earn.map((item, earnIndex) => (
                              <a
                                key={earnIndex}
                                href={item.href}
                                // href={item.href}
                                className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                              >
                                <item.icon
                                  className="flex-shrink-0 w-6 h-6 text-blackn-500"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-900 dark:text-white">
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

              <a
                href="https://token.blocksafu.com"
                className="font-medium text-gray-900 dark:text-white"
              >
                Token
              </a>
            </Popover.Group>
            <div className="items-center justify-end hidden gap-2 md:flex md:flex-1 lg:w-0">
              <div className="py-4 md:p-2">
                <div className="py-2"></div>
                {/* <WalletConnectButton /> */}
              </div>

              <div className="">
                {colorTheme === "light" ? (
                  <div className="px-2.5 py-2.5 text-black bg-white border-2 border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                    <svg
                      onClick={() => setTheme("light")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="px-2.5 py-2.5 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
                    <svg
                      onClick={() => setTheme("dark")}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg lg:hidden dark:bg-gray-800 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <RiBarChartHorizontalLine
                  className="w-6 h-6"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>
        </div>

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
            className="relative inset-x-0 top-0 p-2 transition origin-top-right transform lg:hidden"
          >
            <div className="z-20 bg-white divide-y-2 rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-gray-50 dark:divide-gray-900">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <g fill="#0d3b6f">
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41 3.8 2.11 6.83 2.94 11.27 3.41 0 11.33-2.1 18.03-11.05 23.38-.11.07-.17.1-.22.11v-.01h0z" />
                        <path d="M16.68 26.89c-.05 0-.11-.03-.22-.1C7.51 21.44 5.41 14.74 5.41 3.41c4.44-.47 7.47-1.3 11.27-3.41v26.89z" />
                      </g>
                      <g fill="#07203d">
                        <path d="M16.68 26.9c.05-.01.11-.04.22-.11 8.95-5.35 11.05-12.05 11.05-23.38-4.44-.47-7.47-1.3-11.27-3.41v26.9z" />
                        <path d="M9.78 16.36l13.76-7.9 3.74 3.74-10.6 11.06-6.9-6.9z" />
                      </g>
                      <path
                        d="M23.1 16.14l-3.21 1.91-3.22 1.92-3.2-1.83-3.21-1.83.01-3.74.01-3.74 3.22-1.91 3.21-1.91 3.2 1.82 3.21 1.83-.01 3.74-.01 3.74z"
                        fill="#fefefe"
                      />
                      <path
                        d="M29.95 29.93c.47-2.47-2.59-8.12-5.22-8.91-1.32-.4-14.81-1.55-14.52 1.81.3 3.46 5.68 1.4 7.74 2.13-.09 1.24-1.75.97-2.43.96-1.79-.03-7.22.46-5.99-3.82-1.68-1.74-3.44-3.46-5.15-5.17-2.49-2.49-4.31-.5-4.38.96-.08 1.58 8.66 10.58 10.99 11.48 2.45.94 15.66.54 18.96.56h0z"
                        fill="#ecc5b0"
                      />
                      <path
                        d="M21.601 9.698v2.972l.586-.307.013-2.994-.6.329z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.487 8.182c.189-.21 2.952-1.663 3.507-2.017.296-.188.175-.519.743-.449.217.027.479.179.317.424-.126.191-.384.102-.629.195-.764.289-2.423 1.392-3.21 1.846.182.303.462.202.797.316.377.128.251.499-.155.536-.604.054-.444-.231-.69-.418-.154-.118-.6-.262-.681-.434h0zm-2.437.572l.68.389c.148-.114.88-.503 1.075-.577.283.062.468.255.731.368.341.146.698-.022.724.418-.111.203-.277.265-.559.227-.473-.063-.491-.746-1.008-.548-.142.054-.499.24-.585.329l1.565.894 2.588-1.512c-.443-.364-.967-.192-1.014-.508.062-.42.72-.434.913-.11.259.436.5.286.821.618-.077.118-.009.04-.132.126l-2.827 1.585 2.518 1.44c.283-.141 1.548-.786 1.661-.965-.143-.114-1.392-.829-1.489-.835-.088-.005-.291.099-.37.156-.214.154-.09.202-.269.346-.454.364-1.387-.33-.338-.501.219-.036.326-.097.504-.202.65-.384.449-.229 1.829.519l.867.579-1.948 1.157.661.377 2.622-1.489c-.173-.179-1.114-.675-1.411-.844l-1.494-.89c.11-.199.647-.42.864-.545.297-.172.623-.379.926-.5-.166-.386-.692-.252-1.003-.46l-.005-.295c.395-.191.707-.266.937.127.162.277.57.337.787.555-.075.154-.702.463-.88.563-.218.122-.783.398-.91.555.062.081 2.348 1.43 2.573 1.516l.612-.348c-.086-.148-1.408-.839-1.693-.884-.905-.143-.32-.754.245-.547.263.097.144.268.5.475l1.295.759.622-.353c-.115-.142-1.42-.827-1.563-.862-.368-.09-.281.056-.597-.204-.009-.338.229-.441.591-.387.418.062.218.26.587.479l1.349.752.6-.329c-.391-.299-2.453-1.365-3.086-1.742l-1.498-.832c-.092-.007-1.334.704-1.514.828.287.48.838.076 1.013.559-.097.393-.701.423-.919.087-.137-.212-.115-.196-.384-.333-.182-.093-.37-.165-.442-.313.151-.129.68-.406.864-.506 1.75-.951.962-.988 2.726.001l3.606 2.047.68-.39L16.695 5 10.05 8.754h0z"
                        fill="#f9c309"
                      />
                      <path
                        d="M21.596 16.424l-2.157 1.223-1.082.61c-.196.118-.374.191-.491.328-.177.208-.179.384-.558.319-.108-.191-.109-.354.034-.58.192-.305.259-.165.616-.26l3.273-1.843c.015-.139.036-.33.011-.467-.049-.271-.126-.127-.154-.359-.03-.257.204-.582.412-.609.474-.062.194.49.144.658-.072.239-.001.682-.048.98h0zm-1.413-.29c-.022-.032-.03-.019-.052-.102-.047-.173.004-.237.068-.38.116-.258.077-.306.07-.609-.016-.618.071-.53.536-.777.353-.188 1.473-.909 1.768-.957l.004 1.839c.03.336.315.258.098.708-.248.513-.826.4-.558-.192.171-.379.107-1.302.078-1.732-.132.015-1.387.714-1.476.815-.287.324.112.622.093.9-.02.29-.305.646-.629.488h0zm-.632-2.709c-.309.05-.287-.049-.541.086l-1.247.749-.012 2.8c.151-.03 1.424-.741 1.546-.885.157-.533-.178-.519-.137-.872.069-.586.812-.712.662-.129-.035.135-.101.183-.127.335-.194 1.105.539.633-1.153 1.559-.24.131-.946.596-1.149.598l-.013-3.62c.243-.217 1.22-.704 1.597-.921.354-.205.357-.595.693-.508.181.047.193.238.14.412-.056.184-.166.245-.259.397h0zm3.018-4.261l-.025 3.401-1.31.714.001-3.361-.622.353c-.067.559.123 3.145 0 3.376-.167.235-1.557.892-1.888 1.151-.093.809.273.484.125.988-.098.332-.367.49-.634.307-.096-.404.1-.366.132-.694.068-.684-.187-.743.284-.991l.688-.388.952-.553-.006-2.999-.612.347.001 1.2c-.034.103-1.035.629-1.216.729-.197.11-.47.248-.586.388s-.268.463-.526.277c-.227-.171-.069-.51.087-.662.258-.25.334-.006.697-.227l1.158-.711v-.776l-2.622 1.489-.017 7.475 6.655-3.736c.092-.485.022-1.768.021-2.338l-.017-2.389-.041-2.763-.68.39h0z"
                        fill="#f76200"
                      />
                      <path
                        d="M12.065 16.216l2.509 1.372v-1.68c-.436-.417-.505-.164-.805-.314-.197-.099-.468-.51-.219-.763.354-.161.455.252.641.401s.534.289.739.432l.01 2.54c-.332-.013-2.695-1.552-3.245-1.776-.096-.794.101-1.736-.096-2.198-.302-.709.397-.653.577-.16.131.359-.049.354-.106.579-.039.153-.027 1.364-.005 1.568h0zm-.965-.775c.027.181.105.216.137.378.087.438-.327.401-.514.189-.346-.394-.085-.512-.018-.775.073-.291-.049-2.393.033-3.023.16.031 2.115 1.149 2.284 1.283l.019 2.16c.435.359.573.145.825.303a.6.6 0 0 1 .199.755c-.462.087-.442-.258-.715-.448-.919-.641-.696.216-.715-2.599l-1.536-.84.002 2.615h0zm3.963-.38c-.445.146-.46-.225-.735-.424-.205-.148-.655-.271-.704-.516l-.006-2.432c.339.003.533.38.983.388.394.007.586.409.475.804-.644.153-.288-.343-1.086-.592l.028 1.738c.432.351.504.137.795.28.262.128.333.468.25.754h0zM10 16.279l6.63 3.722.017-7.475-.66-.377-.062 6.092c.074.292.245.346.053.664-.327.048-.494-.136-.579-.396-.12-.369.134-.285.14-.716v-5.899l-2.519-1.44v2.291l-2.288-1.271-.003-2.329-.68-.389-.05 7.524h0zm2.667-4.13l.004-1.896-1.565-.894-.001 1.91 1.561.88z"
                        fill="#fd8c0a"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="101"
                      height="25"
                      shapeRendering="geometricPrecision"
                      imageRendering="optimizeQuality"
                      fillRule="nonzero"
                    >
                      <path
                        d="M9.75 12.3c0 3.06-2.48 4.29-5.21 4.29H.63c-.49 0-.74-.34-.74-.81V2.44c0-.46.25-.8.74-.8h3.4c2.58 0 4.78.84 4.78 3.77 0 1.42-.67 2.61-1.99 3.18 1.83.35 2.93 1.88 2.93 3.71zM6.77 5.61c0-1.85-1.17-2.36-2.84-2.36H1.88V8.1h2.26c1.6 0 2.63-.85 2.63-2.49zm.9 6.81c0-2.12-1.54-2.74-3.42-2.74H1.88v5.28h2.88c1.6 0 2.91-.8 2.91-2.54zm6.79 3.88c0 .13-.08.22-.2.27-.31.12-1.21.12-1.52 0-.13-.06-.2-.13-.2-.27V.87c0-.54 1.92-.52 1.92 0V16.3zm13.17-5.32c0 3.36-1.77 5.82-5.31 5.82-3.55 0-5.08-2.26-5.08-5.61 0-3.38 1.73-5.82 5.3-5.82 3.53 0 5.09 2.26 5.09 5.61zm-1.99.12c0-2.15-.68-4.14-3.18-4.14-2.42 0-3.23 1.96-3.23 4.09 0 2.16.68 4.14 3.19 4.14 2.44 0 3.22-1.96 3.22-4.09zm12.16 4.36c-.48.86-2.52 1.34-3.45 1.34-3.38 0-4.63-2.52-4.63-5.57 0-2.24.67-4.61 2.94-5.49 1.37-.52 4.14-.48 5.08.9.21.36.25 1.6-.22 1.6-.36 0-1.37-1.23-2.97-1.23-2.31 0-2.85 2.21-2.85 4.11 0 1.96.57 4.02 2.89 4.02 1.58 0 2.69-1.32 3.03-1.32.43 0 .34 1.34.18 1.64zm11.15.99c-.2.29-1.83.39-2.2-.16l-4.38-5.76v5.77c0 .51-1.92.52-1.92 0V.87c0-.54 1.92-.52 1.92 0v9.4l3.91-4.32c.43-.52 1.95-.55 2.24-.23.18.22-.12.61-.28.77l-3.74 3.77 4.22 5.48c.12.18.38.49.23.71zm10.99-4.35c0 3.25-2.63 4.75-5.54 4.75-1.12 0-3.1-.35-3.95-1.17-.42-.44-.45-2.52.16-2.52.37 0 2.01 1.23 3.81 1.23 1.21 0 2.37-.52 2.37-1.89 0-2.71-6.36-1.89-6.36-6.82 0-2.93 2.32-4.3 5.01-4.3.79 0 3.09.33 3.5 1.09.15.29.33 2.29-.27 2.29-.34 0-1.77-1.02-3.19-1.02-1.03 0-1.98.46-1.98 1.61 0 2.62 6.44 2 6.44 6.75zm14.35 4.38c-.28.26-2.75.29-3.01-.05-.18-.23-.94-2.77-1.09-3.25h-5.64l-1.07 3.2c-.24.38-2.5.38-2.76.08-.43-.5 4.18-12.81 4.7-14.3.31-.92 3.86-.95 4.16.04.51 1.44 5.15 13.84 4.71 14.28zm-6.95-12h-.01l-2.08 6.36h4.2l-2.11-6.36zm16.91-.36h-4.9v4.02h4.59c.66 0 .63 2.44 0 2.44h-4.59v5.57c0 .72-3.05.72-3.05 0V2.59c0-.58.3-.95.9-.95h7.05c.64 0 .62 2.48 0 2.48zm15.09 6.9c0 3.89-2.43 5.83-6.19 5.83-3.74 0-6.02-1.85-6.02-5.71V2.05c0-.69 3.03-.68 3.03 0v8.83c0 1.99.91 3.48 3.11 3.48 2.04 0 3.07-1.35 3.07-3.3V2.05c0-.69 3-.69 3 0v8.97z"
                        fill="#07203d"
                      />
                      <path
                        d="M84.02 22.84h-3.41c0 1.16.44 1.89 1.69 1.89.71 0 1.44-.39 1.71-.39.23 0 .19.6.06.74-.27.27-1.5.42-1.86.42-1.83 0-2.6-1.09-2.6-2.83 0-1.57.79-2.88 2.5-2.88 1.52 0 2.28 1.01 2.28 2.46 0 .28 0 .59-.37.59zm-.59-.7c.02-.92-.38-1.61-1.37-1.61-.92 0-1.43.75-1.45 1.61h2.82zm6.34 3.12c0 .24-.82.25-.82 0v-.52c-1.13 1.2-3.45 1-3.45-.82 0-1.77 2.07-1.73 3.32-1.73 0-.92-.01-1.63-1.19-1.63-.76 0-1.5.54-1.68.54-.27 0-.22-.61-.07-.75.37-.36 1.34-.56 1.84-.56 1.37 0 2.05.56 2.05 1.96v3.51zm-.95-2.38c-.77 0-2.34-.17-2.34.99 0 1.38 1.61.93 2.34.11v-1.1zm5.59-2.04a.26.26 0 0 1-.11-.03c-.27-.1-.57-.18-.84-.06-.4.17-.76.73-.98 1.08v3.42c0 .26-.96.26-.96 0v-5.2c0-.26.86-.26.86 0v.76c.25-.37.64-.85 1.09-.98.24-.06.81-.05 1.01.11.11.09.15.9-.07.9zm5.7 4.41c0 .26-.95.26-.95 0v-3.04c0-.75-.18-1.59-1.1-1.59-.6 0-1.12.57-1.46 1v3.63c0 .26-.96.26-.96 0v-5.2c0-.26.87-.26.87 0v.69c.45-.51 1.03-.95 1.75-.95 1.43 0 1.85 1.03 1.85 2.29v3.17z"
                        fill="#fd8c0a"
                      />
                    </svg>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-900 hover:black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <RiCloseLine className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item, solutionsIndex) => (
                      <Link
                        key={solutionsIndex}
                        href={item.href}
                        prefetch={false}
                      >
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
                      className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div>
                  <div className="py-2 md:p-2">
                    {/*<ModalWallet />*/}
                    {/*<ModalWeb3 />*/}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* <WalletConnectButton /> */}
                    {colorTheme === "light" ? (
                      <div className="px-2 py-2 text-black bg-white border-2 border-gray-800 rounded-lg dark:bg-gray-800 dark:text-white">
                        <svg
                          onClick={() => setTheme("light")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="px-2 py-2 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
                        <svg
                          onClick={() => setTheme("dark")}
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className="relative overflow-x-scroll bg-white scrollbar-hide dark:bg-gray-900">
        <div className="px-4 md:px-8 lg:px-24">
          <div className="flex items-center w-full gap-2 px-0 py-2 md:px-3 lg:px-3 whitespace-nowrap">
            <Link
              className={
                dynamicId === "safetyScore" || dynamicId === undefined
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#safetyScore"
            >
              Trust Scores
            </Link>
            <Link
              className={
                dynamicId === "safuInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#safuInformation"
            >
              Safu Information
            </Link>
            <Link
              className={
                dynamicId === "taxInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#taxInformation"
            >
              Tax Information
            </Link>
            <Link
              className={
                dynamicId === "contractDetail"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#contractDetail"
            >
              Contract Detail
            </Link>
            <Link
              className={
                dynamicId === "contractInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#contractInformation"
            >
              Contract Inheritance
            </Link>
            <Link
              className={
                dynamicId === "metricsInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#metricsInformation"
            >
              Token Metrics
            </Link>
            <Link
              className={
                dynamicId === "websiteInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#websiteInformation"
            >
              Website Information
            </Link>
            <Link
              className={
                dynamicId === "liquidityInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#liquidityInformation"
            >
              Liquidity & Holder
            </Link>
            <Link
              className={
                dynamicId === "functionInformation"
                  ? "bg-violet-500 dark:bg-gray-800 dark:text-gray-400 py-2 px-6 rounded-2xl text-white font-semibold"
                  : "bg-white py-2 dark:bg-gray-900 px-4 rounded-md text-gray-600 dark:text-gray-500 font-semibold"
              }
              scroll={true}
              href="#functionInformation"
            >
              Function Summary
            </Link>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
            <div className="px-4 py-2 text-gray-900 bg-white rounded-md"></div>
          </div>
        </div>
      </div>
      {/* <ModalWeb3 /> */}
    </div>
  );
}

export const Footer = () => {
  const [colorTheme, setTheme] = useDarkMode();
  function getYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="px-4 pt-20 pb-12 transition-all duration-500 bg-gray-100 dark:bg-blackn-800 lg:px-20 md:px-16 linear">
      <section className="pb-2 mx-auto">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-0 gap-y-6">
          <div className="">
            <div className="flex items-center justify-start gap-1 mb-5">
              {colorTheme === "dark" ? (
                <Image
                  priority
                  src="/images/logo-dark.webp"
                  width="140"
                  height="39"
                  alt="logo-dark"
                />
              ) : (
                <Image
                  priority
                  src="/images/logo-white.webp"
                  width="140"
                  height="39"
                  alt="logo-white"
                />
              )}
            </div>
            <div className="space-y-4">
              <p className="text-black dark:text-white">
                Don't give a chance for Scammers
              </p>
              <a href="https://token.blocksafu.com/token">
                <p className="flex items-center py-4 font-semibold black dark:text-white hover:text-blackn-500 hover:dark:text-blackn-500">
                  Readmore
                  <RiArrowRightLine className="w-6 h-6 ml-2" />
                </p>
              </a>
              <div
                className="flex items-center mb-4 space-x-2 font-medium text-gray-900 title-font lg:mb-0 md:mb-0"
                style={{ cursor: "pointer" }}
              >
                <a
                  href="https://t.me/Audit_DeFi"
                  className="px-3 py-3 text-black bg-white rounded-md dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
                  aria-label="telegram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telegram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/Announcementauditdefi"
                  className="px-3 py-3 text-black bg-white rounded-md dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
                  aria-label="telegram channel"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-megaphone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-11zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25.222 25.222 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56V3.224zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009a68.14 68.14 0 0 1 .496.008 64 64 0 0 1 1.51.048zm1.39 1.081c.285.021.569.047.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a65.81 65.81 0 0 1 1.692.064c.327.017.65.037.966.06z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/Audit_DeFi"
                  className="px-3 py-3 text-black bg-white rounded-md dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
                  aria-label="twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/auditdefiblockchain"
                  className="px-3 py-3 text-black bg-white rounded-md dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
                  aria-label="github"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
                <a
                  href="https://medium.com/@auditdefi"
                  className="px-3 py-3 text-black bg-white rounded-md dark:bg-blackn-900 dark:text-white hover:dark:bg-fullblack"
                  aria-label="medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-medium"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pl-1 md:pl-12 lg:pl-10">
            <h1 className="mb-5 text-2xl font-semibold text-black title-font dark:text-white">
              Navigation
            </h1>
            <ul className="space-y-2 text-black dark:text-gray-200">
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/pricing"
                  prefetch={false}
                >
                  Fast Request
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/audit-list"
                  prefetch={false}
                >
                  Audit List
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/audit-solana-list"
                  prefetch={false}
                >
                  Audit Solana List{" "}
                  <small className="font-semibold text-red-900">New</small>
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/audit-list"
                  prefetch={false}
                >
                  SAFU List
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/kyc-list"
                  prefetch={false}
                >
                  KYC List
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/token-scanner"
                  prefetch={false}
                >
                  Token Scanner
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/nft-scanner"
                  prefetch={false}
                >
                  NFT Scanner
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/scam-report"
                  prefetch={false}
                >
                  Report Scam{" "}
                  <small className="font-semibold text-red-900">New</small>
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="/research"
                  prefetch={false}
                >
                  Token Research{" "}
                  <small className="font-semibold text-red-900">New</small>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pl-1 md:pl-0 lg:pl-10">
            <h2 className="mb-5 text-2xl font-semibold text-black title-font dark:text-white">
              Support
            </h2>
            <ul className="space-y-2 text-black dark:text-gray-200">
              <li>
                <a
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="https://token.blocksafu.com/token"
                >
                  What is AuditDeFi?
                </a>
              </li>
              <li>
                <a
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="https://token.blocksafu.com/documents"
                >
                  Documents
                </a>
              </li>
              <li>
                <a
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="https://token.blocksafu.com/team"
                >
                  Teams
                </a>
              </li>
              <li>
                <a
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="https://token.blocksafu.com/privacy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-gray-800 hover:text-blackn-500 dark:text-gray-500"
                  href="https://token.blocksafu.com/privacy"
                >
                  Disclaimer & Risk
                </a>
              </li>
            </ul>
          </div>
          <div className="pl-1 md:pl-12 lg:pl-10">
            <h2 className="mb-5 text-2xl font-semibold text-black title-font dark:text-white">
              Keep in touch
            </h2>
            <ul className="space-y-5 text-black dark:text-gray-200">
              <li>
                <a href="mailto:marketing@auditdefi.com" className="flex">
                  <RiMailLine className="w-6 h-6 mr-2" /> For Support <br />
                  support@auditdefi.com
                </a>
              </li>
              <li>
                <a href="mailto:auditdefi@gmail.com" className="flex">
                  <RiMailLine className="w-6 h-6 mr-2" /> Google Mail
                  <br />
                  auditdefi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto border-color">
          <div className="mt-8">
            <hr className="border-gray-500 dark:border-gray-900" />
          </div>
          <div className="container flex flex-col items-center pt-12 mx-auto space-y-5 lg:flex-row lg:space-y-0">
            <nav className="flex flex-col items-center justify-center text-black dark:text-white lg:flex-row">
              <p>Copyright © {getYear()} AuditDeFi. All rights reserved.</p>
            </nav>
          </div>
        </div>
      </section>
    </footer>
  );
};

export const Modal = ({
  title = "",
  children,
  isOpen = false,
  onClose = (e) => {},
}) => {
  return (
    <>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-50 flex justify-center pt-20 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full mx-auto my-6 md:w-1/3 lg:w-1/3 lg:max-w-3xl">
              <div className="relative flex flex-col w-full bg-white border-0 shadow-lg outline-none rounded-3xl focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blacknGray-200">
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    {title}
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-lg font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={() => onClose(false)}
                  >
                    <RiCloseLine color={"black"} />
                  </button>
                </div>

                <div className="relative flex-auto p-6">{children}</div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25" />
        </>
      ) : null}
    </>
  );
};

export const Toast = ({
  title = "",
  children,
  isOpen = false,
  onClose = (e) => {},
  duration = 60000,
}) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!showToast) return;
    setTimeout(() => {
      setShowToast(false);
      onClose(true);
    }, duration);
  }, [showToast]);

  return (
    <>
      {showToast ? (
        <>
          <div className="fixed inset-0 z-50 flex justify-center pt-5 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-full px-4 mx-auto md:w-2/4 lg:w-2/4">
              <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 bg-green-600 border-b border-green-600 border-solid rounded-t">
                  <h3 className="flex items-center text-sm font-bold text-white rounded-lg">
                    <RiNotification3Line className="w-4 h-4 mr-1" /> {title}
                  </h3>
                  <button
                    className="float-right p-1 ml-auto text-sm font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-2 focus:outline-none"
                    onClick={() => {
                      setShowToast(false);
                      onClose(false);
                    }}
                  >
                    <RiCloseLine className="text-white" />
                  </button>
                </div>

                <div className="relative flex-auto p-3 text-xs">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export const CopyAddress = ({ addr }) => {
  const [address, setAddress] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  useEffect(() => {
    setAddress(getSimpleAddress(addr));
  }, [addr]);

  const onCopy = () => {
    var TempText = document.createElement("input");
    TempText.value = addr;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);
    // if ('clipboard' in navigator) {
    //   navigator.clipboard.writeText(addr)
    // } else {
    //   document.execCommand('copy', true, addr);
    // }

    setIsToastOpen(true);
  };

  return (
    <div className="flex flex-row items-center justify-content-center">
      <a href={"https://bscscan.com/address/" + addr}>{address}</a>
      &nbsp;
      <a
        href="#"
        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded-full dark:text-white dark:border-gray-800 dark:bg-gray-800"
        onClick={(e) => {
          e.preventDefault();
          onCopy();
        }}
      >
        Copy
      </a>
      <Toast
        title="Success"
        isOpen={isToastOpen}
        onClose={(e) => {
          setIsToastOpen(false);
        }}
      >
        Copied to Clipboard
      </Toast>
    </div>
  );
};

export const CopyButton = ({ text }) => {
  const [address, setAddress] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  useEffect(() => {
    setAddress(getSimpleAddress(text));
  }, [text]);

  const onCopy = () => {
    var TempText = document.createElement("input");
    TempText.value = text;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);
    // if ('clipboard' in navigator) {
    //   navigator.clipboard.writeText(addr)
    // } else {
    //   document.execCommand('copy', true, addr);
    // }
    toast.success("Successfully Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // setIsToastOpen(true)
  };

  return (
    <div className="flex flex-row items-center justify-content-center">
      &nbsp;
      <a
        href="#"
        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded-full dark:text-white dark:border-gray-800 dark:bg-gray-800"
        onClick={(e) => {
          e.preventDefault();
          onCopy();
        }}
      >
        <RiFileCopy2Line /> Copy
      </a>
      <Toast
        title="Success"
        isOpen={isToastOpen}
        onClose={(e) => {
          setIsToastOpen(false);
        }}
      >
        Copied to Clipboard
      </Toast>
    </div>
  );
};

export const CopyButton2 = ({ text }) => {
  const [address, setAddress] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };

  useEffect(() => {
    setAddress(getSimpleAddress(text));
  }, [text]);

  const onCopy = () => {
    var TempText = document.createElement("input");
    TempText.value = text;
    document.body.appendChild(TempText);
    TempText.select();

    document.execCommand("copy");
    document.body.removeChild(TempText);
    // if ('clipboard' in navigator) {
    //   navigator.clipboard.writeText(addr)
    // } else {
    //   document.execCommand('copy', true, addr);
    // }
    toast.success("Successfully Copied!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // setIsToastOpen(true)
  };

  return (
    <div className="flex flex-row items-center justify-content-center">
      &nbsp;
      <button
        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded-full dark:text-white dark:border-gray-800 dark:bg-gray-800"
        onClick={(e) => {
          e.preventDefault();
          onCopy();
        }}
        aria-label="copy"
      >
        <RiFileCopy2Line />
      </button>
      <Toast
        title="Success"
        isOpen={isToastOpen}
        onClose={(e) => {
          setIsToastOpen(false);
        }}
      >
        Copied to Clipboard
      </Toast>
    </div>
  );
};

/** Bugs wallet connect */
export const ModalWallet = () => {
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  const [isSelectWalletOpen, setIsSelectWalletOpen] = useState(false);
  const onClick = (p) => {
    try {
      activate(p, undefined, true);
    } catch (ex) {
      console.log(ex);
    }
  };
  const getSimpleAddress = (str) => {
    return str.substr(0, 6) + "..." + str.substr(str.length - 3, str.length);
  };
  useEffect(() => {
    setIsSelectWalletOpen(false);
  }, [active]);

  const logout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to Log Out?")) {
      deactivate();
    }
  };
  return (
    <>
      {!active ? (
        <button
          onClick={() => setIsSelectWalletOpen(true)}
          className={"rounded-lg text-white bg-blackn-600 px-3 py-2"}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={() => logout()}
          className={"rounded-full text-white bg-blackn-600 px-3 py-2"}
        >
          {getSimpleAddress(account)}
        </button>
      )}
      <Modal
        title={"Select Wallet"}
        isOpen={isSelectWalletOpen}
        onClose={(e) => setIsSelectWalletOpen(e)}
      >
        <div className={"grid grid-cols-2 gap-y-4 gap-x-2"}>
          <CardWebooWallet onClick={(p) => onClick(p)} />
          <CardMetamask onClick={(p) => onClick(p)} />
          <CardWalletConnect onClick={(p) => onClick(p)} />
        </div>
      </Modal>
    </>
  );
};

export const ModalWeb3 = () => {
  const [isSelectWalletOpen, setIsSelectWalletOpen] = useState(false);
  const [state, dispatch] = useContext(Context);

  useEffect(async () => {
    setIsSelectWalletOpen(state.isTriggerConnectWallet);
    if (state.web3) {
      const chainId = await state.web3.eth.getChainId();
    }
    if (state.web3Logout) doLogout();
  }, [state]);

  // useEffect(async () => {
  //   try {
  //     await onClickMetamask();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  const onClickMetamask = async () => {
    const providerOptions = {
      /* See Provider Options Section */
      injected: {
        display: {
          logo: "https://cdn.webooswap.com/storage/file/file_202201221104014935_1642849441.png",
          name: "Injected",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
    };
    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark",
    });
    const provider = await web3Modal.connectTo("injected");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    await validateChain(chainId);
    providerEvent(provider, web3);
    dispatch({
      type: "SET_WEB3",
      payload: {
        web3: web3,
        web3modal: web3Modal,
      },
    });
    dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
  };

  const onClickWC = async () => {
    const providerOptions = {
      /* See Provider Options Section */
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            56: "https://bsc-dataseed1.defibit.io",
          },
        },
      },
    };
    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark",
    });
    const provider = await web3Modal.connectTo("walletconnect");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    await validateChain(chainId);
    providerEvent(provider, web3);
    dispatch({
      type: "SET_WEB3",
      payload: {
        web3: web3,
        web3modal: web3Modal,
      },
    });
    dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
  };

  const providerEvent = (provider, web3) => {
    provider.on("accountsChanged", (accounts) => {
      dispatch({ type: "SET_ACCOUNT", payload: accounts[0] });
    });

    provider.on("chainChanged", async (chainId) => {
      let chain_id = chainId;
      if (web3.utils.isHex(chainId)) chain_id = web3.utils.hexToNumber(chainId);
      await validateChain(chain_id);
    });

    provider.on("connect", (info) => {
      console.log(info);
    });

    provider.on("disconnect", (error) => {
      console.log(error);
      dispatch({ type: "SET_ACCOUNT", payload: null });
    });

    setTimeout(async () => {
      dispatch({ type: "STOREHASH" });
    }, [2000]);
  };

  const validateChain = async (chainId) => {
    const chain_id = chainId;
    // if(state.web3.utils.isHex(chain_id)) chain_id = state.web3.utils.hexToNumber(chain_id)
    // alert(state.web3.utils.isHex(chain_id))
    if (!getEnv().ALLOWED_CHAIN_ID.includes(chain_id)) {
      alert("Wrong Network");
      // console.log(chainId);
      dispatch({ type: "LOGOUT_WALLET_CONNECT", payload: false });
    }

    dispatch({ type: "SET_CHAIN_ID", payload: chainId });
  };

  const doLogout = async () => {
    // await state.web3modal.clearCachedProvider();
    dispatch({
      type: "SET_WEB3",
      payload: {
        web3: null,
        web3modal: null,
      },
    });
    dispatch({ type: "SET_CHAIN_ID", payload: null });
    dispatch({ type: "LOGOUT_WALLET_CONNECT", payload: false });

    setTimeout(async () => {
      dispatch({ type: "STOREHASH" });
    }, [2000]);
  };

  return (
    <>
      <Modal
        title={"Select Wallet"}
        isOpen={isSelectWalletOpen}
        onClose={(e) => setIsSelectWalletOpen(e)}
      >
        <div className={"flex flex-col gap-y-3"}>
          <CardWebooWallet onClick={(p) => onClickMetamask()} />
          <CardMetamask onClick={(p) => onClickMetamask()} />
          <CardWalletConnect onClick={(p) => onClickWC()} />
        </div>
      </Modal>
    </>
  );
};

export const ModalWeb3Test = () => {
  const onConnect = async () => {
    const providerOptions = {
      /* See Provider Options Section */
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: {
            97: "https://bsc-testnet.public.blastapi.io",
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
      theme: "dark",
    });

    const instance = await web3Modal.connectTo("walletconnect");

    const provider = new ethers.providers.Web3Provider(instance);
    // const signer = provider.getSigner();
    // alert("tes")
  };
  return (
    <button
      onClick={() => onConnect()}
      className={"rounded-lg text-white bg-blackn-600 px-3 py-2"}
    >
      Connect Wallet
    </button>
  );
};

export const CardMetamask = ({ onClick = (e) => {} }) => {
  return (
    <button
      className={
        "items-center border-2 rounded-full text-center flex flex-row justify-between py-2 hover:border-3 hover:border-red-600 px-8 gap-y-2"
      }
      onClick={() => onClick(injected)}
    >
      <div className={"text-sm font-bold"}>Metamask</div>
      <img
        alt={"Metamask"}
        src={
          "https://cdn.webooswap.com/storage/file/file_202201250651457307_1643093505.svg"
        }
        style={{
          width: 30,
          height: 30,
        }}
      />
    </button>
  );
};

export const CardWebooWallet = ({ onClick = (e) => {} }) => {
  return (
    <button
      className={
        "items-center border-2 rounded-full text-center flex flex-row justify-between py-2 hover:border-3 hover:border-red-600 px-8 gap-y-2"
      }
      onClick={() => onClick(injected)}
    >
      <div className={"text-sm font-bold"}>Weboo Wallet</div>
      <img
        alt={"WebooWallet"}
        src={
          "https://cdn.webooswap.com/storage/file/file_202201221439036521_1642862343.svg"
        }
        style={{
          width: 30,
          height: 30,
        }}
      />
    </button>
  );
};

export const CardWalletConnect = ({ onClick = (p) => {} }) => {
  return (
    <button
      className={
        "items-center border-2 rounded-full text-center flex flex-row justify-between py-2 hover:border-3 hover:border-red-600 px-8 gap-y-2"
      }
      onClick={() => onClick(walletconnect)}
    >
      <div className={"text-sm font-bold"}>Wallet Connect</div>
      <img
        alt={"Wallet Connect"}
        src={
          "https://cdn.webooswap.com/storage/file/file_202201250659526827_1643093992.png"
        }
        style={{
          width: 30,
          height: 30,
        }}
        loading="lazy"
      />
    </button>
  );
};

export const LoadingWeboo = () => {
  return (
    <div className={"flex flex-col items-center justify-center animate-pulse"}>
      <img
        src={"/images/logo-dark.webp"}
        style={{
          width: 300,
          height: 100,
        }}
        className={"mr-2"}
        alt={"Dex Name"}
      />
      Loading...
    </div>
  );
};

export const NotFound = () => {
  return (
    <div className={"flex flex-col"}>
      <img
        src={
          "https://cdn.webooswap.com/storage/file/file_202201221439036521_1642862343.svg"
        }
        style={{
          width: 100,
          height: 100,
        }}
        className={"mr-2"}
        alt={"Dex Name"}
      />
      Not Found.
    </div>
  );
};

export const ChainIconCircle = ({
  icon1,
  icon2,
  size = 80,
  borderWidth = 3,
}) => {
  return (
    <div className={"flex flex-row items-center justify-center"}>
      <img
        src={icon1}
        style={{
          width: size,
          height: size,
        }}
        className={"rounded-full p-0.5 border-red-600 border-" + borderWidth}
        alt={"Weboo"}
      />
      <span
        className={"rounded-full p-1 bg-blackn-600"}
        style={{
          position: "absolute",
          borderWidth: borderWidth,
        }}
      />
      <img
        src={icon2}
        style={{
          width: size,
          height: size,
        }}
        className={"rounded-full p-0.5 border-red-600 border-" + borderWidth}
        alt={"Weboo"}
      />
    </div>
  );
};

export const BtnWalletConnect = ({ children }) => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (!state.web3) {
      // dispatch({
      //   type: "CONNECT_WALLET",
      //   payload: true,
      // });
    }
  }, []);

  const onConnectWallet = () => {
    dispatch({
      type: "CONNECT_WALLET",
      payload: true,
    });
  };

  return (
    <>
      {!state.isConnectWallet ? (
        <button
          onClick={() => onConnectWallet()}
          className={
            "flex items-center justify-center w-full gap-2 py-2.5 px-2.5 text-white bg-blackn-500 rounded-lg hover:bg-blackn-600"
          }
        >
          <RiWalletLine />
          <span className="hidden lg:block md:block">Connect Wallet</span>
        </button>
      ) : (
        children
      )}
    </>
  );
};

export const CircleLoading = ({ size }) => {
  return (
    <div className={"animate-pulse"}>
      <div className={`bg-red-300 rounded-full w-${size} h-${size}`} />
    </div>
  );
};

export const ModalTxHash = ({
  txHash = null,
  isReceipt = false,
  onReceiptClose = () => {},
}) => {
  const [state, dispatch] = useContext(Context);
  const [storeHash, setStoreHash] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showReceipt, setShowReceipt] = useState(false);
  const [urlExplorer, setUrlExplorer] = useState("https://bscscan.com");

  useState(async () => {
    if (state && state.web3) {
      // setUrlExplorer(getAppByChainId(state.chainId).URL_EXPLORER);
      // setUrlExplorer("https://bscscan.com");
      setStoreHash(state.web3.storeHash);
    }
  }, [state]);

  useEffect(() => {
    if (!txHash) return setShowModal(false);
    else {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  }, [txHash]);

  useEffect(() => {
    if (!isReceipt) return;
    setShowReceipt(true);
  }, []);

  return (
    <>
      {showModal ? (
        <>
          <Modal
            title={"Transaction Submitted"}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          >
            <div className={"flex flex-col items-center gap-y-3"}>
              <RiArrowUpCircleLine size={100} />
              <a
                href={urlExplorer + "/tx/" + txHash}
                target={"_blank"}
                rel={"noreferrer"}
                className={
                  "no-underline font-bold flex flex-row gap-x-3 justify-center items-center text-black dark:text-white"
                }
              >
                <span>View On Explorer</span>
                <RiExternalLinkLine />
              </a>
            </div>
          </Modal>
        </>
      ) : null}
      {/*<Toast isOpen={showReceipt} title={"Transaction Receipt"} onClose={()=>{setShowReceipt(false);onReceiptClose()}}>*/}
      {/*  <a href={urlExplorer+"/tx/"+txHash} target={"_blank"} rel={"noreferrer"} className={"underline font-bold flex text-sm flex-row gap-x-3"}>*/}
      {/*    <span>View On Explorer</span>*/}
      {/*    <RiExternalLinkLine />*/}
      {/*  </a>*/}
      {/*</Toast>*/}
    </>
  );
};

export const Empty = ({ text }) => {
  return (
    <div
      className={
        "w-full text-3xl flex items-center text-center align-center flex-col"
      }
    >
      <span>{text}</span>
    </div>
  );
};
