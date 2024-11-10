const words = ["кики", "куче", "хтмл", "книга", "време", "дома", "мајка", "татко", "среќа", "тага"];
let selectedWord = "";
let revealedLetters = [];
let attemptsLeft = 5;

function startGame() {
    // Resetiraj ja igrata
    selectedWord = words[Math.floor(Math.random() * words.length)];
    revealedLetters = getRandomLetters(selectedWord); 
    attemptsLeft = 5;

    document.getElementById("revealed-letters").textContent = revealedLetters.join(" ");
    document.getElementById("attempts-left").textContent = attemptsLeft;
    updateWordDisplay();
    document.getElementById("restart-btn").style.display = "none";
}

function getRandomLetters(word) {
    let randomIndex1 = Math.floor(Math.random() * word.length);
    let randomIndex2;
    do {
        randomIndex2 = Math.floor(Math.random() * word.length);
    } while (randomIndex1 === randomIndex2);

    // Pocetno otkrij dve bukvi
    let letters = Array(word.length).fill("_");
    letters[randomIndex1] = word[randomIndex1];
    letters[randomIndex2] = word[randomIndex2];

    return letters;
}

function updateWordDisplay() {
    // Azuriraj go prikazuvanjeto na zborot so vekje pogodenite bukvi
    let display = "";
    for (let i = 0; i < selectedWord.length; i++) {
        display += revealedLetters[i] + " ";
    }
    document.getElementById("word-container").textContent = display.trim();
}
//Proveri dali bukvata e vo zborot
function checkLetter() {
    const inputLetter = document.getElementById("letter-input").value.toLowerCase();
    document.getElementById("letter-input").value = "";

    if (inputLetter && inputLetter.length === 1) {
        let found = false;

        for (let i = 0; i < selectedWord.length; i++) {
            // Ako bukvata e vo zborot i ne e vekje otkriena
            if (selectedWord[i] === inputLetter && revealedLetters[i] === "_") {
                revealedLetters[i] = inputLetter;
                found = true;
            }
        }

        // Ako bukvata ne e vo zborot
        if (!found) {
            attemptsLeft--;
            document.getElementById("attempts-left").textContent = attemptsLeft;
        }

        updateWordDisplay();

        // Proverka dali igracot go pogodil zborot
        if (!revealedLetters.includes("_")) {
            alert("Честитки! Го погодивте зборот!");
            endGame();
        } else if (attemptsLeft === 0) {
            alert("Играта е неуспешна. Зборот беше: " + selectedWord);
            endGame();
        }
    }
}

function endGame() {
    document.getElementById("restart-btn").style.display = "inline-block";
}

startGame();
