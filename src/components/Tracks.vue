<template>
    <div class="row tracks">
        <div class="col-sm-6 col-md-3 col-lg-3" v-for="(track, index) in tracks" :key="index">
                <track-card :track="track" :index="index"/>
        </div>
        <div class="container" v-if="getTracksLoading">
            <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-12">
                    <div class="loader"></div>
                </div>
            </div>
        </div>

      <player/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import TrackCard from "./TrackCard";
import Player from "./Player";

export default {
  name: "Tracks",
  props: ["page"],

  data() {
    return {
      currentPage: 1
    };
  },

  computed: {
    ...mapGetters({
      getTracksLoading: "getTracksLoading",
      tracks: "tracks",
      getTracksFail: "getTracksFail",
      activeGenre: "activeGenre",
      searchQuery: "searchQuery",
      lastPage: "lastPage",
      searchQuery: "searchQuery"
    })
  },

  mounted() {
    window.addEventListener("scroll", this.scroll);
  },

  destroyed() {
    window.removeEventListener("scroll", this.scroll);
  },

  methods: {
    scroll(event) {
      const page = this.lastPage ? this.lastPage + 1 : this.currentPage + 1;
      const bottomOfWindow =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (bottomOfWindow && !this.getTracksLoading) {
        if (this.page === "home") {
          this.$store.dispatch("getTracks", { genre: this.activeGenre, page });
        } else {
          this.$store.dispatch("searchTracks", { query: this.searchQuery, page });
        }
        this.currentPage = page;
      }
    }
  },

  components: {
    "track-card": TrackCard,
    Player
  }
};
</script>

<style scoped lang="scss">
.tracks {
  margin-top: 20px;
  margin-bottom: 20px;
}

.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  color: #aaabac;
  font-size: 10px;
  margin: 80px auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>