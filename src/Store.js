import React, { createContext, useReducer, useState } from "react";
import Reducer from './Reducer';

const initialState = {
    isTriggerConnectWallet: false,
    isConnectWallet: false,
    web3: null,
    web3modal: null
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
    const [state, setState] = useState(initialState);

    const [reducerState, dispatch] = useReducer(Reducer, initialState);

    const combinedDispatch = (action) => {
        setState(reducerState);
        dispatch(action);
    };

    return (
        <Context.Provider value={[state, combinedDispatch]}>
            {children}
        </Context.Provider>
    );
};

export default Store;