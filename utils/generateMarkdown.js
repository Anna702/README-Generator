// function to generate markdown for README
function generateMarkdown(data) {
  let readmeContent = `
  # ${data.title} ${data.addLicense}
`;
  if (data.tableOfContents) {
    readmeContent += `## Contents
`;

    if (data.hasDescription)
      readmeContent += `* [Description](#description)
`;
    if (data.userStory)
      readmeContent += `* [User story](#user%20story)
`;
    if (data.installation)
      readmeContent += `* [Installation](#installation)
`;
    if (data.usage)
      readmeContent += `* [Usage](#usage)
`;
    if (data.tests)
      readmeContent += `* [Tests](#tests) 
`;
    if (data.credits)
      readmeContent += `* [Credits](#credits)
`;
    readmeContent += `* [Questions](#questions)
`;
    if (data.email || data.gitHub || data.linkedIn)
      readmeContent += `* [Contacts](#contacts)`;
  }

  if (data.hasDescription) {
    readmeContent += `
## Description:
${data.description} 
${data.whyCreated}`;
  }

  if (data.userStory) {
    readmeContent += `
## User story
\`\`\`
${data.userStory}
\`\`\``;
  }

  if (data.wasDeployed && data.deployed) {
    readmeContent += `
## Deployed app: 
[Click here](${data.deployed}) to see the live ${data.title} app.
`;
  }

  if (data.installation)
    readmeContent += `
## Installation
${data.installation}
`;

  if (data.usage)
    readmeContent += `
## Usage
${data.usage}
`;

  if (data.tests)
    readmeContent += `
## Tests
${data.tests}
`;

  if (data.credits)
    readmeContent += `
## Credits
${data.credits}
`;

  readmeContent += `
## Questions

In case you have any questions, feel free to contact me at 
<a href="mailto:${data.email}">${data.email}</a>.
`;

  if (data.gitHub || data.linkedIn) {
    readmeContent += `
## Contacts:

`;
    if (data.gitHub)
      readmeContent += `* GitHub: [${data.gitHub}](https://github.com/${data.gitHub})
    
`;
    if (data.linkedIn)
      readmeContent += `* LinkedIn: [${data.linkedIn}](https://www.linkedin.com/in/${data.linkedIn})   
`;
  }

  return readmeContent;
}

module.exports = generateMarkdown;
