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

    SET_SEARCH_QUERY: (state, data) => {
        state.searchQuery = data
    },

    CLEAR_TRACKS: (state) => {
        state.getTracksLoading = false
        state.tracks = []
    },

    SET_ACTIVE_GENRE: (state, data) => {
        state.activeGenre = data
    },

    SET_CURRENT_TRACK: (state, data) => {
        state.currentTrack = data.track
        state.indexOfCurrentTrack = data.index
    },

    SET_INDEX_OF_CURRENT_TRACK: (state, data) => {
        state.indexOfCurrentTrack = data
    },

    SET_NEXT_TRACK: (state) => {
        if (state.indexOfCurrentTrack < state.tracks.length) {
            state.nextTrack = state.tracks[state.indexOfCurrentTrack + 1]
        } else {
            state.nextTrack = null
        }
    },

    SET_PREV_TRACK: (state) => {
        if (state.indexOfCurrentTrack !== 0) {
            state.prevTrack = state.tracks[state.indexOfCurrentTrack - 1]
        } else {
            state.prevTrack = null
        }
    },

    SET_BAR_COMPLETED: (state, data) => {
        state.barCompleted = data
    },

    SET_BAR_BUFFERED: (state, data) => {
        state.barBuffered = data
    },

    SET_AUDIO: (state, data) => {
        if (data) {
            state.audio = new Audio(data.url)
        } else {
            if (state.audio) {
                state.audio.pause()
                state.audio = null
            }
        }
    }

}