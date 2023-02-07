import {
  AddTask,
  GetAllTasks,
  MarkAsDone,
} from "../../domain/useCases/useCases";
import { InMemoryTaskRepository } from "../secondary/InMemoryTaskRepository";
import { JsonTaskRepository } from "../secondary/json/JsonTaskRepository";

export interface Config {
  repositoryMode: "JSON" | "IN_MEMORY";
}

export const createUseCases = ({ repositoryMode }: Config) => {
  const taskRepository =
    repositoryMode === "JSON"
      ? new JsonTaskRepository(__dirname + "/../secondary/json/tasks-db.json")
      : new InMemoryTaskRepository();

  return {
    addTask: new AddTask(taskRepository),
    getAllTasks: new GetAllTasks(taskRepository),
    markTaskAsDone: new MarkAsDone(taskRepository),
  };
};
