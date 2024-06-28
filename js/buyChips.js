const chipsContainer = document.querySelector('#chipsContainer');
let chips;

const saveLocal = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

async function callChips() {
  const res = await fetch("../js/packs.json");
  chips = await res.json();

  console.log(chips);
  takeChips(chips);
}

let chipsArray = callChips();

function takeChips(chips) {
  chipsContainer.innerHTML = "";

  for (let i = 0; i < chips.length; i++) {
    const content = document.createElement("div");
    content.innerHTML =
      `
      <div class="chips__container--card">
        <div class="chips__container--card--container front">
          <img src="${chips[i].img}" class="front__img" width="250">
          <div class="front__container">
            <h3 class="front__container--title">${chips[i].name}</h3>
            <h3 class="front__container--price">${chips[i].price}</h3>
            <h3 class="front__container--price"> cantidad de fichas:${chips[i].chips}</h3>
          </div>
        </div>
      </div>
      `;

    chipsContainer.append(content);

    let buyOption = document.createElement('button');
    buyOption.className = "chips__buyChip";
    buyOption.innerHTML = `Agregar Paquete`;
    content.append(buyOption);

    buyOption.addEventListener('click', () => {
      const repeatChip = cart.some((repeatOption) => repeatOption.id === chips[i].id);
      if (repeatChip === true) {
        cart.map((option) => {
          if (option.id === chips[i].id) {
            option.quan++;
          }
        });
      } else {
        cart.push({
          id: chips[i].id,
          img: chips[i].img,
          name: chips[i].name,
          price: chips[i].price,
          quan: 1,
          chips: chips[i].chips,
        });
      }
      console.log(cart);
      cartNum();
      saveLocal();
      swal('Genial', `Añadiste al carrito el paquete ${chips[i].name} exitosamente`, 'success');
    });
  }
}