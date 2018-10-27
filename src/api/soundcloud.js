import axios from 'axios'
const clientId = 'a281614d7f34dc30b665dfcaa3ed7505'

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