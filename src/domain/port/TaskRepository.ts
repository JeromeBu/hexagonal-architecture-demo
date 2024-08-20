import { Effect, Option } from "effect";
import { Task } from "../entities/Task";

export interface TaskRepository {
  save(task: Task): Effect.Effect<void>;
  getByDescription(description: string): Option.Option<Task>;
  getAll(): Effect.Effect<Task[]>;
}
