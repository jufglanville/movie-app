import { ref } from 'vue';

const getMovies = () => {
  const result = ref(null);
  const error = ref(null);
  const movies = ref(null);
  // const movieArray = ref(null);

  const searchMovies = async (search) => {
    fetch(`http://www.omdbapi.com/?apikey=722b64b4&s=${search}&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Error) {
          movies.value = null;
          error.value = data.Error;
          console.log(`In error console: ${error.value}`);
        } else {
          error.value = null;
          movies.value = data.Search;
          const tempArray = data.Search;
          // Loop through and remove all that do not have an image or IMDB ID
          result.value = tempArray.filter((el) => el.Poster !== 'N/A');
        }
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });

    return { error, result };
  };

  const searchMoviesDetails = async (search) => {
    fetch(`http://www.omdbapi.com/?apikey=722b64b4&i=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Error) {
          movies.value = null;
          error.value = data.Error;
          console.log(`In error console: ${error.value}`);
        } else {
          error.value = null;
          result.value = data;
        }
      })
      .catch(() => {
        error.value = 'Can not connect to db';
      });

    return { error, result };
  };

  return {
    result, error, searchMovies, searchMoviesDetails,
  };
};

export default getMovies;
