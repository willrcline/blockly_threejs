let programRunning = false;
let user = { position: { x: 0, y: -1 } };
let blocklyInstructions = [
  "moveForward",
  "moveForward",
  "moveForward",
];
let currentInstructionIndex = 0;

export const getProgramRunning = () => programRunning;
export const setProgramRunning = (value) => { programRunning = value; };
export const getUserPosition = () => user.position;
export const setUserPosition = (value) => { user.position = value; };
export const setBlocklyInstructions = (value) => { blocklyInstructions = value;}
export const getBlocklyInstructions = () => blocklyInstructions
export const getCurrentInstructionIndex = () => currentInstructionIndex
export const setCurrentInstructionIndex = (value) => { currentInstructionIndex = value; }