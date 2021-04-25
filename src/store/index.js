import { createStore } from 'vuex';
import getMovies from '../composables/getMovies';

const store = createStore({
  state() {
    return {
      movies: null,
      relatedMovies: null,
      nowPlaying: null,
      popular: null,
      topRated: null,
      comingSoon: null,
      favourite: { error: null, result: [] },
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setRelatedMovies(state, movies) {
      state.relatedMovies = movies;
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
    setFavourite(state, movies) {
      state.favourite.result.push(movies);
    },
    removeFavourite(state, id) {
      const index = state.favourite.result.findIndex((el) => el === id);
      state.favourite.result.splice(index, 1);
    },
  },
  actions: {
    fetchMovies({ commit }, search) {
      const { result, error, searchMovies } = getMovies();
      searchMovies(search);
      commit('setMovies', { error, result });
    },
    fetchRelatedMovies({ commit }, search) {
      const { result, error, relatedMovies } = getMovies();
      relatedMovies(search);
      commit('setRelatedMovies', { error, result });
    },
    fetchNowPlaying({ commit }) {
      const { result, error, retrieveFilms } = getMovies();
      retrieveFilms('nowPlaying');
      commit('setNowPlaying', { error, result });
    },
    fetchPopular({ commit }) {
      const { result, error, retrieveFilms } = getMovies();
      retrieveFilms('popularFilms');
      commit('setPopularFilms', { error, result });
    },
    fetchTopRated({ commit }) {
      const { result, error, retrieveFilms } = getMovies();
      retrieveFilms('topRatedFilms');
      commit('setTopRatedFilms', { error, result });
    },
    fetchComingSoon({ commit }) {
      const { result, error, retrieveFilms } = getMovies();
      retrieveFilms('comingSoonFilms');
      commit('setComingSoonFilms', { error, result });
    },
  },
});

export default store;
