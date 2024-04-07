import {
getBlocklyInstructions,
getCurrentInstructionIndex,
setCurrentInstructionIndex,
getUserPosition,
setUserPosition,
getUserRotation,
setUserRotation,
} from "/src/context";

const moveForward = () => {
  let currentUserPosition = getUserPosition();
  let currentUserRotation = getUserRotation();
  let x = currentUserRotation.x;
  let y = currentUserRotation.y;
  let newUserPosition = { ...currentUserPosition };

  const forwardDistance = 0.5;

  let normalizedRotation = currentUserRotation.y % (2 * Math.PI);
  if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI;

  if (normalizedRotation === 0 || normalizedRotation === 2 * Math.PI) {
    newUserPosition.x += forwardDistance;
  } else if (normalizedRotation === Math.PI / 2) {
    newUserPosition.y += forwardDistance;
  } else if (normalizedRotation === Math.PI) {
    newUserPosition.x -= forwardDistance;
  } else if (normalizedRotation === 3 * Math.PI / 2) {
    newUserPosition.y -= forwardDistance;
  }
  
  setUserPosition(newUserPosition);
}

const rotateLeft = () => {
  let currentUserRotation = getUserRotation();
  let newUserRotation = {
    y: currentUserRotation.y + Math.PI / 2,
  };
  setUserRotation(newUserRotation);
}

const rotateRight = () => {
  let currentUserRotation = getUserRotation();
  let newUserRotation = {
    y: currentUserRotation.y - Math.PI / 2,
  };
  setUserRotation(newUserRotation);
}

const instructionMapping = {
  'moveForward();': moveForward,
  'rotateLeft();': rotateLeft,
  'rotateRight();': rotateRight,
};


function executeInstruction() {
  if (getCurrentInstructionIndex() < getBlocklyInstructions().length) {
    const instruction = getBlocklyInstructions()[getCurrentInstructionIndex()];
    const functionToExecute = instructionMapping[instruction];
    functionToExecute();

    setCurrentInstructionIndex(getCurrentInstructionIndex() + 1);
} else {
  
}
}

export { executeInstruction };
