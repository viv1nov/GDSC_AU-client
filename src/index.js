import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const handleContextMenu = (e) => {
  e.preventDefault();
  alert("Right Click is not Allowed!");
};

window.addEventListener("contextmenu", handleContextMenu);

const handleKeyDown = (e) => {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
    e.preventDefault();
    alert("Developer Tools are not Allowed!");
  }
};

window.addEventListener("keydown", handleKeyDown);

const handleWindowResize = () => {
  let isInspectOpen = false;

  if (window.outerHeight - window.innerHeight > 180) {
    isInspectOpen = true;
  }
  if (window.outerWidth - window.innerWidth > 180) {
    isInspectOpen = true;
  }

  console.log(`You're not supposed to be here, pal!`);
  isInspectOpen === false &&
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

  isInspectOpen === true &&
    root.render(
      <>
        <h1 align="center" className="text-4xl">
          Hello,
          <br />
          Please close the Developer ( Inspect ) window.
          <br />
          And
          <br />
          Refresh the website
        </h1>
      </>
    );
};

window.addEventListener("resize", handleWindowResize);
handleWindowResize();
