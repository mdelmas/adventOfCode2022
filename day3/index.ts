import * as fs from "fs";

const input = fs.readFileSync("./day3/input.txt", "utf-8");
const rucksacks = input.split("\n");

function getItemValues(item: string): number {
    const charCode = item.charCodeAt(0);
    if (charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0)) {
        return charCode - "a".charCodeAt(0) + 1;
    }
    return charCode - "A".charCodeAt(0) + 27;
}
let items = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

// PART 1
let prioritiesSum = 0;
rucksacks.forEach((rucksack) => {
    const compartment1 = rucksack.slice(0, rucksack.length / 2);
    const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length);

    for (let item of compartment1) {
        if (compartment2.includes(item)) {
            prioritiesSum += items.indexOf(item);
            break;
        }
    }
});
console.log("Answer part 1 : ", prioritiesSum);

// PART 2
prioritiesSum = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
    const rucksack1 = rucksacks[i];
    const rucksack2 = rucksacks[i + 1];
    const rucksack3 = rucksacks[i + 2];

    for (let item of rucksack1) {
        if (rucksack2.includes(item) && rucksack3.includes(item)) {
            prioritiesSum += items.indexOf(item);
            break;
        }
    }
}
console.log("Answer part 2 : ", prioritiesSum);
