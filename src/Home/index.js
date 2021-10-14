import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Test Quiz</h1>
      <p>Test your Knowledge</p>
      Choose any one of the category below:
      <nav>
        <ul>
          <li>
            <Link to="/general_Knowledge">General Knowlege</Link>
          </li>
          <li>
            <Link to="/mythology">Mythology</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
