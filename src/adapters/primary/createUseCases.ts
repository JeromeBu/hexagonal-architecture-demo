import { Effect, Exit } from "effect";
import {
  addTaskUseCase,
  getAllTasksUseCase,
  markAsDoneUseCase,
} from "../../domain/useCases/useCases";
import { InMemoryTaskRepository } from "../secondary/InMemoryTaskRepository";
import { JsonTaskRepository } from "../secondary/json/JsonTaskRepository";

export interface Config {
  repositoryMode: "JSON" | "IN_MEMORY";
}

export const createUseCases = ({ repositoryMode }: Config) => {
  const taskRepository =
    repositoryMode === "JSON"
      ? new JsonTaskRepository(__dirname + "/../secondary/json/tasks-db.json")
      : new InMemoryTaskRepository();

  return {
    addTask: withRunPromiseExit(addTaskUseCase(taskRepository)),
    getAllTasks: withRunPromiseExit(getAllTasksUseCase(taskRepository)),
    markTaskAsDone: markAsDoneUseCase(taskRepository),
  };
};

type SuccessType<Eff> = Eff extends Effect.Effect<infer A, any, any>
  ? A
  : never;

type ErrorType<Eff> = Eff extends Effect.Effect<any, infer E, any> ? E : never;

type AnyUseCase = (...params: any[]) => Effect.Effect<unknown, unknown, never>;

type WithRunPromiseExit = <UC extends AnyUseCase>(
  useCase: UC
) => (
  ...params: Parameters<UC>
) => Promise<Exit.Exit<SuccessType<ReturnType<UC>>, ErrorType<ReturnType<UC>>>>;

const withRunPromiseExit: WithRunPromiseExit = (useCase) => {
  return (...params) => Effect.runPromiseExit(useCase(...params) as any);
};
