import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center bg-blackn-1000 bg-homebg bg-no-repeat bg-contain lg:bg-cover lg:bg-center dark:bg-blackn-900 w-full h-screen">
      <p className="mb-12 text-3xl text-white md:text-4xl lg:text-5xl">
        There's Nothing Here...
      </p>
      <p className="mb-8 text-gray-400 md:text-lg lg:text-xl">
        Sorry, we can't provide pages you want
      </p>

      <Image
        src="/images/icon-reward/metti.svg"
        className=""
        width={100}
        height={100}
        alt="404"
      />

      <div className="flex flex-col items-center justify-center">
        <Link
          className="flex items-center rounded-md px-6 py-3 mt-12 space-x-2 text-black transition duration-150 bg-blackn-500 hover:bg-blackn-700"
          href="/"
        >
          <span>Back To Homepages</span>
          <RiArrowRightLine />
        </Link>
      </div>
    </div>
  );
}
