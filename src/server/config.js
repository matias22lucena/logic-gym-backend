import express from "express";
import morgan from "morgan";
import cors from "cors";
import dns from "node:dns";

// modulos nativos de node
import { dirname } from "path";
import { fileURLToPath } from "url";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

await import("./dbConfig.js");

export default class Server {
    constructor() {
        // invocamos a express y lo guardamos en app(prop)
        this.app = express();

        // config el puerto = chequea en la .env sino el 3001
        this.port = process.env.PORT || 3001;

        // ejecuta el metodo middlewares
        this.middlewares();
    }

    middlewares() {
        // permite conexiones remotas cuando lo tengamos en produccion
        this.app.use(cors());

        // permite interpretar los datos que lleguen en la solicitud en formato json
        this.app.use(express.json());

        // nos ofrece datos extra en la terminal
        this.app.use(morgan("dev"));

        const __dirname = dirname(fileURLToPath(import.meta.url));
        console.log(__dirname);
        
        this.app.use(express.static(__dirname + "/../../public"));
    }

    // metodo para escuchar el puerto
    listen() {
        this.app.listen(this.port, () =>
            console.info(`El servidor se esta ejecutando en http://localhost: ${this.port}`)
        );
    }
}