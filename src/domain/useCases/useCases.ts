import { TaskRepository } from "../port/TaskRepository";

export const addTaskUseCase =
  (taskRepository: TaskRepository) => async (description: string) => {
    const alreadyExistingTask = await taskRepository.getByDescription(
      description
    );
    if (alreadyExistingTask)
      throw new Error(`Task with description '${description}' already exists`);
    await taskRepository.save({ description });
  };

export const getAllTasksUseCase = (taskRepository: TaskRepository) => () =>
  taskRepository.getAll();

export const markAsDoneUseCase =
  (taskRepository: TaskRepository) => async (description: string) => {};
