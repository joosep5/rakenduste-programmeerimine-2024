import React from "react";
import "./MyProfile.css";

const MyProfile = ({ name, hobbies }) => {
  return (
    <div className="profile-container">
      <h1>{name}</h1>

      <h2>Minu huvid/hobid:</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <h2>Kontaktivorm</h2>
      <form>
        <label>
          E-mail:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Teade:
          <textarea name="message" />
        </label>
        <br />
        <button type="button">Saada</button>
      </form>
    </div>
  );
};

export default MyProfile;
