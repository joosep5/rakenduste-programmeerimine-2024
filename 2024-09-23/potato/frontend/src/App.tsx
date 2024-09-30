// app.tsx
import "./App.css";
import Cats from "./components/Cats";
import Todos from "./components/Todos";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './components/theme';  

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Cats />
        <Todos />
      </div>
    </ThemeProvider>
  );
}

export default App;
