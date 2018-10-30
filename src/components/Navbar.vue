<template>
    <header class="fixed-top navbar-header">
      <div class="navbar navbar-dark  box-shadow">
        <div class="container d-flex justify-content-between">
            <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center">
             SoundCloudVue&nbsp;
                <svg id="icon-soundcloud" class="icon" viewBox="0 0 36 18" width="100%" height="100%">
                    <path d="M30.8 7.9c-.6 0-1.1.1-1.6.4-.4-4.1-3.5-7.3-7.4-7.3-.9 0-1.9.1-2.6.4-.3.1-.5.3-.5.6v14.5c0 .3.3.5.5.5h11.7c2.2 0 4-2 4-4.5.1-2.5-1.8-4.6-4.1-4.6zM16 17h1l.5-6-.5-9-1 .5-.5 8.5M13 17h1l.5-6-.5-7-1 .5-.5 6.5M10 17h1l.5-6-.5-7h-1l-.5 7M7 16.5l1 .5.5-6L8 6.8l-1-.3-.5 4.5M4 15.5l1 .5.5-5L5 6.2l-1 .3-.5 4.5M1 13.5l1 .5.5-3L2 8 1 9l-.2 2"></path>
                </svg>
            </router-link>

          <div class="ml-auto">
              <button class="btn btn-icon btn-search" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <svg id="icon-search"  class="icon" viewBox="0 0 18 18" width="100%" height="100%">
                    <path d="M12.5 11h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C13 2.9 10.1 0 6.5 0S0 2.9 0 6.5 2.9 13 6.5 13c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0C4 11 2 9 2 6.5S4 2 6.5 2 11 4 11 6.5 9 11 6.5 11z"></path>
                </svg>
              </button>
              <router-link to="/">
                  <svg id="icon-github" class="icon" viewBox="0 0 20 20" width="100%" height="100%">
                        <path d="M10 0C4.5 0 0 4.5 0 10c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.5.5-3.2-.6-3.4-1.1-.1-.3-.6-1.2-1-1.4-.4-.2-.9-.6 0-.7.8 0 1.3.7 1.5 1 .9 1.5 2.4 1.1 3 .9.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.7 0-.3-.4-1.3.2-2.7 0 0 .8-.3 2.8 1 .7-.2 1.6-.3 2.4-.3s1.7.1 2.5.3c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5C20 4.5 15.5 0 10 0z"></path>
                </svg>
              </router-link>
          </div>
        </div>
      </div>
      <div class="container-fluid">
          <div class="row justify-content-center">
              <div class="col-sm-10 col-md-10 col-lg-10">
                <div class="collapse search-bar" id="collapseExample">
                   <form @submit.prevent="handleSearch" class="search-form">
                       <input autofocus v-model="query" type="text" autocomplete="off" class="search-form-input form-control"  placeholder="Pesquisar..." tabindex="0">
                      <span v-if="showMessage">Pesquisa inválida</span>
                   </form>
                </div>
              </div>
          </div>
      </div>
    </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      query: null,
      showMessage: false
    };
  },

  computed: {
    ...mapGetters({
      searchQuery: "searchQuery"
    })
  },
  methods: {
    handleSearch() {
      if (this.query && this.query !== this.searchQuery) {
        this.$store.dispatch("setBarBuffered", `0%`);
        this.showMessage = false;
        const query = this.query;
        this.$store.dispatch("clearTracks");
        this.$store.dispatch("setCurrentTrack", {
          track: null,
          index: null
        });
        this.$router.push({ name: "search", params: { query: query } });
        this.query = null;
      } else if(!this.query) {
        this.showMessage = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "styles/scss/_variables.scss";

.navbar-header {
  transform: translateZ(0);
  box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  min-height: 61px;
  overflow: hidden;
  background-color: $header-background-color;
  .navbar {
    .navbar-brand {
      padding-top: 10px;
      height: 60px;
      font-size: 0.975rem;
      font-weight: 400;
      line-height: 2.8571428571;
    }
  }

  .search-bar {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    .search-form {
      padding: 10px 0;
      .search-form-input {
        background: transparent;
        border: 0;
        outline: none;
        height: 65px;
        color: $base-font-color;
        box-shadow: none;
        font-size: 1.875rem;
        font-weight: 300;
        &:focus {
          border: 0;
        }
      }
    }
  }
}
</style>