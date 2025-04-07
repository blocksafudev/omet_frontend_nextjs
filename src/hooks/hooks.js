import { useState, useEffect, useContext } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from "../libs/ConnectorWeb3";
import { getAppByChainId, getEnv } from "../libs/Env";
import axios from "axios";
import { Context } from "../Store";
import { toast } from 'react-toastify';
export function useEagerConnect() {
    const { activate, active } = useWeb3React()
    const [tried, setTried] = useState(false)
    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, []) // intentionally only running on mount (make sure it's only mounted once :))
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])
    return tried
}
export function useInactiveListener(suppress) {
    const { active, error, activate } = useWeb3React()
    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.on && !active && !error && !suppress) {
            const handleConnect = () => {
                console.log("Handling 'connect' event")
                activate(injected)
            }
            const handleChainChanged = (chainId) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                activate(injected)
            }
            const handleAccountsChanged = (accounts) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    activate(injected)
                }
            }
            const handleNetworkChanged = (networkId) => {
                console.log("Handling 'networkChanged' event with payload", networkId)
                activate(injected)
            }
            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)
            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('networkChanged', handleNetworkChanged)
                }
            }
        }
    }, [active, error, suppress, activate])
}
export const useGet = (url, isAutoFetch = true) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errResponse, setErrResponse] = useState(null);
    const submit = async (params = null, toast = null) => {
        try {
            setIsLoading(true);
            let queryParams = params ? new URLSearchParams(params) : "";
            let newUrl = url + (queryParams ? `?${queryParams}` : "");
            const result = await axios(newUrl, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                },
            })
            if (result.data.code === 200) setResponse(result);
            else if (result.data.code === 403) alert("Forbidden");
        } catch (e) {
            setErrResponse(e.response);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }
    useEffect(async () => {
        if (isAutoFetch) await submit()
    }, [isAutoFetch])
    return [{ response, isLoading, errResponse }, submit];
}
export const useGet2 = (url, isAutoFetch = true) => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errResponse, setErrResponse] = useState(null);
    const submit = async (newUrl = null, toast = null) => {
        try {
            setIsLoading(true);
            const result = await axios(newUrl, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                },
            })
            if (result.data.code === 200) setResponse(result);
            else if (result.data.code === 403) alert("Forbidden");
        } catch (e) {
            setErrResponse(e.response);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000)
        }
    }
    useEffect(async () => {
        if (isAutoFetch) await submit()
    }, [isAutoFetch])
    return [{ response, isLoading, errResponse }, submit];
}
export const usePost = (url) => {
    const [response, setResponse] = useState(null)
    const [error, setErrorText] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const [newUrl, setNewUrl] = useState(url);
    // const dispatch = useDispatch();
    const fetchData = async (payload = {}, errorMessage = null) => {
        setIsloading(true);
        const token = localStorage.getItem("accessToken");
        await axios.post(newUrl, payload, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                setResponse(res)
            })
            .catch(err => {
                setIsloading(false);
                toast.error('Failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        setIsloading(false)
    }
    return [{ response, error, isLoading }, fetchData, setNewUrl];
}
export const useFarmList = () => {
    const [{ response, isLoading, errResponse }, submit] = useGet(getEnv().FARMING_API + "/api/v1/farms", false);
    const [farmList, setFarmList] = useState([]);
    const getList = async (chainId = getEnv().DEFAULT_CHAIN_ID) => {
        await submit({
            chain_id: chainId
        });
    }
    useEffect(() => {
        if (!response) return;
        if (response.data && response.data.code === 200) setFarmList(response.data.data)
    }, [response])
    return [{ farmList, isLoading, errResponse }, getList];
}
export const useFarmDetail = (id) => {
    const [{ response, isLoading, errResponse }, submit] = useGet(getEnv().FARMING_API + "/api/v1/farms/" + id, true);
    const [farmDetail, setFarmDetail] = useState(null);
    const getDetail = async () => {
        await submit();
    }
    useEffect(() => {
        if (!response) return;
        // console.log(response.data)
        if (response.data && response.data.code === 200) setFarmDetail(response.data.data[0])
    }, [response])
    return [{ farmDetail, isLoading, errResponse }, getDetail];
}
export const usePricePerToken = (tokenA, tokenB) => {
    const [pricePerToken, setPricePerToken] = useState(0);
    const [state, dispatch] = useContext(Context);
    const [storeHash, setStoreHash] = useState(null);
    useEffect(async () => {
        if (state.web3 && state.storeHash !== storeHash) {
            await updatePricePerToken();
        }
    }, [state])
    const updatePricePerToken = async () => {
        const router = await new state.web3.eth.Contract(getAppByChainId(state.chainId).ROUTER_ABI, state.web3.utils.toHex(getAppByChainId(state.chainId).ROUTER_ADDRESS));
        const path = [
            state.web3.utils.toHex(tokenA),
            state.web3.utils.toHex(tokenB),
        ];
        const estimate = await router.methods.getAmountsOut(state.web3.utils.toWei("1"), path).call();
        console.log("Estimate", estimate[1])
        setPricePerToken(estimate[1])
    }
    return [{ pricePerToken }, updatePricePerToken];
}
