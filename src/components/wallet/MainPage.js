import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { FaHistory, FaLink } from "react-icons/fa";
import makeBlockie from "ethereum-blockies-base64";
import { ClipboardCopy } from "@/utils";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import {
  formatEthAddress,
  getChainImage,
} from "@/components/wallet/Web3WalletWagmi";
import React from "react";
import {
  RiArrowDownSLine,
  RiArrowRightUpLine,
  RiCloseLine,
  RiLogoutCircleLine,
  RiTimeLine,
} from "react-icons/ri";

const RowButtonModalDetailAccount = ({ title, icon, onClick, color }) => {
  return (
    <>
      <button
        type={"button"}
        className="text-start text-white border rounded-md p-3 flex gap-3 items-center hover:bg-blackn-800"
        style={{
          borderColor: "#252727",
          backgroundColor: "#252727",
        }}
        onClick={onClick}
      >
        <div
          style={{
            backgroundColor: "#303333",
          }}
          className={"p-2 rounded-md"}
        >
          {icon}
        </div>
        <span className={color}>{title}</span>
      </button>
    </>
  );
};

const MainPage = ({ address, balance, chain, disconnect, setPage, onHide }) => {
  return (
    <div>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-white flex justify-between"
      >
        <button
          type={"button"}
          className={
            "rounded-md flex flex-row gap-1 p-1 items-center hover:bg-blackn-800  border border-white border-1"
          }
          onClick={() => setPage("SelectNetworkPage")}
        >
          <Image
            src={getChainImage(chain?.id)}
            width={25}
            height={25}
            alt={"Chain Icon"}
          />
          <RiArrowDownSLine />
        </button>
        <button className={""} onClick={onHide}>
          <small className="text-white">
            <RiCloseLine className="w-6 h-6" />
          </small>
        </button>
      </Dialog.Title>
      <div className="mt-2 flex flex-col gap-4">
        <div className={"text-center flex flex-row gap-2 justify-center"}>
          <div
            className={"flex flex-row text-center align-middle justify-center"}
          >
            <div
              className="rounded-lg px-2 py-2 flex flex-row gap-2 text-xl text-gray-300 items-center  hover:bg-blackn-800"
              style={{
                backgroundColor: "#252727",
              }}
            >
              <img
                src={makeBlockie(address)}
                width={25}
                className={"border-2 rounded-md"}
              />
              {formatEthAddress(address)}
              <ClipboardCopy copyText={address} />
            </div>
          </div>
        </div>
        <div className="text-center">
          <span className="text-gray-400">
            {balance} {chain?.nativeCurrency?.symbol}
          </span>
        </div>
        <div className={"text-center inline-flex items-center justify-center"}>
          <a
            href={chain?.blockExplorers?.default?.url + "/address/" + address}
            className="text-center text-white border border-mid-gray-800 text-sm rounded-md p-2 px-4 hover:bg-blackn-800 flex flex-row gap-1 items-center"
            target={"_blank"}
          >
            <span>
              Show On {chain?.blockExplorers?.default?.name || "Explorer"}
            </span>
            <small>
              <RiArrowRightUpLine className="w-5 h-5" />
            </small>
          </a>
        </div>
        <hr
          style={{
            borderColor: "#252727",
            color: "#252727",
          }}
        />
        <RowButtonModalDetailAccount
          title={"History"}
          icon={<RiTimeLine className={"text-blue-600 w-5 h-5"} />}
          onClick={() => setPage("HistoryPage")}
          color={"text-white"}
        />
        <RowButtonModalDetailAccount
          title={"Disconnect"}
          icon={<RiLogoutCircleLine className={"text-red-600 w-5 h-5"} />}
          onClick={disconnect}
          color={"text-white"}
        />
      </div>
    </div>
  );
};

export default MainPage;
