const choices = document.querySelectorAll(".choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");
const resetButton = document.querySelector(".reset");
const historyTable = document.getElementById("history");
const targetScoreSelect = document.getElementById("target-score");

const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const tieSound = document.getElementById("tie-sound");

let playerScore = 0;
let computerScore = 0;
let round = 0;
let targetScore = parseInt(targetScoreSelect.value);

// Function to get computer choice
function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner
function determineWinner(player, computer) {
    if (player === computer) {
        tieSound.play();
        return "It's a tie!";
    }
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        winSound.play();
        playerScore++;
        return "You win!";
    } else {
        loseSound.play();
        computerScore++;
        return "You lose!";
    }
}

// Function to play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    round++;

    updateHistory(round, playerChoice, computerChoice, result);

    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;

    if (playerScore === targetScore) {
        resultText.textContent = "Congratulations! You won the game!";
        disableChoices();
    } else if (computerScore === targetScore) {
        resultText.textContent = "Game over! The computer wins.";
        disableChoices();
    } else {
        resultText.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. ${result}`;
    }
}

// Function to update match history
function updateHistory(round, playerChoice, computerChoice, result) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${round}</td>
        <td>${playerChoice}</td>
        <td>${computerChoice}</td>
        <td>${result}</td>
    `;
    historyTable.appendChild(newRow);
}

// Function to reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    resultText.textContent = "Make your choice to start the game!";
    historyTable.innerHTML = "";
    enableChoices();
}

// Disable choices
function disableChoices() {
    choices.forEach(choice => choice.setAttribute("disabled", true));
}

// Enable choices
function enableChoices() {
    choices.forEach(choice => choice.removeAttribute("disabled"));
}

// Event listeners
choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.getAttribute("data-choice");
        choice.classList.add("clicked");
        setTimeout(() => choice.classList.remove("clicked"), 500);
        playRound(playerChoice);
    });
});

resetButton.addEventListener("click", resetGame);
targetScoreSelect.addEventListener("change", () => {
    targetScore = parseInt(targetScoreSelect.value);
    resetGame();
});
