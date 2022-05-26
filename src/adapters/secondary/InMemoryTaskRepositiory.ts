import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/port/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private _tasks: Task[] = [];

  public save(task: Task): void {
    this._tasks.push(task);
  }

  public getById(id: string): Task | undefined {
    return this._tasks.find((task) => task.id === id);
  }

  getAll(): Task[] {
    return this._tasks;
  }

  // for test purpose
  get tasks(): Task[] {
    return this._tasks;
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
}