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

module.exports = router;
