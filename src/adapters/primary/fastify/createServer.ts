import { Cause, Effect, Exit } from "effect";
import fastify, { FastifyReply } from "fastify";
import { Task } from "../../../domain/entities/Task";
import { createUseCases, Config } from "../createUseCases";

const sendHttpResponse = async (
  reply: FastifyReply,
  cb: () => Promise<Exit.Exit<unknown, Error>>
) => {
  (await cb()).pipe(
    Exit.match({
      onSuccess: (result) => reply.code(200).send(result),
      onFailure: (cause) => {
        if (Cause.isFailType(cause)) {
          return reply.code(400).send(cause.error.message);
        }

        return reply.code(500).send(cause);
      },
    })
  );
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
    if (!body?.description) {
      reply.code(400).send({ error: "A description is required" });
    }

    return sendHttpResponse(reply, () => useCases.addTask(body.description));
  });

  server.get("/tasks", async (_request, reply) => {
    return sendHttpResponse(reply, useCases.getAllTasks);
  });

  return server;
};

// to add a task:
// curl -i -d '{"id":"my-id-1", "description":"Une super tache"}' -H "Content-Type: application/json" -X POST http://localhost:3000/tasks
