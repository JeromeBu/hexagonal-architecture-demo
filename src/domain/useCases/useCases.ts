import { Effect, Option } from "effect";
import { Task } from "../entities/Task";
import { TaskRepository } from "../port/TaskRepository";

class AlreadyExistingTaskError extends Error {
  readonly _tag = "AlreadyExistingTaskError";

  constructor(task: Task) {
    super(`Task with description '${task.description}' already exists`);
  }
}

class TaskNotFoundError extends Error {
  readonly _tag = "TaskNotFoundError";

  constructor(description: string) {
    super(`Task with description '${description}' was not found`);
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

// export const markAsDoneUseCase =
//   (taskRepository: TaskRepository) => (description: string) =>
//     taskRepository.getByDescription(description).pipe(
//       optionToEffect(() => new TaskNotFoundError(description)),
//       Effect.flatMap((task) => taskRepository.save({ ...task, isDone: true }))
//     );

export const markAsDoneUseCase =
  (taskRepository: TaskRepository) => (description: string) =>
    Effect.gen(function* () {
      const task = yield* taskRepository
        .getByDescription(description)
        .pipe(optionToEffect(() => new TaskNotFoundError(description)));

      yield* taskRepository.save({ ...task, isDone: true });
    });

const optionToEffect =
  <E>(onNone: () => E) =>
  <A>(option: Option.Option<A>): Effect.Effect<A, E, never> =>
    option.pipe(
      Option.match({
        onSome: (value) => Effect.succeed(value),
        onNone: () => Effect.fail(onNone()),
      })
    );
