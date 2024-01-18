document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();

  document.getElementById("films").addEventListener("click", (event) => {
    if (event.target.classList.contains("film")) {
      const movieId = event.target.dataset.movieId;
      fetchMovieDetails(movieId);
    }
  });

  document.getElementById("app").addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-ticket")) {
      const movieId = event.target.dataset.movieId;
      //   console.log("buyTicket");
      buyTicket(movieId);
    }
  });
});

function fetchMovies() {
  fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((data) => {
      displayMovieList(data);

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

function displayMovieDetails(movie) {
  const movieDetails = document.getElementById("movie-details");
  movieDetails.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h2><em>${movie.title}<em></h2>
          <p><strong>${movie.description}</strong></p>
          <p>Runtime: ${movie.runtime} minutes</p>
          <p>Showtime: ${movie.showtime}</p>
          <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
          <button class="buy-ticket" id="buy-ticket" data-movie-id="${
            movie.id
          }">Buy Ticket</button>
      `;
  const button = document.querySelector("button");
  button.addEventListener(
    "click",
    // console.log("buyTicket")
    buyTicket
  );
}

function buyTicket(movieId) {
  fetch(`http://localhost:3000/films/${movieId}`)
    .then((response) => response.json())
    .then((movie) => {
      if (movie.capacity > movie.tickets_sold) {
        return fetch(`http://localhost:3000/films/${movieId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tickets_sold: movie.tickets_sold + 1,
          }),
        });
      } else {
        alert(`Sorry, the showing is sold out.`);
        throw new Error("Sold out");
      }
    })
    .then((response) => response.json())
    .then((updatedMovie) => {
      const availableTickets = document.querySelector(
        `[data-movie-id="${movieId}"] .available-tickets`
      );
      availableTickets.textContent = `Available Tickets: ${
        updatedMovie.capacity - updatedMovie.tickets_sold
      }`;
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
}
