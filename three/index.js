import * as THREE from "three";
import {
  getProgramRunning,
  setProgramRunning,
  getUserPosition,
  setUserPosition,
  getUserRotation,
  setUserRotation,
  getBlocklyInstructions,
  setCurrentInstructionIndex,
} from "../context";
import { executeInstruction } from "./executeInstruction";
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const width = window.innerWidth / 2,
  height = window.innerHeight / 2;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 2;
camera.position.y = -1.5;
camera.position.x = -.4;
camera.lookAt(0, 0, 0);
// camera.zoom = 2;
// camera.position.y = -1;

const mtlLoader = new MTLLoader();

// Set the path to your assets if needed
mtlLoader.setPath('assets/');

// mtlLoader.load('humanoid.mtl', materials => {
//   materials.preload();
  
//   const objLoader = new OBJLoader();
//   objLoader.setMaterials(materials);
//   objLoader.setPath('assets/');
  
//   objLoader.load('humanoid_.obj', userObj => {
//     userObj.position.y = -0.5; // Adjust position as needed
//     userObj.scale.set(0.4, 0.4, 0.4); // Adjust scale as needed
//     scene.add(userObj);
//   });
// });

let userObj;
const objLoader = new OBJLoader();
  objLoader.setPath('assets/');
  
  objLoader.load('humanoid.obj', function ( object ) {
    userObj = object;
    scene.add( userObj )
    userObj.scale.set(0.0006, 0.0006, 0.0006); // Adjust scale as needed
    userObj.position.y = getUserPosition().y;
    userObj.position.x = getUserPosition().x;
    userObj.rotation.y = getUserRotation().y;
    userObj.rotation.x = getUserRotation().x;
  })


  
let lastInstructionTime = 0;



const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff); // white light
scene.add(light);

const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const userMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });


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
      const checkObstacleCollision = obstacles.some((obstacle) => {
        return (
          userObj.position.distanceTo(obstacle.position) < 0.5
        );
      });
      if (checkObstacleCollision) {
        alert("You hit an obstacle!");
        setProgramRunning(false);
      }
      const checkGoalCollision = goals.some((goal) => {
        return (
          userObj.position.distanceTo(goal.position) < 0.5
        );
      });
      if (checkGoalCollision) {
        alert("You reached the goal!");
        setProgramRunning(false);
      }
      executeInstruction();
      userObj.position.y = getUserPosition().y;
      userObj.position.x = getUserPosition().x;
      userObj.rotation.y = getUserRotation().y;
      lastInstructionTime = time;
    }
  } else {
    if (userObj) {
      userObj.position.y = getUserPosition().y;
      userObj.position.x = getUserPosition().x;
      userObj.rotation.y = getUserRotation().y;
      userObj.rotation.x = getUserRotation().x;
    }
  }

  renderer.render(scene, camera);
}
