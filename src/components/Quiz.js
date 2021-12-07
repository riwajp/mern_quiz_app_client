import Nav from "./Nav";
import Box from "@mui/material/Box";
import { useState } from "react";
const Quiz = (props) => {
  const [currentView, update_currentView] = useState("quiz");

  const [question_index, update_question_index] = useState(0);
  const [bgs, update_bgs] = useState({
    a: ["rgb(226, 240, 248)", "black"],
    b: ["rgb(226, 240, 248)", "black"],
    c: ["rgb(226, 240, 248)", "black"],
    d: ["rgb(226, 240, 248)", "black"],
  });
  const [refresher, updateRefresher] = useState(0);
  const [selected_options, update_selected_options] = useState([]);
  const [selected_option, update_selected_option] = useState("");
  const [show_next_btn, update_show_next_btn] = useState(false);
  const [score, update_score] = useState(0);
  const [result_details_render, update_result_details_render] = useState("");
  const correct_options = [];
  for (var i = 0; i < props.currentQuiz.questions.length; i++) {
    correct_options.push(props.currentQuiz.questions[i].correct);
  }
  function option_clicked(option) {
    update_selected_option(option);
    if (option === props.currentQuiz.questions[question_index].correct) {
      console.log("Correct");
      var bgs_temp = bgs;
      bgs_temp[option] = ["green", "white"];
      update_bgs(bgs_temp);
      var score_temp = score + 1;
      update_score(score_temp);
      console.log("Score:");
      console.log(score);
    } else {
      console.log("incorrect");
      var bgs_temp = bgs;
      bgs_temp[option] = ["red", "white"];
      bgs_temp[props.currentQuiz.questions[question_index].correct] = [
        "green",
        "white",
      ];

      update_bgs(bgs_temp);
    }
    updateRefresher(Math.random());
    update_show_next_btn(true);
  }
  function next_clicked() {
    /*update_selected_option(option);
    var question_index = props.question_index;

   
    options_renderer();*/
    function options_renderer_result(question_obj) {
      var to_returns = [];
      i = props.currentQuiz.questions.indexOf(question_obj);

      if (question_obj.correct === selected_options[i]) {
        var renders = Object.keys(question_obj.options).map((key) => (
          <button
            className="add_quiz_option"
            style={{
              backgroundColor: key === correct_options[i] ? "green" : "",
              color: key === correct_options[i] ? "white" : "",
            }}
          >
            {key + ". " + question_obj.options[key]}{" "}
          </button>
        ));
      } else {
        var renders = Object.keys(question_obj.options).map((key) => (
          <button
            className="add_quiz_option"
            style={{
              backgroundColor:
                key === correct_options[i]
                  ? "green"
                  : key === selected_options[i]
                  ? "red"
                  : "",
              color:
                key === correct_options[i]
                  ? "white"
                  : key === selected_options[i]
                  ? "white"
                  : "",
            }}
          >
            {key + ". " + question_obj.options[key]}{" "}
          </button>
        ));
      }
      return renders;

      /*var to_return = Object.keys(result_options).map((key) => (
        <button className="add_quiz_option" style={{ backgroundColor: {} }}>
          {key + ". " + result_options[key]}{" "}
        </button>
      ));
      return to_return;*/
    }
    if (question_index + 1 === props.currentQuiz.questions.length) {
      var selected_options_temp = selected_options;
      selected_options_temp.push(selected_option);
      update_selected_options(selected_options_temp);

      var result_details_render_temp = props.currentQuiz.questions.map(
        (question_obj) => (
          <Box
            sx={{
              boxShadow: 5,
            }}
            className="take_quiz_container"
          >
            {question_obj.question}
            <hr />
            {options_renderer_result(question_obj)}
          </Box>
        )
      );
      update_result_details_render(result_details_render_temp);
      update_currentView("result");
    } else {
      var selected_options_temp = selected_options;
      selected_options_temp.push(selected_option);
      update_selected_options(selected_options_temp);
      update_selected_option("");
      update_show_next_btn(false);
      update_bgs({
        a: ["rgb(226, 240, 248)", "black"],
        b: ["rgb(226, 240, 248)", "black"],
        c: ["rgb(226, 240, 248)", "black"],
        d: ["rgb(226, 240, 248)", "black"],
      });
      update_question_index(question_index + 1);
    }
  }
  var options = props.currentQuiz.questions[question_index].options;

  var options_render = Object.keys(options).map((key) => (
    <div>
      {selected_option === "" ? (
        <button
          className="add_quiz_option"
          onClick={() => option_clicked(key)}
          style={{ backgroundColor: bgs[key][0], color: bgs[key][1] }}
        >
          {key + ". " + options[key]}{" "}
        </button>
      ) : (
        <button
          className="add_quiz_option"
          style={{ backgroundColor: bgs[key][0], color: bgs[key][1] }}
        >
          {key + ". " + options[key]}{" "}
        </button>
      )}
    </div>
  ));

  //make a dict of background colors for a b c d
  return (
    <div>
      <Nav
        update_currentPage={props.update_currentPage}
        user_details={props.user_details}
      />

      <Box
        sx={{
          boxShadow: 5,
        }}
        className="take_quiz_container"
      >
        {currentView === "quiz" ? (
          <div>
            <span className="take_quiz_question_index">
              Question {question_index + 1}/{props.currentQuiz.questions.length}
            </span>
            <br />
            <span className="add_quiz_question">
              {props.currentQuiz.questions[question_index].question}
            </span>
            <hr />

            {options_render}
            <br />
            {show_next_btn === true ? (
              <button
                className="take_quiz_next_btn"
                onClick={() => next_clicked()}
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>
            <div className="take_quiz_result_quiz_name">
              {props.currentQuiz.quiz_name}
            </div>
            <hr />
            <div className="take_quiz_result_score_container">
              <span className="take_quiz_result_score">
                Score: {score}/{props.currentQuiz.questions.length}
              </span>
            </div>

            {result_details_render}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Quiz;
