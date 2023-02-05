import { TaskRepository } from "../port/TaskRepository";

type Dependencies = {
  taskRepository: TaskRepository;
};

export const addTaskUseCase = (deps: Dependencies) => (description: string) => {
  const alreadyExistingTask = deps.taskRepository.getByDescription(description);
  if (alreadyExistingTask)
    throw new Error(`Task with description '${description}' already exists`);
  deps.taskRepository.save({ description });
};

export const getAllTasksUseCase = (deps: Dependencies) => () =>
  deps.taskRepository.getAll();

export const markAsDoneUseCase =
  (deps: Dependencies) => (description: string) => {};

// in class version :
// class AddTaskUseCase {
//   private taskRepository: TaskRepository;
//
//   constructor(taskRepository: TaskRepository) {
//     this.taskRepository = taskRepository;
//   }
//
//   execute(task: Task) {
//     const taskAlreadyExists = this.taskRepository.getById(task.id);
//     if (taskAlreadyExists)
//       throw new Error(`Task with id '${task.id}' already exists`);
//     this.taskRepository.save(task);
//   }
// }
