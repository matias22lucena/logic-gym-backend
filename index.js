import router from "./src/routes/index.routes.js";
import Server from "./src/server/config.js";

const server = new Server();

//agregar la rutas
server.app.use("/api", router)

//escuche el puerto en cuestion
server.listen()