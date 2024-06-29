// FILTER

const categoryButton = document.querySelectorAll('.filters__container--btn');
const minMax = document.querySelector('#minMax');
const maxMin = document.querySelector('#maxMin');

categoryButton.forEach(button => {
  button.addEventListener('click', (b) => {

    categoryButton.forEach(button => button.classList.remove("active"))
    b.currentTarget.classList.add("active");

    if (b.currentTarget.id != "all") {
      const categoryButtonChoise = chips.filter(chip => chip.stars === b.currentTarget.id);
      takeChips(categoryButtonChoise);
    } else {
      takeChips(chips);
    }
  });
});

for (let i = 0; i < callChips.length; i++) {
  chips[i].price = parseInt(chips[i].price)
}

minMax.addEventListener('click', () => {
  chips.sort(function (a, b) {
    return a.price - b.price
  })
  takeChips(chips)
})

maxMin.addEventListener('click', () => {
  chips.sort(function (a, b) {
    return b.price - a.price
  })
  takeChips(chips)
})

// SEARCH

const searchChipInput = document.querySelector('#searchChipInput');
const searchChipButton = document.querySelector('#searchChipButton');
const searchResult = document.querySelector('#searchChips__container');
const chipsOut = document.querySelector('#allChips');

const searchChip = () => {
  searchResult.innerHTML = "";
  const searchText = searchChipInput.value.toLowerCase();
  for (let chipSearch of chips) {
    let searchName = chipSearch.name.toLowerCase();
    if (searchName.indexOf(searchText) !== -1) {
      searchResult.innerHTML +=
        `
      <div class="searchChips__card">
        <img src="${chipSearch.img}" class="searchChips__card--img">
        <div class="searchChips__card--container">
        <button class="chips__card--btn" id="btnCloseSearch"><i class="bi bi-x-lg"></i></button>
          <h3 class="searchChips__card--container--title">${chipSearch.name}</h3>
          <p class="searchChips__card--container--description">Fichas:${chipSearch.chips}</p>
          <p class="searchChips__card--container--price">$${chipSearch.price}</p>
        </div>
      </div>
      `

      const searchOut = document.querySelector('#btnCloseSearch');

      searchOut.addEventListener('click', () => {
        searchResult.style.display = "none"
        chipsOut.style.display = "grid"
      });
      searchResult.style.display = "grid"
    }
  }
  if (searchResult.innerHTML === '') { searchResult.innerHTML += `<p class="notOptions">Todavía no tenemos ese paquete</p>` }
}

searchChipButton.addEventListener('click', searchChip)