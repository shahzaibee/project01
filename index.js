import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const MIN_NUMBER = 1;
const MAX_NUMBER = 10;
const NUM_ROUNDS = 3;
let score = 0;
function playRound() {
    const secretNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    let guessesRemaining = 3;
    console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}...`);
    rl.on("line", (input) => {
        const guess = parseInt(input, 10);
        if (isNaN(guess)) {
            console.log("That's not a number!");
            rl.prompt();
        }
        else if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
            console.log(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
            rl.prompt();
        }
        else if (guess === secretNumber) {
            console.log("You got it!");
            score++;
            playNextRound();
        }
        else {
            guessesRemaining--;
            if (guessesRemaining === 0) {
                console.log(`Sorry, you didn't get it. The number was ${secretNumber}.`);
                playNextRound();
            }
            else {
                console.log(`Nope, try again! You have ${guessesRemaining} guesses remaining.`);
                rl.prompt();
            }
        }
    });
}
function playNextRound() {
    if (score === NUM_ROUNDS) {
        console.log("Game over! Your final score was", score);
        rl.close();
    }
    else {
        console.log(`Your score is ${score}. Let's play again!`);
        playRound();
    }
}
playRound();
