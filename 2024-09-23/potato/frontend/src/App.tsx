// frontend/src/App.tsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { themeOptions } from './components/CreateTheme'; // Teema imporditud

import Cats from './components/Cats';
import Todos from './components/Todos';

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* See lisab globaalsete stiilide reseti ja rakendab tumeda režiimi */}
      <Cats />
      <Todos />
    </ThemeProvider>
  );
}

export default App;
