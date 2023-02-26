const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];

async function startProgram() {
    let data = await inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which team member will you like to add?",
                choices: ["Manager", "Engineer", "Intern"],
            },
            {
                type: "input",
                name: "name",
                message: "What's the employee's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What's the employee's id number",
            },
            {
                type: "input",
                name: "email",
                message: "What is the employee's email address?",
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your office number?",
                when(answers) {
                    return answers.employee === "Manager";
                },
            },
            {
                type: "input",
                name: "gitHub",
                message: "What is your gitHub username?",
                when(answers) {
                    return answers.employee === "Engineer";
                },
            },
            {
                type: "input",
                name: "school",
                message: "What school do you attend?",
                when(answers) {
                    return answers.employee === "Intern";
                },
            },
            {
                type: "confirm",
                name: "askAgain",
                message: "Want to enter another employee's detail? (just hit enter for YES)?",
                default: true,
            },
        ]);

    const manager1 = new Manager(data.name, data.id, data.email, data.officeNumber);
    const engineer1 = new Engineer(data.name, data.id, data.email, data.gitHub);
    const intern1 = new Intern(data.name, data.id, data.email, data.school);
    // const manager = (new Manager(input.name, input.id, input.email, input.officeNumber));

    team.push(manager1);
    team.push(engineer1);
    team.push(intern1);
        // team.push();

    let htmlDoc = render(team)

    await fs.writeFile(outputPath, htmlDoc);
}

startProgram();