import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const data = require("./data.json");

const Answer = props => {
  return (
    <li
      key={props.key}
      onClick={() => props.clickItem(props.text)}
    >
      {props.children}
    </li>
  )
}

const CorrectAnswer = props => {
  return (
    <div className="sample">
      <div>{props.is_correct ? "正解" : "不正解"}</div>
      <div>答え: {props.children}</div>
    </div>
  )
}

const Quiz = props => {
  const [quizList, setQuizList] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(0);
  const [isAnswer, setIsAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const initComponent = useCallback(() => {
    setQuizList(props.data);
    setIsAnswer(false);
    setIsCorrect(false);
  }, [props.data]);

  const answer = (choice) => {
    const quiz = quizList[pageNumber];
    const choice_index = quiz.answer.indexOf(choice);

    setIsAnswer(true);
    setIsCorrect(choice_index === quiz.correct);
  };

  const next = () => {
    setPageNumber(pageNumber + 1);
    initComponent();
  };

  return (
    <section>
      <h1> {quizList[pageNumber].title} </h1>
      <ul>
        {quizList[pageNumber].answer.map(item => {
          return (
            <Answer
              key={item}
              clickItem={choice => answer(choice)}
            >{item}</Answer>
          );
        })}
      </ul>
      {isAnswer && (
        <CorrectAnswer
          is_correct={isCorrect}
        >{quizList[pageNumber].answer[quizList[pageNumber].correct]}</CorrectAnswer>
      )}
      {
        quizList.length - 1 !== pageNumber && (
          <button onClick={() => next()}>次へ</button>
        )
      }
    </section>
  )
}

ReactDOM.render(<Quiz data={data.quiz} />, document.getElementById("root"));
