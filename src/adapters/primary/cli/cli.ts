import * as inquirer from "inquirer";
import { createUseCases } from "../createUseCases";

const useCases = createUseCases({ repositoryMode: "IN_MEMORY" });

let id = 1;

inquirer
  .prompt([
    {
      name: "initial",
      type: "list",
      message: "What do you want to do ?",
      choices: [
        { name: "list my tasks", value: "listTasks" },
        { name: "add a task", value: "addTask" },
      ],
    },
    {
      name: "addTask",
      type: "input",
      message: "Describe your task:",
      askAnswered: (answers: any) => console.log("askAnswers : ", answers),
    },
    {
      name: "listTasks",
      type: "list",
      message: "Do you want to mark a task as done ?",
      choices: useCases.getAllTasks().map((task) => ({
        name: task.description,
        value: task.id,
      })),
    },
  ])
  .then((answers) => {
    console.log("Final answers :", answers);
  });
