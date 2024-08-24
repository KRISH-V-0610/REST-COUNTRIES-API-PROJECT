const cardContainer = document.querySelector(".countrys-card-container");
const searchInput = document.querySelector(".search-bar");
const Mode = document.querySelector('.dark-mode-switch')
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    allCountriesData = data;
    renderCountries(data);

  });

function renderCountries(data) {
  cardContainer.innerHTML = "";  // Clear the container before rendering new data
  data.forEach((country) => {
    const name = country.name.common;
    const capital = country.capital?.[0];

    const population = country.population.toLocaleString("en-IN");
    const region = country.region;
    const flagURL = country.flags.svg;

    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");

    countryCard.href = `./pages/country.html?name=${country.name.common}`;
    // countryCard.target = "_blank"

    countryCard.innerHTML = `
      <img src="${flagURL}" alt="flag" />
                      <div class="country-card-details">
                          <h3>${name}</h3>
                          <p><span>Population: </span>${population}</p>
                          <p><span>Region: </span>${region}</p>
                          <p><span>Capital: </span>${capital}</p>
                      </div>
      `;
    cardContainer.appendChild(countryCard);
  });
}
searchInput.addEventListener("input", (e) => {
  const enteredTerm = e.target.value.toLowerCase();


  const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(enteredTerm))
  console.log(filteredCountries)
  renderCountries(filteredCountries);

});

Mode.addEventListener('click', () => {

  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {

    Mode.innerHTML = `
      <i class="fa-solid fa-sun"></i>
      <p>  Light Mode</p>`;

  }
  else {
    Mode.innerHTML = `
      <i class="fa-solid fa-moon"></i>
      <p>  Dark Mode</p>`;


  }
})

