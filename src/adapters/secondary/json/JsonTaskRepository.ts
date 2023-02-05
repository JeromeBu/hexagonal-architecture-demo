import { existsSync, readFileSync, writeFileSync } from "fs";
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/port/TaskRepository";

export class JsonTaskRepository implements TaskRepository {
  constructor(private filePath: string) {
    if (!existsSync(this.filePath)) writeFileSync(this.filePath, "[]");
  }

  save(task: Task): void {
    const tasks = this.readFromFile();
    tasks.push(task);
    writeFileSync(this.filePath, JSON.stringify(tasks));
  }

  getAll(): Task[] {
    return this.readFromFile();
  }

  getByDescription(description: string): Task | undefined {
    return this.readFromFile().find((task) => task.description === description);
  }

  private readFromFile(): Task[] {
    const data = readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }
}
