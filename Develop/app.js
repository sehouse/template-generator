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
        type: `list`,
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

