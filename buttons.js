import {
  setProgramRunning,
  getProgramRunning,
  resetUser,
  setBlocklyInstructions,
  setCurrentInstructionIndex,
} from "./context";
import { workspace } from "./blockly";

// Get the buttons
var resetButton = document.getElementById("reset");
var runButton = document.getElementById("run");

function checkButtonDisplay() {
  if (getProgramRunning()) {
    resetButton.style.display = "block";
    runButton.style.display = "none";
  } else {
    resetButton.style.display = "none";
    runButton.style.display = "block";
  }
}

checkButtonDisplay();

function handleRunProgram() {
  const codeStr = Blockly.JavaScript.workspaceToCode(workspace);
  const codeArray = codeStr.split("\n")
  if (codeArray.length == 1 && codeArray[0] == "") {
    alert("Add blocks to the workspace to run the program")
    return;
  }
  console.log("blockly codeArray___", codeArray);
  setBlocklyInstructions(codeArray);
  setProgramRunning(true);
  resetButton.style.display = "block";
  runButton.style.display = "none";
  console.log("Program is running");
}

function handleResetProgram() {
  resetUser();
  setProgramRunning(false);
  setCurrentInstructionIndex(0);
  resetButton.style.display = "none";
  runButton.style.display = "block";
  console.log("Program is reset");
}

export { handleRunProgram, handleResetProgram };
