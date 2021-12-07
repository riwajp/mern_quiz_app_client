import { useState } from "react";
import Nav from "./Nav";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const Quizes = (props) => {
  const [all_quizes, update_all_quizes] = useState([]);

  if (all_quizes.length === 0) {
    fetch("http://localhost:5000/get_all_quizes")
      .then((data) => data.json())
      .then((data) => {
        update_all_quizes(data);
        console.log(data);
      });
  }

  var quizes_render = all_quizes.map((quiz) => (
    <Grid item xs={3} className="my_quizes_quiz">
      <Box
        sx={{
          boxShadow: 3,
          bgcolor: "background.paper",
          m: 1,
          p: 1,
        }}
      >
        <div
          className="my_quizes_quiz_name"
          onClick={() => {
            props.update_currentPage("quiz");
            props.update_currentQuiz(quiz);
          }}
        >
          <a href="#">{quiz.quiz_name}</a>
        </div>
        <hr />
        {quiz.questions.length} Questions
        <span className="my_quizes_quiz_genre">{quiz.category}</span>
      </Box>
    </Grid>
  ));

  return (
    <div>
      <Nav
        update_currentPage={props.update_currentPage}
        user_details={props.user_details}
      />{" "}
      <br />
      <br />
      <Grid container spacing={2}>
        {quizes_render}
      </Grid>
    </div>
  );
};

export default Quizes;
