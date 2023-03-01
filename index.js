const Manager = require("./lib/Manager");
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


function teamQuestion() {
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which team member will you like to add?",
            choices: ["Add an engineer", "Add an intern", "Finish building"],
        },
    ])
        .then(function (response) {
            if (response.employee === "Add an engineer") {
                engineer()

            }
            else if (response.employee === "Add an intern") {
                intern()

            } else {
                buildTeam()
            }
        })

}


async function managerInfo() {
    let managerData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What's the manager's id number",
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?",
        },
        {
            type: "confirm",
            name: "askAgain",
            message: "Do you want to enter another employee's detail? (just hit enter for YES)?",
            default: true,
        },


    ])
    const manager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officeNumber);
    team.push(manager);
    teamQuestion()
}


async function engineer() {
    let engineerData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What's the engineer's id number",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?",
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is the engineer's gitHub username?",
        },
        {
            type: "confirm",
            name: "askAgain",
            message: "Do you want to enter another employee's detail? (just hit enter for YES)?",
            default: true,
        },

    ])

    const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.gitHub);
    team.push(engineer);
    teamQuestion();

}


async function intern() {
    let internData = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What's the intern's id number",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?",
        },
        {
            type: "input",
            name: "school",
            message: "What school does the intern attend?",
        },
        {
            type: "confirm",
            name: "askAgain",
            message: "Do you want to enter another employee's detail? (just hit enter for YES)?",
            default: true,
        },
    ]);

    const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
    team.push(intern);
    teamQuestion();
}

async function buildTeam() {
    let htmlDoc = render(team)

    await fs.writeFile(outputPath, htmlDoc);
}

managerInfo();