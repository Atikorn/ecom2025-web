import axios from 'axios'

export const createModel = async (token, form) => {
    return axios.post('https://ecom2025-api-ecru.vercel.app/api/createModel', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const listModel = async () => {
    return axios.get('https://ecom2025-api-ecru.vercel.app/api/listModel')
}

export const removeModel = async (token, id) => {
    return axios.delete('https://ecom2025-api-ecru.vercel.app/api/model/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
