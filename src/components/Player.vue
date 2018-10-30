<template>
    <div class="player fixed-bottom animated animatedFadeInUp fadeInUp" v-if="currentTrack">
        <div class="player-timeline">
            <div class="audio-timeline" @click="skipTimeline" >
                <div class="bar bar-buffered" :style="{ width: barBuffered }"></div>
                <div class="bar bar-completed" :style="{ width: barCompleted }"></div>
            </div>
        </div>
        <div class="player-controls container">
            <div style="display: block;">
                <button class="btn btn-icon btn-skip-previous" :disabled="indexOfCurrentTrack === 0"  @click="handlePrevious">
                    <svg id="icon-skip-previous" viewBox="0 0 24 24" width="100%" height="100%">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
                <button class="btn btn-icon" @click="handlePlayPause">

                    <svg id="icon-pause" viewBox="0 0 24 24" width="100%" height="100%" v-if="isPlaying">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>

                    <svg id="icon-play" viewBox="0 0 24 24" width="100%" height="100%" v-if="!isPlaying">
                        <path d="M8 5v14l11-7z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                           
                </button>
                <button class="btn btn-icon btn-skip-next" :disabled="indexOfCurrentTrack === tracks.length - 1" @click="handleNext">
                    <svg id="icon-skip-next" viewBox="0 0 24 24" width="100%" height="100%">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
                        <path d="M0 0h24v24H0z" fill="none"></path>
                    </svg>
                </button>
            </div>

            <div class="player-controls-time">
                <span class="player-duration">{{ currentTime ? currentTime : '00' }}/{{ currentTrack.duration | secondsToTime }} </span>
            </div>
            <div class="player-controls-title">
                {{ currentTrack.title }}
            </div>
            <div class="player-controls-volume">

                <button class="btn btn-icon" @click="muteOrUnmute">

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-if="!isMuted">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" v-if="isMuted">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>

                </button>
                <div class="volume-bar-container">
                    <!-- <div class="volume-bar" :style="{ width: !isMuted ? volumeBar : '0%' }"></div> -->
                    <input type="range" v-model="volume" step="0.25" max="1" min="0" @change="seekVolume">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Player",

  data() {
    return {
      clientId: process.env.CLIENT_ID,
      isPlaying: false,
      currentTime: null,
      isPlaying: true,
      timeline: null,
      isMuted: false,
      volumeBar: "100%",
      volume: 1
    };
  },

  computed: {
    ...mapGetters({
      tracks: "tracks",
      currentTrack: "currentTrack",
      barBuffered: "barBuffered",
      barCompleted: "barCompleted",
      indexOfCurrentTrack: "indexOfCurrentTrack",
      nextTrack: "nextTrack",
      prevTrack: "prevTrack",
      audio: "audio"
    })
  },

  methods: {
    timeUpdate(e) {
      const percent = (this.audio.currentTime / this.audio.duration) * 100;
      this.$store.dispatch("setBarCompleted", `${percent}%`);
      this.setCurrentTime(this.audio.currentTime);
    },

    setCurrentTime(secs) {
      const hr = Math.floor(secs / 3600);
      const min = Math.floor((secs - hr * 3600) / 60);
      const sec = Math.floor(secs - hr * 3600 - min * 60);

      this.currentTime = `${min < 10 ? `0${min}` : min}:${
        sec < 10 ? `0${sec}` : sec
      }`;
    },

    ended(e) {
      if (this.nextTrack) {
        this.$store.dispatch("setCurrentTrack", {
          track: this.nextTrack,
          index: this.indexOfCurrentTrack + 1
        });
      } else {
        this.$store.dispatch("setCurrentTrack", {
          track: this.tracks[0],
          index: 0
        });
      }
      this.reset()
      this.currentTime = "00:00";
      this.$store.dispatch("setBarCompleted", `0%`);
    },

    handlePlayPause() {
      if (this.audio.paused) {
        this.audio.play();
        this.isPlaying = true;
      } else {
        this.audio.pause();
        this.isPlaying = false;
      }
    },

    skipTimeline(e) {
      const nextSeek = Math.round(
        (e.pageX / (window.innerWidth / 100)) * (this.audio.duration / 100)
      );
      this.audio.currentTime = nextSeek;
    },

    muteOrUnmute() {
      if (!this.audio.muted) {
        this.audio.muted = true;
        this.isMuted = true;
        this.volume = 0;
      } else {
        this.audio.muted = false;
        this.isMuted = false;
        this.volume = this.audio.volume;
      }
    },

    seekVolume() {
      this.audio.volume = this.volume;
    },

    reset() {
      this.$store.dispatch("setBarBuffered", `0%`);
    },

    handleNext() {
      this.reset();
      this.$store.dispatch("setCurrentTrack", {
        track: this.nextTrack,
        index: this.indexOfCurrentTrack + 1
      });
    },
    handlePrevious() {
      this.reset()
      this.$store.dispatch("setCurrentTrack", {
        track: this.prevTrack,
        index: this.indexOfCurrentTrack - 1
      });
    },

    changeindexOfCurrentTrack() {
      this.$store.dispatch("setNextTrack");
      this.$store.dispatch("setPrevTrack");
    },
    onProgress() {
      if (this.audio.buffered.length > 0) {
        const percent =
          (this.audio.buffered.end(0) / this.audio.duration) * 100 || 0;
        this.$store.dispatch("setBarBuffered", `${percent}%`);
      }
    }
  },
  watch: {
    indexOfCurrentTrack() {
      this.changeindexOfCurrentTrack();
    },

    tracks() {
      this.changeindexOfCurrentTrack();
    },

    volume() {
      if (this.volume == 0) {
        this.isMuted = true;
      } else {
        this.isMuted = false;
      }
    },

    currentTrack() {
      if (this.audio) {
        this.audio.pause();
        this.$store.dispatch("setAudio", null);
      }

      this.$store.dispatch("setAudio", {
        url: `${this.currentTrack.stream_url}?client_id=${this.clientId}`
      });

      this.audio.addEventListener("timeupdate", this.timeUpdate);
      this.audio.addEventListener("ended", this.ended);
      this.audio.addEventListener("volumechange", this.volumeChange);
      this.audio.addEventListener("progress", this.onProgress);

      this.$store.dispatch("setBarCompleted", `0%`);

      this.isPlaying = true;
      this.audio.volume = this.volume
      this.audio.play();
    }
  }
};
</script>

