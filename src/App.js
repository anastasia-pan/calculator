import { useState } from "react";
import { columnTransformDependencies, evaluate } from "mathjs";

const Calculator = () => {
  const operators = ["+", "-", "/", "x", "%"];

  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

  //   "=",
  //   "AC",

  const [userInput, setUserInput] = useState("");
  const [userTotal, setUserTotal] = useState([]);

  const getValue = (value) => {
    let x = `${userInput}${value}`;
    setUserInput(x);
  };
  const getTotal = () => {
    console.log(userInput);
    let total = evaluate(userInput);
    setUserInput(total);
  };

  const clearInput = () => {
    setUserInput("");
  };

  const playClick = () => {
    const click = "./sounds/click";
    click.play();
  };

  return (
    <div className="wide">
      <div className="calculator">
        <h1 className="screen">{userInput}</h1>
        <div className="numbers">
          {numbers.map((number, index) => (
            <Button key={index} number={number} getValue={getValue} />
          ))}
        </div>
        <div className="operators">
          {operators.map((operator, index) => (
            <Button key={index} number={operator} getValue={getValue} />
          ))}
          <button onClick={getTotal}> = </button>
          <button onClick={clearInput}> AC </button>
        </div>
      </div>
    </div>
  );
};

const Button = (props) => {
  const handleClick = (event) => {
    props.getValue(event.target.value);
  };

  return (
    <>
      <button value={props.number} onClick={handleClick}>
        {props.number}
      </button>
    </>
  );
};

const Head = (props) => {
  return <></>;
};

export default Calculator;
