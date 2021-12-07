import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import AddQuiz from "./components/AddQuiz";
import Quiz from "./components/Quiz";
import Quizes from "./components/Quizes";

function App() {
  const [user_details, update_user_details] = useState(null);
  const [currentPage, update_currentPage] = useState("quizes");
  const [currentQuiz, update_currentQuiz] = useState("");
  const url = window.location.href;

  var render = "";
  if (currentPage === "signup") {
    render = <Signup update_currentPage={update_currentPage} />;
  } else if (currentPage === "login") {
    render = (
      <Login
        update_currentPage={update_currentPage}
        update_user_details={update_user_details}
      />
    );
  } else if (currentPage === "userhome") {
    render = (
      <UserHome
        update_currentPage={update_currentPage}
        user_details={user_details}
        update_currentQuiz={update_currentQuiz}
        update_user_details={update_user_details}
      />
    );
  } else if (currentPage === "add_quiz") {
    render = (
      <AddQuiz
        update_currentPage={update_currentPage}
        user_details={user_details}
      />
    );
  } else if (currentPage === "quiz") {
    render = (
      <Quiz
        update_currentPage={update_currentPage}
        user_details={user_details}
        currentQuiz={currentQuiz}
      />
    );
  } else if (currentPage === "quizes") {
    render = (
      <Quizes
        update_currentPage={update_currentPage}
        user_details={user_details}
        update_currentQuiz={update_currentQuiz}
      />
    );
  }

  return <div className="App">{render}</div>;
}

export default App;
