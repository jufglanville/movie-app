import { ref } from 'vue';
import keys from '../private/keys';

const getMovieDetails = () => {
  const result = ref(null);
  const error = ref(null);

  const retrieveTrailer = async (search) => {
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

  const retrieveMoviesDetails = async (search) => {
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

  return {
    result,
    error,
    retrieveTrailer,
    retrieveMoviesDetails,
  };
};

export default getMovieDetails;
