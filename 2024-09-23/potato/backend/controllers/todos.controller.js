//backend/controllers/todo.controllers.js
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Secret for signing tokens (could be stored in env variables in production)
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
  const { name } = req.body;

  if (!name || name === "") {
    return res.status(400).send({ message: "Name is required to generate token" });
  }

  // Create a token with the name
  const token = jwt.sign({ name }, JWT_SECRET, { expiresIn: "1h" });
  res.send({ token });
};

// JWT: Verifitseeri token
exports.verifyToken = (req, res) => {
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

// Loo uus TODO
exports.create = (req, res) => {
  const { title, priority } = req.body;

  if (!title || title === "") {
    return res
      .status(418)
      .send({ type: "Error", message: "Must include a title" });
  }

  const newTodo = {
    id: crypto.randomUUID(),
    title: title,
    priority: priority || 1, // default priority = 1
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

// Uuenda TODO-d
exports.update = (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;

  console.log("Uuendamine, ID:", id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).send({ type: "Error", message: "TODO not found" });
  }

  if (todo.deleted) {
    return res.status(410).send({ type: "Error", message: "TODO is deleted" });
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
    return res.status(404).send({ type: "Error", message: "TODO not found" });
  }

  if (todo.deleted) {
    return res.status(410).send({ type: "Error", message: "TODO is already deleted" });
  }

  todo.deleted = true;
  todo.updatedAt = Date.now();

  res.send({ message: "TODO deleted", todo });
};
