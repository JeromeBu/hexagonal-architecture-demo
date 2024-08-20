import { Task } from "../entities/Task";
import { Effect, Option } from "effect";

export interface TaskRepository {
  save(task: Task): Effect.Effect<void>;
  getByDescription(description: string): Option.Option<Task>;
  getAll(): Effect.Effect<Task[]>;
}

// import { Context, Effect, Option } from "effect";
//
// export class TaskRepository extends Context.Tag("TaskRepository")<
//   TaskRepository,
//   {
//     save(task: Task): Effect.Effect<void>;
//     getByDescription(description: string): Option.Option<Task>;
//     getAll(): Effect.Effect<Task[]>;
//   }
// >() {}
