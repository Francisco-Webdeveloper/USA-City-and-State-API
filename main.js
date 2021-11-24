const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// selectors
const form = document.querySelector('.search-form');
const input = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// displaying population with commas
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// displaying the results according to the user's search
const insertLocationToTheDom = (cities, states) => {
  const place = input.value;
  const regex = new RegExp(place, 'gi');
  cities.forEach((city) => {
    const cityName = city.city.replace(regex, `<span class="hl">${place}</span>`);
    const stateName = city.state;
    const population = numberWithCommas(city.population);
    const cityHTML = `<li><div>${cityName}, ${stateName}</div><div>${population}</div></li>`;
    suggestions.insertAdjacentHTML('beforeend', cityHTML);
  });
  states.forEach((state) => {
    const cityName = state.city;
    const stateName = state.state.replace(regex, `<span class="hl">${place}</span>`);
    const population = numberWithCommas(state.population);
    const stateHTML = `<li><div>${cityName}, ${stateName}</div><div>${population}</div></li>`;
    suggestions.insertAdjacentHTML('beforeend', stateHTML);
  });
};

// fetching the API and extracting the desired data
const fetchCity = (event) => {
  event.preventDefault();
  const place = input.value;
  // turning the searched place case insensitive
  const regex = new RegExp(place, 'gi');
  // cleaning the previous results
  suggestions.innerHTML = '';

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      // we need to figure out if the city or state matches what was searched
      const cities = data.filter((location) => location.city.match(regex));
      const states = data.filter((location) => location.state.match(regex));

      insertLocationToTheDom(cities, states);
    });
};

// Listeners
input.addEventListener('keyup', fetchCity);
form.addEventListener('submit', fetchCity);