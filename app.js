const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const outputPath = path.resolve(__dirname, "output", "team.html");
const render = require("./lib/htmlRenderer");
const teamMembers = [];
const idArray = [];
const templatesDir = path.resolve(__dirname, "../templates");

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your manager's id?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your manager's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your manager's office number?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      }
    ])
    .then(answer => {
      console.log(answer);
      const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.managerOfficeNumber
      );
      teamMembers.push(manager);
      idArray.push(answer.managerId);
      createTeam();
    });
}
createManager();

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ])
    .then(userChoice => {
      switch (userChoice.memberChoice) {
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
}
function buildTeam() {
  // const htmlFile = `<html>${teamMembers[0].name}</html>`;
  //fs.writeFileSync(outputPath, htmlFile, "utf-8");
  fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is your intern's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern's School?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ])
    .then(answer => {
      const intern = new Intern(
        answer.internName,
        answer.internId,
        answer.internEmail,
        answer.internSchool
      );
      teamMembers.push(intern);
      idArray.push(answer.internId);
      createTeam();
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your engeneer's name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your engeneer's id?",
        validate: answer => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return "Please enter a positive number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is your engineer's email?",
        validate: answer => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer's Github name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.";
        }
      }
    ])
    .then(answer => {
      const engineer = new Engineer(
        answer.engineerName,
        answer.engineerId,
        answer.engineerEmail,
        answer.engineerGithub
      );
      teamMembers.push(engineer);
      idArray.push(answer.engineerId);
      createTeam();
    });
}
