const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const path = require("path");

const userQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: validInput,
  },
  {
    type: "confirm",
    name: "tableOfContents",
    message: "Do you want to include a Table of Contents?",
    default: true,
  },
  {
    type: "confirm",
    name: "hasDescription",
    message: "Do you want to provide a description for your project?",
  },
  {
    //if the user chooses not to provide a description (by answering "no" to the hasDescription question above), this question will be skipped.
    type: "input",
    name: "description",
    message: "Provide a short description of your project",
    when: (answers) => answers.hasDescription,
    validate: validInput,
  },
  {
    //if the user chooses not to provide a description (by answering "no" to the hasDescription question above), this question will be skipped.
    type: "input",
    name: "whyCreated",
    message: "Why did you create this project?",
    when: (answers) => answers.hasDescription,
  },
  {
    type: "list",
    name: "license",
    message: "Select a license for your project:",
    choices: [
      "MIT",
      "BSD 3-Clause",
      "BSD 2-Clause",
      "Apache 2.0",
      "ISC",
      "GPLv3",
      "None",
    ],
  },
  {
    type: "confirm",
    name: "hasUserStory",
    message: "Do you want to include a User Story?",
  },
  {
    type: "input",
    name: "userStory",
    message:
      "Write a User Story using the pattern As A <type of user>, I WANT <what?> SO THAT <why?>",
    when: (answers) => answers.hasUserStory,
  },
  {
    type: "confirm",
    name: "wasDeployed",
    message: "Is your app deployed?",
    default: false,
  },
  {
    type: "input",
    name: "deployed",
    message: "Provide a link for an app",
    when: (answers) => answers.wasDeployed,
  },
  {
    type: "input",
    name: "installation",
    message: "Provide a step-by-step guide for the installation process",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide a step-by-step guide on how to utilize the application.",
  },
  {
    type: "input",
    name: "tests",
    message:
      "Do you have any automated tests for critical functionalities? Please, tell some more:",
  },
  {
    type: "input",
    name: "credits",
    message: "List the main contributors to the project",
  },
  {
    type: "input",
    name: "email",
    message: "What is your contact email?",
  },
  {
    type: "input",
    name: "gitHub",
    message: "What is your gitHub name?",
    validate: validInput,
  },
  {
    type: "input",
    name: "linkedIn",
    message: "What is your LinkedIn profile?",
  },
];

//function to write info into the README file
function writeFile(fileName, data) {
  fs.writeFile(fileName, generateMarkdown(data), (err) => {
    err
      ? console.log("Error writing the README file:", err)
      : console.log(`Your README file '${fileName}' successfully created.`);
  });
}

//function checks if the input is not empty
function validInput(input) {
  //The trim() method removes whitespace from both ends of this string and returns a new string without modifying.
  return input.trim() !== "" || "Please answer the question with any data.";
}

//function add a badge according to a chosed license
function addALicenseBadge(license) {
  if (license === "MIT") {
    return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
  } else if (license === "BSD 3-Clause") {
    return `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
  } else if (license === "BSD 2-Clause") {
    `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
  } else if (license === "Apache 2.0") {
    return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
  } else if (license === "ISC") {
    return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
  } else if (license === "GPLv3") {
    return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
  } else if (license === "None") {
    return `[![License: no](https://img.shields.io/badge/no_license-blue.svg)](https://img.shields.io/badge/no_license-blue)`;
  }
}

// function to initalize the CLI app
async function init() {
  const data = await inquirer.prompt(userQuestions);
  data.addLicense = addALicenseBadge(data.license);
  const folderPath = "./created-README/";
  const fileName = path.join(
    folderPath,
    `${data.title.replace(/\s+/g, "-").toLowerCase()}_README.md`
  );
  writeFile(fileName, data);
}

//calling init() to start the app
init();
