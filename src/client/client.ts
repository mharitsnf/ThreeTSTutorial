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
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(8, 0, 0)

// Setting up Object3D stuffs (meshes, scene) =========================
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5)) // Adding stuff to Object3D instances will make them the children of the instance.

// Setup geometry and mesh ------------------------------
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
)
object1.position.set(4, 0, 0)
scene.add(object1)
object1.add(new THREE.AxesHelper(5))

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
)
object2.position.set(4, 0, 0)
object1.add(object2)
object2.add(new THREE.AxesHelper(5))

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x0000ff })
)
object3.position.set(4, 0, 0)
object2.add(object3)
object3.add(new THREE.AxesHelper(5))

// Setup lighting ------------------------------
const light1 = new THREE.PointLight()
light1.position.set(10, 10, 10)
scene.add(light1)

const light2 = new THREE.PointLight()
light2.position.set(-10, 10, 10)
scene.add(light2)

// Setup listener -------------------------
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// Setup GUI -------------------------
const gui = new GUI()

const object1Folder = gui.addFolder('Object1')
object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X Position')
object1Folder.add(object1.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X Scale')
object1Folder.open()

const object2Folder = gui.addFolder('Object2')
object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X Position')
object2Folder.add(object2.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X Scale')
object2Folder.open()

const object3Folder = gui.addFolder('Object3')
object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X Position')
object3Folder.add(object3.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X Scale')
object3Folder.open()

// const cubeFolder = gui.addFolder("Cube")
// cubeFolder.add(cube, "visible")
// cubeFolder.open()

// const cubeRotationFolder = cubeFolder.addFolder("Rotation")
// cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2)
// cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2)
// cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2)
// cubeRotationFolder.open()

// const cubePositionFolder = cubeFolder.addFolder("Position")
// cubePositionFolder.add(cube.position, "x", -10, 10)
// cubePositionFolder.add(cube.position, "y", -10, 10)
// cubePositionFolder.add(cube.position, "z", -10, 10)
// cubePositionFolder.open()

// const cubeScaleFolder = cubeFolder.addFolder("Scale")
// cubeScaleFolder.add(cube.scale, "x", 0, 5)
// cubeScaleFolder.add(cube.scale, "y", 0, 5)
// cubeScaleFolder.add(cube.scale, "z", 0, 5)
// cubeScaleFolder.open()

// const cameraFolder = gui.addFolder("Camera")
// cameraFolder.add(camera.position, "z", 0, 20)

// Setup stats ------------------------------
const stats = Stats()
document.body.append(stats.dom)

const debug = document.getElementById('debug1') as HTMLDivElement

// Final steps and rendering =========================
function animate() {
    requestAnimationFrame(animate)

    const object1WorldPosition = new THREE.Vector3()
    object1.getWorldPosition(object1WorldPosition)
    const object2WorldPosition = new THREE.Vector3()
    object2.getWorldPosition(object2WorldPosition)
    const object3WorldPosition = new THREE.Vector3()
    object3.getWorldPosition(object3WorldPosition)
    debug.innerText =
        'Red\n' +
        'Local Pos X : ' +
        object1.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object1WorldPosition.x.toFixed(2) +
        '\n' +
        '\nGreen\n' +
        'Local Pos X : ' +
        object2.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object2WorldPosition.x.toFixed(2) +
        '\n' +
        '\nBlue\n' +
        'Local Pos X : ' +
        object3.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object3WorldPosition.x.toFixed(2) +
        '\n'

    stats.update()
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()