import React from "react";

const Counter = () => {
  const count = 0;
  const formatCount = () => {
    return count === 0 ? "Empty" : count;
  };

  const getBageClasses = () => {
    let classes = "badge m-2 ";
    classes += count === 0 ? "bg-warning" : "bg-primary";
    return classes;
  };

  return (
    <>
      <span className={getBageClasses()}>{formatCount()}</span>
      <button className="btn btn-primary btn-sm m-2">+</button>
    </>
  );
};

export default Counter;
