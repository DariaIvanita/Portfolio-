const gameBoard = document.getElementById('game-board');
const movesCounter = document.getElementById('moves');

let firstCard = null;
let secondCard = null;
let moves = 0;
let matches = 0;
const maxMoves = 5; // Maximum moves allowed to win

// Portfolio pieces (or colors) for matching
const portfolioPieces = [
    '🖥️', '🖥️',
    '📱', '📱',
    '🎨', '🎨',
    '📸', '📸',
    '💼', '💼',
    '🌐', '🌐',
    '📊', '📊',
    '📝', '📝'
];

// Shuffle the portfolio pieces
const shuffledPieces = portfolioPieces.sort(() => 0.5 - Math.random());

// Create card elements
shuffledPieces.forEach(piece => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-symbol', piece);  // Assign the symbol to be visible on flip
    card.textContent = piece;

    // Add click event to flip the card
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
});

function flipCard(card) {
    // Ignore clicks if card is already flipped or matched
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    moves++;
    movesCounter.textContent = `Moves: ${moves}`;
    
    if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches += 1;
        resetCards();

        if (matches === portfolioPieces.length / 2) {
            setTimeout(() => alert("Congratulations! You've matched all pairs! 🎉"), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);

        if (moves >= maxMoves) {
            setTimeout(() => alert("Game Over! You exceeded the maximum moves."), 500);
            resetGame();
        }
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
}

function resetGame() {
    moves = 0;
    matches = 0;
    movesCounter.textContent = `Moves: ${moves}`;

    // Reset all cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    // Reshuffle the board
    const shuffledAgain = portfolioPieces.sort(() => 0.5 - Math.random());
    const cards = document.querySelectorAll('.card');
    shuffledAgain.forEach((piece, index) => {
        cards[index].setAttribute('data-symbol', piece);
        cards[index].textContent = piece;
    });
}

