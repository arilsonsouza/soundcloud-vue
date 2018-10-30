<template>
    <div>
        <tracks page='search'/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tracks from "@/components/Tracks";

export default {
  name: "Search",

  computed: {
    ...mapGetters({
      searchQuery: "searchQuery"
    })
  },

  watch: {
    "$route.params.query"() {
      this.$store.dispatch("setSearchQuery", {
        query: this.$route.params.query
      });
    }
  },
  destroyed() {
     this.$store.dispatch("setBarBuffered", `0%`);
    this.$store.dispatch("clearTracks");
    this.$store.dispatch("setAudio", null);
    this.$store.dispatch("setCurrentTrack", {
      track: null,
      index: null
    });
  },
  mounted() {
    const query = this.$route.params.query;
    this.$store.dispatch("setSearchQuery", { query });
  },
  components: {
    Tracks
  }
};
</script>

<style scoped>
</style>