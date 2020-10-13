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

// inquirer validation tests =================================
const onlyLetters = input => {
  return (/^[a-zA-Z]+$/.test(input)) ? true : 'Name cannot contain characters besides letters.'
}

const cannotBeBlank = input => {
  return (input.length !== 0) ? true : 'This field must be filled.'
}

const emailFormat = input => {
  // must be non-white space, contain an @ symbol, followed by more non-white space, a period, and more non-white space
  return (/\S+@\S+\.\S+/.test(input)) ? true : 'Must be a valid email address.'
}

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
    validate: onlyLetters
  },
  {
    type:'input',
    name:'id',
    message:"What is your manager's id?",
    default: 'na'
  },
  {
    type:'input',
    name:'email',
    message:"What is your manager's email?",
    validate: emailFormat
  },
  {
    type:'input',
    name:'office',
    message:"What is your manager's office number?",
    default: 'na'
  }
]

const engineer = [
  {
    type:'input',
    name:'name',
    message:"What is your engineer's name?",
    validate: onlyLetters
  },
  {
    type:'input',
    name:'id',
    message:"What is your engineer's id?",
    default: 'na'
  },
  {
    type:'input',
    name:'email',
    message:"What is your engineer's email?",
    validate: emailFormat
  },
  {
    type:'input',
    name:'github',
    message:"What is your engineer's Github username?",
    validate: cannotBeBlank
  }
]

const intern = [
  {
    type:'input',
    name:'name',
    message:"What is your intern's name?",
    validate: onlyLetters
  },
  {
    type:'input',
    name:'id',
    message:"What is your intern's id?",
    default: 'na'
  },
  {
    type:'input',
    name:'email',
    message:"What is your intern's email?",
    validate: emailFormat
  },
  {
    type:'input',
    name:'school',
    message:"What is your intern's school?",
    validate: cannotBeBlank
  }
]

const questions = {Manager:manager, Engineer:engineer, Intern:intern}

// inquirer ===================================================

// begin application
function beginApp() {
  console.log('Please build your team');
  newMemberChoice();
}

beginApp();

// asks user what team member they'd like to add next
function newMemberChoice() {
  inquirer.prompt(nextMember).then(answer => {
    if (answer.newMember !== 'No more team members to add') {
      newMemberQuestions(answer.newMember)
    } else {
      fs.writeFile(outputPath,render(teamMembers),err => {
        if (err) throw err;
        console.log('I present to you: the Dream Team');
      });
    }
  })
}

// asks user team member specific questions
function newMemberQuestions(choice) {
  inquirer.prompt(questions[choice]).then(answer => {
    newObjects(answer,choice);
  })
}

// create new objects from user responses
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
