import { Box, List, ListItem, Typography, Button, TextField, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";
import { useTheme } from '@mui/material/styles';

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editCatId, setEditCatId] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState<string>("");

  const theme = useTheme(); // Kasutame Material UI teemat

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();
    setCats(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:8080/cats/${id}`, {
      method: "DELETE",
    });
    fetchCats();
  };

  const handleUpdate = async (id: string) => {
    if (editCatName.trim() === "") return;

    await fetch(`http://localhost:8080/cats/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: editCatName }),
    });
    setEditCatId(null);
    setEditCatName("");
    fetchCats();
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box>
      <Typography variant="h3" color={theme.palette.primary.main}>
        Cats
      </Typography>
      <List>
        {cats.map((cat) => (
          <ListItem key={cat.id}>
            {editCatId === cat.id ? (
              <Stack direction="row" spacing={2}>
                <TextField
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  sx={{ color: theme.palette.primary.main }}
                />
                <Button 
                  onClick={() => handleUpdate(cat.id)} 
                  sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main }}
                >
                  Save
                </Button>
                <Button 
                  onClick={() => setEditCatId(null)}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Box>
                {JSON.stringify(cat)}
                <Button 
                  onClick={() => setEditCatId(cat.id)}
                  sx={{ color: theme.palette.primary.main }}
                >
                  Edit
                </Button>
                <Button 
                  onClick={() => handleDelete(cat.id)}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  Delete
                </Button>
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};

export default Cats;
