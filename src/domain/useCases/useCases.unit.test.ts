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
};

describe("Use cases - unit tests", () => {
  describe("Use case : addTask", () => {
    let taskRepository: InMemoryTaskRepository;
    let addTask: ReturnType<typeof addTaskUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      addTask = addTaskUseCase({ taskRepository });
    });

    it("adds a task to the repository", () => {
      // <<-- done in beforeEach
      const taskRepository = new InMemoryTaskRepository();
      const addTask = addTaskUseCase({ taskRepository });
      // -->>

      //When
      addTask(someTaskDescription);
      //Then
      expectToEqual(taskRepository.tasks, [someTask]);
    });

    it("throws if the task already exists", () => {
      // Given
      taskRepository.tasks = [someTask];
      // Then
      expect(() => addTask(someTaskDescription)).toThrowError(
        "Task with id 'someId' already exists"
      );
    });
  });

  describe("Use case : getAllTasks", () => {
    let taskRepository: InMemoryTaskRepository;
    let getAllTasks: ReturnType<typeof getAllTasksUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      getAllTasks = getAllTasksUseCase({ taskRepository });
    });

    it("returns [] when no tasks", () => {
      const tasks = getAllTasks();
      expectToEqual(tasks, []);
    });

    it("returns all the tasks", () => {
      const tasksInRepository = [
        someTask,
        { id: "someOtherId", description: "Go swimming" },
      ];
      taskRepository.tasks = tasksInRepository;

      const tasks = getAllTasks();
      expectToEqual(tasks, tasksInRepository);
    });
  });

  describe("Use case : markAsDone", () => {
    let taskRepository: InMemoryTaskRepository;
    let markAsDone: ReturnType<typeof markAsDoneUseCase>;

    beforeEach(() => {
      taskRepository = new InMemoryTaskRepository();
      markAsDone = markAsDoneUseCase({ taskRepository });
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
