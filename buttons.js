import {
  setProgramRunning,
  getProgramRunning,
  getUserPosition,
  setUserPosition,
  setCurrentInstructionIndex,
} from "./context";

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

// Function to toggle the programRunning variable
function handleRunProgram() {
  setProgramRunning(true);
  resetButton.style.display = "block";
  runButton.style.display = "none";
  console.log("Program is running");
}

function handleResetProgram() {
  setUserPosition({ x: 0, y: -1 });
  setProgramRunning(false);
  setCurrentInstructionIndex(0);
  resetButton.style.display = "none";
  runButton.style.display = "block";
  console.log("Program is reset");
}

export { handleRunProgram, handleResetProgram };
