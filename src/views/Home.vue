<template>
    <div>
        <tracks page='home'/>
    </div>
</template>

<script>
import Tracks from "@/components/Tracks";

export default {
  name: "Home",
  mounted() {
    const genre = this.$route.query.genre || "electronic";
    console.log('mouten', genre)
    this.$store.dispatch("getTracks", { genre, page: 1 });
  },

  watch: {
    "$route.params.genre"() {
      const genre = this.$route.query.genre || "electronic";
      this.$store.dispatch("getTracks", { genre, page: 1 });
    }
  },

  destroyed() {
    this.$store.dispatch("clearTracks");
    this.$store.dispatch("setAudio", null);
    this.$store.dispatch("setCurrentTrack", {
      track: null,
      index: null
    });
  },

  components: {
    Tracks
  }
};
</script>

<style scoped>
</style>