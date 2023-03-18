import * as THREE from "three";
import { loadModel, wait } from "$lib/utils.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
  model = await loadModel("empress.glb");
  animator = new THREE.AnimationMixer(model.scene);
  const format = ( renderer.capabilities.isWebGL2 ) ? THREE.RedFormat : THREE.LuminanceFormat;
  const GRADIENT_TONE = 3;
  const colors = new Uint8Array(GRADIENT_TONE+1);
  for (let i = 0; i<=GRADIENT_TONE; i++) {
			colors[i] = (i/GRADIENT_TONE) * 0xffffff;
	}
	const gradientMap = new THREE.DataTexture(colors, colors.length, 1, format);
  gradientMap.needsUpdate = true;
  model.scene.traverse(e => {
    console.log(e);
    if(e.isMesh) {
      let mat = new THREE.MeshToonMaterial();
      mat.color = e.material.color;
      mat.gradientMap = gradientMap;
      e.material = mat;
    }
    if(e.isLight) {
      e.intensity /= 30000;
      //e.visible = false;
    }
  });
  const ambient = new THREE.AmbientLight(0x777777); // soft white light
  scene.add(ambient);
  scene.fog = new THREE.Fog(0x000000, 4, 16);
  camera = model.cameras[0];
  //controls = new OrbitControls(camera, renderer.domElement);
  //controls.update();
  // model.scene.position.z = 0.5;
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
  if(animation) {
    animation.clampWhenFinished = true;
    animation.setLoop(THREE.LoopOnce);
    animator.addEventListener("finished", returnToIdle);
  } else {
    returnToIdle();
  }
}

async function returnToIdle() {
  animator.removeEventListener("finished", returnToIdle);
  fadeToAction("idle", 0.25);
}

function fadeToAction(name, duration) {
  console.log(model.animations);
  const data = model.animations.find((e) => e.name === name);
  if(!data) return;
  const animation = animator.clipAction(data);
  return animation.reset().fadeIn(duration).play();
}

export { CANVAS_ID, init, destroy, render };
