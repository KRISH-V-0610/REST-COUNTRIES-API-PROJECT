// const urlSearchParams = new URLSearchParams(window.location.search);
const countryName = new URLSearchParams(window.location.search).get("name");

const flagImage = document.getElementById("#flag-image");
const countryTitle = document.querySelector(".country-name");

const nativeName = document.querySelector(".other-details").children[0].children[0];
const population = document.querySelector(".other-details").children[0].children[1];
const region = document.querySelector(".other-details").children[0].children[2];
const subRegion = document.querySelector(".other-details").children[0].children[3];
const capital = document.querySelector(".other-details").children[0].children[4];

const topLevelDomain = document.querySelector(".other-details").children[1].children[0];
const currencies = document.querySelector(".other-details").children[1].children[1];
const Languages = document.querySelector(".other-details").children[1].children[2];

const backButton = document.querySelector(".back-btn");

const bcList = document.querySelector('.bc-list');
const Mode = document.querySelector('.dark-mode-switch')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((response) => response.json())
    .then((data) => {

        console.log(data[0]);

        flagImage.src = data[0].flags.svg;
        countryTitle.innerText = data[0].name.common;

        if (data[0]["name"]["nativeName"])
            nativeName.innerHTML = `<b>Native Name:</b> ${Object.values(data[0]["name"]["nativeName"])[0].common}`;
        else nativeName.innerHTML = `<b>Native Name:</b> -`;

        population.innerHTML = `<b>Population:</b> ${data[0].population.toLocaleString("en-IN")}`;

        region.innerHTML = `<b>Region:</b> ${data[0].region}`;

        if (data[0].subRegion)
            subRegion.innerHTML = `<b>Subregion:</b> ${data[0].subregion}`;
        else subRegion.innerHTML = `<b>Subregion:</b> -`;

        if (data[0].capital) capital.innerHTML = `<b>Capital:</b> ${data[0].capital}`;
        else capital.innerHTML = `<b>Capital:</b> -`;

        topLevelDomain.innerHTML = `<b>Top Level Domain:</b> ${data[0].tld}`;


        const langObj = data[0]["languages"];
        const currenciesObj = data[0]["currencies"];

        if (currenciesObj && Object.keys(currenciesObj).length > 0) {
            for (const curr in currenciesObj) {
                currencies.innerHTML += `<li>${currenciesObj[curr]["name"]}</li>`;
            }
        } else currencies.innerHTML = `<b>Currencies:</b> -`;

        if (langObj && Object.keys(langObj).length > 0) {
            for (const lang in langObj) {
                Languages.innerHTML += `<li>${langObj[lang]}</li>`;
            }
        } else Languages.innerHTML = `<b>Languages:</b> -`;


        const bordersArr = data[0].borders

        if (bordersArr) {
            bordersArr.forEach((border) => {

                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const borderCountry = document.createElement("div");
                        borderCountry.classList.add("country");
                        borderCountry.innerText = data[0].name.common
                        bcList.appendChild(borderCountry);

                        borderCountry.addEventListener("click", () => {
                            window.location.href = `country.html?name=${data[0].name.common}`;
                        });
                    });

            });
        }
        else {
            bcList.innerHTML = `<p>No borders found for this country.</p>`;
        }




    })

backButton.addEventListener("click", () => {
    window.location.href = `../index.html`;
})


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