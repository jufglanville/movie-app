import { createStore } from 'vuex';
// import keys from '../private/keys';
import getMovies from '../composables/getMovies';

const store = createStore({
  state() {
    return {
      movies: null,
    };
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    fetchMovies({ commit }, search) {
      const { result, error, searchMovies } = getMovies();
      searchMovies(search);
      commit('setMovies', { error, result });
    },
  },
});

export default store;
