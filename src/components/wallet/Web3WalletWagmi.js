import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState, useMemo, useCallback} from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import {WalletOptions} from "@/components/wallet/wallet-options";
import {useAccount, useDisconnect} from "wagmi";
import {ethers} from "ethers";
import {BigNumber} from "bignumber.js";
import {RiCloseLine, RiQuestionMark} from "react-icons/ri";
import {debounce} from 'lodash';
import {FaChevronCircleLeft, FaQuestionCircle} from "react-icons/fa";

// Dynamically import heavy components
const SelectNetworkPage = dynamic(() => import('@/components/wallet/SelectNetworkPage'), {
    loading: () => <div className="animate-pulse">Loading network options...</div>,
    ssr: false
});

const MainPage = dynamic(() => import('@/components/wallet/MainPage'), {
    loading: () => <div className="animate-pulse">Loading main page...</div>,
    ssr: false
});

const HistoryActivityWagmi = dynamic(() => import('@/components/wallet/HistoryActivityWagmi'), {
    loading: () => <div className="animate-pulse">Loading history...</div>,
    ssr: false
});

// Utility functions - memoized to prevent recreation
export const formatEthAddress = (address) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
};

export const formatAmount = (amount, decimals = 4) => {
    const balanceBigNumber = new BigNumber(amount);
    return balanceBigNumber.toFormat(decimals);
};

const chainImageMap = {
    56: "/images/network/bsc.svg",
    8453: "/images/network/base.svg",
    97: "/images/network/bsctestnet.svg",
    137: "/images/network/polygon.svg"
};

export const getChainImage = (chainId) => {
    return chainImageMap[chainId] || "/images/network/ethereum.svg";
};

