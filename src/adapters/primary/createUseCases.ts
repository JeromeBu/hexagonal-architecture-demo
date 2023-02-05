import {
  addTaskUseCase,
  getAllTasksUseCase,
  markAsDoneUseCase,
} from "../../domain/useCases/useCases";
import { InMemoryTaskRepository } from "../secondary/InMemoryTaskRepository";
import { JsonTaskRepository } from "../secondary/json/JsonTaskRepository";

import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export interface Config {
  repositoryMode: "JSON" | "IN_MEMORY";
}

export const createUseCases = ({ repositoryMode }: Config) => {
  const taskRepository =
    repositoryMode === "JSON"
      ? new JsonTaskRepository(__dirname + "/../secondary/json/tasks-db.json")
      : new InMemoryTaskRepository();

  return {
    addTask: addTaskUseCase({ taskRepository }),
    getAllTasks: getAllTasksUseCase({ taskRepository }),
    markTaskAsDone: markAsDoneUseCase({ taskRepository }),
  };
};
