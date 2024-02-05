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
    validate: validInput,
  },
  {
    type: "confirm",
    name: "tableOfContents",
    message: "Do you want to include a Table of Contents?",
    default: true,
  },
  {
    type: "list",
    name: "license",
    message: "Select a license for your project:",
    choices: ["MIT", "BSD", "Apache 2.0", "ISC", "GPLv3", "None"],
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
function addALicenseBadge(license) {}

// function to initalize the CLI app
function init() {
  inquirer.prompt(userQuestions).then((data) => {
    // data.addLicense = addALicenseBadge(data.license);
    const folderPath = "./created-README/";
    const fileName = path.join(
      folderPath,
      `${data.title.replace(/\s+/g, "-").toLowerCase()}_README.md`
    );
    writeFile(fileName, data);
  });
}

//calling init() to start the app
init();
