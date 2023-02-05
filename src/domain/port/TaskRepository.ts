import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): void;
  getByDescription(description: string): Task | undefined;
  getAll(): Task[];
}
