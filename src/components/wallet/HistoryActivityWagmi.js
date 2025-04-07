import React from "react";
import { Dialog } from "@headlessui/react";
import {
  formatAmount,
  formatEthAddress,
  getChainImage,
} from "@/components/wallet/Web3WalletWagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import moment from "moment";
import {
  RiArrowLeftSLine,
  RiArrowRightUpLine,
  RiCloseLine,
  RiWalletLine,
} from "react-icons/ri";
import { useAccount } from "wagmi";
import { ClipboardCopy } from "@/utils";

const fetchAccountHistory = async (address) => {
  const response = await axios.get(
    `https://rpc.walletconnect.org/v1/account/${address}/history`,
    {
      params: {
        projectId: "bd330e0387216caf3a534c90a2e623d1",
        chainId: "eip155:56",
      },
    }
  );
  return response.data;
};
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
const HistoryActivityWagmi = ({ setPage, onHide, address }) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["accountHistory", address],
    queryFn: () => fetchAccountHistory(address),
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const { chain } = useAccount();
  const getDate = (date_) => {
    const moment_ = moment(date_).format("DD MMM");
    return moment_.toString();
  };
  return (
    <div>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-white flex items-center justify-between"
      >
        <button
          type="button"
          className="rounded-md flex flex-row gap-1 p-1 items-center hover:bg-blackn-800"
          onClick={() => setPage("MainPage")}
        >
          <RiArrowLeftSLine className="w-5 h-5" />
        </button>
        <div>History Activity</div>
        <button className="" onClick={onHide}>
          <small className="text-white">
            <RiCloseLine className="w-5 h-5" />
          </small>
        </button>
      </Dialog.Title>
      <div className="mt-4 flex flex-col gap-4 max-h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-blackn-800 [&::-webkit-scrollbar-thumb]:bg-blackn-400 [&::-webkit-scrollbar-thumb]:rounded-md pr-2">
        {isLoading ? (
          <p className={"text-white"}>Loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          <div>
            {/* Render your history data here */}
            {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
            {data?.data?.length === 0 ? (
              <div className="text-white gap-3 flex flex-col justify-center items-center text-center h-80">
                <div className="text-white border border-mid-gray-800 p-2 rounded-md mb-2">
                  <RiWalletLine className="w-6 h-6" />
                </div>
                <div>No transaction yet</div>
                <div className="text-mid-gray-300">
                  Start trading on dApps <br /> to grow your wallet!
                </div>
              </div>
            ) : (
              data?.data?.map((activity, index) => {
                return (
                  <div
                    className={
                      "flex flex-row gap-2 justify-between items-center mb-2"
                    }
                    key={index}
                  >
                    <div className={"flex flex-row gap-2"}>
                      <div>
                        <NetworkIcon
                          chainId={parseInt(
                            activity?.metadata?.chain?.replace("eip155:", "")
                          )}
                        />
                      </div>
                      <div>
                        <div className={"text-white flex gap-2 items-center"}>
                          {activity?.metadata?.operationType?.replace(
                            /\b\w/g,
                            (char) => char.toUpperCase()
                          )}
                          <a
                            href={
                              chain?.blockExplorers?.default?.url +
                              "/tx/" +
                              activity?.metadata?.hash
                            }
                            target={"_blank"}
                          >
                            <RiArrowRightUpLine className="w-4 h-4" />
                          </a>
                        </div>
                        <div className={"text-mid-gray-400"}>
                          <small>
                            {activity?.transfers[0]?.quantity?.numeric && (
                              <>
                                {formatAmount(
                                  activity?.transfers[0]?.quantity?.numeric
                                )}{" "}
                                {activity?.transfers[0]?.fungible_info?.symbol}
                              </>
                            )}
                            {!activity?.transfers[0]?.quantity?.numeric && (
                              <>
                                &nbsp;
                                <i>{activity?.metadata?.status}</i>
                              </>
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        "text-white flex flex-col justify-end items-end"
                      }
                    >
                      <div>
                        <small>{getDate(activity?.metadata?.minedAt)}</small>
                      </div>
                      <div
                        className={"text-mid-gray-400 gap-1 flex items-center"}
                      >
                        <ClipboardCopy copyText={address} />
                        <small>
                          {formatEthAddress(activity?.metadata?.hash)}
                        </small>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default HistoryActivityWagmi;
