import { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";

const useReferral = () => {
    const router = useRouter();
    const [referralCode, setReferralCode] = useState("");
    const [sponsor, setSponsor] = useState(null);
    const fetchSponsor = async () => {
        try {
            if (!referralCode || referralCode.length < 6) return;
            const { data } = await axios.get(`/api/user/with-code/${referralCode}`);
            setSponsor(data?.data);
        } catch (error) {
            console.error("Error fetching sponsor:", error);
            setSponsor(null)
        }
    };


    useEffect(() => {
        if (router?.query?.reff) {
            setReferralCode(router.query.reff);
        }
    }, [router]);

    useEffect(() => {
        if (referralCode) {
            fetchSponsor();
        }
    }, [referralCode]);

    return {
        referralCode,
        fetchSponsor,
        setReferralCode,
        sponsor
    };
};

export default useReferral;