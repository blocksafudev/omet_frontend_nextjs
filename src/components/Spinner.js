import Image from "next/image";

const Spinner = ({
  hideLabel = false,
  isFullScreen = false,
  isButton = false,
}) => {
  if (isButton) {
    return (
      <div
        className={
          "flex flex-col items-center justify-center " +
          (isFullScreen ? "h-screen w-screen" : "")
        }
      >
        <div className="relative">
          <svg
            className="animate-spin absolute inset-0 m-auto h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <Image
            src="/images/icon-reward/metti.svg"
            alt="Metti Icon"
            width={30}
            height={30}
            className="relative z-10"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        "flex flex-col items-center justify-center bg-blackn-1000 p-4 " +
        (isFullScreen ? "h-screen w-screen" : "w-full")
      }
    >
      <div className="relative">
        <svg
          className="animate-spin absolute inset-0 m-auto h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <Image
          src="/images/icon-reward/metti.svg"
          alt="Metti Icon"
          width={40}
          height={40}
          className="relative z-10"
        />
      </div>
      {!hideLabel && <div className="text-white mt-2">Processing...</div>}
    </div>
  );
};
export default Spinner;
