import React, { useRef, useState } from "react";
import { FaCogs } from "react-icons/fa";

const disclaimerList = [
  {
    title: "Disclaimer",
    content:
      "AuditDeFi.com, including but not limited to the overall project, token, website, smart contracts, and any apps presented in this conceptual paper, is not a licensed, unlicensed, or exempted financial or payment service of any kind in any jurisdiction.<br /> Any terminology used in this Whitepaper, on the Website, or within the app is intended only as a basic reference, without any elective or legal meaning of the same terms in a regulated and/or financial environment.<br />The AuditDeFi.com smart contracts are open-source, secure, and audited. The AuditDeFi token is strictly a utility token in all jurisdictions and cannot be considered a security or otherwise regulated token of any kind.<br />AuditDeFi.com is not in any way e-money, fiat money, or an asset-backed token.<br />By purchasing the AuditDeFi Token, you acknowledge the risks associated with smart contracts and agree to hold the team harmless and not liable for any losses or taxes you may incur. Trading cryptocurrencies poses a considerable risk of loss.<br />You should always invest only what you can afford to lose. Future development should not be assumed to be delivered at the exact time as presented. Always conduct your own research before investing.",
  },
  {
    title: "Risk",
    content:
      "Please note that there are always risks associated with smart contracts. Use them at your own risk. The AuditDeFi Token is not a registered broker, analyst, or investment advisor. All information provided in this material is purely for guidance, information, and educational purposes. All information contained herein must be independently verified and confirmed. AuditDeFi Token is not responsible for any loss or damage caused by reliance on such information or services. Be aware of the risks associated with any trade made in any financial market. Do not trade with money you cannot afford to lose. When in doubt, consult a qualified financial advisor before making any investment decisions.",
  },
];

export default function Disclaimer() {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setActive(active === false ? true : false);
    // @ts-ignore
    setHeight(active ? "0px" : `400px`);
    setRotate(
      active
        ? "transform duration-700 ease"
        : "transform duration-700 ease rotate-180"
    );
  }

  return (
    <section className="py-2 bg-gray-100 dark:bg-blackn-800 md:py-8 lg:py-10">
      <section className="py-1">
        <div className="py-2 mx-4 sm:mx-12 md:mx-24 lg:mx-32">
          {disclaimerList.map((disc) => (
            <div key={disc.title} className="flex flex-col">
              <h1 className="font-semibold text-xl mb-3">{disc.title}</h1>
              <div
                className="pb-10"
                dangerouslySetInnerHTML={{ __html: disc.content }}
              ></div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
