import React, { useEffect, useMemo } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

const Web3Provider = ({ children }) => {
    const { activate, deactivate } = useWeb3React();

    useEffect(() => {
        const loadModalAndProvider = async () => {
            const [{ Modal }, { default: WalletConnect }] = await Promise.all([
                import('web3modal'),
                import('@walletconnect/web3-provider'),
            ]);

            const providerOptions = {
                walletconnect: {
                    package: WalletConnect,
                    options: {
                        infuraId: '<INFURA_ID>'
                    }
                }
            };

            let modal;
            if (typeof window !== 'undefined') {
                modal = new Modal({
                    network: 'mainnet',
                    providerOptions,
                });
            }

            const memoizedActivate = activate;
            const memoizedDeactivate = deactivate;

            return () => {
                if (modal) {
                    modal.clearCachedProvider();
                }
            };
        };

        loadModalAndProvider();
    }, []);

    const getLibrary = (provider) => {
        const library = new Web3(provider);
        library.eth.extend({
            methods: [
                {
                    name: 'chainId',
                    call: 'eth_chainId',
                    outputFormatter: (output) => {
                        return output ? output.toNumber() : null;
                    },
                },
            ],
        });
        return library;
    };

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            {children}
        </Web3ReactProvider>
    );
};

export default React.memo(Web3Provider);