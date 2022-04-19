import React from "react";

function SplitText({ displayWord, role }) {
  return (
    <span aria-label={displayWord} role={role}>
      {displayWord.split("").map(function (char, index) {
        let style = {"animationDelay": (index /2 ) + "s"}
        return (
          <span aria-hidden="true" key={index} style={style}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

export default SplitText;
