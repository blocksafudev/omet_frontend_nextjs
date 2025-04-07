import {createContext, useContext, useState, useRef, useEffect} from 'react'
import * as authHelper from './AuthHelper'
import axios from 'axios'

const URL_SHOULD_VALIDATED = [
    /^\/my$/,            // Exactly /my
    /^\/my\/.*$/,         // /my/* (any path under /my),
];

const initAuthContextPropsState = {
    auth: {
        accessToken: "",
        refreshToken: "",
    },
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    deviceVerifiedAsEmail: "",
    logout: () => {
    },
    refetchUser: () => {
    },
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState()
    const [currentUser, setCurrentUser] = useState(null)
    const [deviceVerifiedAsEmail, setDeviceVerifiedAsEmail] = useState("")
    const saveAuth = (auth) => {
        if(typeof window === 'undefined') return ;
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    const refetchUser = () => {
        const _auth = authHelper.getAuth()
        if(!_auth?.access_token) return ;
       axios.get("/api/auth/profile")
           .then(response => {
               setCurrentUser(response?.data?.data)
           })
    }

    const logout = () => {
        if(typeof window === 'undefined') return ;
        saveAuth(undefined)
        setCurrentUser(undefined)
        setDeviceVerifiedAsEmail("")
    }

    useEffect(() => {
        const _auth = authHelper.getAuth()
        setAuth({
            accessToken: _auth?.access_token,
            refreshToken: _auth?.refresh_token
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            auth,
            saveAuth,
            currentUser,
            setCurrentUser,
            logout,
            deviceVerifiedAsEmail,
            setDeviceVerifiedAsEmail,
            refetchUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit = ({children}) => {
    const {auth, currentUser, logout, setCurrentUser, deviceVerifiedAsEmail} = useAuth()
    const didRequest = useRef(false)
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        if(typeof window === 'undefined') return ;
        const requestUser = async (apiToken) => {
            try {
                if (!didRequest.current) {
                    const {data} = await axios.get("/api/auth/profile",{
                        headers: {
                            "Accept":"application/json",
                            "Authorization": `Bearer ${apiToken}`
                        }
                    })
                    if (data) {
                        const pathname = window.location.pathname;
                        if(pathname !== "/login/verification"){
                            const isValid = URL_SHOULD_VALIDATED.some(pattern => pattern.test(pathname));
                            if (isValid) {
                                if(localStorage.getItem("deviceVerificationAs") !== data?.data?.email){
                                    window.location.href = "/login/verification"
                                }
                            }
                        }
                        setCurrentUser(data?.data)
                    }
                }
            } catch (error) {
                if (!didRequest.current) {
                    // logout()
                }
            } finally {
                setShowSplashScreen(false)
            }

            return () => (didRequest.current = true)
        }
        if (auth && auth) {
            requestUser(auth.access_token).then(r => {})
        } else {
            // logout()
            setShowSplashScreen(false)
            // const pathname = window.location.pathname;
            // const isValid = URL_SHOULD_VALIDATED.some(pattern => pattern.test(pathname));
            // if (isValid) {
            //     window.location.href = "/login"
            // }
        }
        // eslint-disable-next-line
    }, [auth])

    return showSplashScreen ? <>
       Loading ...
    </> : <>{children}</>
}

export {AuthProvider, useAuth, AuthInit}