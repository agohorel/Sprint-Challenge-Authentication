import React from "react";

export const Joke = ({ joke }) => {
  return (
    <div className="joke-card">
      <p>{joke.joke}</p>
    </div>
  );
};
