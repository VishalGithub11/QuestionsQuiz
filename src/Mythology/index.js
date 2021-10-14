import React, { useState, useEffect } from "react";

const Mythology = () => {
  const [questions, setQuestions] = useState(null);

  const fetchApi = async () => {
    await fetch(
      "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  console.log(questions);
  return (
    <div>
      <h1>Mythology</h1>
    </div>
  );
};

export default Mythology;
