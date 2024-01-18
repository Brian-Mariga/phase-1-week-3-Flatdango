document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();

  document.getElementById("films").addEventListener("click", (event) => {
    if (event.target.classList.contains("film")) {
      const movieId = event.target.dataset.movieId;
      fetchMovieDetails(movieId);
    }
  });
});

function fetchMovies() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((data) => {
      // Display movie list in the left menu
      displayMovieList(data);

      // Display the details of the first movie
      if (data.length > 0) {
        fetchMovieDetails(data[0].id);
      }
    })
    .catch((error) => console.error("Error fetching movies:", error));
}

function displayMovieList(movies) {
  const filmsList = document.getElementById("films");
  filmsList.innerHTML = "";

  movies.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.classList.add("film", "item");
    listItem.dataset.movieId = movie.id;
    listItem.textContent = movie.title;

    filmsList.appendChild(listItem);
  });
}

function fetchMovieDetails(movieId) {
  fetch(`http://localhost:3000/films/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
      displayMovieDetails(movie);
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}
