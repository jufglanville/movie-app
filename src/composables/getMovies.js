import { ref } from 'vue';
import keys from '../private/keys';

const searchOptions = {
  nowPlaying: {
    url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${keys.apiTMDB}&language=en-US&page=1`,
    error: 'new releases',
  },
  popularFilms: {
    url: `https://api.themoviedb.org/3/movie/popular?api_key=${keys.apiTMDB}&language=en-US&page=1`,
    error: 'popular films',
  },
  topRatedFilms: {
    url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.apiTMDB}&language=en-US&page=1`,
    error: 'top rated films',
  },
  comingSoonFilms: {
    url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.apiTMDB}&language=en-US&page=1`,
    error: 'films coming soon',
  },
};
// search URL
// Search value for search url
// Error Value

const updatePosterUrl = (data) => {
  let newArray = [];
  // Loop through and remove all that do not have a backdrop image
  newArray = data.filter((el) => {
    if (el.poster_path !== null && el.backdrop_path !== null) {
      return el;
    }
    return null;
  });
  // Update poster url
  newArray.forEach((element) => {
    element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
  });
  return newArray;
};

const getMovies = () => {
  const result = ref(null);
  const error = ref(null);

  const searchMovies = async (search) => {
    if (search !== '') {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.apiTMDB}&language=en-US&query=${search}&page=1&include_adult=false`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length < 1) {
            error.value = 'Sorry, we can\'t find this film';
            return;
          }
          result.value = updatePosterUrl(data.results);
        })
        .catch(() => {
          error.value = 'Can not connect to db';
        });
      return { error, result };
    }
    return '';
  };

  const retrieveFilms = async (type) => {
    fetch(searchOptions[type].url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = `Sorry, we can't find any ${searchOptions[type].error} at the moment`;
          return;
        }
        if (type === 'comingSoonFilms') {
          // Return movies that are not released yet
          result.value = data.results.filter((e) => (new Date(e.release_date) > new Date() ? e : null)); // eslint-disable-line max-len
          result.value = updatePosterUrl(result.value);
        } else {
          result.value = updatePosterUrl(data.results);
        }
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    return { error, result };
  };

  const relatedMovies = async (search) => {
    fetch(`https://api.themoviedb.org/3/movie/${search}/similar?api_key=${keys.apiTMDB}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'We can\'t find any other films related to this one';
          return;
        }
        result.value = updatePosterUrl(data.results);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    return { error, result };
  };

  return {
    result,
    error,
    searchMovies,
    relatedMovies,
    retrieveFilms,
  };
};

export default getMovies;
