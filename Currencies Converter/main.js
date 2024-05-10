#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import fetch from "node-fetch";
import { API_KEY } from "./config.js";
console.log(chalk.bgWhite.blueBright.bold.italic("\n \t Welcome to Currency Converter App \n"));
console.log(chalk.gray.bold("=".repeat(70)));
let apiLink = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;
//fetching data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let response = await fetchData.json();
    return response.conversion_rates;
};
(async () => {
    try {
        let data = await fetchData(apiLink);
        // Converting object into an array
        let countries = Object.keys(data);
        const firstCountry = await inquirer.prompt([
            {
                name: "name",
                type: "list",
                choices: countries,
                message: chalk.cyanBright.bold("Select the Currency to Convert From : ")
            },
        ]);
        let amount = await inquirer.prompt([
            {
                name: "amount",
                type: "input",
                message: chalk.cyanBright(`Enter the Amount to Convert in ${firstCountry.name} :  `)
            },
        ]);
        const secondCountry = await inquirer.prompt([
            {
                name: "name",
                type: "list",
                choices: countries,
                message: chalk.cyanBright.bold("Select the Currency to Convert into : ")
            },
        ]);
        // Conversion rate
        let conversion = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${firstCountry.name}/${secondCountry.name}`;
        // Fetching Data for conversion rate
        let conversion_Data = async (data) => {
            let conversion_Data = await fetch(data);
            let response = await conversion_Data.json();
            return response.conversion_rate;
        };
        let conversionRate = await conversion_Data(conversion);
        let answer = amount.amount * conversionRate;
        console.log(chalk.bgGray.yellow.bold.italic(`Your ${firstCountry.name} Currency in ${secondCountry.name} is :${answer}`));
    }
    catch (error) {
        console.error(chalk.bgRed.white.bold('Error:', error));
    }
})();
