import { readFileSync, writeFileSync } from "fs";
import { Task } from "../../../domain/entities/Task";
import { expectToEqual } from "../../../testHelpers";
import { JsonTaskRepository } from "./JsonTaskRepository";

const filePath = `${__dirname}/test-db.json`;

const readFile = (): Task[] => {
  const data = readFileSync(filePath);
  return JSON.parse(data.toString());
};

const learnCleanArchitectureTask: Task = {
  description: "Learn Clean Architecture",
  isDone: false,
};

const goToTheCinema: Task = {
  description: "Go to the cinema",
  isDone: false,
};

describe("JsonTaskRepository implementation", () => {
  let taskRepository: JsonTaskRepository;

  beforeAll(() => {
    writeFileSync(filePath, "[]");
  });

  beforeEach(() => {
    taskRepository = new JsonTaskRepository(filePath);
  });

  describe("method save", () => {
    it("should save a new task in a JSON file", () => {
      taskRepository.save(learnCleanArchitectureTask);
      const dataOnFile = readFile();
      expectToEqual(dataOnFile, [learnCleanArchitectureTask]);
    });
  });

  describe("methods getAll", () => {
    it("should get the saved data", () => {
      const taskInRepo = [goToTheCinema, learnCleanArchitectureTask];
      writeFileSync(
        filePath,
        JSON.stringify([goToTheCinema, learnCleanArchitectureTask])
      );
      const retrievedTasks = taskRepository.getAll();
      expectToEqual(retrievedTasks, taskInRepo);
    });
  });

  describe("methods getByDescription", () => {
    it("should get the saved data with specified Id", () => {
      const tasksInRepo = [goToTheCinema, learnCleanArchitectureTask];
      writeFileSync(filePath, JSON.stringify(tasksInRepo));
      const retrievedTask = taskRepository.getByDescription(
        goToTheCinema.description
      );
      expectToEqual(retrievedTask, goToTheCinema);
    });
  });
});
