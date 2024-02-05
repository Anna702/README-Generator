const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const path = require("path");

inquirer
  .prompt([
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
  ])
  .then((resp) => {
    console.log(resp);

    const folderPath = "./created-README/";
    const fileName = path.join(
      folderPath,
      `${resp.title.replace(/\s+/g, "-").toLowerCase()}_README.md`
    );

    //creating a new readme file
    fs.writeFile(fileName, generateMarkdown(resp), (err) => {
      err
        ? console.log("Error writing the README file:", err)
        : console.log(`Your README file '${fileName}' successfully created.`);
    });
  });

//function checks if the input is not empty
function validInput(input) {
  return input.trim() !== "" || "Please answer the question with any data.";
}

//function add a badge according to a chosed license
function getALicenseBadge() {}
