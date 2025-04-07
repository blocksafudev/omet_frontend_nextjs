import {getAccessToken} from "@/components/_clientComponent";
import axios from "axios";

export const fetchGetData = (url, query={}) => {
    const accessToken = getAccessToken()
    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        params: query
    })
}

export const fetchPostData = (url, payload={}) => {
    const accessToken = getAccessToken()
    return axios.post(url, {
        ...payload,
    } ,{
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
    })
}

export const fetchDeleteData = (url, payload={}) => {
    const accessToken = getAccessToken()
    return axios.post(url, {
        ...payload,
        _method: "DELETE"
    } ,{
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
    })
}