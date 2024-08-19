import { Task } from "../entities/Task";
import { TaskRepository } from "../port/TaskRepository";

class AlreadyExistingTaskError {
  readonly _tag = "AlreadyExistingTaskError";
  readonly message: string;
  constructor(task: Task) {
    this.message = `Task with description '${task.description}' already exists`;
  }
}

export const addTaskUseCase =
  (taskRepository: TaskRepository) => async (description: string) => {
    const alreadyExistingTask = await taskRepository.getByDescription(
      description
    );
    if (alreadyExistingTask)
      throw new AlreadyExistingTaskError(alreadyExistingTask);
    await taskRepository.save({ description });
  };

export const getAllTasksUseCase = (taskRepository: TaskRepository) => () =>
  taskRepository.getAll();

export const markAsDoneUseCase =
  (taskRepository: TaskRepository) => async (description: string) => {};
