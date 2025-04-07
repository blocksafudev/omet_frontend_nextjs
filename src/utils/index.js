// utils.js

import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiFileCopy2Fill, RiFileCopy2Line } from "react-icons/ri";

function parseDate(dateString) {
  const dateParts = dateString.split(" ");
  const [month, day, year] = dateParts[0].split("-");
  const [hour, minute, second] = dateParts[1].split(":");
  const isPM = dateParts[2] === "PM";

  let hourValue = parseInt(hour, 10);
  if (isPM && hourValue < 12) {
    hourValue += 12;
  }

  const date = new Date(
    year,
    getMonthIndex(month),
    day,
    hourValue,
    minute,
    second
  );
  return date;
}

function getMonthIndex(month) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames.indexOf(month);
}

function getHour(hour, isPM) {
  let hourValue = parseInt(hour, 10);
  if (isPM) {
    hourValue += 12;
  }
  return hourValue;
}

export function calculateContractAge(contractCreated) {
  const contractDate = parseDate(contractCreated);
  const currentDate = new Date();

  const diff = currentDate - contractDate;
  const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(
    (diff % (365.25 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000)
  );
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  if (years > 0) {
    return `${years} years, ${months} months, ${days} days`;
  } else if (months > 0) {
    return `${months} months, ${days} days, ${hours}h`;
  } else if (days > 0) {
    return `${days} days, ${hours}h, ${minutes}m`;
  } else {
    return `${hours}h, ${minutes}m, ${seconds}s`;
  }
}

export function formatDate(date) {
  return moment(date, "YYYY-MM-DD hh:mm:ss+ZZ").format("YYYY-MM-DD");
}

export function conditionExplorer(cond) {
  switch (cond) {
    default:
      return "https://bscscan.com";
    case "ETHEREUM":
      return "https://etherscan.io";
    case "BASE":
      return "https://basescan.org";
    case "ETHEREUMTESTNETGOERLI":
      return "https://goerli.etherscan.io";
    case "ETHEREUMTESTNETSEPOLIA":
      return "https://sepolia.etherscan.io";
    case "BSC":
      return "https://bscscan.com";
    case "BSCTESTNET":
      return "https://testnet.bscscan.com";
    case "COREDAO":
      return "https://scan.coredao.org";
    case "COREDAOTESTNET":
      return "https://scan.test.btcs.network";
    case "ZKSYNC":
      return "https://explorer.zksync.io";
    case "ZKSYNCTESTNET":
      return "https://goerli.explorer.zksync.io";
    case "ARBITRUM":
      return "https://arbiscan.io";
    case "ARBITRUMNOVA":
      return "https://nova.arbiscan.io";
    case "ARBITRUMGOERLI":
      return "https://goerli.arbiscan.io";
    case "FANTOM":
      return "https://ftmscan.com";
    case "FANTOMTESTNET":
      return "https://testnet.ftmscan.com";
    case "POLYGON":
      return "https://polygonscan.com";
    case "POLYGONTESTNET":
      return "https://mumbai.polygonscan.com";
    case "AVALANCHE":
      return "https://snowtrace.io";
    case "AVALANCHETESTNET":
      return "https://testnet.snowtrace.io";
    case "CRONOS":
      return "https://cronoscan.com";
    case "CRONOSTESTNET":
      return "https://testnet.cronoscan.com";
    case "OKC":
      return "https://www.oklink.com/en/okc";
    case "HECO":
      return "https://www.hecoinfo.com";
    case "HECOTESTNET":
      return "https://testnet-m.hecoinfo.com";
    case "VELAS":
      return "https://velascan.org";
    case "OASIS":
      return "https://explorer.emerald.oasis.dev";
    case "OPTIMISM":
      return "https://optimistic.etherscan.io";
    case "OPTIMISMTESTNET":
      return "https://goerli-optimism.etherscan.io";
    case "MOONBEAM":
      return "https://moonscan.io";
    case "MOONBEAMTESTNET":
      return "https://moonbase.moonscan.io";
    case "AURORA":
      return "https://explorer.aurora.dev";
    case "AURORATESTNET":
      return "https://explorer.testnet.aurora.dev";
    case "ALVEY":
      return "https://alveyscan.com";
    case "ALVEYTESTNET":
      return "https://testnet.alveyscan.com";
    case "DOGECHAIN":
      return "https://explorer.dogechain.dog";
    case "DOGECHAINTESTNET":
      return "https://explorer-testnet.dogechain.dog";
    case "DOGECHAINTESTNET":
      return "https://explorer.mode.network";
    case "MODE":
      return "https://explorer.mode.network";
    case "MERLIN":
      return "https://scan.merlinchain.io";
    case "XAI":
      return "https://explorer.xai-chain.net";
    case "TRON":
      return "https://tronscan.org/#";
    case "SOLANA":
      return "https://solscan.io";
    case "TON":
      return "https://tonscan.org";
  }
}

export const formatNumericWithComma = (number) => {
  const defaultNumber = number;
  return defaultNumber.toLocaleString();
};

export const formatStringNumericWithComma = (numberString) => {
  const number = Number(numberString);
  return number.toLocaleString();
};

export const formatDateTwo = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const truncateText = (text) => {
  if (text.length > 9) {
    return text.substring(0, 9) + "...";
  } else {
    return text;
  }
};

export const mapKeyToContractDetails = (key) => {
  switch (key) {
    case "ContractName":
      return "Contract Name";
    case "CompilerVersion":
      return "Compiler Version";
    case "OptimizationUsed":
      return "Optimization Used";
    case "Runs":
      return "Runs";
    case "ConstructorArguments":
      return "Constructor Arguments";
    case "EVMVersion":
      return "EVM Version";
    case "Library":
      return "Default Library";
    case "LicenseType":
      return "License Type";
    case "Proxy":
      return "Proxy";
    case "Implementation":
      return "Implementation";
    case "SwarmSource":
      return "Swarm Source";
    default:
      return key;
  }
};

export const mapKeyToDatabases = (key) => {
  switch (key) {
    case "id":
      return "ID";
    case "type":
      return "Type";
    case "name":
      return "Address";
    case "sol_name":
      return "Tag";
    case "source_code":
      return "Link";
    case "source":
      return "Network";
    case "created_at":
      return "Index Date";
    case "updated_at":
      return "Update Date";
    case "deleted_at":
      return "Deleted Date";
    case "description":
      return "Description";
    case "flag":
      return "Flag";
    default:
      return key;
  }
};

export function conditionClass(cond) {
  switch (cond) {
    default:
      return (
        <Image
          priority={true}
          width="138"
          height="40"
          src="../images/badge/badge-audit.svg"
          alt="badge-audit"
        />
      );
    case "KYC":
      return (
        <Image
          priority={true}
          width="112"
          height="40"
          src="../images/badge/badge-kyc.svg"
          alt="badge-kyc"
        />
      );
    case "Audit":
      return (
        <Image
          priority={true}
          width="138"
          height="40"
          src="../images/badge/badge-audit.svg"
          alt="badge-audit"
        />
      );
    case "SAFU":
      return (
        <Image
          priority={true}
          width="75"
          height="40"
          src="../images/badge/badge-safu.svg"
          alt="badge-safu"
        />
      );
    case "Marketing":
      return (
        <Image
          priority={true}
          width="106"
          height="40"
          src="../images/badge/badge-marketing.svg"
          alt="badge-marketing"
        />
      );
    case "Doxxed":
      return (
        <Image
          priority={true}
          width="97"
          height="40"
          src="../images/badge/badge-doxxed.svg"
          alt="badge-doxxed"
        />
      );
  }
}

export function conditionClassVuln(cond) {
  switch (cond) {
    default:
      return " bg-gray-900";
    case "High":
      return " bg-red-700 text-white";
    case "Medium":
      return " bg-orange-700 text-white";
    case "Low":
      return " bg-green-800 text-white";
    case "Informational":
      return " bg-blackn-700 text-white";
    case "Optimization":
      return " bg-indigo-700 text-white";
  }
}

export function getChainId(cond) {
  switch (cond) {
    case "ETHEREUM":
      return "1";
    case "BASE":
      return "8453";
    case "ETHEREUMTESTNETGOERLI":
      return "3";
    case "ETHEREUMTESTNETSEPOLIA":
      return "4";
    case "BSC":
      return "56";
    case "BSCTESTNET":
      return "97";
    case "ARBITRUM":
      return "42161";
    case "ARBITRUMNOVA":
      return "42170";
    case "MERLIN":
      return "4200";
    case "FANTOM":
      return "250";
    case "FANTOMTESTNET":
      return "4002";
    case "POLYGON":
      return "137";
    case "POLYGONTESTNET":
      return "80001";
    case "AVALANCHE":
      return "43114";
    case "AVALANCHETESTNET":
      return "43113";
    case "COREDAO":
      return "1116";
    case "MODE":
      return "34443";
    default:
      return "56";
  }
}

export function getNetworkSlug(cond) {
  switch (cond) {
    case "ETHEREUM":
      return "eth-mainnet";
    case "ETHEREUMTESTNETGOERLI":
      return "eth-goerli";
    case "BSC":
      return "bsc-mainnet";
    case "BSCTESTNET":
      return "bsc-testnet";
    case "ARBITRUM":
      return "arbitrum-mainnet";
    case "ARBITRUMNOVA":
      return "arbitrum-goerli";
    case "FANTOM":
      return "fantom-mainnet";
    case "FANTOMTESTNET":
      return "fantom-testnet";
    case "POLYGON":
      return "matic-mainnet";
    case "POLYGONTESTNET":
      return "matic-mumbai";
    case "AVALANCHE":
      return "avalanche-mainnet";
    case "AVALANCHETESTNET":
      return "avalanche-testnet";
    case "AURORA":
      return "aurora-mainnet";
    case "AURORATESTNET":
      return "aurora-testnet";
    case "CRONOS":
      return "cronos-mainnet";
    case "CRONOSTESTNET":
      return "cronos-testnet";
    case "OPTIMISM":
      return "optimism-mainnet";
    case "OPTIMISMTESTNET":
      return "optimism-goerli";
    default:
      return "bsc-mainnet";
  }
}

export function getDexIframe(cond) {
  switch (cond) {
    case "ETHEREUM":
      return "eth";
    case "BASE":
      return "base";
    case "ETHEREUMTESTNETGOERLI":
      return "eth";
    case "ETHEREUMTESTNETSEPOLIA":
      return "eth";
    case "BSC":
      return "bsc";
    case "BSCTESTNET":
      return "bsc";
    case "ARBITRUM":
      return "arbitrum";
    case "ARBITRUMNOVA":
      return "arbitrum";
    case "FANTOM":
      return "ftm";
    case "FANTOMTESTNET":
      return "ftm";
    case "POLYGON":
      return "polygon_pos";
    case "POLYGONTESTNET":
      return "polygon_pos";
    case "AVALANCHE":
      return "avax";
    case "AVALANCHETESTNET":
      return "avax";
    case "COREDAO":
      return "core";
    default:
      return "bsc";
  }
}

export function getChainIdByName(cond) {
  switch (cond) {
    case "ETHEREUM":
      return "1"; // Ethereum Mainnet
    case "BASE":
      return "8453"; // Base Mainnet
    case "ETHEREUMTESTNETGOERLI":
      return "5"; // Goerli Testnet
    case "ETHEREUMTESTNETSEPOLIA":
      return "11155111"; // Sepolia Testnet
    case "BSC":
      return "56"; // Binance Smart Chain Mainnet
    case "BSCTESTNET":
      return "97"; // Binance Smart Chain Testnet
    case "ARBITRUM":
      return "42161"; // Arbitrum Mainnet
    case "ARBITRUMNOVA":
      return "42170"; // Arbitrum Nova
    case "FANTOM":
      return "250"; // Fantom Mainnet
    case "FANTOMTESTNET":
      return "4002"; // Fantom Testnet
    case "POLYGON":
      return "137"; // Polygon Mainnet
    case "POLYGONTESTNET":
      return "80001"; // Polygon Testnet
    case "AVALANCHE":
      return "43114"; // Avalanche Mainnet
    case "AVALANCHETESTNET":
      return "43113"; // Avalanche Testnet
    case "COREDAO":
      return "1116"; // CoreDAO
    default:
      return "56"; // Default to BSC Mainnet
  }
}

export function readmore(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
}

export function convertTimestampToTimeAgo(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval === 1 ? "1 week ago" : `${interval} weeks ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
}

export function convertTimestampToTimeAgoSimple(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1Y ago" : `${interval}Y ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1M ago" : `${interval}M ago`;
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval === 1 ? "1W ago" : `${interval}W ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1D ago" : `${interval}d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1h ago" : `${interval}h ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1m ago" : `${interval}m ago`;
  }
  return seconds === 1 ? "1s ago" : `${seconds}s ago`;
}

