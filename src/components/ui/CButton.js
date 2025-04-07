import React, { useCallback } from "react";
import { CSpinner } from "@/components/ui/CSpinner";

export const CButton = ({
  title,
  icon,
  variant,
  size,
  isLoading,
  isDisabled,
  children,
  ...props
}) => {
  const isDisabledButton = useCallback(() => {
    return isLoading || isDisabled || false;
  });

  const getSize = () => {
    if (!size) return "p-3";
    if (size === "xs") return "p-2";
    if (size === "sm") return "p-2";
    if (size === "md") return "p-3";
    if (size === "lg") return "p-4";
    if (size === "xl") return "p-5";
  };

  const getVariant = () => {
    if (variant === "danger") return "bg-red-600";
    if (variant === "warning") return "bg-yellow-600";
    if (variant === "success") return "bg-green-600";
    if (variant === "info") return "bg-blue-600";
    return "bg-blackn-900";
  };

  const getVariantHover = () => {
    if (variant === "danger") return "bg-red-700";
    if (variant === "warning") return "bg-yellow-700";
    if (variant === "success") return "bg-green-700";
    if (variant === "info") return "bg-blue-700";
    return "bg-blackn-800";
  };

  const getSizeFont = () => {
    if (!size) return "text-sm";
    if (size === "xs") return "text-xs";
    if (size === "sm") return "text-sm";
    if (size === "md") return "text-md";
    if (size === "lg") return "text-lg";
    if (size === "xl") return "text-xl";
  };

  return (
    <button
      type="button"
      className={`w-full px-5 flex gap-2 items-center align-middle flex-row justify-center ${getSize()} text-center text-white ${getVariant()} rounded-md ${
        isDisabledButton() ? "bg-opacity-50" : `hover:${getVariantHover()}`
      }`}
      disabled={isDisabledButton()}
      title={isDisabledButton() ? "Please wait..." : title}
      {...props}
    >
      {isLoading && (
        <div className={"text-center flex flex-row"}>
          <CSpinner size={"sm"} isLoading={isLoading} />
          <div className={"text-nowrap"}>{title || children}</div>
        </div>
      )}
      {!isLoading && (
        <div
          className={`${getSizeFont()} flex flex-row items-center justify-center w-full content-center align-middle text-center flex-nowrap text-nowrap gap-2`}
        >
          <div>{icon}</div>
          <div>{title || children}</div>
        </div>
      )}
    </button>
  );
};
