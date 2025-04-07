import {useAppKitAccount, useAppKitNetwork} from "@reown/appkit/react";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {getAppByChainId} from "@/libs/Env";
import {BigNumber} from "bignumber.js";
import {toast} from "react-toastify";
import {useMutation} from "@tanstack/react-query";

const useERC20 = (title="") => {
    const {address, isConnected} = useAppKitAccount();
    const {chainId} = useAppKitNetwork();
    const [isNeedApprove, setIsNeedApprove] = useState(true);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [tokenInstance, setTokenInstance] = useState(null);
    const [amountAllowance, setAmountAllowance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenDecimal, setTokenDecimal] = useState(null);
    const [tokenAddress, setTokenAddress] = useState(null);
    const [tokenName, setTokenName] = useState(null);
    const [tokenSymbol, setTokenSymbol] = useState(null);
    const [balance, setBalance] = useState(0);

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

    const _initialize = async (_tokenAddress) => {
        if(!chainId && !tokenInstance) return;
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const ERC20_ABI = getAppByChainId(chainId).ERC20_ABI;
        const _tokenInstance = new ethers.Contract(
            _tokenAddress,
            ERC20_ABI,
            signer
        );
        const _tokenDecimal = await _tokenInstance.decimals();

        setProvider(provider);
        setSigner(signer);
        setTokenInstance(_tokenInstance);
        setTokenDecimal(_tokenDecimal);
        setTokenName(await _tokenInstance.name());
        setTokenSymbol(await _tokenInstance.symbol());
        setBalance((await _tokenInstance.balanceOf(address)).toString());
        setIsLoading(false);
    }

    const checkIsNeedApprove = async (_targetAddress, _amountAllowance) => {
        //get allowance from user to payment gateway
        const currentAllowance = new BigNumber((await tokenInstance.allowance(address, _targetAddress)));

        //get estimate amount in token
        const needAllowance = _amountAllowance;

        //check if allowance is less than amount
        if(currentAllowance.lt(needAllowance)) {
            setIsNeedApprove(true);
        } else {
            setIsNeedApprove(false);
        }
        setAmountAllowance(needAllowance);
    }

    const handleApprove = async (_targetAddress) => {
        try {
            setIsLoading(true);
            const tx = await tokenInstance.approve(_targetAddress, amountAllowance);
            const receipt = await tx.wait();

            let payload = {
                type: `APPROVE${title ? ` ${title}` : ""}`,
                tx_hash: receipt.hash,
                address: address,
                amount: amountAllowance.toString(),
                token: tokenSymbol
            }

            if (receipt.status === 1) {
                toast.success("Approval successful!");
                payload.status = "Success";
                setIsNeedApprove(false);
            } else {
                toast.error("Approval failed!");
                payload.status = "Failed";
            }
            await mutate(payload);
            checkIsNeedApprove(_targetAddress, amountAllowance).then();
        } catch (e) {
            console.error("Error approving:", e);
        } finally {
            setIsLoading(false);
            checkIsNeedApprove(_targetAddress, amountAllowance).then();
        }
    }

    useEffect(() => {
        if(tokenAddress) {
            _initialize(tokenAddress).then();
        }
    }, [tokenAddress]);

    return {
        isNeedApprove,
        provider,
        signer,
        tokenAddress,
        setTokenAddress,
        tokenName,
        tokenSymbol,
        tokenDecimal,
        amountAllowance,
        tokenInstance,
        isLoading,
        handleApprove,
        checkIsNeedApprove,
        balance
    }
}

export default useERC20;