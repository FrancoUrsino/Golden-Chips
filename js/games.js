document.addEventListener('DOMContentLoaded', () => {
  const playGameButtons = document.querySelectorAll('.play-game');
  const closeModalButtons = document.querySelectorAll('.close');
  const userChipsBalanceElement = document.getElementById('userChipsBalance');
  let userChips = JSON.parse(localStorage.getItem('userChips')) || 0;

  const updateChipsBalance = () => {
    userChipsBalanceElement.textContent = `Tus Fichas: ${userChips}`;
  };

  updateChipsBalance();

  const openModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'block';
  };

  const closeModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'none';
  };

  playGameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      openModal(game);
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      closeModal(game);
    });
  });

  const spinReel = () => {
    const symbols = ['🍒', '🍋', '🍉', '🍊', '🍇', '7️⃣'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const playSlotGame = () => {
    const betAmount = parseInt(document.getElementById('betAmount').value, 10);

    if (userChips < betAmount) {
      swal('Error', 'No tienes suficientes fichas para jugar.', 'error');
      return;
    }

    userChips -= betAmount;
    localStorage.setItem('userChips', JSON.stringify(userChips));
    updateChipsBalance();

    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

    reel1.classList.add('spin-reel1');
    reel2.classList.add('spin-reel2');
    reel3.classList.add('spin-reel3');

    setTimeout(() => {
      reel1.classList.remove('spin-reel1');
      reel2.classList.remove('spin-reel2');
      reel3.classList.remove('spin-reel3');

      reel1.textContent = spinReel();
      reel2.textContent = spinReel();
      reel3.textContent = spinReel();

      const reel1Result = reel1.textContent;
      const reel2Result = reel2.textContent;
      const reel3Result = reel3.textContent;

      let winAmount = 0;
      if (reel1Result === reel2Result && reel2Result === reel3Result) {
        winAmount = betAmount * 5;
        userChips += winAmount;
        swal('¡Felicidades!', `¡Has ganado ${winAmount} fichas en tragamonedas!`, 'success');
      } else {
        swal('Lo siento', 'Has perdido la apuesta en tragamonedas.', 'error');
      }

      localStorage.setItem('userChips', JSON.stringify(userChips));
      updateChipsBalance();
    }, 3000);
  };

  document.getElementById('spinSlot').addEventListener('click', playSlotGame);
});



// Ruleta


document.addEventListener('DOMContentLoaded', () => {
  const playGameButtons = document.querySelectorAll('.play-game');
  const closeModalButtons = document.querySelectorAll('.close');
  const userChipsBalanceElement = document.getElementById('userChipsBalance');
  let userChips = JSON.parse(localStorage.getItem('userChips')) || 0;

  const updateChipsBalance = () => {
    userChipsBalanceElement.textContent = `Tus Fichas: ${userChips}`;
  };

  updateChipsBalance();

  const openModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'block';
  };

  const closeModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'none';
  };

  playGameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      openModal(game);
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      closeModal(game);
    });
  });

  const spinRoulette = () => {
    const betAmount = parseInt(document.getElementById('betAmountRoulette').value, 10);
    const betNumber = parseInt(document.getElementById('betNumber').value, 10);

    if (userChips < betAmount) {
      swal('Error', 'No tienes suficientes fichas para jugar.', 'error');
      return;
    }

    userChips -= betAmount;
    localStorage.setItem('userChips', JSON.stringify(userChips));
    updateChipsBalance();

    const rouletteWheel = document.querySelector('.roulette-wheel');
    const ball = document.querySelector('.ball');
    const randomAngle = Math.floor(Math.random() * 360);
    const duration = 3000;

    // Iniciar la animación de la ruleta
    rouletteWheel.classList.add('spinning');

    setTimeout(() => {
      rouletteWheel.classList.remove('spinning');

      ball.style.transition = `transform 0s`;
      ball.style.transform = `rotate(${randomAngle}deg)`;

      const resultNumber = Math.floor(randomAngle / 10);
      let winAmount = 0;

      if (resultNumber === betNumber) {
        winAmount = betAmount * 35;
        userChips += winAmount;
        swal('¡Felicidades!', `¡Has ganado ${winAmount} fichas en la ruleta!`, 'success');
      } else {
        swal('Lo siento', `Has perdido la apuesta en la ruleta. El número ganador fue ${resultNumber}.`, 'error');
      }

      localStorage.setItem('userChips', JSON.stringify(userChips));
      updateChipsBalance();
    }, duration);
  };

  document.getElementById('spinRoulette').addEventListener('click', spinRoulette);
});




