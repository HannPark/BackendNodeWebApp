const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const morgan = require("morgan"); //MIDDLEWARE
const cors = require("cors");
const errorHandler = require("./middleware/error"); //Manejador de errores Middleware

//conectarse a MongoDB
const connectDatabase = require("./config/db");
connectDatabase();

//Instancias de Rutas
const libro = require("./rutas/libro");
const autor = require("./rutas/autor");
const usuario = require("./rutas/usuario")

//Instancia de Express
const app = express();
app.use(express.json()); //Let Express Handle JSON
app.use(cors());

//MIDDLEWARE MORGAN
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Rutas de Backend
app.use("/api/libreriaAutor", autor);
app.use("/api/libro", libro);
app.use("/usuario", usuario);

app.use(errorHandler);

//EXPRESS NODE SERVER
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Servidor se ejecuta en ambiente", process.env.NODE_ENV)
);

process.on("unhandledRejection", (err, promise) => {
  console.log("Errores:", err.message);
  server.close(() => process.exit(1));
});