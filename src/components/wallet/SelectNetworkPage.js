import { useState } from "react";
import { useAccount, useConfig } from "wagmi";
import { switchChain } from "@wagmi/core";
import { Dialog } from "@headlessui/react";
import {
  FaCheck,
  FaChevronLeft,
  FaInfoCircle,
  FaSearch,
  FaSync,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { getChainImage } from "@/components/wallet/Web3WalletWagmi";
import {
  RiArrowLeftSLine,
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
  RiSearchLine,
} from "react-icons/ri";
const NetworkIcon = ({ chainId }) => {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white">
      <Image
        src={getChainImage(chainId)}
        alt="chain-icon"
        width={30}
        height={30}
      />
    </div>
  );
};
const DeclineLogo = ({ icon }) => {
  return (
    <div className="relative w-70 h-70 p-4 flex items-center justify-center overflow-hidden flex flex-col">
      <Image src={icon} alt={"Loading"} width={80} height={80} />
      <div className={"ml-20"}>
        <FaTimes className={"text-red-700"} />
      </div>
    </div>
  );
};
const LoadingLogo = ({ icon }) => {
  return (
    <div className="relative w-70 h-70 p-4 flex items-center justify-center overflow-hidden">
      <Image src={icon} alt={"Loading"} width={80} height={80} />

      {/* Rotating Shorter Line */}
      <motion.svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="70, 283"
        />
      </motion.svg>
    </div>
  );
};
const SelectNetworkPage = ({ setPage, onHide }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { chain } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [isDecline, setIsDecline] = useState(false);
  const config = useConfig();
  const [pageTitle, setPageTitle] = useState("Choose Network");
  const [targetedChain, setTargetedChain] = useState(null);
  const filteredChains = config?.chains?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSwitchChain = async (network_) => {
    try {
      setIsDecline(false);
      setIsLoading(true);
      setTargetedChain(network_);
      setPageTitle(network_?.name);
      await switchChain(config, {
        chainId: network_?.id,
      });
    } catch (e) {
      setIsDecline(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-white flex items-center justify-between"
      >
        <button
          type={"button"}
          className={
            "rounded-md flex flex-row gap-1 p-1 items-center hover:bg-blackn-800"
          }
          onClick={() => {
            if (isDecline) {
              setIsDecline(false);
              setPageTitle("Choose Network");
            } else {
              setPage("MainPage");
            }
          }}
        >
          <RiArrowLeftSLine className="w-5 h-5" />
        </button>
        <div>{pageTitle}</div>
        <button className={""} onClick={onHide}>
          <span className="text-white">
            <RiCloseLine className="w-5 h-5" />
          </span>
        </button>
      </Dialog.Title>
      <div className="mt-2 flex flex-col gap-4">
        {isLoading && (
          <div className={"text-center"}>
            <LoadingLogo icon={getChainImage(targetedChain?.id)} />
            <div className={"text-white mt-4"}>Approve in wallet</div>
            <div className={"text-blackn-600"}>
              <small>Accept connection request in your wallet</small>
            </div>
          </div>
        )}
        {!isLoading && isDecline && (
          <div className={"text-center"}>
            <DeclineLogo icon={getChainImage(targetedChain?.id)} />
            <div className={"text-white mt-4"}>Switch declined</div>
            <div className={"text-blackn-600"}>
              <small>
                Switch can be declined if chain is not supported by a wallet or
                previous request is still active
              </small>
            </div>
            <div className={"flex justify-center mt-4"}>
              <button
                className="border border-blue-500 text-blue-500 text-sm rounded-md p-2 px-5 hover:bg-blackn-800 flex flex-row gap-3 items-center"
                onClick={() => handleSwitchChain(targetedChain)}
              >
                Try Again
                <FaSync />
              </button>
            </div>
          </div>
        )}

        {!isLoading && !isDecline && (
          <div className="relative mb-4 mt-4">
            <input
              type="text"
              placeholder="Search network"
              className="w-full bg-blackn-800/50 font-light border border-mid-gray-700 text-gray-100 pl-10 pr-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RiSearchLine className="absolute left-3 top-3 text-gray-400" />

            <div className="space-y-2 mt-4">
              {filteredChains.map((network) => (
                <button
                  key={network.id}
                  className="flex items-center w-full justify-between p-3 hover:bg-gray-800 rounded-lg cursor-pointer"
                  onClick={() => handleSwitchChain(network)}
                >
                  <div className="flex items-center space-x-3 text-white">
                    {/*<NetworkIcon chainId={network.id}/>*/}
                    <NetworkIcon chainId={network.id} />
                    <span>{network.name}</span>
                  </div>
                  {chain?.id === network.id && (
                    <RiCheckLine className="text-blackn-400 w-5 h-5" />
                  )}
                </button>
              ))}

              <hr
                style={{
                  borderColor: "#252727",
                  color: "#252727",
                }}
              />
              <div className="text-white flex flex-row gap-2">
                <RiInformationLine className="w-5 h-5" />
                <small className="text-mid-gray-400">
                  Your connected wallet may not support some of the networks
                  available for this dApp
                </small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectNetworkPage;
