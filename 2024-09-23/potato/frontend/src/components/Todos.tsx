import { Box, List, ListItem, Typography, Button, TextField, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  priority: number;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newPriority, setNewPriority] = useState<number>(1);
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");
  const [editTodoPriority, setEditTodoPriority] = useState<number>(1);

  // Fetch TODOs from the backend
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  // Add a new TODO
  const submitTodo = async () => {
    if (newTitle.trim() === "") return;
    await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, priority: newPriority }),
    });
    setNewTitle("");
    setNewPriority(1);
    fetchTodos();
  };

  // Update an existing TODO
  const handleUpdate = async (id: string) => {
    if (editTodoTitle.trim() === "") return;
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editTodoTitle, priority: editTodoPriority }),
    });
    setEditTodoId(null);
    setEditTodoTitle("");
    setEditTodoPriority(1);
    fetchTodos();
  };

  // Delete a TODO
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3">TODOs</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            {editTodoId === todo.id ? (
              <Stack direction="row" spacing={2}>
                <TextField
                  label="Edit Title"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                />
                <TextField
                  label="Edit Priority"
                  type="number"
                  value={editTodoPriority}
                  onChange={(e) => setEditTodoPriority(Number(e.target.value))}
                />
                <Button onClick={() => handleUpdate(todo.id)}>Save</Button>
                <Button onClick={() => setEditTodoId(null)}>Cancel</Button>
              </Stack>
            ) : (
              <Box>
                {`Title: ${todo.title}, Priority: ${todo.priority}, Created At: ${new Date(todo.createdAt).toLocaleString()}`}
                <Button onClick={() => { setEditTodoId(todo.id); setEditTodoTitle(todo.title); setEditTodoPriority(todo.priority); }}>Edit</Button>
                <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5">Add New TODO</Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          label="New Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          label="Priority"
          type="number"
          value={newPriority}
          onChange={(e) => setNewPriority(Number(e.target.value))}
        />
        <Button onClick={submitTodo}>Add</Button>
      </Stack>
    </Box>
  );
};

export default Todos;
