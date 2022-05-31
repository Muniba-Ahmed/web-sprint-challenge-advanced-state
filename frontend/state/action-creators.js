// ❗ You don't need to add extra action creators to achieve MVP
import * as type from "./action-types";
import axios from "axios";

export function moveClockwise(value) {
  return { type: type.MOVE_CLOCKWISE, payload: value };
}

export function moveCounterClockwise() {
  return { type: type.MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(answerId) {
  return { type: type.SET_SELECTED_ANSWER, payload: answerId };
}

export function setMessage(value) {
  return { type: type.SET_INFO_MESSAGE, payload: value };
}

export function setQuiz(question) {
  return { type: type.SET_QUIZ_INTO_STATE, payload: question };
}

export function inputChange(input) {
  return { type: type.INPUT_CHANGE, payload: input };
}

export function resetForm() {
  return { type: type.RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((response) => dispatch(setQuiz(response.data)))
      .catch((err) => console.error(err));
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/answer", { quiz_id, answer_id })
      .then((response) => {
        dispatch(selectAnswer(answer_id));

        dispatch(setQuiz(null));

        dispatch(setMessage(response.data.message));

        dispatch(fetchQuiz());
      })
      .catch((err) => {
        console.error(err);
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz({
  question_text,
  true_answer_text,
  false_answer_text,
}) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", {
        question_text,
        true_answer_text,
        false_answer_text,
      })
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => {
        console.log(err);
      });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
