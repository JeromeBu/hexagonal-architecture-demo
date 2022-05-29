import { FastifyInstance } from "fastify";
import { Task } from "../../../domain/entities/Task";
import { createServer } from "./createServer";

describe("Fastify server", () => {
  let server: FastifyInstance;

  beforeEach(() => {
    server = createServer({ repositoryMode: "IN_MEMORY" });
  });

  describe("GET /", () => {
    it("hello world !", async () => {
      const result = await server.inject({
        method: "GET",
        url: "/",
      });

      expectResponseFromApi(result, { status: 200, body: { hello: "world" } });
    });
  });

  it("get 400 when request is not valid", async () => {
    const failedResponse = await server.inject({
      method: "POST",
      url: "/tasks",
    });

    expectResponseFromApi(failedResponse, {
      status: 400,
      body: { error: "id and description are required" },
    });
  });

  describe("GET /tasks and POST /tasks", () => {
    it("gets tasks, than adds one, than get tasks again, then fails to add the same task", async () => {
      const initialList = await server.inject({
        method: "GET",
        url: "/tasks",
      });
      expectResponseFromApi(initialList, { status: 200, body: [] });

      const task: Task = { id: "123", description: "My task" };
      const addTaskResponse = await server.inject({
        method: "POST",
        url: "/tasks",
        payload: task,
      });
      expectResponseFromApi(addTaskResponse, { status: 200, body: "" });

      const finalList = await server.inject({
        method: "GET",
        url: "/tasks",
      });
      expectResponseFromApi(finalList, { status: 200, body: [task] });

      const alreadyThereResponse = await server.inject({
        method: "POST",
        url: "/tasks",
        payload: task,
      });
      expectResponseFromApi(alreadyThereResponse, {
        status: 400,
        body: "Task with id '123' already exists",
      });
    });
  });

  const expectResponseFromApi = (
    response: any,
    expected: { body: any; status: number }
  ) => {
    if (typeof expected.body === "string") {
      expect(response.body).toBe(expected.body);
    } else {
      expect(JSON.parse(response.body)).toEqual(expected.body);
    }
    expect(response.statusCode).toBe(expected.status);
  };
});
