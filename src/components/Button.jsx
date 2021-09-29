import React from "react";

const Button = ({ content, cssClass, disabled }) => {
  return (
    <button disabled={true} className={cssClass}>
      {content}
    </button>
  );
};

export default Button;
