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
    },
    {
      type: "confirm",
      name: "hasDescription",
      message: "Do you want to provide a description for your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Can you provide a short description of your project?",
      when: (answers) => answers.hasDescription,
    },
    {
      type: "input",
      name: "whyCreated",
      message: "Why did you create this project?",
      when: (answers) => answers.hasDescription,
    },
  ])
  .then((resp) => {
    console.log(resp);
    // const readmeData = generateMarkdown(data);
    const folderPath = "./created-README/";
    const fileName = path.join(
      folderPath,
      `${resp.title.replace(/\s+/g, "-").toLowerCase()}_README.md`
    );

    fs.writeFile(fileName, JSON.stringify(resp), (err) => {
      err
        ? console.log("Error writing the README file:", err)
        : console.log(`Your README file '${fileName}' successfully created.`);
    });
  });
