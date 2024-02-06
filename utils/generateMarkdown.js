// function to generate markdown for README
function generateMarkdown(data) {
  return `
  # Title: ${data.title} ${data.addLicense}
    ${
      data.tableOfContents
        ? `## Contents
    - [Description](#description)
    - [User story](#user%20story)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Tests](#tests) 
    - [Credits](#credits)
    - [Questions](#questions)
    - [Contacts](#contacts)`
        : ""
    }
  
  ${
    data.hasDescription
      ? `
## Description:
${data.description} 
${data.whyCreated}`
      : ""
  }

## User story
\`\`\`
${data.userStory}
\`\`\`

${
  data.wasDeployed
    ? `
## Deployed app:
${data.deployed}`
    : ""
}

## Installation
${data.installation}

## Usage
${data.usage}

## Tests
${data.tests}

## Credits
${data.credits}

## Questions

In case you have any questions, feel free to contact me at ${data.email}.

## Contacts:

* GitHub: ${data.gitHub}
* LinkedIn: ${data.linkedIn}
`;
}

module.exports = generateMarkdown;
