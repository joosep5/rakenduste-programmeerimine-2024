//backend/controllers/todo.controllers.js
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

// Secret for signing tokens
const JWT_SECRET = "mysecretkey";

// Näidis TODO-de andmed
const todos = [
  {
    id: crypto.randomUUID(),
    title: "Buy groceries",
    priority: 1,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: "Finish project",
    priority: 2,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },  
];

// JWT: Genereeri token
exports.generateToken = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Create a token with the name
  const { name } = req.body;
  const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: "1h" });
  res.send({ token });
};

// JWT: Verifitseeri token
exports.verifyToken = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: "Token is required" });
  }

  // Verify the token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    // If the token is valid, return the decoded info
    res.send({ message: "Token is valid", decoded });
  });
};

// Loo uus TODO valideerimisega
exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, priority } = req.body;
  const newTodo = {
    id: crypto.randomUUID(),
    title,
    priority: priority || 1,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  todos.push(newTodo);
  res.send(newTodo);
};

// Näita kõiki TODO-sid (vaid mitte-kustutatud)
exports.read = (req, res) => {
  const activeTodos = todos.filter(todo => !todo.deleted);
  res.send(activeTodos);
};

// Uuenda TODO valideerimisega
exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, priority } = req.body;

  console.log("Uuendamine, ID:", id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).send({ message: "TODO not found" });
  }

  if (todo.deleted) {
    return res.status(410).send({ message: "TODO is deleted" });
  }

  if (title) todo.title = title;
  if (priority) todo.priority = priority;

  todo.updatedAt = Date.now();
  res.send(todo);
};

// Kustuta TODO
exports.delete = (req, res) => {
  const { id } = req.params;

  console.log("Kustutamine, ID:", id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).send({ message: "TODO not found" });
  }

  if (todo.deleted) {
    return res.status(410).send({ message: "TODO is already deleted" });
  }

  todo.deleted = true;
  todo.updatedAt = Date.now();
  res.send({ message: "TODO deleted", todo });
};
