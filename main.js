import * as THREE from 'three';
import vertexShader from "./shaders/vertexShader.glsl"
import fragmentShader from "./shaders/fragmentShader.glsl"

const canvas = document.querySelector('#c');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Set canvas size based on window size
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

const fov = 45;
const aspect = window.devicePixelRatio; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.PlaneGeometry(boxWidth, boxHeight, boxDepth);

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);



function render(time) {
  // convert time to seconds
  // time *= 0.001; //


  // Call resize function to make the canvas size dependent on the window size
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

// Add resize event listener
window.addEventListener('resize', () => {
  resizeRendererToDisplaySize(renderer);
});
