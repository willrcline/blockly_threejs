let programRunning = false;
let user = { 
  position: { x: 0, y: -1 },
  rotation: { y: Math.PI/2, x: Math.PI/2},
};
let blocklyInstructions = [
  "moveForward",
  "rotateRight",
  "moveForward",
  "rotateLeft",
  "moveForward",
  "moveForward",
  "moveForward",
  "rotateLeft",
  "moveForward",
];
let currentInstructionIndex = 0;

export const resetUser = () => {
  user.position = { x: 0, y: -1 };
  user.rotation = { y: Math.PI/2, x: Math.PI/2 };
};

export const getProgramRunning = () => programRunning;
export const setProgramRunning = (value) => { programRunning = value; };
export const getUserPosition = () => user.position;
export const setUserPosition = (value) => { user.position = value; };
export const getUserRotation = () => user.rotation;
export const setUserRotation = (value) => { user.rotation = value; };
export const setBlocklyInstructions = (value) => { blocklyInstructions = value;}
export const getBlocklyInstructions = () => blocklyInstructions
export const getCurrentInstructionIndex = () => currentInstructionIndex
export const setCurrentInstructionIndex = (value) => { currentInstructionIndex = value; }