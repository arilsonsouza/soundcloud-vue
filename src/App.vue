<template>
  <div id="app">

    <navbar/>

    <main role="main" class="main-content">
        <div class="container-fluid">
          <div class="row">
            <header class="header-content">
                <div class="container">
                  <div class="row justify-content-between">
                    <div class="col-sm-12 col-md-12 col-lg-12">
                      <nav aria-label="breadcrumb">
                        <ol class="breadcrumb d-flex justify-content-md-between justify-content-sm-center">
                          <li :class="{ 'breadcrumb-item active': genre.active, 'breadcrumb-item': !genre.active }" aria-current="page"
                                v-for="(genre, index) in genres" :key="index" >
                                <router-link :to="{ name: 'home', query:{ genre: genre.name} }">{{ genre.name }}</router-link>
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
            </header>
          </div>
          
          <div class="row">
            <div class="container">
              <router-view/>
            </div>
          </div>

        </div>
    </main>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",

  data() {
    return {
      genres: [
        { name: "electronic", active: true },
        { name: "jazzblues", active: false },
        { name: "metal", active: false },
        { name: "pop", active: false },
        { name: "reggae", active: false },
        { name: "rock", active: false }
      ]
    };
  },

  watch: {
    "$route.query.genre"() {
      const genreParam = this.$route.query.genre;

      const index = this.genres.findIndex(genre => genre.name === genreParam);
      this.getGenreItems(genreParam, index);
    }
  },
  methods: {
    getGenreItems(genre, genreIndex) {
      this.genres.forEach(
        (genre, index) =>
          index === genreIndex ? (genre.active = true) : (genre.active = false)
      );
      this.$store.dispatch("clearTracks");
      this.$store.dispatch("getTracks", { genre, page: 1 });
      this.$store.dispatch("setIndexOfCurrentTrack", 0);
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "styles/scss/_variables.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";

.main-content {
  margin-top: 76px;

  .header-content {
    width: 100%;
    padding-top: 20px;
    color: #7d7e7f;
    background-color: #1d1e1f;
    margin-bottom: 40px;

    .breadcrumb {
      background-color: transparent !important;

      .breadcrumb-item {
        cursor: pointer;
        display: flex;
        text-transform: capitalize;

        a {
          text-decoration: none;
          color: #7d7e7f;
        }
      }
      .breadcrumb-item.active {
        color: #aaabac !important;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);

      }

      .breadcrumb-item + .breadcrumb-item {
        text-align: center;
        padding-left: 0;
      }
      .breadcrumb-item + .breadcrumb-item::before {
        display: inline-block;
        padding-right: 0.5rem;
        color: #6c757d;
        content: "";
      }

      .breadcrumb-item + .breadcrumb-item::after {
        display: inline-block;
        padding-right: 0.5rem;
        content: "";
      }
    }
  }
}

.btn,
.btn:focus {
  display: inline-block;
  text-align: center;
  text-decoration: none;
  outline: none;
  border: 0;
  box-shadow: none;
  padding: 0;
  overflow: hidden;
  -webkit-transform: translate(0);
  transform: translate(0);
  background: transparent;
}
.icon {
  width: 36px;
  height: 18px;
  fill: $base-font-color;
}

.bar {
  position: absolute;
  height: inherit;
  background-color: #506f43;
  transition: width 0.5s;
}

.bar-buffered {
  background-color: #506f43;
  opacity: .5;
}
input[type="range"] {
  overflow: hidden;
  width: 100%;
  -webkit-appearance: none;
  background-color: #6c757d;
  height: 4px;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  -webkit-appearance: none;
  color: #506f43;
  margin-top: -1px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 8px;
  height: 8px;
  -webkit-appearance: none;
  cursor: pointer;
  background: #506f43;
  box-shadow: -90px 0 0 89px #506f43;
}

/** FF*/
input[type="range"]::-moz-range-progress {
  background-color: #506f43;
}
input[type="range"]::-moz-range-track {
  background-color: #506f43;
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: #506f43;
}
input[type="range"]::-ms-fill-upper {
  background-color: #506f43;
}
</style>
