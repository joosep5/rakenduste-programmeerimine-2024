//backend/routes/todos.routes.js
const express = require("express");
const { body } = require('express-validator');
const router = express.Router();
const todosController = require("../controllers/todos.controller");

// Näita kõiki mitte-kustutatud TODO-sid
router.get("/", todosController.read);

// Loo uus TODO valideerimisega
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("priority").optional().isInt({ min: 1, max: 5 }).withMessage("Priority must be between 1 and 5"),
  ],
  todosController.create
);

// Uuenda TODO valideerimisega
router.put(
  "/:id",
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("priority").optional().isInt({ min: 1, max: 5 }).withMessage("Priority must be between 1 and 5"),
  ],
  todosController.update
);

// Kustuta TODO
router.delete("/:id", todosController.delete);

// JWT: Genereeri token valideerimisega (POST meetod)
router.post(
  "/token",
  [body("name").notEmpty().withMessage("Name is required")],
  todosController.generateToken
);

// JWT: Verifitseeri token valideerimisega (POST meetod)
router.post(
  "/verify-token",
  [body("token").notEmpty().withMessage("Token is required")],
  todosController.verifyToken
);

module.exports = router;
