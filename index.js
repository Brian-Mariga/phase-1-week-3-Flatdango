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
}
