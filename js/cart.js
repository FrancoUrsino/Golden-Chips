let cart = JSON.parse(localStorage.getItem("cart")) || [];
const showCart = document.querySelector('.cartID');
const modalContainer = document.querySelector('.modal__container');
const cartQuant = document.querySelector('#cartQuant');

const showModalCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal__header";
  modalHeader.innerHTML = `<h2 class="modal__title"> TUS PAQUETES SELECCIONADOS</h2> <h2 class="modal__button" id="modalButton"><i class="bi bi-x-lg"></i></h2>`;
  modalContainer.append(modalHeader);

  modalHeader.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  cart.forEach((chipsArray) => {
    let cartContent = document.createElement("div");
    cartContent.className = "modal__cont";
    cartContent.innerHTML =
      `
      <div class="modal__cont--img">
        <img src="${chipsArray.img}" alt="" class="modal__cont--img--img img__cart">
      </div>
      <div class="modal__cont--chips">
        <p class="modal__cont--chips--name">Pack: ${chipsArray.name}</p>
        <p class="modal__cont--chips--price">Precio $${chipsArray.price}</p>
        <p class="modal__cont--chips--price"> Fichas: ${chipsArray.chips}</p>
        <div class="modal__cont--chips--container">
          <span class="more">+</span>
          <p class="modal__cont--chips--container--quan">cantidad: ${chipsArray.quan}</p>
          <span class="less">-</span>
        </div>
        <div class="modal__cont--chips">
        <button class="modal__cont--deleteChip"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      `;
    modalContainer.append(cartContent);

    let more = cartContent.querySelector(".more");
    more.addEventListener('click', () => {
      chipsArray.quan++;
      saveLocal();
      showModalCart();
    });
    let less = cartContent.querySelector(".less");
    less.addEventListener('click', () => {
      if (chipsArray.quan !== 1) {
        chipsArray.quan--;
      }
      saveLocal();
      showModalCart();
    });

    let deleteChip = cartContent.querySelector(".modal__cont--deleteChip");
    deleteChip.addEventListener('click', () => {
      deleteChipSelect(chipsArray.id);
    });
  });

  let modalTotal = cart.reduce((acc, item) => acc + item.price * item.quan, 0);

  const totalPriceBuy = document.createElement("div");
  totalPriceBuy.className = "total__container";
  totalPriceBuy.innerHTML = `<p class="total__container--total">Total a pagar $${modalTotal}</p><button class="total__container--btn" id="finishBuyButton">COMPRAR PAQUETES</button>`;
  modalContainer.append(totalPriceBuy);




  const finishBuyButton = document.querySelector('#finishBuyButton');
  finishBuyButton.addEventListener('click', () => {
    swal("¿Quiere realizar la compra?", {
      buttons: {
        cancel: "No",
        catch: {
          text: "Si",
          value: "si",
        },
        defeat: false,
      },
    })
      .then((value) => {
        switch (value) {
          case "defeat":
            break;
          case "si":
            swal("Felicidades!!", "Compraste tus paquetes", "success");
            let totalChips = cart.reduce((acc, item) => acc + item.chips * item.quan, 0);
            updateUserChips(totalChips);
            cart = [];
            saveLocal();
            cartNum();
            showModalCart();
            break;
          default:
            swal("OH Bueno", "La próxima", "error");
            cartContent.innerHTML = "";
            saveLocal();
        }
      });

    let cartContent = document.querySelectorAll('.modal__cont');
    cartContent.forEach((cartC) => {
      cartC.remove();
    });

    modalTotal = 0;
    totalPriceBuy.innerHTML = `<p class="total__container--total">Total a pagar $${modalTotal}</p><button class="total__container--btn" id="finishBuyButton">COMPRAR PAQUETES</button>`;
  });
  saveLocal();
};

showCart.addEventListener('click', showModalCart);

const deleteChipSelect = (id) => {
  const chipId = cart.find((chip) => chip.id === id);

  cart = cart.filter((cartId) => {
    return cartId != chipId;
  });
  cartNum();
  saveLocal();
  showModalCart();
};

const cartNum = () => {
  cartQuant.style.display = "block";

  const cartNumLocal = cart.length;
  localStorage.setItem("cartLength", JSON.stringify(cartNumLocal));

  cartQuant.innerText = JSON.parse(localStorage.getItem("cartLength"));
};

cartNum();