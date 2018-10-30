import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const defaultState = {
    getTracksLoading: null,
    tracks: [],
    getTracksFail: null,
    activeGenre: null,
    searchQuery: null,
    lastPage: null,
    currentTrack: null,
    indexOfCurrentTrack: null,
    nextTrack: null,
    prevTrack: null,
    barBuffered: null,
    barCompleted: null,
    audio: null
}

export default {
    state: defaultState,
    getters,
    actions,
    mutations
}