import { existsSync, readFileSync, writeFileSync } from "fs";
import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/port/TaskRepository";

export class JsonTaskRepository implements TaskRepository {
  constructor(private filePath: string) {
    if (!existsSync(this.filePath)) writeFileSync(this.filePath, "[]");
  }

  async save(task: Task) {
    const tasks = this.readFromFile();
    tasks.push(task);
    writeFileSync(this.filePath, JSON.stringify(tasks));
  }

  async getAll() {
    return this.readFromFile();
  }

  async getByDescription(description: string) {
    return this.readFromFile().find((task) => task.description === description);
  }

  private readFromFile(): Task[] {
    const data = readFileSync(this.filePath);
    return JSON.parse(data.toString());
  }
}
