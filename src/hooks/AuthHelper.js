
const AUTH_LOCAL_STORAGE_KEY = 'safubit-auth'
const AUTH_LOCAL_STORAGE_DEVICE_KEY = 'safubit-auth-device'
const getAuth = () => {
    if (typeof window === 'undefined') return;
    if (!localStorage) {
        return
    }

    const lsValue = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (!lsValue) {
        return
    }

    try {
        const auth = JSON.parse(lsValue)
        if (auth) {
            // You can easily check auth_token expiration also
            return auth
        }
    } catch (error) {
        console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
}

const setAuth = (auth) => {
    if (!localStorage) {
        return
    }

    try {
        const lsValue = JSON.stringify(auth)
        localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
        console.log('AUTH LOCAL STORAGE SAVE', auth)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
}

const removeAuth = () => {
    if (!localStorage) {
        return
    }

    try {
        localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
        localStorage.removeItem(AUTH_LOCAL_STORAGE_DEVICE_KEY)
    } catch (error) {
        console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
}

export function setupAxios(axios) {
    axios.defaults.headers.Accept = 'application/json';
    axios.interceptors.request.use(
        function (config) {
            const auth = getAuth();
            if (auth && auth.access_token) {
                const jwtDecode = JSON.parse(Buffer.from(auth?.access_token?.split('.')[1], 'base64').toString());
                const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
                const isExpired = currentTime >= jwtDecode.exp;

                console.log('Is token expired:', isExpired);

                if (!isExpired) {
                    config.headers.Authorization = `Bearer ${auth.access_token}`;
                } else {
                    console.log('Token has expired. Authorization header not set.');
                }
            }

            return config;
        },
        function (err) {
            return Promise.reject(err);
        }
    );
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
