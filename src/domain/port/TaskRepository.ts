import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): void;
  getById(id: string): Task | undefined;
  getAll(): Task[];
}
