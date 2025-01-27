const numCards = 52;
const suits = ["hearts", "spades", "clubs", "diamonds"];
const cardsPerSuit = numCards / suits.length;
const numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

let deck = [];

function generateAllCards() {
  for (let i = 0; i < numCards; i++) {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    deck.push(card);
  }

  addSuitsAndNumbers(deck);
}

function addSuitsAndNumbers(deck) {
  let cardsInSuit = 0;
  let currentSuit = 0;

  for (let i = 0; i < deck.length; i++) {
    if (cardsInSuit == cardsPerSuit) {
      currentSuit++;
      cardsInSuit = 0;
    }

    if (cardsInSuit < cardsPerSuit) {
      deck[i].classList.add(suits[currentSuit]);
      deck[i].classList.add(numbers[cardsInSuit]);

      deck[i].suit = suits[currentSuit];
      deck[i].val = numbers[cardsInSuit];

      cardsInSuit++;
    }
  }
  createCards(deck);
  appendCards(deck);
}

function createCards(deck) {
  deck.forEach((element, index) => {
    let valueText = document.createElement("h1");
    let suitText = document.createElement("h1");

    if (element.suit == "hearts") {
      suitText.innerHTML = "&#9829";
      element.style = "color: red";
    } else if (element.suit == "spades") {
      suitText.innerHTML = "&#9824";
    } else if (element.suit == "clubs") {
      suitText.innerHTML = "&#9827";
    } else {
      suitText.innerHTML = "&#9830";
      element.style = "color: red";
    }

    valueText.innerHTML = element.val;

    element.append(valueText);
    element.append(suitText);
  });
}

function appendCards(cards) {
  let container = document.getElementById("cardContainer");
  container.innerHTML = '';

  cards.forEach((card, index) => {
    card.style = "left: " + index * 5 + "px";
    container.append(card);
  });
}

generateAllCards();

document.getElementById("shuffleBtn").addEventListener("click", shuffleCards);
document.getElementById("dealBtn").addEventListener("click", dealHand);
document.getElementById("resetBtn").addEventListener("click", resetDeck)

function shuffleCards() {
  let container = document.getElementById("cardContainer");
  container.innerHTML = "";

  deck.sort(() => Math.random() - 0.5);
  appendCards(deck);
}

function dealHand() {
  if (deck.length < 5) return;

  let deckContainer = document.getElementById("cardContainer");
  let handContainer = document.getElementById("handContainer");

  handContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    let card = deck.pop();
    deckContainer.removeChild(card);
    handContainer.append(card);
    card.style = "left: " + i * 50 + "px";
  }
}

function resetDeck() {
    deck = [];
    document.getElementById("cardContainer").innerHTML = '';
    document.getElementById("handContainer").innerHTML = '';

    generateAllCards();
}