// Modal Components
const ModalDetailAccount = ({
                                isModalOpen,
                                onHide,
                                address,
                                balance,
                                chain,
                                disconnect,
                            }) => {
    const [page, setPage] = useState("AccountPage");
    const [isLoading, setIsLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState("AccountPage");

    // const currentPage = useMemo(() => {
    //     setIsLoading(true);
    //     if (page === "SelectNetworkPage") {
    //         return <SelectNetworkPage setPage={setPage} onHide={onHide}/>;
    //     } else if (page === "HistoryPage") {
    //         return (
    //             <HistoryActivityWagmi
    //                 setPage={setPage}
    //                 onHide={onHide}
    //                 address={address}
    //             />
    //         );
    //     }
    //     return (
    //         <MainPage
    //             address={address}
    //             balance={balance}
    //             chain={chain}
    //             disconnect={disconnect}
    //             setPage={setPage}
    //             onHide={onHide}
    //         />
    //     );
    // }, [page, address, balance, chain, disconnect, onHide]);

  const [isTransitioning, setIsTransitioning] = useState(false)

  const handlePageChange = (newPage) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setPage(newPage)
      setIsTransitioning(false)
    }, 250) // match with leave duration
  }

    useEffect(() => {
        if (isModalOpen) {
            setPage("MainPage");
        }
    }, [isModalOpen, chain]);

    // useEffect(() => {
    //     setIsLoading(false);
    // }, [currentPage]);

    return (
        <Transition appear show={isModalOpen} as={Fragment} className="z-50">
            <Dialog as="div" className="relative" onClose={onHide}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex mt-10 justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-sm transform overflow-hidden border border-mid-gray-800 rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                                style={{
                                    backgroundColor: "#191b1b",
                                }}
                            >
                                {isLoading ? (
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-700 rounded"></div>
                                                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={"relative h-full"}>
                                        <Transition
                                            show={page === "SelectNetworkPage" && !isTransitioning}
                                            enter="transition-all duration-200"
                                            enterFrom="opacity-0 translate-y-4"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition-all duration-200"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-4"
                                        >
                                            <SelectNetworkPage
                                                setPage={handlePageChange}
                                                onHide={onHide}
                                            />
                                        </Transition>

                                        <Transition
                                            show={page === "MainPage" && !isTransitioning}
                                            enter="transition-all duration-200"
                                            enterFrom="opacity-0 translate-y-4"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition-all duration-200"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-4"
                                        >
                                            <MainPage
                                                address={address}
                                                balance={balance}
                                                chain={chain}
                                                disconnect={disconnect}
                                                setPage={handlePageChange}
                                                onHide={onHide}
                                            />
                                        </Transition>

                                        <Transition
                                            show={page === "HistoryPage" && !isTransitioning}
                                            enter="transition-all duration-200"
                                            enterFrom="opacity-0 translate-y-4"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition-all duration-200"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-4"
                                        >
                                            <HistoryActivityWagmi
                                                setPage={handlePageChange}
                                                onHide={onHide}
                                                address={address}
                                            />
                                        </Transition>
                                    </div>

                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const Account = () => {
    const {address, isConnected, chain} = useAccount();
    const {disconnect} = useDisconnect();
    const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Memoize provider creation
    const provider = useMemo(() => {
        if (!chain?.rpcUrls?.default?.http[0]) return null;
        return new ethers.JsonRpcProvider(chain.rpcUrls.default.http[0]);
    }, [chain?.rpcUrls?.default?.http[0]]);
    console.log(chain)
    // Memoize chain icon
    const chainIcon = useMemo(() => getChainImage(chain?.id), [chain?.id]);

    const getBalance = useCallback(async () => {
        if (!isConnected || !provider || !address) {
            setIsLoading(false);
            return;
        }
        try {
            const balance = await provider.getBalance(address);
            setBalance(formatAmount(ethers.formatEther(balance), 4));
        } catch (error) {
            console.error('Failed to fetch balance:', error);
        } finally {
            setIsLoading(false);
        }
    }, [provider, address, isConnected]);

    const debouncedGetBalance = useMemo(
        () => debounce(getBalance, 1000),
        [getBalance]
    );

    useEffect(() => {
        if (!chain?.id) return;
        setIsLoading(true);
        debouncedGetBalance();

        return () => {
            debouncedGetBalance.cancel();
        };
    }, [chain?.id, debouncedGetBalance]);

    if (!address) return null;

    return (
        <div>
            <ModalDetailAccount
                isModalOpen={isModalDetailOpen}
                onHide={() => setIsModalDetailOpen(false)}
                address={address}
                balance={balance}
                chain={chain}
                disconnect={disconnect}
            />
            <button
                className="inline-flex items-center rounded-lg p-1 text-sm w-auto transition-all duration-200 hover:opacity-80"
                type="button"
                onClick={() => setIsModalDetailOpen(true)}
                disabled={isLoading}
                style={{
                    backgroundColor: "#191b1b",
                    border: "1px solid #252727",
                    fontSize: "14px",
                }}
            >
                <div className="flex items-center rounded-full px-3 py-1 mr-1">
                    <Image
                        alt={`chain${chain?.id}`}
                        src={chainIcon}
                        className="mr-2"
                        width={20}
                        height={20}
                        priority={true}
                        loading="eager"
                    />
                    {isLoading ? (
                        <div className="animate-pulse bg-gray-700 h-4 w-20 rounded"></div>
                    ) : (
                        <span className="text-white font-medium">
              {balance} {chain?.nativeCurrency?.symbol}
            </span>
                    )}
                </div>
                <div
                    className="rounded-full px-3 py-1 text-gray-300"
                    style={{
                        backgroundColor: "#252727",
                    }}
                >
                    {formatEthAddress(address)}
                </div>
            </button>
        </div>
    );
};

const ModalWalletInformation = ({onClose, onSetPage}) => {
    return (
        <div>
            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-white flex justify-between"
            >
                <button
                    className="hover:opacity-80 transition-opacity duration-200"
                    onClick={() => onSetPage("ModalSelectWallet")}
                >
                      <span className="text-white">
                        <FaChevronCircleLeft className={"w-5 h-5"}/>
                      </span>
                </button>
                <div className={"text-center"}>What is Wallet</div>
                <button
                    className="hover:opacity-80 transition-opacity duration-200"
                    onClick={onClose}
                >
                      <span className="text-white">
                        <RiCloseLine className="w-5 h-5"/>
                      </span>
                </button>
            </Dialog.Title>
            <div className="mt-4">
                <p className={"text-white"}>
                    A web3 wallet (or crypto wallet) is a digital or physical device that stores your private keys,
                    which are used to access and manage cryptocurrency and blockchain-based assets, like NFTs. A private
                    key is a unique code that is generated for each wallet, and is required to access the funds and
                    assets stored in that wallet.
                </p>
            </div>
        </div>
    )
}

const ModalSelectWallet = ({onClose, onSetPage}) => {
    return (
        <div>

            <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-white flex justify-between"
            >
                <button
                    className="hover:opacity-80 transition-opacity duration-200"
                    onClick={() => onSetPage("ModalWalletInformation")}
                >
                      <span className="text-white">
                        <FaQuestionCircle className={"w-5 h-5"}/>
                      </span>
                </button>
                <div className={"text-center"}>Connect Wallet</div>
                <button
                    className="hover:opacity-80 transition-opacity duration-200"
                    onClick={onClose}
                >
                      <span className="text-white">
                        <RiCloseLine className="w-5 h-5"/>
                      </span>
                </button>
            </Dialog.Title>
            <div className="mt-4">
                <WalletOptions/>
            </div>
        </div>
    )
}

const ModalWalletSelector = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const [currentPage, setCurrentPage] = useState("ModalSelectWallet");

    return (
        <>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md flex-row flex items-center hover:bg-blue-600 transition-colors duration-200"
                onClick={() => setIsModalOpen(true)}
            >
                Connect <span className="hidden md:block ml-1">Wallet</span>
            </button>

            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-50"
                    onClose={closeModal}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/50"/>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex mt-10 items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className="w-full border border-mid-gray-700 max-w-sm transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all"
                                    style={{
                                        backgroundColor: "#191b1b",
                                    }}
                                >
                                    <Transition
                                        show={currentPage === "ModalSelectWallet"}
                                        enter="transition-all duration-300"
                                        enterFrom="opacity-0 translate-y-4"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition-all duration-200"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-4"
                                    >
                                        <ModalSelectWallet
                                            onClose={closeModal}
                                            onSetPage={setCurrentPage}
                                        />
                                    </Transition>

                                    <Transition
                                        show={currentPage === "ModalWalletInformation"}
                                        enter="transition-all duration-300"
                                        enterFrom="opacity-0 translate-y-4"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition-all duration-200"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-4"
                                    >
                                        <ModalWalletInformation
                                            onClose={closeModal}
                                            onSetPage={setCurrentPage}
                                        />
                                    </Transition>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

const Web3WalletWagmiWrapper = () => {
    const {address} = useAccount();

    return address ? <Account/> : <ModalWalletSelector/>;
};

const Web3WalletWagmi = () => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        setIsRendered(true);
    }, []);

    if (!isRendered) return null;

    return <Web3WalletWagmiWrapper/>;
};

export default Web3WalletWagmi;