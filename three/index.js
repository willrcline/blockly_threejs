import * as THREE from "three";
import {
  getProgramRunning,
  setProgramRunning,
  getUserPosition,
  getUserRotation,
  getBlocklyInstructions,
  resetUser
} from "../context";
import { executeInstruction } from "./executeInstruction";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { handleResetProgram } from "../buttons";

let lastInstructionTime = 0;
const width = window.innerWidth / 2, height = window.innerHeight / 2;

function setUserObj() {
  userObj.position.y = getUserPosition().y;
  userObj.position.x = getUserPosition().x;
  userObj.rotation.y = getUserRotation().y;
  userObj.rotation.x = getUserRotation().x;
}

function updateUserObj() {
  userObj.position.y = getUserPosition().y;
  userObj.position.x = getUserPosition().x;
  userObj.rotation.y = getUserRotation().y;
}

const checkCollision = (objects) => {
  return objects.some((object) => {
    return (
      userObj.position.distanceTo(object.position) < 0.5
    );
  });
}

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 2;
camera.position.y = -1.5;
camera.position.x = -.4;
camera.lookAt(0, 0, 0);
// camera.zoom = 2;
// camera.position.y = -1;

const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

let userObj;
const objLoader = new OBJLoader();
// objLoader.setPath('assets/');

objLoader.load('/models/humanoid.obj', function ( object ) {
  userObj = object;
  scene.add( userObj )
  userObj.scale.set(0.0006, 0.0006, 0.0006);
  setUserObj()
})


function makeObstacleInstance(box, x) {
  const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  
  const obstacle = new THREE.Mesh(box, obstacleMaterial);
  scene.add(obstacle);
  
  obstacle.position.x = x;
  
  return obstacle;
}

const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const obstacles = [
  makeObstacleInstance(box, 0),
  makeObstacleInstance(box, -1),
  makeObstacleInstance(box, 1),
];

const goalMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const goal = new THREE.Mesh(box, goalMaterial);
const goals = [goal]
scene.add(goal);
goal.position.y = 1;

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
    if (userObj && time - lastInstructionTime >= 1) {
      
      if (checkCollision(obstacles)) {
        alert("You hit an obstacle!");
        setProgramRunning(false);
        setTimeout(() => {
          handleResetProgram();
          updateUserObj();
        }, 500);
        return
      }
      if (checkCollision(goals)) {
        alert("You reached the goal! You solved this level with " + getBlocklyInstructions().length + " lines of JavaScript!\n\n" +
        getBlocklyInstructions().join("\n"))
        setProgramRunning(false);
        setTimeout(() => {
          handleResetProgram();
          updateUserObj();
        }, 500);
        return
      }
      
      executeInstruction();
      updateUserObj()

      lastInstructionTime = time;
    }
  } else {
    if (userObj) {
      resetUser()
      updateUserObj()
    }
  }

  renderer.render(scene, camera);
}
