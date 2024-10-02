//backend/routes/todos.routes.js
const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");

// Näita kõiki mitte-kustutatud TODO-sid
router.get("/", todosController.read);

// Loo uus TODO
router.post("/", todosController.create);

// Uuenda TODO (vajab ID-d)
router.put("/:id", todosController.update);

// Kustuta TODO (vajab ID-d)
router.delete("/:id", todosController.delete);

// JWT: Genereeri token nime põhjal (POST meetod)
//localhost:8080/todos/token
router.post("/token", todosController.generateToken);

// JWT: Verifitseeri saadud token (POST meetod)
//localhost:8080/todos/verify-token
router.post("/verify-token", todosController.verifyToken);

module.exports = router;
