import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function StakingBreadcrumb() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  return (
    <div className="bg-white border-b border-blackn-200 px-6 py-0 md:px-12 lg:px-20 overflow-x-scroll">
      <div className="flex justify-start gap-10 items-center">
        <Link
          href="/staking"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/staking"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/staking")}
        >
          Stake
        </Link>
        <Link
          href="/staking/unstake"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/staking/unstake"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/staking/unstake")}
        >
          Unstake
        </Link>
        <Link
          href="/staking/profile"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/staking/profile"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/staking/profile")}
        >
          Profile
        </Link>
        <Link
          href="/staking/leaderboard"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/staking/leaderboard"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/staking/leaderboard")}
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}
