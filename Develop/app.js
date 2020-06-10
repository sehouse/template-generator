const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

const questionsStart = [
    {
        type: `list`,
        name: `employeePosition`,
        message: `What position is the employee whose information you wish to enter?`,
        choices: [`Manager`, `Engineer`, `Intern`]
    }
];

const questionsContinue = [
    {
        type: `confirm`,
        name: `confirm`,
        message: `Would you like to input another employee's information?`
    }
]

const questionsManager = [
    {
        type: `input`,
        name: `managerName`,
        message: `Please input the first and last name of the Manager:`
    },
    {
        type: `input`,
        name: `managerIdNumber`,
        message: `Please input the employee ID number of the Manager:`
    },
    {
        type: `input`,
        name: `managerEmailAddress`,
        message: `Please input the company email address of the Manager:`
    },
    {
        type: `input`,
        name: `managerOfficeNumber`,
        message: `Please input the office number of the Manager:`
    }
];

const questionsEngineer = [
    {
        type: `input`,
        name: `engineerName`,
        message: `Please input the first and last name of the Engineer:`
    },
    {
        type: `input`,
        name: `engineerIdNumber`,
        message: `Please input the employee ID number of the Engineer:`
    },
    {
        type: `input`,
        name: `engineerEmailAddress`,
        message: `Please input the company email address of the Engineer:`
    },
    {
        type: `input`,
        name: `engineerGithubUsername`,
        message: `Please input the GitHub username of the Engineer:`
    }
];

const questionsIntern = [
    {
        type: `input`,
        name: `internName`,
        message: `Please input the first and last name of the Intern:`
    },
    {
        type: `input`,
        name: `internIdNumber`,
        message: `Please input the employee ID number of the Intern:`
    },
    {
        type: `input`,
        name: `internEmailAddress`,
        message: `Please input the company email address of the Intern:`
    },
    {
        type: `input`,
        name: `internSchoolName`,
        message: `Please input the name of the school the Intern attends:`
    }
];

const init = async () => {
    addEmployee();
}

const addEmployee = async () => {
    await inquirer
        .prompt(questionsStart)
        .then(async (response) => {
            if (response.employeePosition === `Manager`) {
                addManager();
            } else if (response.employeePosition === `Engineer`) {
                addEngineer();

            } else if (response.employeePosition === `Intern`) {
                addIntern();
            };
        });
   
};

const addAnother = async () => {
    await inquirer
        .prompt(questionsContinue)
        .then(async (response) => {
            if (response.confirm === true) {
                addEmployee();
            };
        });
};

const addManager = async () => {
    await inquirer
        .prompt(questionsManager)
        .then(async (response) => {
            const employeeManager = new Manager(
                response.managerName,
                response.managerIdNumber,
                response.managerEmailAddress,
                response.managerOfficeNumber
            );
            employeeList.push(employeeManager);
        });
    addAnother();
}

const addEngineer = async () => {
    await inquirer
        .prompt(questionsEngineer)
        .then(async (response) => {
            const employeeEngineer = new Engineer(
                response.engineerName,
                response.engineerIdNumber,
                response.engineerEmailAddress,
                response.engineerOfficeNumber
            );
            employeeList.push(employeeEngineer);
        });
    addAnother();
};

const addIntern = async () => {
    await inquirer
        .prompt(questionsIntern)
        .then(async (response) => {
            const employeeIntern = new Intern(
                response.internName,
                response.internIdNumber,
                response.internEmailAddress,
                response.internOfficeNumber
            );
            employeeList.push(employeeIntern);
        });
    addAnother();
};

init();