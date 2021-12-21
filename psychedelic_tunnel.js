import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const speed = 0.25

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const hemisphereLight = new THREE.HemisphereLight(0xff2255, 0x0000ff, 1);
scene.add(hemisphereLight);

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  0.5
);
scene.add(hemisphereLightHelper);

gui.add(hemisphereLight, "intensity").min(0).max(1).step(0.01);

/**
 * Objects
 */

// Material

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

gui.add(material, "roughness").min(0).max(1).step(0.01);

// Objects

for (let i = 0; i < 100; i++) {
//   const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);
//   sphere.position.x = 0 + Math.sin(i / 4) * 20;
//   sphere.position.y = -2 + Math.abs(Math.sin(i / 8) * 10);
//   sphere.position.z = -50 + i / 2;

  for (let j = 0; j < 6; j++) {
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      material
    );
    cube.position.x = -5 + j * 2;
    cube.position.y = -2 + i * 0.2;
    cube.position.z = -50 + i * 2;
    cube.rotation.x = 20;
    cube.rotation.y = i * 1.5;

    scene.add(cube)
  }

  let threshold = 30
  if (i > threshold) {
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(5 * threshold * 0.07, 2 * threshold * 0.08, 32, 64),
        material
      );
      torus.position.x = 0;
      torus.position.y = 0;
      torus.position.z = 120 - i * 2;
      torus.rotation.x = Math.PI;
    
      scene.add(torus);
  } else {
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(5 * i * 0.07, 2 * i * 0.08, 32, 64),
        material
      );
      torus.position.x = 0;
      torus.position.y = 0;
      torus.position.z = 120 - i * 2;
      torus.rotation.x = Math.PI;
    
      scene.add(torus);
  }
}

const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 150), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = 0;
plane.position.z = 50

scene.add(plane);

// Walls

const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(200, 5), material);
wall1.position.x = -10;
wall1.position.y = 2.5;
wall1.position.z = 0;
wall1.rotation.y = Math.PI * 0.5;

const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(50, 10), material);
wall2.position.y = 3;
wall2.position.z = -25;

const wall3 = new THREE.Mesh(new THREE.PlaneGeometry(200, 5), material);
wall3.position.x = 10;
wall3.position.y = 2.5;
wall3.position.z = 0;
wall3.rotation.y = Math.PI * 1.5;

// scene.add(wall1, wall3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 105;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Camera Movement
 */
let ArrowDown = false,
  ArrowUp = false,
  ArrowLeft = false,
  ArrowRight = false;

document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") ArrowLeft = true;
  if (e.key == "ArrowRight") ArrowRight = true;
  if (e.key == "ArrowUp") ArrowUp = true;
  if (e.key == "ArrowDown") ArrowDown = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key == "ArrowLeft") ArrowLeft = false;
  if (e.key == "ArrowRight") ArrowRight = false;
  if (e.key == "ArrowUp") ArrowUp = false;
  if (e.key == "ArrowDown") ArrowDown = false;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  //   controls.update();

  // Update camera
  if (ArrowUp == true) camera.position.z -= speed;
  if (ArrowDown == true) camera.position.z += speed;
  if (ArrowLeft == true) camera.position.x -= speed;
  if (ArrowRight == true) camera.position.x += speed;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