export function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeout;
    if (isCopied) {
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isCopied]);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button onClick={handleCopyClick} aria-label="copy">
      <span>
        {isCopied ? (
          <div className="flex items-center gap-1">
            <RiFileCopy2Fill /> <small>Copied</small>
          </div>
        ) : (
          <RiFileCopy2Line />
        )}
      </span>
    </button>
  );
}

export function formatNumberWithCommas(number) {
  if (number < 0) {
    number = 0;
  }
  const numberString = number.toFixed(18); // Mengatur presisi desimal hingga 18 digit
  const [integerPart, decimalPart] = numberString.split(".");
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

export function formatNumberWithCommasFromText(number) {
  const numberString = Number(number).toFixed(2);
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getRouterById(number) {
  switch (number) {
    case 1:
      return "Ganache Uniswap";
    case 2:
      return "Pancakeswap V2";
    case 3:
      return "Uniswap V2";
    case 4:
      return "SpookySwap V3";
    case 5:
      return "Pancakeswap V2";
    case 6:
      return "Pancakeswap V2";
    case 7:
      return "Uniswap V2 Router";
    case 8:
      return "Pancakeswap V2 (Testnet)";
    case 9:
      return "Ganache Uniswap";
    default:
      return "Pancakeswap V2";
  }
}

export function ReadMoreToggle({ text }) {
  const limit = 200;
  const [isReadMore, setIsReadMore] = useState(false); // Pastikan ini selalu dipanggil

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      <span>{isReadMore ? text : `${text.substring(0, limit)}...`}</span>
      {text.length > limit && (
        <button onClick={toggleReadMore} className="text-blue-500">
          {isReadMore ? " Read Less" : " Read More"}
        </button>
      )}
    </div>
  );
}

export function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
