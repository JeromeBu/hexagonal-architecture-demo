import { Task } from "../entities/Task";
import { TaskRepository } from "../port/TaskRepository";

export class AddTask {
  constructor(private taskRepository: TaskRepository) {}

  public execute(description: string) {
    const alreadyExistingTask =
      this.taskRepository.getByDescription(description);
    if (alreadyExistingTask)
      throw new Error(`Task with description '${description}' already exists`);
    this.taskRepository.save({ description, isDone: false });
  }
}

export class GetAllTasks {
  constructor(private taskRepository: TaskRepository) {}

  public execute() {
    return this.taskRepository.getAll();
  }
}

export class MarkAsDone {
  constructor(private taskRepository: TaskRepository) {}

  public execute(description: string) {
    const task = this.taskRepository.getByDescription(description);
    if (!task) {
      throw new Error(`Task with description '${description}' not found`);
    }

    if (task.isDone) {
      throw new Error("Task already done");
    }

    const updatedTask: Task = { ...task, isDone: true };
    this.taskRepository.save(updatedTask);
  }
}
