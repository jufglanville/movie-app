import { ref } from 'vue';
import keys from '../private/keys';

const getMovies = () => {
  const result = ref(null);
  const error = ref(null);
  // const movies = ref(null);
  // const movieArray = ref(null);

  const searchMovies = async (search) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.apiTMDB}&language=en-US&query=${search}&page=1&include_adult=false`)
      .then((res) => res.json())
      .then((data) => {
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            return el;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const nowPlaying = async () => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${keys.apiTMDB}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'We can\'t find any new releases at the moment';
          return;
        }
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            return el;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const popularFilms = async () => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${keys.apiTMDB}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'We can\'t find any popular films at the moment';
          return;
        }
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            return el;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const topRatedFilms = async () => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${keys.apiTMDB}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'We can\'t find any top rated films at the moment';
          return;
        }
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            return el;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const comingSoonFilms = async () => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.apiTMDB}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'We can\'t find any films coming soon at the moment';
          return;
        }
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            if (new Date(el.release_date) > new Date()) {
              return el;
            }
            return null;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const searchMoviesDetails = async (search) => {
    let imdbID;
    let rottenTomato;
    // API Call to TMDB
    await fetch(`https://api.themoviedb.org/3/movie/${search}?api_key=${keys.apiTMDB}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        result.value = data;
        result.value.backdrop_path = `https://image.tmdb.org/t/p/original${result.value.backdrop_path}`; // eslint-disable-line no-param-reassign
        imdbID = result.value.imdb_id;
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // API Call to retrieve ratings and release date
    await fetch(`https://api.themoviedb.org/3/movie/${search}/release_dates?api_key=${keys.apiTMDB}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        const temp = data.results.filter((el) => el.iso_3166_1 === 'GB');
        result.value = {
          ...result.value,
          rating: temp[0].release_dates[0].certification,
          releaseYear: temp[0].release_dates[0].release_date.slice(0, 4),
        };
      })
      .catch(() => {
        // console.log('didnt get it GB');
        error.value = 'Can not connect to db';
      });

    // API Call to OMDB using returned IMDB ID
    fetch(`http://www.omdbapi.com/?apikey=${keys.apiOMDB}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Ratings[1].Source === 'Rotten Tomatoes') {
          const score = Number(data.Ratings[1].Value.replace('%', ''));
          if (score >= 90) {
            rottenTomato = 1;
          } else if (score >= 60) {
            rottenTomato = 2;
          } else {
            rottenTomato = 3;
          }
        }
        result.value = { ...result.value, ...data, rottenTomato };
        // console.log(result.value);
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
        const tempArray = data.results;

        // Loop through and remove all that do not have a backdrop image
        result.value = tempArray.filter((el) => {
          if (el.poster_path !== null && el.backdrop_path !== null) {
            return el;
          }
          return null;
        });
        // Update poster url
        result.value.forEach((element) => {
          element.poster_path = `https://image.tmdb.org/t/p/original${element.poster_path}`; // eslint-disable-line no-param-reassign
        });
        // console.log(result.value);
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });
    // console.log(result);
    return { error, result };
  };

  const searchTrailers = async (search) => {
    fetch(`https://api.themoviedb.org/3/movie/${search}/videos?api_key=${keys.apiTMDB}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length < 1) {
          error.value = 'Sorry we couldn\'t find this trailer';
          console.log(error.value);
          return;
        }
        const temp = [];
        console.log(data);
        data.results.forEach((element) => {
          const trailerObj = {};
          trailerObj.trailer = `https://www.youtube.com/embed/${element.key}?autoplay=1&mute=1`;
          temp.push(trailerObj);
        });
        result.value = temp;
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
    searchMoviesDetails,
    searchTrailers,
    nowPlaying,
    popularFilms,
    topRatedFilms,
    comingSoonFilms,
    relatedMovies,
  };
};

export default getMovies;
