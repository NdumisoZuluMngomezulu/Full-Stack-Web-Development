const API_URL = 'http://localhost:5000';
const list = document.getElementById('list');
const form = document.getElementById('form');

async function loadMovies() {
  const res = await fetch(API_URL);
  const movies = await res.json();
  list.innerHTML = movies.map(m => 
    `<li>${m.tile}</li>`
  ).join('');
}

form.onsubmit = async e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const rating = document.getElementById('rating').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: 'applicat'
  })
}

// form.onsubmit = async e => {
//   e.preventDefault();
//   const title = document.getElementById('title').value;
//   const rating = document.getElementById('rating').value;
  
//   await fetch(API, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({title, rating: parseInt(rating)})
//   });
  
//   form.reset();
//   loadMovies();
// };

// loadMovies(); // initial load