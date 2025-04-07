import React from "react";
import "slick-carousel/slick/slick.css";
import Link from "next/link";
import Image from "next/image";
import "rsuite/Tooltip/styles/index.css";
import { RiArrowRightLine, RiCoinLine } from "react-icons/ri";

export function Banner() {
  return (
    <div className="relative w-full overflow-hidden bg-blackn-1000 flex rounded-3xl flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-blackn-1000 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <div className="bg-blackn-1000 bg-homebg bg-no-repeat bg-cover lg:bg-cover lg:bg-center dark:bg-blackn-900 w-full">
        <div className="px-6 py-8 lg:py-24 pt-20 md:pt-16 lg:pt-36 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between">
            <div className="items-center text-start w-full py-12 flex flex-col">
              <div className="w-full">
                <div className="-mt-10 md:mt-0 lg:mt-0 text-start flex flex-col justify-start self-start items-start">
                  <div className="flex justify-start gap-4 items-center">
                    <Image
                      src="/images/icon-reward/metti.svg"
                      className="relative z-20"
                      priority={true}
                      width={40}
                      height={40}
                      alt="Metti"
                    />
                    <div className="text-white font-semibold z-20 text-3xl">
                      OMET
                    </div>
                  </div>
                  <h1 className="relative z-20 my-4 lg:my-6 font-bold tracking-wide whitespace-normal">
                    <div className="text-2xl flex gap-1 md:gap-2 flex-col md:text-3xl lg:text-5xl mx-auto leading-loose md:leading-relaxed lg:leading-relaxed bg-clip-text text-transparent bg-gradient-to-t from-blackn-50 to-blackn-300 whitespace-normal md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
                      THE NEXT GENERATION OF
                    </div>
                    <div className="text-2xl flex gap-1 md:gap-2 flex-col md:text-3xl lg:text-5xl mx-auto leading-loose md:leading-relaxed lg:leading-relaxed bg-clip-text text-transparent bg-gradient-to-t from-blackn-100 to-blackn-400 whitespace-normal md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
                      DECENTRALIZED EXCHANGES
                    </div>
                  </h1>
                  <h2 className="relative z-20 my-2 lg:my-8 text-white whitespace-normal dark:text-gray-500 md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
                    Audited By{" "}
                    <a
                      href="https://blocksafu.com"
                      target="_blank"
                      className="text-blackn-300"
                    >
                      BlockSAFU
                    </a>
                  </h2>
                  <div className="relative z-20 flex flex-row justify-start items-center w-full gap-3 mt-4">
                    <Link
                      href="/token/create"
                      prefetch={false}
                      className="pl-1 pr-5 py-1 flex justify-center items-center gap-2 text-black font-semibold whitespace-nowrap bg-white border border-blackn-500 rounded-full hover:bg-blackn-600"
                    >
                      <div className="w-10 h-10 flex justify-center items-center bg-black text-white rounded-full">
                        <RiCoinLine className="w-6 h-6" />
                      </div>
                      Join Presale
                    </Link>
                    <a
                      href="/token/create"
                      className="pl-1 pr-5 py-1 flex justify-center items-center gap-2 text-white font-semibold whitespace-nowrap bg-transparent border border-white rounded-full hover:bg-white"
                    >
                      <div className="w-10 h-10 flex justify-center items-center bg-white text-black rounded-full">
                        <RiArrowRightLine className="w-6 h-6" />
                      </div>
                      Explorer
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
