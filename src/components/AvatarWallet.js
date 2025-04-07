import React, { useEffect, useRef } from "react";
import jazzicon from "@metamask/jazzicon";

const AvatarWallet = ({ address, diameter = 50 }) => {
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        jazzicon(diameter, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address]);

  return <div ref={ref} className="flex items-center justify-center"></div>;
};

export default AvatarWallet;
