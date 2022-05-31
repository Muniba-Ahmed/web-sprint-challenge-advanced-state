import React, { useEffect } from "react";
import {
  selectAnswer,
  fetchQuiz,
  postAnswer,
  setMessage,
} from "../state/action-creators";
import { connect } from "react-redux";

export function Quiz(props) {
  const { quiz } = props;

  useEffect(() => {
    props.fetchQuiz();
  }, []);

  const selectClick = (answer_id) => {
    props.selectAnswer(answer_id);
    console.log(answer_id);
  };

  const submitClick = (e) => {
    e.preventDefault();
    props.postAnswer({
      quiz_id: props.quiz.quiz_id,
      answer_id: props.selectedAnswer,
    });
  };

  return (
    <div id="wrapper">
      {quiz ? (
        <>
          <h2>{quiz.question}</h2>
          <div id="quizAnswers">
            <div
              className={`${
                props.selectedAnswer === quiz.answers[0].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[0].text}
              <button onClick={() => selectClick(quiz.answers[0].answer_id)}>
                {props.selectedAnswer === quiz.answers[0].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
            <div
              className={`${
                props.selectedAnswer === quiz.answers[1].answer_id
                  ? "answer selected"
                  : "answer"
              }`}
            >
              {quiz.answers[1].text}
              <button onClick={() => selectClick(quiz.answers[1].answer_id)}>
                {props.selectedAnswer == quiz.answers[1].answer_id
                  ? "SELECTED"
                  : "Select"}
              </button>
            </div>
          </div>
          <button
            disabled={!props.selectedAnswer}
            onClick={submitClick}
            id="submitAnswerBtn"
          >
            Submit answer
          </button>
        </>
      ) : (
        "Loading next quiz..."
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};
export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
  setMessage,
})(Quiz);
