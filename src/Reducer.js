import Web3 from "web3";
import { randomString } from "./libs/WebooLib";

const Reducer = (state, action) => {
    switch (action.type) {
        case "SET_WEB3":
            return {
                ...state,
                storeHash: randomString(),
                isTriggerConnectWallet: false,
                isConnectWallet: action.payload.web3 != null,
                web3: action.payload.web3,
                web3modal: action.payload.web3modal,
            };
        case "STOREHASH":
            return {
                ...state,
                storeHash: randomString()
            }
        case "CONNECT_WALLET":
            return {
                ...state,
                storeHash: randomString(),
                isTriggerConnectWallet: action.payload
            }
        case "LOGOUT_WALLET_CONNECT":
            return {
                ...state,
                web3Logout: action.payload
            }
        case "SET_ACCOUNT":
            return {
                ...state,
                storeHash: randomString(),
                account: action.payload,
            }
        case "SET_CHAIN_ID":
            return {
                ...state,
                storeHash: randomString(),
                chainId: action.payload
            }
        default:
            return state;
    }
};

export default Reducer;