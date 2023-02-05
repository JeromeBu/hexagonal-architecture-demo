console.log("REACHED CLI");

import inquirer from "inquirer";
import { createUseCases } from "../createUseCases";

const useCases = createUseCases({
  repositoryMode:
    process.env.REPOSITORY_MODE === "IN_MEMORY" ? "IN_MEMORY" : "JSON",
});

const listTasks = "listTasks";
const addTask = "addTask";
const markAsDone = "markAsDone";
const exit = "exit";

const initialQuestion = {
  name: "home",
  type: "list",
  message: "Bienvenue dans votre liste de tâche !",
  choices: [
    { name: "ajouter une tâche à faire", value: addTask },
    { name: "lister mes tâches", value: listTasks },
    { name: "marquer une tache comme terminée", value: markAsDone },
    { name: "quitter", value: exit },
  ],
};

const beginCli = async () => {
  const answers = await inquirer.prompt([initialQuestion]);

  switch (answers.home) {
    case listTasks: {
      const tasks = useCases.getAllTasks();
      console.info(
        tasks.length === 0
          ? "Aucune taches pour le moment\n"
          : tasks.map(({ description }) => `- ${description}`).join("\n")
      );
      break;
    }

    case addTask: {
      const { description } = await inquirer.prompt([
        {
          name: "description",
          type: "input",
          message: "Quelle est la description de la tache ?\n>",
        },
      ]);

      useCases.addTask(description);
      break;
    }

    case markAsDone: {
      const tasks = useCases.getAllTasks();
      if (tasks.length === 0) {
        console.info("Vous n'avez aucune tache pour le moment");
        break;
      }
      const cancel = "Annuler";
      const { description } = await inquirer.prompt([
        {
          name: "description",
          type: "list",
          message: "Quelle est tache voulez-vous marquer comme terminée ?\n>",
          choices: [...tasks, { description: cancel }].map(
            ({ description }) => ({
              name: `- ${description}`,
              value: description,
            })
          ),
        },
      ]);
      if (description === cancel) break;
      console.error("NOT implemented yet, do something with : ", description);
    }
  }

  if (answers.home !== exit) beginCli();
};

beginCli();
