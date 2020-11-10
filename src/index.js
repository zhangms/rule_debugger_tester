import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import "./debug.js";
import RuleDebuger from "./debug.js";

ReactDOM.render(
  <div className="App">
    <RuleDebuger></RuleDebuger>
  </div>,
  document.getElementById("root")
);
