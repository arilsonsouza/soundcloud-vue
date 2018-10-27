import API from '../../../api/soundcloud'

export default {
    getTracks: (context, { genre, page }) => {
        context.commit('GET_TRACKS', true)
        context.commit('SET_ACTIVE_GENRE', genre)
        API.get({
            url: 'tracks',
            query:{
                linked_partitioning: page,
                limit: 40,
                offset: 20 * (page - 1),
                tags: genre
            }
        }).then(data => {
            console.log(data)
            context.commit('GET_TRACKS_SUCCESS', data)
        }).catch(error => {
            console.log(error)
            context.commit('GET_TRACKS_FAIL', error)
        })
    },

    clearTracks: (context) => {
        context.commit('GET_TRACKS', true)
        context.commit('CLEAR_TRACKS')
    }
}