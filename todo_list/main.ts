import chalk from "chalk";
import inquirer from "inquirer"
let todo_list = [];
let condition = true;

console.log(chalk.cyan.bold.italic("\n \t  Welcome to your To-Do List \n"));
while(condition){
    let todoTask =await inquirer.prompt([{
        name:"task",
        type:"input",
        message:"Enter a New Task :"
    }])
    todo_list.push(todoTask.task)
    console.log(chalk.green.bold(`${todoTask.task} Task added Successfully`));
    let more =await inquirer.prompt([{
        name:"moreTask",
        type:"confirm",
        default:"false",
        message:"Do you want to add more task"
    }])
    condition =more.moreTask

}
console.log(chalk.bgWhite.black.bold("your updated TODO List :", todo_list));
