import Vue from 'vue'
import Vuex from 'vuex'
import tracks from './modules/tracks'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules:{
        tracks
    },
    strict: debug
})

export default store