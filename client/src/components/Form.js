import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const Form = ({ type }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [welcomeMsg, setWelcomeMsg] = useState("");
  let history = useHistory();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost:3300/api/auth/${type}`,
      formData
    );

    type === "login"
      ? setWelcomeMsg(res.data.msg)
      : setWelcomeMsg(`welcome, ${res.data.username}!`);

    localStorage.setItem("joke_token", res.data.token);

    const timer = setTimeout(() => {
      history.push("/jokes");
      clearTimeout(timer);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>{welcomeMsg}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          value={formData.username}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button>{type}</button>
      </form>
    </div>
  );
};
