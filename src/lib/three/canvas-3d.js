import * as THREE from "three";
import { loadModel, wait } from "$lib/utils.js";

let camera, scene, renderer, animator, controls;
let model;
const clock = new THREE.Clock();
const CANVAS_ID = "card-illust";
const ASPECT_RATIO = 0.75;

function onWindowResize() {
  let canvas = document.getElementById(CANVAS_ID);
  if (!canvas) {
    return;
  }
  canvas.style = "";
  let w = canvas.clientWidth;
  let h = canvas.clientHeight; //w * ASPECT_RATIO;
  renderer.setSize(w, h);
}

async function init() {
  let canvas = document.getElementById(CANVAS_ID);
  let w = canvas.clientWidth;
  let h = canvas.clientHeight; //w * ASPECT_RATIO;
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  addEventListener("resize", onWindowResize);
  if (scene != null) {
    return;
  }
  await buildScene();
  playIntro();
}

function destroy() {
  renderer.dispose();
}

async function buildScene() {
  scene = new THREE.Scene();
  model = await loadModel("empress.gltf");
  animator = new THREE.AnimationMixer(model.scene);
  model.scene.traverse(e => {
    if(e.isLight) {
      e.intensity /= 20;
      console.log(e)
    }
  });
  console.log(model.cameras);
  camera = model.cameras[0];
  model.scene.position.z = 0.5;
  scene.add(model.scene);
}

function render() {
  const delta = clock.getDelta();
  if (animator) {
    animator.update(delta);
  }
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
  if (controls) {
    controls.update();
  }
}

function playIntro() {
  const animation = fadeToAction("intro", 0.0);
  animation.clampWhenFinished = true;
  animation.setLoop(THREE.LoopOnce);
  animator.addEventListener("finished", returnToIdle);
  isZoomingOut = true;
}

async function returnToIdle() {
  animator.removeEventListener("finished", returnToIdle);
  fadeToAction("idle", 0.25);
  isZoomingOut = false;
  isZoomingIn = true;
  await wait(500);
  isZoomingIn = false;
}

function fadeToAction(name, duration) {
  const animation = animator.clipAction(
    model.animations.find((e) => e.name === name)
  );
  return animation.reset().fadeIn(duration).play();
}

export { CANVAS_ID, init, destroy, render };
