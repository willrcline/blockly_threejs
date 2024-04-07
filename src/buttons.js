import {
  setProgramRunning,
  getProgramRunning,
  resetUser,
  setBlocklyInstructions,
  setCurrentInstructionIndex,
} from "/src/context";
import { workspace } from "../blockly";

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
  setBlocklyInstructions(codeArray);
  setProgramRunning(true);
  resetButton.style.display = "block";
  runButton.style.display = "none";
}

function handleResetProgram() {
  resetUser();
  setProgramRunning(false);
  setCurrentInstructionIndex(0);
  resetButton.style.display = "none";
  runButton.style.display = "block";
}

export { handleRunProgram, handleResetProgram };
