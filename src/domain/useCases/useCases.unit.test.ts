import { InMemoryTaskRepository } from "../../adapters/secondary/InMemoryTaskRepository";
import { Task } from "../entities/Task";
import { AddTask, GetAllTasks, MarkAsDone } from "./useCases";
import { expectToEqual } from "../../testHelpers";

const someTaskDescription = "Learn Clean architcture";
const someTask: Task = {
  description: someTaskDescription,
  isDone: false,
};

describe("Use cases - unit tests", () => {
  describe("Use case : addTask", () => {
    let taskRepository: InMemoryTaskRepository;
    let addTask: AddTask;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      addTask = new AddTask(taskRepository);
    });

    it("adds a task to the repository", () => {
      //When
      addTask.execute(someTaskDescription);
      //Then
      expectToEqual(taskRepository.tasks, [someTask]);
    });

    it("throws if the task already exists", () => {
      // Given
      taskRepository.tasks = [someTask];
      // Then
      expect(() => addTask.execute(someTaskDescription)).toThrowError(
        `Task with description '${someTaskDescription}' already exists`
      );
    });
  });

  describe("Use case : getAllTasks", () => {
    let taskRepository: InMemoryTaskRepository;
    let getAllTasks: GetAllTasks;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      getAllTasks = new GetAllTasks(taskRepository);
    });

    it("returns [] when no tasks", () => {
      const tasks = getAllTasks.execute();
      expectToEqual(tasks, []);
    });

    it("returns all the tasks", () => {
      const tasksInRepository = [
        someTask,
        { description: "Go swimming", isDone: false },
      ];
      taskRepository.tasks = tasksInRepository;

      const tasks = getAllTasks.execute();
      expectToEqual(tasks, tasksInRepository);
    });
  });

  describe("Use case : markAsDone", () => {
    let taskRepository: InMemoryTaskRepository;
    let markAsDone: MarkAsDone;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      markAsDone = new MarkAsDone(taskRepository);
    });

    it("throws if task not found", () => {
      const someTaskDescription = "faire la vaisselle";
      expect(() => markAsDone.execute(someTaskDescription)).toThrow(
        `Task with description '${someTaskDescription}' not found`
      );
    });

    it("throws when the task is already done", () => {
      const taskDescription = "faire la vaisselle";
      taskRepository.tasks = [
        { description: "faire la vaisselle", isDone: true },
      ];
      expect(() => markAsDone.execute(taskDescription)).toThrow(
        `Task already done`
      );
    });

    it("marks the tasks as done if all is good", () => {
      const taskDescription = "faire la vaisselle";
      taskRepository.tasks = [
        { description: "faire la vaisselle", isDone: false },
      ];
      markAsDone.execute(taskDescription);
      expectToEqual(taskRepository.tasks, [
        { description: "faire la vaisselle", isDone: true },
      ]);
    });
  });
});
