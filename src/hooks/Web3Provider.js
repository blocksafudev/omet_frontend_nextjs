import React, { useState } from "react";
import { Web3Context } from "./Web3Context";

const Web3Provider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [addressGlobal, setAddressGlobal] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [usdtBalanceGlobal, setUsdtBalanceGlobal] = useState("0");

  return (
    <Web3Context.Provider
      value={{
        address,
        setAddress,
        addressGlobal,
        setAddressGlobal,
        chainId,
        setChainId,
        usdtBalanceGlobal,
        setUsdtBalanceGlobal,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
