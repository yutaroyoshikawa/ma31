import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

let data = require("./data.json");

class Answer extends React.Component {
  render() {
    return <li>{this.props.text}</li>;
  }
}

class CorrectAnswer extends React.Component {
  render() {
    return <div className="sample">答え</div>;
  }
}
class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz_list: this.props.data,
      number: 0
    };
  }
  render() {
    let quiz = this.state.quiz_list[this.state.number];

    return (
      <section>
        <h1>{quiz.title}</h1>
        <ul>
          {quiz.answer.map(item => {
            return <Answer text={item} />;
          })}
        </ul>
        <CorrectAnswer />
      </section>
    );
  }
}

ReactDOM.render(<Quiz data={data.quiz} />, document.getElementById("root"));
