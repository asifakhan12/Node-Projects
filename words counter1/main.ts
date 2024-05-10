import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue.bold("~".repeat(70)));
console.log(chalk.cyan.bold.italic("\n \t\t\t Welcome to Word Counter \n"));
console.log(chalk.blue.bold("~".repeat(70)));

const answer = await inquirer.prompt([
    {
        name: "sentence",
        type: "input",
        message: chalk.bgWhite.bold("\n Enter your Sentence"),
    }
]);

const sentence = answer.sentence.trim();
const words = sentence.split(" ");
const wordCount = words.length;
const charCount = sentence.length;

// Count word frequency
const wordFrequency: { [key: string]: number } = {};
words.forEach((word: string) => { // Specify 'word' as type string
    if (word in wordFrequency) {
        wordFrequency[word]++;
    } else {
        wordFrequency[word] = 1;
    }
});

// Find the most frequent word
let mostFrequentWord = "";
let maxFrequency = 0;
for (const word in wordFrequency) {
    if (wordFrequency[word] > maxFrequency) {
        mostFrequentWord = word;
        maxFrequency = wordFrequency[word];
    }
}

console.log(chalk.yellow.bold("-".repeat(70)));
console.log("=> Sentence Words: \n");
console.log(words);
console.log(chalk.yellow.bold("-".repeat(70)));

console.log(chalk.bgRed.yellow.bold.italic(`Word count is : ${wordCount}`));
console.log(chalk.bgBlue.white.bold.italic(`Character count is : ${charCount}       include space in each words`));

console.log(chalk.bgGreen.whiteBright.bold.italic(`Most frequent word is : ${mostFrequentWord}, Frequency: ${maxFrequency}`));

