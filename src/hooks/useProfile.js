import {useMutation, useQuery} from "@tanstack/react-query";
import {useAppKitAccount, useAppKitNetwork} from "@reown/appkit/react";
import {useEffect, useState} from "react";
import {ethers} from "ethers";

const useProfile = () => {
    const { address, isConnected } = useAppKitAccount();
    const {chainId} = useAppKitNetwork();
    const [accessToken, setAccessToken] = useState("");
    const {
        data: profile,
        refetch: refetchProfile,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["profile", address], // Menggunakan queryKey dengan address
        enabled: !!address, // Hanya aktif jika address tersedia
        queryFn: async ({ queryKey }) => {
            const [, userAddress] = queryKey; // Mengambil address dari queryKey
            if (!userAddress) throw new Error("No address provided");
            console.log(userAddress);
            const response = await fetch(`/api/user/${userAddress}?chainId=${chainId}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            return response.json();
        },
    });

    const {mutate, isPending:isPendingGetAccessToken} = useMutation({
        mutationKey: 'authorize account',
        mutationFn: async (userData) => {
            const response = await fetch('/api/login', {
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
            setAccessToken(data?.data?.access_token);
        },
        onError: (error) => {
            alert('Failed authorize');
        },
    });

    const handleAuthorize = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const message = "Authorize Metti Index";
        const signature = await signer.signMessage(message);
        mutate({
            address: await signer.getAddress(),
            signature,
            message,
        });
    }

    useEffect(() => {
        if (isConnected && address) {
            refetchProfile(); // Tidak perlu passing address karena queryKey sudah berubah
        }
    }, [isConnected, address, refetchProfile]);

    return {
        profile,
        isPending,
        isError,
        accessToken,
        refetchProfile,
        handleAuthorize
    };
};

export default useProfile;