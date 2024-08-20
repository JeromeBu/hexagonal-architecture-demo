import { Effect, Option } from "effect";
import { Task } from "../entities/Task";
import { TaskRepository } from "../port/TaskRepository";

class AlreadyExistingTaskError extends Error {
  readonly _tag = "AlreadyExistingTaskError";

  constructor(task: Task) {
    super(`Task with description '${task.description}' already exists`);
  }
}

export const addTaskUseCase =
  (taskRepository: TaskRepository) => (description: string) =>
    taskRepository.getByDescription(description).pipe(
      Option.match({
        onSome: (task) => Effect.fail(new AlreadyExistingTaskError(task)),
        onNone: () => taskRepository.save({ description, isDone: false }),
      })
    );

export const getAllTasksUseCase = (taskRepository: TaskRepository) => () =>
  taskRepository.getAll();

export const markAsDoneUseCase =
  (taskRepository: TaskRepository) => async (description: string) =>
    Effect.gen(function* () {
      const task = yield* taskRepository.getByDescription(description);
      const updatedTask = { ...task, done: true };
    });
