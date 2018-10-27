export default {

    GET_TRACKS: (state, data) => {
        state.getTracksLoading = data
    },

    GET_TRACKS_SUCCESS: (state, data) => {
        state.tracks = [...state.tracks, ...data.collection]
        state.getTracksLoading = false
    },

    GET_TRACKS_FAIL: (state, data) => {

    },

    CLEAR_TRACKS: (state) => {
        state.getTracksLoading = false
        state.tracks = []
    },

    SET_ACTIVE_GENRE:(state, data) => {
        state.activeGenre = data
    }

}