const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questionsManager = [
    {
        type: 'input',
        name: 'managerName',
        message: 'Please input the first and last name of the Manager.'
    },
    {
        type: 'input',
        name: 'managerIdNumber',
        message: 'Please input the employee ID number of the Manager.'
    },
    {
        type: 'input',
        name: 'managerEmailAddress',
        message: 'Please input the company email address of the Manager.'
    },
    {
        type: 'input',
        name: 'managerOfficeNumber',
        message: 'Please input the office number of the Manager.'
    }
]