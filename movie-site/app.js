const API = 'http://127.0.0.1:5000/movies';
const list = document.getElementById('movie-list');
const form = document.getElementById('movie-form');

async function loadMovies() {
  const res = await fetch(API);
  const movies = await res.json();
  list.innerHTML = movies.map(m => 
    `<li>${m.title} - ${m.rating}/10</li>`
  ).join('');
}

form.onsubmit = async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const rating = document.getElementById('rating').value;
  
  await fetch(API, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title, rating: parseInt(rating)})
  });
  
  form.reset();
  loadMovies();
};

loadMovies(); // initial load