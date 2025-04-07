import * as React from "react";
import {useConnect} from "wagmi";
import QRCode from "qrcode.react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {motion} from "framer-motion";

const LoadingLogo = ({ icon }) => {
  return (
      <div className="relative w-70 h-70 p-4 flex items-center justify-center overflow-hidden">
        <Image src={icon} alt={"Loading"} width={80} height={80} />

        {/* Rotating Shorter Line */}
        <motion.svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              ease: "linear",
              repeat: Infinity,
            }}
        >
          <path
              d="M 50,50 m 0,-45 a 45,45 0 1,1 0,90 a 45,45 0 1,1 0,-90"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70, 283"
          />
        </motion.svg>
      </div>
  );
};
export function WalletOptions() {
  const { connectors, connect, connectAsync, pendingConnector } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState(null)
  const [walletConnectUri, setWalletConnectUri] = React.useState("");
  const [qrCodeUri, setQrCodeUri] = React.useState("");
  const [connecting, setConnecting] = useState(false);
  const [listConnectors, setListConnectors] = useState([
    { id: "walletConnect", name: "Wallet Connect", connector: null, isInstalled: false, icon:"/images/wallet/walletconnect.png"},
    { id: "io.metamask", name: "MetaMask", connector: null, isInstalled: false, icon:"/images/wallet/metamask.png"},
    { id: "injected", name: "SafePal", connector: null, isInstalled: false, icon:"/images/wallet/safepal.png"},
    { id: "injected", name: "TrustWallet", connector: null, isInstalled: false, icon: "/images/wallet/trustwallet.png"},
    { id: "app.phantom", name: "Phantom", connector: null, isInstalled: false, icon: "/images/wallet/phantom.png"},
  ])

  console.log(connectors)

  const handleOnConnect = async (connector) => {
    setSelectedConnector(connector)
    const connectorPayload  = {
        connector: connector.connector
    }
    connectAsync(connectorPayload).then(() =>{

    }).catch(err => {

    }).finally(() => {
      setSelectedConnector(null)
    })
    // setConnecting(true);
    // try {
    //   const result = await connect({ connector });
    //   if (!result) {
    //     throw new Error('Connection failed');
    //   }
    // } catch (error) {
    //   console.error('Connection error:', error);
    // } finally {
    //   setConnecting(false);
    // }
  };

  useEffect(() => {
    if (connectors.length > 0) {
      const updatedConnectors = listConnectors.map(connector => {
        let wagmiConnector = connectors.find(c => c.id === connector.id);
        if(connector?.name === "SafePal") {
          if(!window?.safepalProvider) wagmiConnector = null;
        }
        if(connector?.name === "TrustWallet") {
          if(!window?.trustwallet?.ethereum) wagmiConnector = null;
        }
        return {
          ...connector,
          connector: wagmiConnector || null
        };
      });

      // Update state dengan array baru
      setListConnectors(updatedConnectors);
    }
  }, [connectors]);


  if (qrCodeUri) {
    return (
      <>
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Scan with WalletConnect</h3>
          <QRCode value={qrCodeUri} size={256} />
        </div>
      </>
    );
  }

  return (
    <div>
      {selectedConnector && (
          <div>
            <div className={"flex justify-center"}>
             <LoadingLogo icon={selectedConnector?.icon} />
            </div>
            <div className={"flex justify-center text-white"}>
              Connecting ...
            </div>
          </div>
      )}
      {!selectedConnector && (
          <div>
            {listConnectors
                // .filter((v) => v?.id !== "metaMaskSDK")
                .map((connector) => (
                    <WalletOption
                        key={connector.id}
                        icon={connector.icon}
                        name={connector.name}
                        connector={connector.connector}
                        onClick={() => handleOnConnect(connector)}
                        isPending={pendingConnector?.id === connector.id}
                    />
                ))}
            {walletConnectUri && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">
                    Scan QR Code with WalletConnect
                  </h3>
                  <QRCode value={walletConnectUri} size={256} />
                </div>
            )}
          </div>
      )}
    </div>
  );
}

function WalletOption({ icon, name, connector, onClick, isPending }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if(!connector) return ;
    connector.getProvider().then((provider) => {
      setReady(!!provider);
    });
  }, [connector]);

  return (
    <button
      className="w-full bg-mid-gray-900/50 py-3 rounded-lg font-medium flex items-center justify-between px-4 mb-2"
      onClick={onClick}
      disabled={!ready || isPending}
    >
      <div className="flex items-center">
        <img
          src={icon}
          alt={`${name} logo`}
          className="mr-3 rounded-md"
          width={30}
          height={30}
        />
        <div className={(!ready) ? "text-gray-600" : "text-white"}>{name}</div>
      </div>
      {isPending ? (
        <small className="bg-yellow-600 px-2 py-1 rounded text-xs">
          Connecting...
        </small>
      ) : ready ? (
        <small className="bg-green-600 bg-opacity-20 text-white px-2 py-1 rounded text-xs">
          Installed
        </small>
      ) : (
        <small className="bg-red-600 px-2 py-1 rounded text-xs">Not Ready</small>
      )}
    </button>
  );
}
