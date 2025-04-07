import React, { useEffect, useState } from "react";
import { Loader } from "rsuite";

export const CSpinner = ({
  isLoading,
  size = "md",
  color = "black",
  showTitle = false,
}) => {
  const [sizeClass, setSizeClass] = useState("h-4 w-4");
  const [borderSize, setBorderSize] = useState("border-2");

  const setSize = (size) => {
    if (size === "sm") {
      setBorderSize("border-2");
      setSizeClass("h-4 w-4");
    } else if (size === "md") {
      setBorderSize("border-4");
      setSizeClass("h-6 w-6");
    } else if (size === "lg") {
      setBorderSize("border-4");
      setSizeClass("h-8 w-8");
    } else if (size === "xl") {
      setBorderSize("border-4");
      setSizeClass("h-10 w-10");
    } else {
      setBorderSize("border-2");
      setSizeClass("h-4 w-4");
    }
  };
  useEffect(() => {
    setSize(size);
  }, [size]);

  if (!isLoading) return null;

  return (
    <div className={"d-flex align-middle flex-col justify-center text-center"}>
      {/*<div*/}
      {/*    className={`inline-block ${sizeClass} animate-spin rounded-full ${borderSize} border-solid border-current ${color === "white" ? "text-white" : "text-black"} border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white me-2`}*/}
      {/*    role="status"*/}
      {/*>*/}
      {/*    <span*/}
      {/*        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"> Loading...</span>*/}
      {/*</div>*/}
      <Loader speed={"fast"} size={size} />
      {showTitle && <div>Please Wait...</div>}
    </div>
  );
};
