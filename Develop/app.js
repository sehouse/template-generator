const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



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
        name: `name`,
        message: `Please input the first and last name of the Manager:`
    },
    {
        type: `input`,
        name: `id`,
        message: `Please input the employee ID number of the Manager:`
    },
    {
        type: `input`,
        name: `email`,
        message: `Please input the company email address of the Manager:`
    },
    {
        type: `input`,
        name: `officeNumber`,
        message: `Please input the office number of the Manager:`
    }
];

const questionsEngineer = [
    {
        type: `input`,
        name: `name`,
        message: `Please input the first and last name of the Engineer:`
    },
    {
        type: `input`,
        name: `id`,
        message: `Please input the employee ID number of the Engineer:`
    },
    {
        type: `input`,
        name: `email`,
        message: `Please input the company email address of the Engineer:`
    },
    {
        type: `input`,
        name: `github`,
        message: `Please input the GitHub username of the Engineer:`
    }
];

const questionsIntern = [
    {
        type: `input`,
        name: `name`,
        message: `Please input the first and last name of the Intern:`
    },
    {
        type: `input`,
        name: `id`,
        message: `Please input the employee ID number of the Intern:`
    },
    {
        type: `input`,
        name: `email`,
        message: `Please input the company email address of the Intern:`
    },
    {
        type: `input`,
        name: `school`,
        message: `Please input the name of the school the Intern attends:`
    }
];

const employees = [];

const addEmployee = async () => {
    await inquirer
        .prompt(questionsStart)
        .then(async (response) => {
            if (response.employeePosition === `Manager`) {
                await addManager();
            } else if (response.employeePosition === `Engineer`) {
                await addEngineer();

            } else if (response.employeePosition === `Intern`) {
                await addIntern();
            };
        });
}

const addAnother = async () => {
    await inquirer
        .prompt(questionsContinue)
        .then(async (response) => {
            if (response.confirm === true) {
                await addEmployee();
            };
        });
};

const addManager = async () => {
    await inquirer
        .prompt(questionsManager)
        .then(async (response) => {
            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officeNumber
            );
            employees.push(manager);
        });
   await addAnother();
}

const addEngineer = async () => {
    await inquirer
        .prompt(questionsEngineer)
        .then(async (response) => {
            const engineer = new Engineer(
                response.name,
                response.id,
                response.email,
                response.github
            );
            employees.push(engineer);
        });
    await addAnother();
};

const addIntern = async () => {
    await inquirer
        .prompt(questionsIntern)
        .then(async (response) => {
            const intern = new Intern(
                response.name,
                response.id,
                response.email,
                response.school
            );
            employees.push(intern);
        });
    await addAnother();
};
const init = async () => {
    await addEmployee();
    await createHTML();
};

const createHTML = async () => {
    const htmlRender = await render(employees);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, htmlRender, (err) => {
        if (err) {
            throw err;
        };
    });
}
init();