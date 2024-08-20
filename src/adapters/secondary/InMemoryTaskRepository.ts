import { Effect, Option } from "effect";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/port/TaskRepository";

type TasksByDescription = Record<string, Task>;

const slugify = (str: string) => str.trim().toLowerCase().replace(/\s+/g, "-");

export class InMemoryTaskRepository implements TaskRepository {
  private _tasks: TasksByDescription = {};

  public save(task: Task) {
    this._tasks[slugify(task.description)] = task;
    return Effect.void;
  }

  public getByDescription(description: string): Option.Option<Task> {
    const task = this._tasks[slugify(description)];
    return task ? Option.some(task) : Option.none();
  }

  public getAll() {
    return Effect.succeed(this.tasks);
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
