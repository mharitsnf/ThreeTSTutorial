import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Setting up scene ==================================================
const scene1 = new THREE.Scene()
const scene2 = new THREE.Scene()

// Setting up camera ==================================================
const cameraOrtho = new THREE.OrthographicCamera(
    -2, 2, 2, -2,
    0.1, 100
)

const cameraPerspective = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    100
)

cameraPerspective.position.z = 5
cameraOrtho.position.z = 2

// Setting up renderer =======================================================
const canvas1 = document.getElementById("c1") as HTMLCanvasElement
const canvas2 = document.getElementById("c2") as HTMLCanvasElement

const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
renderer1.setSize(200, 200)
// document.body.appendChild(renderer1.domElement) // Include this if you do not write your own canvas

const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
renderer2.setSize(200, 200)

new OrbitControls(cameraOrtho, renderer1.domElement)

// Adding meshes and 3D objects ==================================================
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene1.add(cube)

const geometry2 = new THREE.TorusKnotGeometry()
const material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
const torusKnot = new THREE.Mesh(geometry2, material2)
scene2.add(torusKnot)

// Initialize listeners ==================================================
// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     cameraPerspective.aspect = window.innerWidth / window.innerHeight
//     cameraPerspective.updateProjectionMatrix()
//     renderer1.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

// Animate ==================================================
function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    torusKnot.rotation.y += 0.01

    render()
}

// Render ==================================================
function render() {
    renderer1.render(scene1, cameraOrtho)
    renderer2.render(scene2, cameraPerspective)
}

animate()