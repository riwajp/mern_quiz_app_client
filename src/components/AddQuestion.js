import TextField from "@mui/material/TextField";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

const AddQuestion = (props) => {
  const [options_render, update_options_render] = useState(null);
  const [alphs, updateAlphs] = useState(["a", "b", "c", "d"]);
  const [question, updateQuestion] = useState("");
  const [options_dict, update_options_dict] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
  });
  const [correct_option, update_correct_option] = useState();

  if (options_render === null) {
    var options_render_temp = Object.keys(options_dict).map((alph) => (
      <div className="option_div">
        <br />
        <TextField
          id="outlined-basic"
          label={"Option " + alph}
          variant="outlined"
          className="option"
          value={alph + ". " + options_dict[alph]}
          onChange={(e) => {
            var options_dict_temp = options_dict;
            options_dict_temp[alph] = e.target.value.slice(3);
            update_options_dict(options_dict_temp);
            update_options_render(null);
            console.log(options_dict);
          }}
        />
      </div>
    ));
    update_options_render(options_render_temp);
  }
  /*
  for (var i = 0; i < alphs.length; i++) {
    options_render

  }
*/

  function add_clicked() {
    var questions = props.questions;
    if (question === "") {
      window.alert("Error");
    } else {
      questions.push({
        question: question,
        options: options_dict,
        correct: correct_option,
      });
    }
    props.update_add_question_state(false);
    console.log(props.questions);
  }
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Question"
        variant="standard"
        className="add_question_question"
        value={question}
        onChange={(e) => updateQuestion(e.target.value)}
      />
      <div className="options">{options_render}</div>
      <br />
      <br />
      <br />
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Correct Option
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Correct Option"
          value={correct_option}
          onChange={(e) => update_correct_option(e.target.value)}
        >
          <MenuItem value={"a"}>a</MenuItem>
          <MenuItem value={"b"}>b</MenuItem>
          <MenuItem value={"c"}>c</MenuItem>
          <MenuItem value={"d"}>d</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <button className="btn_submit_question" onClick={() => add_clicked()}>
        Add
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        className="btn_cancel_question"
        onClick={() => props.update_add_question_state(false)}
      >
        Cancel
      </button>
    </div>
  );
};
export default AddQuestion;
