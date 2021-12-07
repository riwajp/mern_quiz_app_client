import { useState } from "react";
import Nav from "./Nav.js";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const UserHome = (props) => {
  const [my_quizes, update_my_quizes] = useState([]);
  const [my_quizes_render, update_my_quizes_render] = useState("");

  function add_quiz_pressed() {
    props.update_currentPage("add_quiz");
  }

  function my_quizes_renderer(my_quizes_p) {
    var my_quizes_render_temp = my_quizes_p.map((my_quiz) => (
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
              props.update_currentQuiz(my_quiz);
            }}
          >
            <a href="#">{my_quiz.quiz_name}</a>
          </div>
          <hr />
          {my_quiz.questions.length} Questions
          <span className="my_quizes_quiz_genre">{my_quiz.category}</span>
        </Box>
      </Grid>
    ));
    update_my_quizes_render(my_quizes_render_temp);
  }
  if (my_quizes.length === 0) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_details: props.user_details,
      }),
    };
    fetch(
      "https://quizapp-riwajprasai.herokuapp.com/get_my_quizes",
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        update_my_quizes(data);
        console.log(my_quizes);
        my_quizes_renderer(data);
      });
  }

  function logout_pressed() {
    props.update_user_details(null);
    props.update_currentPage("quizes");
  }
  return (
    <div>
      <Nav
        update_currentPage={props.update_currentPage}
        user_details={props.user_details}
      />

      <div className="ushome_body">
        <button className="add_quiz_btn" onClick={() => add_quiz_pressed()}>
          Add Quiz
        </button>
        <button className="logout_btn" onClick={() => logout_pressed()}>
          Log Out
        </button>

        <br />
        <br />
        <div className="my_quizes">
          <span className="my_quizes_title">My Quizes</span>
          <hr />
          <Grid container spacing={2}>
            {my_quizes_render}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
