const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
    {
            type: "input",
            name: "location",
            message: "Where are you located?"
        },
    {
            type: "input",
            name: "linkedinURL",
            message: "What is your LinkedIn URL?"
        },
    {
            type: "input",
            name: "github",
            message: "What is your GitHub username?"
        }
    ])
}

function generateHTML(response) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>${response.name}'s Portfolio</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${response.name}</h1>
      <p class="lead">I am located in ${response.location}.</p>
      <h3><span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${response.github}</li>
        <li class="list-group-item">LinkedIn: ${response.linkedin}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
}

promptUser()
    .then(function (response) {
        const html = generateHTML(response);

        return writeFileAsync("index.html", html);
    })
    .then(function () {
        console.log("Successfully wrote to index.html");
    })
    .catch(function (err) {
        console.log(err);
    });