// Run the server!
import { createServer } from "./createServer";
import { Config } from "../createUseCases";

const startServer = async () => {
  const config: Config = {
    repositoryMode:
      process.env.REPOSITORY_MODE === "JSON" ? "JSON" : "IN_MEMORY",
  };

  const server = await createServer(config);

  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer().then(() => {
  console.log("Server started !");
});
