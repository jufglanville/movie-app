import { createStore } from 'vuex';
// import keys from '../private/keys';
import getMovies from '../composables/getMovies';

const store = createStore({
  state() {
    return {
      movies: null,
      nowPlaying: null,
      popular: null,
      topRated: null,
      comingSoon: null,
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setNowPlaying(state, movies) {
      state.nowPlaying = movies;
    },
    setPopularFilms(state, movies) {
      state.popular = movies;
    },
    setTopRatedFilms(state, movies) {
      state.topRated = movies;
    },
    setComingSoonFilms(state, movies) {
      state.comingSoon = movies;
    },
  },
  actions: {
    fetchMovies({ commit }, search) {
      const { result, error, searchMovies } = getMovies();
      searchMovies(search);
      commit('setMovies', { error, result });
    },
    fetchNowPlaying({ commit }) {
      const { result, error, nowPlaying } = getMovies();
      nowPlaying();
      commit('setNowPlaying', { error, result });
    },
    fetchPopular({ commit }) {
      const { result, error, popularFilms } = getMovies();
      popularFilms();
      commit('setPopularFilms', { error, result });
    },
    fetchTopRated({ commit }) {
      const { result, error, topRatedFilms } = getMovies();
      topRatedFilms();
      commit('setTopRatedFilms', { error, result });
    },
    fetchComingSoon({ commit }) {
      const { result, error, comingSoonFilms } = getMovies();
      comingSoonFilms();
      commit('setComingSoonFilms', { error, result });
    },
  },
});

export default store;
