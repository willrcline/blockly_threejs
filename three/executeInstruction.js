import {

getBlocklyInstructions,
getCurrentInstructionIndex,
setCurrentInstructionIndex,
getProgramRunning,
getUserPosition,
setUserPosition,
getUserRotation,
setUserRotation,
} from "../context";

function executeInstruction() {
if (getCurrentInstructionIndex() < getBlocklyInstructions().length) {
  const instruction = getBlocklyInstructions()[getCurrentInstructionIndex()];

  if (instruction === "moveForward") {
    let currentUserPosition = getUserPosition();
    let currentUserRotation = getUserRotation();
    let x = currentUserRotation.x;
    let y = currentUserRotation.y;
    let newUserPosition = { ...currentUserPosition }; // Clone current position

    // Move forward based on the direction the user is facing
    const forwardDistance = 0.5; // Adjust as needed

    // Normalize rotation to range [0, 2*Math.PI]
    let normalizedRotation = currentUserRotation.y % (2 * Math.PI);
    if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI; // Ensure positive rotation

    if (normalizedRotation === 0 || normalizedRotation === 2 * Math.PI) {
      newUserPosition.x += forwardDistance;
      // WORKS
    } else if (normalizedRotation === Math.PI / 2) {
      // WORKS
      newUserPosition.y += forwardDistance;
    } else if (normalizedRotation === Math.PI) {
      // Facing negative Y-axis direction
      newUserPosition.x -= forwardDistance;
    } else if (normalizedRotation === 3 * Math.PI / 2) {
      // Facing negative X-axis direction
      newUserPosition.y -= forwardDistance;
    }
    
    setUserPosition(newUserPosition);
  } else if (instruction === "rotateLeft") {
    let currentUserRotation = getUserRotation();
    let newUserRotation = {
      y: currentUserRotation.y + Math.PI / 2,
    };
    setUserRotation(newUserRotation);
  } else if (instruction === "rotateRight") {
    let currentUserRotation = getUserRotation();
    let newUserRotation = {
      y: currentUserRotation.y - Math.PI / 2,
    };
    setUserRotation(newUserRotation);
  }

  setCurrentInstructionIndex(getCurrentInstructionIndex() + 1);
} else {
  // All instructions have been executed, stop the program if needed
}
}

export { executeInstruction };
