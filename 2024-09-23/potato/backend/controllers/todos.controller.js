const crypto = require("crypto");

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
