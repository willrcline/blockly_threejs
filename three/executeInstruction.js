import {
  getBlocklyInstructions,
  getCurrentInstructionIndex,
  setCurrentInstructionIndex,
  getProgramRunning,
  getUserPosition,
  setUserPosition,
} from "../context";

function executeInstruction() {
  if (getCurrentInstructionIndex() < getBlocklyInstructions().length) {
    const instruction = getBlocklyInstructions()[getCurrentInstructionIndex()];

    if (instruction === "moveForward") {
      let currentUserPosition = getUserPosition();
      let newUserPosition = {
        x: currentUserPosition.x,
        y: currentUserPosition.y + 0.25,
      };
      setUserPosition(newUserPosition);
    } else if (instruction === "rotateLeft") {
      // rotate user left
    } else if (instruction === "rotateRight") {
      // rotate user right
    }

    setCurrentInstructionIndex(getCurrentInstructionIndex() + 1);
  } else {
    // All instructions have been executed, stop the program if needed
  }
}

export { executeInstruction };
