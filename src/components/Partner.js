import { formatStringNumericWithComma } from "@/utils";

export const Partner = ({ totalIssues, total }) => {
  let savedFunds = "386904108.18";
  let investor = "490892";

  return (
    <section className="w-full">
      <div className="px-4 py-6 bg-gradient-to-b from-blue-ribbon-200 to-blue-ribbon-100 dark:bg-blackn-900 md:px-16 lg:px-20">
        <div className="grid w-full gap-8 grid-col-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          <div className="">
            <p className="text-gray-700 dark:text-gray-400">
              Top Class Engineer
            </p>
            <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
              52+
            </h1>
          </div>
          <div className="">
            <p className="text-gray-700 dark:text-gray-400">
              Supported Network
            </p>
            <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
              60+
            </h1>
          </div>
          <div className="">
            <p className="text-gray-700 dark:text-gray-400">
              Partnership Ecosystem
            </p>
            <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
              180+
            </h1>
          </div>
          <div className="">
            <p className="text-gray-700 dark:text-gray-400">Years Expertise</p>
            <h1 className="mb-2 text-xl font-bold text-black dark:text-white">
              +6
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