document.addEventListener('DOMContentLoaded', () => {
  const playGameButtons = document.querySelectorAll('.play-game');
  const closeModalButtons = document.querySelectorAll('.close');
  const userChipsBalanceElement = document.getElementById('userChipsBalance');
  let userChips = JSON.parse(localStorage.getItem('userChips')) || 0;

  const updateChipsBalance = () => {
    userChipsBalanceElement.textContent = `Tus Fichas: ${userChips}`;
    localStorage.setItem('userChips', JSON.stringify(userChips));
  };

  updateChipsBalance();

  const openModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'block';
  };

  const closeModal = (game) => {
    document.getElementById(`${game}Modal`).style.display = 'none';
  };

  playGameButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      openModal(game);
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const game = e.target.dataset.game;
      closeModal(game);
    });
  });

  // Blackjack logic
  const blackjackModal = document.getElementById('blackjackModal');
  const placeBetBlackjackButton = document.getElementById('placeBetBlackjack');
  const hitButton = document.getElementById('hitButton');
  const standButton = document.getElementById('standButton');
  const blackjackChipsElement = document.getElementById('blackjackChips');
  const betAmountBlackjackInput = document.getElementById('betAmountBlackjack');
  const dealerCardsElement = document.getElementById('dealerCards');
  const playerCardsElement = document.getElementById('playerCards');
  const dealerScoreElement = document.getElementById('dealerScore');
  const playerScoreElement = document.getElementById('playerScore');

  let dealerHand = [];
  let playerHand = [];
  let currentBet = 0;

  const updateBlackjackChips = () => {
    blackjackChipsElement.textContent = `Fichas: ${userChips}`;
  };

  const getCardValue = (card) => {
    if (['J', 'Q', 'K'].includes(card.rank)) return 10;
    if (card.rank === 'A') return 11;
    return parseInt(card.rank, 10);
  };

  const calculateHandValue = (hand) => {
    let value = hand.reduce((acc, card) => acc + getCardValue(card), 0);
    let aceCount = hand.filter(card => card.rank === 'A').length;
    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount -= 1;
    }
    return value;
  };

  const renderHand = (hand, element) => {
    element.innerHTML = '';
    hand.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      cardElement.textContent = `${card.rank} of ${card.suit}`;
      element.appendChild(cardElement);
    });
  };

  const startBlackjackGame = () => {
    dealerHand = [];
    playerHand = [];
    currentBet = parseInt(betAmountBlackjackInput.value, 10);

    if (userChips < currentBet) {
      swal('Error', 'No tienes suficientes fichas para jugar.', 'error');
      return;
    }

    userChips -= currentBet;
    updateChipsBalance();
    updateBlackjackChips();

    dealerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
    playerHand.push(getRandomCard());
    playerHand.push(getRandomCard());

    renderHand(dealerHand, dealerCardsElement);
    renderHand(playerHand, playerCardsElement);

    dealerScoreElement.textContent = `Puntos: ${calculateHandValue(dealerHand)}`;
    playerScoreElement.textContent = `Puntos: ${calculateHandValue(playerHand)}`;

    hitButton.disabled = false;
    standButton.disabled = false;
  };

  const getRandomCard = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return { suit: suits[Math.floor(Math.random() * suits.length)], rank: ranks[Math.floor(Math.random() * ranks.length)] };
  };

  const playerHit = () => {
    playerHand.push(getRandomCard());
    renderHand(playerHand, playerCardsElement);
    playerScoreElement.textContent = `Puntos: ${calculateHandValue(playerHand)}`;

    if (calculateHandValue(playerHand) > 21) {
      hitButton.disabled = true;
      standButton.disabled = true;
      swal('Lo siento', 'Te pasaste de 21 puntos. Has perdido la apuesta.', 'error');
    }
  };

  const playerStand = () => {
    hitButton.disabled = true;
    standButton.disabled = true;

    while (calculateHandValue(dealerHand) < 17) {
      dealerHand.push(getRandomCard());
    }

    renderHand(dealerHand, dealerCardsElement);
    dealerScoreElement.textContent = `Puntos: ${calculateHandValue(dealerHand)}`;

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      userChips += currentBet * 2;
      swal('¡Felicidades!', `Has ganado ${currentBet * 2} fichas en el Blackjack.`, 'success');
    } else if (playerValue === dealerValue) {
      userChips += currentBet;
      swal('Empate', 'Has empatado con el dealer. Recuperas tu apuesta.', 'info');
    } else {
      swal('Lo siento', 'El dealer ha ganado. Has perdido la apuesta.', 'error');
    }

    updateChipsBalance();
    updateBlackjackChips();
  };

  placeBetBlackjackButton.addEventListener('click', startBlackjackGame);
  hitButton.addEventListener('click', playerHit);
  standButton.addEventListener('click', playerStand);
});
