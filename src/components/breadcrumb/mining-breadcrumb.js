import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function MiningBreadcrumb() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  return (
    <div className="bg-white border-b border-blackn-200 px-6 py-0 md:px-12 lg:px-20">
      <div className="flex justify-start gap-10 items-center">
        <Link
          href="/mining"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/mining"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/")}
        >
          Miners Shop
        </Link>
        <Link
          href="/mining/inventory"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/mining/inventory"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/mining/inventory")}
        >
          My Miners
        </Link>
        <Link
          href="/mining/farms"
          prefetch={false}
          className={`py-6 font-semibold ${
            activeLink === "/mining/farms"
              ? "text-black border-b-2 border-black"
              : "text-black border-b-2 border-transparent"
          }`}
          onClick={() => setActiveLink("/mining/farms")}
        >
          Mining Farms
        </Link>
      </div>
    </div>
  );
}
