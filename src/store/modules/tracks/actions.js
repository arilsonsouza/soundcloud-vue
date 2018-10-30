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
            context.commit('GET_TRACKS_SUCCESS', data)
        }).catch(error => {
            console.log(error)
            context.commit('GET_TRACKS_FAIL', error)
        })
    },

    clearTracks: (context) => {
        context.commit('GET_TRACKS', true)
        context.commit('CLEAR_TRACKS')
    },

    setCurrentTrack: (context, data) => {
        context.commit('SET_CURRENT_TRACK', data)
    },

    setIndexOfCurrentTrack: (context, data) => {
        context.commit('SET_INDEX_OF_CURRENT_TRACK', data)
    },
    setNextTrack: (context) => {
        context.commit('SET_NEXT_TRACK')
    },
    setPrevTrack: (context) => {
        context.commit('SET_PREV_TRACK')
    },
    setBarCompleted: (context, percent) => {
        context.commit('SET_BAR_COMPLETED', percent)
    },
}