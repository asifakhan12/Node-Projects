import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 1000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // method to enroll a student
    enroll_courses(courses) {
        this.courses.push(courses);
    }
    // method to view a student balance
    check_balance() {
        console.log(chalk.bgWhite.red(`Balance for ${this.name} : $${this.balance}`));
    }
    // method to pay student fee
    fee_amount(amount) {
        this.balance -= amount;
        console.log(chalk.bgWhite.red(`$${amount} Amount Fee Paid Successfully for: ${this.name}`));
    }
    //method for dispaly student
    show_status() {
        console.log(chalk.bgBlue.cyan(`ID : ${this.id}`));
        console.log(chalk.bgBlue.cyan(`Name : ${this.name}`));
        console.log(chalk.bgBlue.cyan(`Course : ${this.courses}`));
        console.log(chalk.bgBlue.cyan(`Balance : ${this.balance}`));
    }
}
// class manage a student
class Student_manage {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.bgWhite.red(`Student :${name} Added successfully.Student ID :${student.id}`));
    }
    // method to enroll a student
    enroll_std(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_courses(course);
            console.log(chalk.bgWhite.red(`${Student.name} Enroll in ${course} Successful!`));
        }
    }
    // method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.check_balance();
        }
        else {
            console.log(chalk.red.bold.italic("Student is Not Found. Please Enter a Correct Student ID"));
        }
    }
    //method to pay student Fee
    pay_std_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.fee_amount(amount);
        }
        else {
            console.log(chalk.red.bold.italic("Student is Not Found. Please Enter a Correct Student ID"));
        }
    }
    // method to display fee status
    show_std_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // method to find a student by its id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// main function to run a program
async function main() {
    console.log(chalk.bgWhite.blue.bold.italic("\n \t\t\t Welcome to Student Management System \n"));
    console.log(chalk.cyanBright.bold("=".repeat(70)));
    let student_manage = new Student_manage();
    // while loop to running a program
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.bgWhite.black.bold("Select an Option"),
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            },
        ]);
        // using switch case statement for user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.bgWhite.blackBright.bold("Enter a Student Name :")
                    }
                ]);
                student_manage.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bgWhite.blackBright.bold("Enter a student ID :")
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.bgWhite.blackBright.bold("Enter a student course :")
                    }
                ]);
                student_manage.enroll_std(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bgWhite.blackBright.bold("Enter a student id :")
                    }
                ]);
                student_manage.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bgWhite.blackBright.bold("Enter a student ID :")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.bgWhite.blackBright.bold("Enter a student amount :")
                    }
                ]);
                student_manage.pay_std_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bgWhite.blackBright.bold("Enter a student ID :")
                    },
                ]);
                student_manage.show_std_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.bgRed.whiteBright("Exiting..."));
                process.exit();
        }
    }
}
// calling a main function
main();
