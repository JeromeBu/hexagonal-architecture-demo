import fastify, { FastifyReply } from "fastify";
import { Task } from "../../../domain/entities/Task";
import { createUseCases, Config } from "../createUseCases";

const errorHandler = (reply: FastifyReply, cb: () => unknown) => {
  try {
    const result = cb();
    reply.code(200).send(result);
  } catch (error: any) {
    reply.code(400).send(error.message);
  }
};

export const createServer = (config: Config) => {
  console.log("CONFIG : ", config);
  const useCases = createUseCases(config);
  const server = fastify({ logger: true });

  // Declare a route
  server.get("/", async (request, reply) => {
    return { hello: "world", routes: ["/tasks GET | POST"] };
  });

  server.post("/tasks", async (request, reply) => {
    const body = request.body as Task;
    if (!body.description) {
      reply.code(400).send({ error: "A description is required" });
    }

    return errorHandler(reply, () => useCases.addTask(body.description));
  });

  server.get("/tasks", async (request, reply) => {
    const tasks = useCases.getAllTasks();
    return reply.code(200).send(tasks);
  });

  return server;
};

// to add a task:
// curl -i -d '{"id":"my-id-1", "description":"Une super tache"}' -H "Content-Type: application/json" -X POST http://localhost:3000/tasks
