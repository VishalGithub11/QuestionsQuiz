import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
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

const GeneralKnowledge = () => {
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
      `https://opentdb.com/api.php?amount=10&category=9&difficulty=${level}&type=multiple`
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
  }, [level]);

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  console.log(questions);
  console.log(level);

  return (
    <div>
      <h1>General Knowledge</h1>

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
                        <ListItemButton
                        //   selected={selectedIndex === 1}
                        //   onClick={(event) => handleListItemClick(event, 1)}
                        >
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

export default GeneralKnowledge;

{
  /* <div>
<p>
  Q {i + 1}: <strong>{item.question}</strong>
</p>

<div>
  <ul>
    <li> {item.correct_answer} </li>
    {item.incorrect_answers.map((incorr, i) => {
      return <li>{incorr}</li>;
    })}
  </ul>
</div>
</div> */
}