import React, { useEffect, useState } from "react";
import axios from "axios";

import { Joke } from "./Joke";

export const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      axios
        .get("http://localhost:3300/api/jokes", {
          headers: {
            Authorization: localStorage.getItem("joke_token")
          }
        })
        .then(res => {
          setJokes(res.data);
          setLoading(false);
        })
        .catch(() =>
          setError("you are not authorized to view this page, now scram!")
        );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="jokes">
      {jokes.map(joke => (
        <Joke key={joke.id} joke={joke}></Joke>
      ))}
      {loading && <p className="loading">loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
