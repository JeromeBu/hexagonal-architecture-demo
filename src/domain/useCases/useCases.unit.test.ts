import { Effect } from "effect";
import { InMemoryTaskRepository } from "../../adapters/secondary/InMemoryTaskRepository";
import { Task } from "../entities/Task";
import {
  addTaskUseCase,
  getAllTasksUseCase,
  markAsDoneUseCase,
} from "./useCases";
import { expectToEqual } from "../../testHelpers";

const someTaskDescription = "Learn Clean architcture";
const someTask: Task = {
  description: someTaskDescription,
  isDone: false,
};

describe("Use cases - unit tests", () => {
  describe("Use case : addTask", () => {
    let taskRepository: InMemoryTaskRepository;
    let addTask: ReturnType<typeof addTaskUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      addTask = addTaskUseCase(taskRepository);
    });

    it("adds a task to the repository", async () => {
      //When
      await addTask(someTaskDescription);
      //Then
      expectToEqual(taskRepository.tasks, [someTask]);
    });

    it("throws if the task already exists", async () => {
      // Given
      taskRepository.tasks = [someTask];
      // Then
      await expect(() =>
        Effect.runPromise(addTask(someTaskDescription))
      ).rejects.toThrowError(
        `Task with description '${someTaskDescription}' already exists`
      );
    });
  });

  describe("Use case : getAllTasks", () => {
    let taskRepository: InMemoryTaskRepository;
    let getAllTasks: ReturnType<typeof getAllTasksUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      getAllTasks = getAllTasksUseCase(taskRepository);
    });

    it("returns [] when no tasks", async () => {
      const tasks = await Effect.runPromise(getAllTasks());
      expectToEqual(tasks, []);
    });

    it("returns all the tasks", async () => {
      const tasksInRepository: Task[] = [
        someTask,
        { description: "Go swimming", isDone: false },
      ];
      taskRepository.tasks = tasksInRepository;

      const tasks = await Effect.runPromise(getAllTasks());
      expectToEqual(tasks, tasksInRepository);
    });
  });

  describe.skip("Use case : markAsDone", () => {
    let taskRepository: InMemoryTaskRepository;
    let markAsDone: ReturnType<typeof markAsDoneUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      markAsDone = markAsDoneUseCase(taskRepository);
    });

    it("throws if task not found", () => {
      expect(() => markAsDone(someTaskDescription)).toThrow(
        "Task with id 'someId' not found"
      );
    });

    it("throws when the task is already done", () => {
      throw "TODO";
    });
    it("marks the tasks as done if all is good", () => {
      throw "TODO";
    });
  });
});
