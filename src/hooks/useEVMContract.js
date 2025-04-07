import {useAppKitAccount, useAppKitNetwork} from "@reown/appkit/react";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {getAppByChainId} from "@/libs/Env";
import {BigNumber} from "bignumber.js";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";

const useEVMContract = (title="") => {
    const {address, isConnected} = useAppKitAccount();
    const {chainId} = useAppKitNetwork();
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contractInstance, setContractInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [contractAddress, setContractAddress] = useState(null);
    const [abi, setAbi] = useState([])
    const {mutate} = useMutation({
        mutationFn: async (userData) => {
            const response = await fetch('/api/tx_hash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                throw new Error('Failed to authorize');
            }
            return response.json();
        },
        onSuccess: (data) => {
        },
        onError: (error) => {
            console.error('Error:', error);
        },
    });


    const _initialize = async () => {
        if(!chainId) return;
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _tokenInstance = new ethers.Contract(
            contractAddress,
            abi,
            signer
        );

        setProvider(provider);
        setSigner(signer);
        setContractInstance(_tokenInstance);

        setIsLoading(false);
    }

    useEffect(() => {
        if(contractAddress && abi.length > 0) {
            _initialize().then();
        }
    }, [contractAddress, abi]);

    const callFunction = async (title, amount, tokenSymbol, functionName, params) => {
        if(!contractInstance) return;
        try {
            setIsLoading(true)
            const tx = await contractInstance[functionName](...params);
            const txHash = tx.hash;
            let payload = {
                type: title,
                tx_hash: txHash,
                address: address,
                amount: amount,
                token: tokenSymbol,
                status: 'Pending'
            }
            await mutate(payload);
            setIsLoading(false)
        } catch (e) {
            console.error("Error calling function:", e);
            toast.error("Transaction failed!");
            setIsLoading(false)
        }
    }

    return {
        provider,
        signer,
        isLoading,
        contractInstance,
        setContractAddress,
        setAbi,
        callFunction
    }
}

export default useEVMContract;