export default {
    getTracksLoading: state => state.getTracksLoading,
    tracks: state => state.tracks ,
    getTracksFail: state => state.getTracksFail,
    activeGenre: state => state.activeGenre,
    searchQuery: state => state.searchQuery,
    lastPage: state => state.lastPage,
    currentTrack: state => state.currentTrack,
    barBuffered: state => state.barBuffered,
    barCompleted: state => state.barCompleted,
    indexOfCurrentTrack: state => state.indexOfCurrentTrack,
    nextTrack: state => state.nextTrack,
    prevTrack: state => state.prevTrack,
    searchQuery: state => state.searchQuery,
    audio: state => state.audio
}