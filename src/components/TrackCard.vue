<template>
   <div>
        <div class="card">
            <img class="card-img-top" :src="track.artwork_url ? track.artwork_url : require('../assets/img/noimage.png')" :alt="track.title" :title="track.title">
            <div class="card-track-timeline">
              <!-- <img :src="track.waveform_url" alt="" width="100%" class="waveform"> -->
                <div class="bar bar-completed" :style="{ width:  (currentTrack && track.id === currentTrack.id) ? barCompleted : '0%' }"></div> 
                <div class="bar bar-buffered" :style="{ width:  (currentTrack && track.id === currentTrack.id) ? barBuffered : '0%'}"></div>
              <div class="waveform" :style="`-webkit-mask-box-image: url(${track.waveform_url})`"></div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ track.user.username }}</h5>
                <p class="card-text">{{ track.title }}</p>
            </div>
            <div class="card-footer">
                <div class="card-track-actions">
                    <div class="column">
                        <button class="btn btn-icon" id="btnPlay" @click="handlePlay">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-if="isPlaying">
                              <path d="M0 0h24v24H0z" fill="none"/>
                              <path d="M6 6h12v12H6z"/>
                            </svg>

                            <svg id="icon-play" viewBox="0 0 24 24" width="100%" height="100%" v-else>
                                <path d="M8 5v14l11-7z"></path>
                                <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                            
                        </button>
                        <span class="card-track-duration">{{ track.duration | secondsToTime }}</span>
                    </div>

                    <!-- <div>
                        <svg id="icon-headset" viewBox="0 0 24 24" width="100%" height="100%">
                            <path d="M0 0h24v24H0z" fill="none" opacity=".1"></path>
                            <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"></path>
                        </svg>   
                        <span class="card-track-playback-count">{{ track.playback_count }}</span> 
                    </div> -->

                    <div class="column">
                        <svg id="icon-favorite-border" viewBox="0 0 24 24" width="100%" height="100%">
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
                        </svg>
                        <span class="card-track-likes-count">{{ track.likes_count | numberFormat }}</span>
                    </div>

                </div>
            </div>
        </div>
   </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TrackCard",
  props: ["track", "index"],
  data() {
    return {
      isPlaying: false
    };
  },
  computed: {
    ...mapGetters({
      currentTrack: "currentTrack",
      barBuffered: "barBuffered",
      barCompleted: "barCompleted"
    })
  },
  watch: {
    currentTrack() {
      if (this.track.id == this.currentTrack.id) {
        this.isPlaying = true;
      } else {
        this.isPlaying = false;
      }
    }
  },
  methods: {
    handlePlay() {
      if (this.isPlaying) {
        this.isPlaying = false;
        this.$store.dispatch("setAudio", null);
        this.$store.dispatch("setCurrentTrack", {
          track: null,
          index: null
        });
      } else {
        this.$store.dispatch("setCurrentTrack", {
          track: this.track,
          index: this.index
        });

        this.isPlaying = true;

        this.$store.dispatch("setNextTrack");
        this.$store.dispatch("setPrevTrack");
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "styles/scss/_variables.scss";
.card {
  background-color: transparent;
  margin-bottom: 30px;
  border: none;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid #18191a;
  padding-top: 20px;
  border-radius: 0;
  max-width: 220px;
  .card-img-top {
    max-width: 220px;
    max-height: 220px;
    border-radius: 0;
  }
  .card-body {
    padding: 0 0.8rem;
  }

  .card-body,
  .card-footer {
    background-color: #1d1e1f;
  }

  .card-title {
    font-size: 0.8125rem;
    line-height: 1.5384615385;
    margin: 0;
  }

  .card-text {
    color: #bdbebf;
    font-size: 0.875rem;
    line-height: 1.4285714286;
  }

  .card-title,
  .card-text {
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  .card-footer {
    border-top: none;
  }

  .card-track-timeline {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    height: 40px;
    background: #171819;
    // padding: 5px;
    .waveform {
      background: #1d1e1f; /*#262628;*/
      width: 100%;
      height: inherit;
      position: absolute;
    }
  }

  .card-footer {
    padding: 0 0.75rem 0 0;

    .card-track-actions {
      color: #5d5e5f;
      fill: #4d4e4f;
      font-size: 0.8125rem;
      line-height: 40px;
      display: flex;
      justify-content: space-between;

      .column {
        display: flex;
        align-items: center;
      }

      .btn-icon,
      #icon-favorite-border {
        border-radius: 100%;
        padding: 8px;
        width: 40px;
        height: 40px;
      }
      .card-track-duration,
      .card-track-playback-count,
      .card-track-likes-count {
        font-family: sans-serif !important;
      }
    }
  }
}
</style>