<style scoped lang="scss">
/**Animation */
@keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 40px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

.player {
  padding: 0;
  margin: 0;
  height: 61px;
  left: 0;
  z-index: 100;
  background-color: #2d2e2f;

  .player-timeline {
    height: 4px;
    background-color: #3a3b3c;
    cursor: pointer;

    .audio-timeline {
      display: block;
      position: relative;
      width: inherit;
      height: inherit;
    }
  }

  .player-controls {
    display: flex;
    align-items: center;
    margin: auto;
    padding-top: 8px;
    // max-width: 970px;
    font-size: 0.8125rem;

    .btn-icon {
      border-radius: 100%;
      padding: 8px !important;
      width: 40px;
      height: 40px;
      &:active {
        background-color: rgba(0, 0, 0, 0.15);
      }
      svg {
        fill: #5d5e5f;
        &:hover:enabled {
          fill: #78797a;
        }
      }
    }

    .player-controls-time {
      //   color: #5d5e5f;
      display: flex;
      align-items: center;
      font-size: 0.8125rem;
      font-family: sans-serif !important;
    }

    .player-controls-title {
      flex: 3;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
    }

    .player-controls-volume {
      display: flex;
      flex: 1;
      align-items: center;

      .volume-bar-container {
        // height: 4px;
        width: 100%;
        display: flex;
        align-items: center;
        // background-color: #3a3b3c;
      }
    }
  }

  input[type="range"]::-ms-track {
    width: 300px;
    height: 5px;

    /*remove bg colour from the track, we'll use ms-fill-lower and ms-fill-upper instead */
    background: transparent;

    /*leave room for the larger thumb to overflow with a transparent border */
    border-color: transparent;
    border-width: 6px 0;

    /*remove default tick marks*/
    color: transparent;
  }
}
</style>