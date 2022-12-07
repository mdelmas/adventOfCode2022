import * as fs from "fs";

const input = fs.readFileSync("./day1/input.txt", "utf-8");

const caloriesPerElves = input
    .split("\n\n")
    .map((list) =>
        list
            .split("\n")
            .map((item) => parseInt(item))
            .reduce((totalValue, currentValue) => totalValue + currentValue, 0)
    )
    .filter((total) => !Number.isNaN(total))
    .sort((a, b) => b - a);

// PART 1
console.log("Answer part 1 : " + caloriesPerElves[0]);

// PART 2
console.log(
    "Answer part 2 : " +
        caloriesPerElves
            .slice(0, 3)
            .reduce((totalValue, currentValue) => totalValue + currentValue, 0)
);
