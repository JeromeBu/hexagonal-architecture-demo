import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/port/TaskRepository";

type TasksByDescription = Record<string, Task>;

const slugify = (str: string) => str.trim().toLowerCase().replace(/\s+/g, "-");

export class InMemoryTaskRepository implements TaskRepository {
  private _tasks: TasksByDescription = {};

  public save(task: Task): void {
    this._tasks[slugify(task.description)] = task;
  }

  public getByDescription(description: string): Task | undefined {
    return this._tasks[slugify(description)];
  }

  public getAll(): Task[] {
    return this.tasks;
  }

  // for test purpose
  get tasks(): Task[] {
    return Object.values(this._tasks);
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks.reduce((acc, task) => {
      return { ...acc, [slugify(task.description)]: task };
    }, {} as TasksByDescription);
  }
}
