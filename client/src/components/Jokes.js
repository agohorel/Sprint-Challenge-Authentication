import React, { useEffect, useState } from "react";
import axios from "axios";

import { Joke } from "./Joke";

export const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3300/api/jokes", {
        headers: {
          Authorization: localStorage.getItem("joke_token")
        }
      })
      .then(res => setJokes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="jokes">
      {jokes.map(joke => (
        <Joke key={joke.id} joke={joke}></Joke>
      ))}
    </div>
  );
};
