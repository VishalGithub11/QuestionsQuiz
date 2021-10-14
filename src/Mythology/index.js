import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  error: {
    backgroundColor: "tomato",
  },
  success: {
    backgroundColor: "green",
  },
});

const Mythology = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("easy");
  const [itemSelected, setItemSelected] = useState({
    id: "",
  });

  const style = useStyles();

  const fetchApi = async () => {
    setLoading(true);
    await fetch(
      `https://opentdb.com/api.php?amount=10&category=20&difficulty=${level}&type=multiple`
    )
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApi();
    setItemSelected({ id: "" });
  }, [level]);

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  console.log(questions);
  console.log(level);
  return (
    <div>
      <h1>Mythology</h1>

      <label>
        Pick your difficulty:
        <select value={level} onChange={handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </label>

      {loading ? (
        <div style={{ marginTop: "5em" }}>Loading.......</div>
      ) : (
        <div style={{ marginLeft: "25em" }}>
          {questions &&
            questions.results.map((item, index) => {
              return (
                <div>
                  <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h8" component="div">
                        Q {index + 1}: <strong>{item.question}</strong>
                      </Typography>

                      <List component="nav" aria-label="main mailbox folders">
                        {item.incorrect_answers.map((incorr, i) => {
                          return (
                            <ListItemButton color="error">
                              <ListItemText
                                className={
                                  itemSelected.id === index ? style.error : ""
                                }
                                onClick={() => setItemSelected({ id: index })}
                              >
                                {incorr}
                              </ListItemText>
                            </ListItemButton>
                          );
                        })}
                        <ListItemButton>
                          <ListItemText
                            className={
                              itemSelected.id === index ? style.success : ""
                            }
                            primary={item.correct_answer}
                            onClick={() => setItemSelected({ id: index })}
                          />
                        </ListItemButton>
                      </List>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Mythology;
