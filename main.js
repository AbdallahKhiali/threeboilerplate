import * as THREE from 'three' // ThreeJS
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Orbit controls
// import * as dat from 'dat.gui' // Interface controller
// import gsap from 'gsap' // Animation library
// import image from './image.jpg' // Texture
import vertexShader from './shaders/vertexShader.glsl' // A shader that handles the processing of individual vertices
import fragmentShader from './shaders/fragmentShader.glsl' // A shader that handles the processing of colors


/** Create an interface controller */
// const gui = new dat.GUI({ closed: true })
const data = {
  mouse: { x: 0, y: 0, k: 0.01 },
  progress: 0,
  speed: 0.05
}
// gui.add(data, 'progress', 0, 1, 0.01)

/** Create a renderer */
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: false })
renderer.setPixelRatio(window.devicePixelRatio) // Set device pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight) // Resize renderer
renderer.setClearColor('#0F111A', 1) // WebGL background color
renderer.physicallyCorrectLights = true // Use physically correct lighting mode
renderer.outputEncoding = THREE.sRGBEncoding // Output encoding

/** Setup a perspective camera */
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000)
camera.position.set(0, 0, 2)
/** Setup an orthographic camera */
// const frustum = 3
// const aspect = window.innerWidth / window.innerHeight
// const camera = new THREE.OrthographicCamera(frustum * aspect / -2, frustum * aspect / 2, frustum / 2, frustum / -2, 0.001, 1000)
// camera.position.set(0, 0, 2)

/** Setup a camera controller */
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.dampingFactor = 0.05

/** Setup a scene */
const scene = new THREE.Scene()

/** Generate a plane geometry */
const geometry = new THREE.PlaneGeometry(4, 2, 128, 128)
/** Generate a sphere geometry */
// const geometry = new THREE.SphereGeometry(1, 32, 32)

/** Load a texture */
// const texture = new THREE.TextureLoader().load(image, t => {  })
// texture.minFilter = THREE.LinearFilter // Prevent image resizing

/** Create a material rendered with custom shaders */
const material = new THREE.ShaderMaterial({
  extensions: {
    derivatives: '#extention GL_OES_standard_derivatives : enable'
  },
  uniforms: {
    // uAspectRatio: { value: new THREE.Vector2(1, 1) },
    // uMouse:       { value: new THREE.Vector2(data.mouse.x, data.mouse.y) },
    // uProgress:    { value: data.progress },
    // uTexture:     { value: texture },
    uTime: { value: 0 }
  },
  side: THREE.DoubleSide,
  wireframe: true,
  // transparent: true,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})

/** Setup a triangular polygon mesh */
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/** Window resize event handler */
const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)

  camera.aspect = window.innerWidth / window.innerHeight
  // camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camera.position.z)) // Move the camera to fit a mesh to the screen
  // camera.fov = 2 * Math.atan((window.innerHeight / 2) / camera.position.z) * (180 / Math.PI) // Make the dimensions of the canvas the same as the document (1 === 1px)
  camera.updateProjectionMatrix()

  /** Scale the mesh to fit the screen */
  // if (window.innerWidth / window.innerHeight > 1) {
  //   mesh.scale.x = camera.aspect
  // } else {
  //   mesh.scale.y = 1 / camera.aspect
  // }

  /** Scale the mesh to fit the screen */
  // if (window.innerWidth / window.innerHeight > 1) {
  //   mesh.scale.x = mesh.scale.y = window.innerWidth / window.innerHeight
  // }

  /** Calculate aspect ratio */
  // const imageAspectRatio = 1080 / 1920 // texture.image.width / texture.image.height
  // if (window.innerHeight / window.innerWidth > imageAspectRatio) {
  //   material.uniforms.uAspectRatio.value.x = window.innerWidth / window.innerHeight * imageAspectRatio
  //   material.uniforms.uAspectRatio.value.y = 1
  // } else {
  //   material.uniforms.uAspectRatio.value.x = 1
  //   material.uniforms.uAspectRatio.value.y = window.innerHeight / window.innerWidth / imageAspectRatio
  // }
}
resize()
window.addEventListener('resize', resize)

/** Get mouse position */
// window.addEventListener('mousemove', ({ clientX: x, clientY: y }) => {
//   // From -1 to 1
//   data.mouse.x = x / window.innerWidth * 2 - 1
//   data.mouse.y = y / window.innerHeight * 2 - 1
//   // From 0 to 1
//   data.mouse.x = x / window.innerWidth
//   data.mouse.y = y / window.innerHeight
// })

/** Main loop */
void function animate() {
  requestAnimationFrame(animate)

  /** Update uniform values */
  material.uniforms.uTime.value += data.speed
  // material.uniforms.uProgress.value = data.progress
  // material.uniforms.uMouse.value.x += (data.mouse.x - material.uniforms.uMouse.value.x) * data.mouse.k
  // material.uniforms.uMouse.value.y += (data.mouse.y - material.uniforms.uMouse.value.y) * data.mouse.k

  // controls.update()
  renderer.render(scene, camera)
}()