import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { RiFireLine } from "react-icons/ri";
import Link from "next/link";
import NetworkIcon from "./NetworkIcon";
import { truncateText } from "@/utils";

const fetchData = async () => {
  const res = await axios.get(
    "https://api.auditdefi.com/api/project/visit-list"
  );
  return res.data.data.data;
};

const TrendingCard = () => {
  const [state, setState] = useState({ data: [], loading: true });

  useEffect(() => {
    fetchData().then((data) => setState({ data, loading: false }));
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  const renderListItem = (item, index) => {
    let borderColor;
    if (index === 0) borderColor = "border-yellow-500"; // Gold for first item
    else if (index === 1)
      borderColor = "border-gray-500"; // Silver for second item
    else if (index === 2)
      borderColor = "border-yellow-700"; // Bronze for third item
    else borderColor = "border-gray-500"; // Default color for other items

    return (
      <Link
        href={"/audit/" + item.contract_address}
        prefetch={false}
        key={index}
        className={`flex items-center gap-2 p-2 m-2 bg-white border ${borderColor} min-w-max rounded-lg hover:border-gray-700 whitespace-nowrap`}
      >
        <Image
          src={`https://api.auditdefi.com/images/logo/${item.logo}`}
          alt={item.project_name}
          priority={true}
          width="30"
          height="30"
          className="rounded-full"
        />
        <div>
          <h2 className="flex items-center gap-2 font-semibold">
            {item.project_name} <NetworkIcon network={item.platform} />
          </h2>
          <p className="text-xs">{truncateText(item.token_symbol)}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="flex items-center justify-start gap-1 my-2">
      <div className="z-10 flex items-center justify-start gap-3 p-5 font-semibold bg-white border border-gray-600 rounded-lg dark:border-gray-700 dark:bg-blackn-800 dark:text-white hover:border-gray-500 whitespace-nowrap">
        <RiFireLine />{" "}
        <span className="hidden md:block lg:block xl:block">Trending:</span>
      </div>
      <div className="flex items-start space-x-4 animate-marquee">
        {state.data.map(renderListItem)}
      </div>
    </div>
  );
};

export default TrendingCard;
