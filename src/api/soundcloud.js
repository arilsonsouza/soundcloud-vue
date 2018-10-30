import axios from 'axios'
const clientId = process.env.CLIENT_ID

const formatParams = (params) => {
    return `?client_id=${clientId}&` + Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

export default {
    get: ({ url, query }) => {
        const params = formatParams(query);
        return axios.get(`https://api.soundcloud.com/${url}${params}`)
            .then(response => {
                return response.data
            })
    }
}