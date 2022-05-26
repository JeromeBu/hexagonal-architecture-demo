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
  id: "learn-clean-archi",
  description: "Learn Clean Architecture",
};

const goToTheCinema: Task = {
  id: "go-to-the-cinema",
  description: "Go to the cinema",
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

  describe("methods getById", () => {
    it("should get the saved data with specified Id", () => {
      const taskInRepo = [goToTheCinema, learnCleanArchitectureTask];
      writeFileSync(
        filePath,
        JSON.stringify([goToTheCinema, learnCleanArchitectureTask])
      );
      const retrievedTask = taskRepository.getById("go-to-the-cinema");
      expectToEqual(retrievedTask, goToTheCinema);
    });
  });
});
