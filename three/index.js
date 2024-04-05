import * as THREE from "three";
import {
  getProgramRunning,
  setProgramRunning,
  getUserPosition,
  setUserPosition,
  getBlocklyInstructions,
  setCurrentInstructionIndex,
} from "../context";
import { executeInstruction } from "./executeInstruction";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';

// {
//   const objLoader = new OBJLoader();
//   objLoader.load('assets/robot_.obj', (root) => {
//     scene.add(root);
//   });
// }
let lastInstructionTime = 0;

const width = window.innerWidth / 2,
  height = window.innerHeight / 2;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 2;
camera.position.y = -1.5;
camera.lookAt(0, 0, 0);
// camera.position.y = -1;

const scene = new THREE.Scene();

const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const userMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

//add a light that covers the whole scene
// const light = new THREE.AmbientLight(0xffffff);
// scene.add(light);


function makeObstacleInstance(box, x) {
  const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const obstacle = new THREE.Mesh(box, obstacleMaterial);
  scene.add(obstacle);

  obstacle.position.x = x;

  return obstacle;
}

const obstacles = [
  makeObstacleInstance(box, 0),
  makeObstacleInstance(box, -1),
  makeObstacleInstance(box, 1),
];

const sphere = new THREE.SphereGeometry(0.2, 32, 32);

const user = new THREE.Mesh(sphere, userMaterial);
scene.add(user);
user.position.y = getUserPosition().y;

const goalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const goal = new THREE.Mesh(box, goalMaterial);
scene.add(goal);
goal.position.y = 1.5;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("#c"),
});
renderer.setSize(width, height);
renderer.setAnimationLoop(animation);
const threeContainer = document.querySelector("#three-container");
threeContainer.appendChild(renderer.domElement);

function animation(time) {
  time *= 0.001; // convert time to seconds

  if (getProgramRunning()) {
    if (time - lastInstructionTime >= 1) {
      executeInstruction();
      user.position.y = getUserPosition().y;
      lastInstructionTime = time;
    }
  } else {
    user.position.y = -1
  }

  renderer.render(scene, camera);
}
