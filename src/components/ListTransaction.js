import { Pagination, Table } from "rsuite";
import { getAppByChainId } from "@/libs/Env";
import AvatarWallet from "@/components/AvatarWallet";
import { truncate, truncateTxHash } from "@/libs/WebooLib";
import {
  RiCalendar2Line,
  RiCheckLine,
  RiCloseLine,
  RiExternalLinkLine,
  RiInformationLine,
  RiShoppingCart2Line,
  RiTimeLine,
} from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import { ethers } from "ethers";
import Spinner from "@/components/Spinner";
import { useAppKitNetwork } from "@reown/appkit/react";

const { Column, HeaderCell, Cell } = Table;

const ListTransaction = ({ hideLabel }) => {
  const { chainId } = useAppKitNetwork();
  const { data: history, isPending } = useQuery({
    queryKey: ["tx_hash"],
    queryFn: async () => {
      const response = await fetch("/api/tx_hash");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
      // return data.filter(
      //     (item) =>
      //         item.type === "Approve Staking" ||
      //         item.type === "Submit Staking" ||
      //         item.type === "Approve Unstake" ||
      //         item.type === "Submit Unstake" ||
      //         item.type === "Approve Claim" ||
      //         item.type === "Submit Claim"
      // );
    },
  });

  const formatEstimateAmount = (amount) => {
    return formatCurrency(ethers.formatEther(amount), 4);
  };

  const BadgeCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "GAS"
        ? "bg-blue-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
        : rowData[dataKey] === "CLAIM REWARD"
        ? "bg-blackn-500 py-1 px-3 -mt-1.5 text-sm rounded-md w-max"
        : "bg-black py-1 px-3 -mt-1.5 text-sm rounded-md w-max";

    return (
      <Cell {...props}>
        <div className={bgColor}>{rowData[dataKey]}</div>
      </Cell>
    );
  };

  const BadgeStatusCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "Success"
        ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : rowData[dataKey] === "Pending"
        ? "text-red-300 bg-red-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

    return (
      <Cell {...props}>
        <div className={bgColor}>
          {rowData[dataKey] === "Success" ? (
            <RiCheckLine />
          ) : rowData[dataKey] === "Pending" ? (
            <RiTimeLine />
          ) : (
            <RiCloseLine />
          )}
          {rowData[dataKey]}
        </div>
      </Cell>
    );
  };

  const BadgeSourceCell = ({ rowData, dataKey, ...props }) => {
    const bgColor =
      rowData[dataKey] === "SUBMIT MINER"
        ? "text-blackn-400 bg-blackn-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : rowData[dataKey] === "APPROVE MINER"
        ? "text-blue-300 bg-blue-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1"
        : "text-gray-400 bg-gray-900 py-1 px-3 -mt-1.5 text-sm rounded-md w-max flex items-center gap-1";

    return (
      <Cell {...props}>
        <div className={bgColor}>
          {rowData[dataKey] === "SUBMIT MINER" ? (
            <RiShoppingCart2Line />
          ) : rowData[dataKey] === "APPROVE MINER" ? (
            <RiCheckLine />
          ) : (
            <RiInformationLine />
          )}
          {rowData[dataKey]}
        </div>
      </Cell>
    );
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      {!hideLabel && (
        <div className="flex justify-between items-center px-5 pt-5">
          <h1 className="text-black">Latest Transaction</h1>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table
          rowHeight={70}
          autoHeight={true}
          height={400}
          maxHeight={610}
          data={history?.data ?? []}
          onRowClick={(data) => {
            console.log(data);
          }}
        >
          <Column
            verticalAlign="start"
            width={400}
            minWidth={400}
            flexGrow={1}
            align="left"
            fixed
            resizable
          >
            <HeaderCell>USER</HeaderCell>
            <Cell>
              {(rowData) => (
                <div>
                  <a
                    href={
                      getAppByChainId(chainId ?? 56).EXPLORER_URL +
                      "/address/" +
                      rowData.address
                    }
                    className="flex items-center w-full gap-2 -mt-1 border border-blackn-800 py-0.5 px-1.5 rounded-md"
                  >
                    <AvatarWallet address={rowData.address} diameter={20} />
                    <div className="text-white w-full">
                      {truncate(rowData.address, 8, "...", 50)}
                    </div>
                    <RiExternalLinkLine className="text-white" />
                  </a>
                </div>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={150}>
            <HeaderCell>Estimated Amount</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex items-center gap-2 -mt-1">
                  <div className="text-white">
                    {formatEstimateAmount(rowData.amount)} {rowData?.token}
                  </div>
                </div>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={200}>
            <HeaderCell>Tx Hash</HeaderCell>
            <Cell>
              {(rowData) => (
                <a
                  href={
                    getAppByChainId(chainId).EXPLORER_URL +
                    "/tx/" +
                    rowData.tx_hash
                  }
                  target={"_blank"}
                  className="flex items-center gap-2 -mt-1 rounded-md border border-blackn-800 py-0.5 px-1.5"
                >
                  <div className="text-blackn-500">
                    {truncateTxHash(rowData.tx_hash, 8, "...", 66)}
                  </div>
                  <RiExternalLinkLine className="text-blackn-500" />
                </a>
              )}
            </Cell>
          </Column>

          <Column verticalAlign="middle" width={150}>
            <HeaderCell>Status</HeaderCell>
            <BadgeStatusCell dataKey="status" />
          </Column>

          <Column verticalAlign="middle" width={200}>
            <HeaderCell>Source</HeaderCell>
            <BadgeSourceCell dataKey="type" />
          </Column>

          <Column verticalAlign="middle" width={250} align="right">
            <HeaderCell>Settlement At (UTC)</HeaderCell>
            <Cell>
              {(rowData) => (
                <div className="flex items-center gap-2 -mt-1">
                  <RiCalendar2Line className="text-white" />
                  <div className="text-white">{rowData.created_at}</div>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      {/*<div className="px-4 pb-5">*/}
      {/*    <Pagination*/}
      {/*        lengthMenu={[*/}
      {/*            {value: 10, label: 10},*/}
      {/*            {value: 20, label: 20},*/}
      {/*        ]}*/}
      {/*        activePage={1}*/}
      {/*        displayLength={10}*/}
      {/*        total={data.length}*/}
      {/*        onChangePage={() => {*/}
      {/*        }}*/}
      {/*        onChangeLength={() => {*/}
      {/*        }}*/}
      {/*    />*/}
      {/*</div>*/}
    </>
  );
};

export default ListTransaction;
