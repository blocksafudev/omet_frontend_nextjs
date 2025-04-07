'use client'

export const storeAccessToken = (token) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('safubit_access_token', token);
    }
}

export const removeAccessToken = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('safubit_access_token');
    }
}

export const getAccessToken = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('safubit_access_token');
    }
    return ""
}

export const isLoggedIn = () => {
    return !getAccessToken();
}