const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

// questions ==================================================
const nextMember = 
{
    type:'list',
    name:'newMember',
    message:'What kind of team member would you like to add?',
    choices: ['Manager','Engineer','Intern','No more team members to add']
}

const manager = [
    {
        type:'input',
        name:'name',
        message:"What is your manager's name?",
    },
    {
        type:'input',
        name:'id',
        message:"What is your manager's id?",
    },
    {
        type:'input',
        name:'email',
        message:"What is your manager's email?",
    },
    {
        type:'input',
        name:'office',
        message:"What is your manager's office number?",
    }
]

const engineer = [
    {
        type:'input',
        name:'name',
        message:"What is your engineer's name?",
    },
    {
        type:'input',
        name:'id',
        message:"What is your engineer's id?",
    },
    {
        type:'input',
        name:'email',
        message:"What is your engineer's email?",
    },
    {
        type:'input',
        name:'github',
        message:"What is your engineer's Github username?",
    }
]

const intern = [
    {
        type:'input',
        name:'name',
        message:"What is your intern's name?",
    },
    {
        type:'input',
        name:'id',
        message:"What is your intern's id?",
    },
    {
        type:'input',
        name:'email',
        message:"What is your intern's email?",
    },
    {
        type:'input',
        name:'school',
        message:"What is your intern's school?",
    }
]
const questions = {Manager:manager, Engineer:engineer, Intern:intern}

// inquirer ===================================================

// asks user what team member they'd like to add next
function newMemberChoice() {
    inquirer.prompt(nextMember).then(answer => {
        (answer.newMember !== 'No more team members to add') ?
            newMemberQuestions(answer.newMember): 
            console.log('I present to you: the Dream Team', teamMembers);
    })
}
// asks user team member specific questions
function newMemberQuestions(choice) {
    inquirer.prompt(questions[choice]).then(answer => {
        newObjects(answer,choice);
    })
}
// create new objects
function newObjects(person,choice) {
    let addToTeam;
    switch (choice) {
        case 'Manager':
            addToTeam = new Manager(person.name,person.id,person.email,person.office);
            break;
        case 'Intern':
            addToTeam = new Intern(person.name,person.id,person.email,person.school)
            break;
        case 'Engineer':
            addToTeam = new Engineer(person.name,person.id,person.email,person.github)
            break;
    }
    teamMembers.push(addToTeam)
    newMemberChoice();
}
// begin application
function beginApp() {
    if (teamMembers.length === 0) {
        console.log('Please build your team');
    }
    newMemberChoice();
}

beginApp();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
