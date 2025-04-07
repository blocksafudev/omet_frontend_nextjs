import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTonNumber(number: string | number, decimals: number = 9): string {
  const num = typeof number === "string" ? parseFloat(number) : number;
  return (num / Math.pow(10, decimals)).toLocaleString();
}

export const formatCurrency = (
    amount,
    decimalCount = 4,
    decimal = ".",
    thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;


    return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
            ? decimal +
            // @ts-ignore
            Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : "")
    );
  } catch (e) {
    console.log(e);
  }
};

