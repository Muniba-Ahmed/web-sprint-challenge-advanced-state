import React from "react";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";
import { connect } from "react-redux";

export function Wheel(props) {
  const { moveClockwise, moveCounterClockwise } = props;

  const turnClockwise = (evt) => {
    const { value } = evt.target;
    moveClockwise(value);
  };

  const turnCounterClockwise = (evt) => {
    const { value } = evt.target;
    moveCounterClockwise(value);
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={`${props.wheel === 0 ? "cog active" : "cog"}`}
          style={{ "--i": 0 }}
        >
          {props.wheel === 0 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 1 ? "cog active" : "cog"}`}
          style={{ "--i": 1 }}
        >
          {props.wheel === 1 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 2 ? "cog active" : "cog"}`}
          style={{ "--i": 2 }}
        >
          {props.wheel === 2 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 3 ? "cog active" : "cog"}`}
          style={{ "--i": 3 }}
        >
          {props.wheel === 3 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 4 ? "cog active" : "cog"}`}
          style={{ "--i": 4 }}
        >
          {props.wheel === 4 ? "B" : ""}
        </div>
        <div
          className={`${props.wheel === 5 ? "cog active" : "cog"}`}
          style={{ "--i": 5 }}
        >
          {props.wheel === 5 ? "B" : ""}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={turnCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={turnClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    wheel: state.wheel.counter,
  };
};

export default connect(mapState, { moveClockwise, moveCounterClockwise })(
  Wheel
);
