let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendResult(result) {

    let {
        title,
        link,
        description
    } = result;

    //creating result element
    let divContainer = document.createElement("div");
    divContainer.classList.add("result-item");


    //creating title element
    let titleContainer = document.createElement("a");
    titleContainer.href = link;
    titleContainer.classList.add("titleCSS");
    titleContainer.target = "_blank";
    titleContainer.innerText = title;
    divContainer.appendChild(titleContainer);

    // creating break element 
    let breakEl = document.createElement("br");
    divContainer.appendChild(breakEl);

    // creating url element
    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.classList.add("urlCSS");
    urlEl.target = "_blank";
    urlEl.innerText = link;
    divContainer.appendChild(urlEl);

    // creating break element
    let breakEl2 = document.createElement("br");
    divContainer.appendChild(breakEl2);

    // creating description element
    let paraEl = document.createElement("p");
    paraEl.classList.add("descriptionCSS");
    paraEl.innerText = description;
    divContainer.appendChild(paraEl);

    // creating break element
    let breakEl3 = document.createElement("br");
    divContainer.appendChild(breakEl3);

    searchResultsEl.appendChild(divContainer);
}

function displayResults(searchResult) {
    spinner.classList.toggle("hidden");

    for (let results of searchResult) {
        createAndAppendResult(results);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("hidden");
        searchResultsEl.innerText = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(JsonData) {
                let results = JsonData;
                displayResults(results.search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);