import { TaskRepository } from "../port/TaskRepository";

export class AddTask {
  constructor(private taskRepository: TaskRepository) {}

  public execute(description: string) {
    const alreadyExistingTask =
      this.taskRepository.getByDescription(description);
    if (alreadyExistingTask)
      throw new Error(`Task with description '${description}' already exists`);
    this.taskRepository.save({ description });
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
    "TODO"
  }
}
