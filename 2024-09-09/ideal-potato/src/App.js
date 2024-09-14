import React, { useState } from "react";
import "./App.css";
import Name from "./components/Name";
import Counter from "./components/Counter";
import PropDrilling from "./components/PropDrilling";
import Show from "./components/Show";
import Context from "./components/Context";
import MyProfile from "./components/MyProfile";
import Game from "./components/Game"; // Importime Game.js


function App() {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(prevShow => !prevShow);
  const hobbies = ["Mängimine", "Reisimine", "Puhkamine"]; // Hobide loend

  return (
    <div className="page-container"> {/* Paigutus Flexboxiga */}
      <Context />
      <Show
        show={show}
        toggleShow={toggleShow}
      />
      <PropDrilling />
      <Counter />
      <Name title="Joosep" />
      <Game />
      <Name />
      <MyProfile name="Joosep" hobbies={hobbies} />
    </div>
  );
}

export default App;
