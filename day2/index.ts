import * as fs from "fs";

const input = fs.readFileSync("./day2/input.txt", "utf-8");

// Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock
// opponent : A = rock, B = paper, C = scissors
// me : X = rock, Y = paper, Z = scissors
// points : score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) + score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)
enum Move {
    ROCK = 1,
    PAPER = 2,
    SCISSORS = 3,
}

const opponentMoves: { [code: string]: number } = {
    A: Move.ROCK,
    B: Move.PAPER,
    C: Move.SCISSORS,
};

const myMoves: { [code: string]: number } = {
    X: Move.ROCK,
    Y: Move.PAPER,
    Z: Move.SCISSORS,
};

enum Outcome {
    LOSS = 0,
    DRAW = 3,
    WIN = 6,
}

const guide: string[][] = input
    .split("\n")
    .slice(0, -1)
    .map((round: string) => round.split(" "));

// PART 1
let score = 0;
for (const round of guide) {
    const opponentMove = opponentMoves[round[0]];
    const myMove = myMoves[round[1]];

    score += myMove;
    if (myMove === opponentMove) {
        score += Outcome.DRAW;
    } else if (
        (myMove === Move.ROCK && opponentMove === Move.SCISSORS) ||
        (myMove === Move.SCISSORS && opponentMove === Move.PAPER) ||
        (myMove === Move.PAPER && opponentMove === Move.ROCK)
    ) {
        score += Outcome.WIN;
    } else {
        score += Outcome.LOSS;
    }
}
console.log("Score part 1 = " + score);

// PART 2
// second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
const desiredOutcomes: { [code: string]: number } = {
    X: Outcome.LOSS,
    Y: Outcome.DRAW,
    Z: Outcome.WIN,
};

score = 0;
for (const round of guide) {
    const opponentMove = opponentMoves[round[0]];
    const desiredOutcome = desiredOutcomes[round[1]];

    score += desiredOutcome;

    if (desiredOutcome === Outcome.DRAW) {
        score += opponentMove;
    } else if (desiredOutcome === Outcome.WIN) {
        if (opponentMove === Move.PAPER) score += Move.SCISSORS;
        if (opponentMove === Move.ROCK) score += Move.PAPER;
        if (opponentMove === Move.SCISSORS) score += Move.ROCK;
    } else {
        if (opponentMove === Move.PAPER) score += Move.ROCK;
        if (opponentMove === Move.ROCK) score += Move.SCISSORS;
        if (opponentMove === Move.SCISSORS) score += Move.PAPER;
    }
}
console.log("Score part 2 = " + score);
