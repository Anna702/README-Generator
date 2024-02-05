// function to generate markdown for README
function generateMarkdown(data) {
  return `
  # Project Title: 
  ${data.title} 
  ${
    data.hasDescription
      ? `
# Description:
${data.description}

## This project was created:  
${data.whyCreated}`
      : ""
  }
  # Table of Contents
    * [Installation](#-Installation)
    * [Usage](#-Usage)
    * [License](#-Installation)
    * [Contributing](#-Contributing)
    * [Tests](#-Tests)
    * [Questions](#-Contact-Information)

`;
}

module.exports = generateMarkdown;
