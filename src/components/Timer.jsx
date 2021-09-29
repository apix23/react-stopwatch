import React from "react";
import Button from "./Button";
const Timer = () => {
  return (
    <main>
      <div className="controllers">
        <Button cssClass={"controllers__disabled"} content={"Lap"} />
        <Button cssClass={"controllers__start"} content={"Start"} />
      </div>
    </main>
  );
};

export default Timer;
