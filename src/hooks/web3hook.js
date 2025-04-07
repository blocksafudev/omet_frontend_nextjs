import { useState, useEffect, useContext } from 'react'
import { getAppByChainId } from "../libs/Env";
import { Context } from "../Store";
import BigNumber from "bignumber.js";
import { toast } from 'react-toastify';
export const useCheckIsNeedApprove = () => {
  const [state, dispatch] = useContext(Context);
  const [amountAllowance, setAmountAllowance] = useState(null)
  const [isLoadingCheck, setIsLoadingCheck] = useState(false)
  const [isNeedApprove, setIsNeedApprove] = useState(false);
  const [txHashApprove, setTxHashApprove] = useState(null)
  const fetchCheck = async (tokenAddress, to) => {
    setIsLoadingCheck(true)
    const token = await new state.web3.eth.Contract(getAppByChainId(state.chainId).ERC20_ABI, state.web3.utils.toChecksumAddress(tokenAddress));
    const allowance = new BigNumber(await token.methods.allowance(state.account, to).call());
    let balance = (new BigNumber(await token.methods.balanceOf(state.account).call()));
    if (balance.isGreaterThanOrEqualTo(allowance)) {
      setIsNeedApprove(true);
    } else {
      setIsNeedApprove(false);
    }
    setIsLoadingCheck(false)
  }
  const fecthApprove = async (tokenAddress, to) => {
    setIsLoadingCheck(true)
    const token = await new state.web3.eth.Contract(getAppByChainId(state.chainId).ERC20_ABI, state.web3.utils.toChecksumAddress(tokenAddress));
    let balance = (new BigNumber(await token.methods.balanceOf(state.account).call())).multipliedBy(2);
    // console.log((balance.toFixed(0)))
    await token.methods.approve(to, state.web3.utils.toWei(balance.toFixed(0).toString())).send({
      from: state.account
    }).on("transactionHash", (hash) => {
      // setTxHashApprove(hash)
      toast.success('Transaction Submitted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
      .on("receipt", (hash) => {
        setTxHashApprove(hash?.hash);
        setIsLoadingCheck(false);
        setIsNeedApprove(false)
        toast.success('Transaction Receipt', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .on("error", (error) => {
        setIsLoadingCheck(false);
        toast.error('Transaction Canceled', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }
  return [{ amountAllowance, isNeedApprove, isLoadingCheck, txHashApprove }, fetchCheck, fecthApprove];
}
export const useTransferToken = () => {
  const [state, dispatch] = useContext(Context);
  const [isLoadingTransfer, setIsLoading] = useState(false)
  const [txHashTransfer, setTxHash] = useState(null)
  const fetchTransfer = async (tokenAddress, to, amount) => {
    setIsLoading(true)
    const token = await new state.web3.eth.Contract(getAppByChainId(state.chainId).ERC20_ABI, state.web3.utils.toChecksumAddress(tokenAddress));
    // console.log((balance.toFixed(0)))
    await token.methods.transfer(to, state.web3.utils.toWei(amount)).send({
      from: state.account
    }).on("transactionHash", (hash) => {
      // setTxHashApprove(hash)
      toast.success('Transaction Submitted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
      .on("receipt", (hash) => {
        setTxHash(hash);
        setIsLoading(false);
        toast.success('Transaction Receipt, TX Hash =' + hash, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .on("error", (error) => {
        setIsLoading(false);
        toast.error('Transaction Canceled', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }
  return [{ isLoadingTransfer, txHashTransfer }, fetchTransfer];
}
export const useGetERC20Detail = () => {
  const [state, dispatch] = useContext(Context);
  const [isLoadingTokenInfo, setIsLoading] = useState(false);
  const [tokenName, setTokenName] = useState(null);
  const [tokenSymbol, setTokenSymbol] = useState(null);
  const [tokenDecimal, setTokenDecimal] = useState(null);
  const [tokenSupply, setTokenSupply] = useState(null);
  const [tokenBalance, setTokenbalance] = useState(0);
  const fetchTokenInfo = async (address) => {
    setIsLoading(true);
    const token = await new state.web3.eth.Contract(
      getAppByChainId(state.chainId).ERC20_ABI,
      state.web3.utils.toChecksumAddress(address)
    );
    setTokenName(await token.methods.name().call());
    setTokenSymbol(await token.methods.symbol().call())
    setTokenSupply(await token.methods.totalSupply().call())
    let dec = await token.methods.decimals().call();
    setTokenDecimal(dec)
    let amount = new BigNumber(await token.methods.balanceOf(state.account).call())
    amount = amount.dividedBy((new BigNumber(10).pow(dec)))
    setTokenbalance(amount.toFixed(8).toString());
    setIsLoading(false);
  }
  return [{ tokenName, tokenSymbol, tokenDecimal, tokenSupply, tokenBalance, isLoadingTokenInfo }, fetchTokenInfo];
}
export const useGetListToken = () => {
  const [state, dispatch] = useContext(Context);
  const [isLoadingListToken, setisLoading] = useState(false);
  const [listToken, setListToken] = useState([]);
  const fetchListToken = async (addresses = []) => {
    let tmpList = [];
    for (let i = 0; i < addresses.length; i++) {
      const token = await new state.web3.eth.Contract(
        getAppByChainId(state.chainId).ERC20_ABI,
        state.web3.utils.toChecksumAddress(addresses[i])
      );
      let dec = await token.methods.decimals().call();
      let tmp = {
        address: addresses[i],
        name: await token.methods.name().call(),
        symbol: await token.methods.symbol().call(),
        supply: await token.methods.totalSupply().call(),
        decimal: dec,
      }
      tmpList.push(tmp)
    }
    setListToken(tmpList)
  }
  return [{ listToken, isLoadingListToken }, fetchListToken, setListToken]
}
/** Custom web3 hook */
export const useGetTotalDonation = (scamAddress) => {
  const [state, dispatch] = useContext(Context);
  const [isLoadingTotalDonation, setIsLoading] = useState(false);
  const [amountDonation, setAmountDonation] = useState(null)
  const [totalContributor, setTotalContributor] = useState(0)
  useEffect(() => {
    if (state && state.storeHash) {
      fetchTotalDonation();
    }
  }, [state])
  const fetchTotalDonation = async (tokenAddress, to) => {
    setIsLoading(true);
    const token = await new state.web3.eth.Contract(
      getAppByChainId(state.chainId).ERC20_ABI,
      getAppByChainId(state.chainId).TOKEN_ADDRESS
    );
    const decimal = await token.methods.decimals().call();
    // alert(decimal)
    const bountyScammerContract = await new state.web3.eth.Contract(
      getAppByChainId(state.chainId).BOUNTYSCAMMER_ABI,
      getAppByChainId(state.chainId).BOUNTYSCAMMER_ADDRESS
    );
    let amount = new BigNumber(await bountyScammerContract.methods.leftAmountProject(state.web3.utils.toChecksumAddress(scamAddress)).call());
    amount = amount.dividedBy((new BigNumber(10).pow(decimal)))
    setAmountDonation(amount.toFixed(8).toString())
    setTotalContributor(await bountyScammerContract.methods.totalContributors(state.web3.utils.toChecksumAddress(scamAddress)).call())
    setIsLoading(false);
  }
  return [{ amountDonation, totalContributor, isLoadingTotalDonation }, fetchTotalDonation];
}