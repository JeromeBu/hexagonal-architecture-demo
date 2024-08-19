import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): Promise<void>;
  getByDescription(description: string): Promise<Task | undefined>;
  getAll(): Promise<Task[]>;
}
