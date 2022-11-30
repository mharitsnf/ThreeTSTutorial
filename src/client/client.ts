import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

// Renderer (responsible for rendering) accepts two parameters: an Object3D and a camera.
// So we will start with the renderer, the camera, and the objects to be rendered

// Setup renderer =========================
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


// Setting up camera =========================
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
    )
    camera.position.z = 2
    
new OrbitControls(camera, renderer.domElement)

// Setting up Object3D stuffs (meshes, scene) =========================
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

// Setup geometry and mesh ------------------------------
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Setup listener -------------------------
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// Setup stats and GUI -------------------------
const stats = Stats()
document.body.append(stats.dom)

const gui = new GUI()

const cubeFolder = gui.addFolder("Cube")
cubeFolder.add(cube, "visible")
cubeFolder.open()

const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2)
cubeRotationFolder.open()

const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10)
cubePositionFolder.add(cube.position, "y", -10, 10)
cubePositionFolder.add(cube.position, "z", -10, 10)
cubePositionFolder.open()

const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, "x", 0, 5)
cubeScaleFolder.add(cube.scale, "y", 0, 5)
cubeScaleFolder.add(cube.scale, "z", 0, 5)
cubeScaleFolder.open()

const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 20)

// Final steps and rendering =========================
function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()