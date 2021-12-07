import Nav from "./Nav.js";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import AddQuestion from "./AddQuestion.js";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const AddQuiz = (props) => {
  const [quiz_name, update_quiz_name] = useState("");
  const [questions, updateQuestions] = useState([]);
  const [questions_render, update_questions_render] = useState([]);
  const [add_question_state, update_add_question_state] = useState(false);
  const [category, update_category] = useState("Other");
  function add_question() {
    update_add_question_state(true);
  }
  function save_quiz() {
    if (quiz_name === "" || questions.length === 0) {
      window.alert("Error");
      props.update_currentPage("userhome");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quiz_name: quiz_name,
          questions: questions,
          category: category,
          user_details: props.user_details,
        }),
      };
      fetch(
        "https://quizapp-riwajprasai.herokuapp.com/add_quiz",
        requestOptions
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          props.update_currentPage("userhome");
        });
    }
  }
  if (questions.length > 0 && questions.length !== questions_render.length) {
    var questions_render_temp = questions.map((questions_single) => (
      <Box
        sx={{
          boxShadow: 3,
          bgcolor: "background.paper",
          m: 1,
          p: 1,
        }}
        className="add_quiz_question_container"
      >
        <span className="add_quiz_question">{questions_single.question}</span>
        <hr />

        <div className="add_quiz_option">
          a. {questions_single.options["a"]}
        </div>

        <div className="add_quiz_option">
          b. {questions_single.options["b"]}
        </div>

        <div className="add_quiz_option">
          c. {questions_single.options["c"]}
        </div>

        <div className="add_quiz_option">
          d. {questions_single.options["d"]}
        </div>
      </Box>
    ));
    update_questions_render(questions_render_temp);
  }

  return (
    <div>
      <Nav update_currentPage={props.update_currentPage} />
      {add_question_state === false ? (
        <div className="add_quiz_body">
          <span>
            <TextField
              id="standard-basic"
              label="Quiz Name"
              variant="standard"
              className="add_quiz_name"
              value={quiz_name}
              onChange={(e) => update_quiz_name(e.target.value)}
            />
            <button className="save_quiz" onClick={() => save_quiz()}>
              Save
            </button>
          </span>
          <br />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Correct Option"
              value={category}
              onChange={(e) => update_category(e.target.value)}
            >
              <MenuItem value={"Other"}>Other</MenuItem>

              <MenuItem value={"Geography"}>Geography</MenuItem>
              <MenuItem value={"Science"}>Science</MenuItem>
              <MenuItem value={"Physics"}>Physics</MenuItem>
              <MenuItem value={"Chemistry"}>Chemistry</MenuItem>
              <MenuItem value={"Mathematics"}>Mathematics</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Politics"}>Politics</MenuItem>
              <MenuItem value={"Literature"}>Literature</MenuItem>
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"TV Shows"}>TV Shows</MenuItem>
              <MenuItem value={"Movies"}>Movies</MenuItem>
              <MenuItem value={"Music"}>Music</MenuItem>
              <MenuItem value={"Sports"}>Sports</MenuItem>
            </Select>
          </FormControl>
          <br />

          {questions.length === 0 ? (
            <div>
              <center>
                <div className="zero_questions"> 0 Questions</div>
                <br />
                <button className="add_question" onClick={() => add_question()}>
                  Add Question
                </button>
              </center>
            </div>
          ) : (
            <div className="add_questions_main_container">
              {questions_render}
              <button
                className="add_question"
                onClick={() => add_question()}
                style={{ marginLeft: 6 }}
              >
                Add Question
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="add_quiz_body">
          <AddQuestion
            questions={questions}
            update_questions={updateQuestions}
            update_add_question_state={update_add_question_state}
          />
        </div>
      )}
    </div>
  );
};

export default AddQuiz;
