import { useState } from "react";
import { columnTransformDependencies, evaluate } from "mathjs";
import { Howl, Howler } from "howler";
import click from "./sounds/click.wav";

//global function that plays a click sound
const clickPlay = () => {
  var sound = new Howl({
    src: [click],
  });

  sound.play();
};

const Calculator = () => {
  //array for operators
  const operators = [".", "+", "-", "/", "*", "%"];
  //array for numbers
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

  const [userInput, setUserInput] = useState("");

  //function that accrus userinput events to value and setsuserinput to new state
  const getValue = (value) => {
    let x = `${userInput}${value}`;
    setUserInput(x);
  };

  //function that uses math.evaluate to calculate a total from the userInput string

  const getTotal = () => {
    console.log(userInput);
    let total = evaluate(userInput);
    setUserInput(total);
  };

  //function that clears userInput, used by AC
  const clearInput = () => {
    setUserInput("");
  };

  //root return: a screen, a mapped of the array numbers and operators, individual AC and equals buttons
  //..that clear and tote up the input

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
        </div>
        <div className="results">
          <button
            id="equals"
            onClick={() => {
              getTotal();
              clickPlay();
            }}
          >
            =
          </button>
          <button
            id="AC"
            onClick={() => {
              clearInput();
              clickPlay();
            }}
          >
            {" "}
            AC{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

//button component
const Button = (props) => {
  //function that takes an event and takes its value (also make a click sound, why not :) )
  //it uses the function getValue to accrue the button clicks into a user input (func passed via propss)
  const handleClick = (event) => {
    clickPlay();
    props.getValue(event.target.value);
  };

  //button that displays
  //returns button displaying the value of the array item, and uses function handleClick
  //.. to trigger the state setting of user input
  return (
    <>
      <button value={props.number} onClick={handleClick}>
        {props.number}
      </button>
    </>
  );
};

export default Calculator;
