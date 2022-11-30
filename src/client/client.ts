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
// camera.position.x = -2
// camera.position.y = 4
camera.position.z = 5

const controls = new OrbitControls(camera, renderer.domElement)
// controls.target.set(8, 0, 0)

// Setting up Object3D stuffs (meshes, scene) =========================
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5)) // Adding stuff to Object3D instances will make them the children of the instance.

// Setup geometry and mesh ------------------------------
// const object1 = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     new THREE.MeshPhongMaterial({ color: 0xff0000 })
// )
// object1.position.set(4, 0, 0)
// scene.add(object1)
// object1.add(new THREE.AxesHelper(5))

// const object2 = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     new THREE.MeshPhongMaterial({ color: 0x00ff00 })
// )
// object2.position.set(4, 0, 0)
// object1.add(object2)
// object2.add(new THREE.AxesHelper(5))

// const object3 = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     new THREE.MeshPhongMaterial({ color: 0x0000ff })
// )
// object3.position.set(4, 0, 0)
// object2.add(object3)
// object3.add(new THREE.AxesHelper(5))

const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const icosahedronGeometry = new THREE.IcosahedronGeometry()

//console.log(boxGeometry)

const material = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    // wireframe: true,
})

const cube = new THREE.Mesh(boxGeometry, material)
cube.position.x = 5
scene.add(cube)

const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = -5
scene.add(sphere)

const icosahedron = new THREE.Mesh(icosahedronGeometry, material)
scene.add(icosahedron)

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

// const object1Folder = gui.addFolder('Object1')
// object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X Position')
// object1Folder.add(object1.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
// object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X Scale')
// object1Folder.open()

// const object2Folder = gui.addFolder('Object2')
// object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X Position')
// object2Folder.add(object2.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
// object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X Scale')
// object2Folder.open()

// const object3Folder = gui.addFolder('Object3')
// object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X Position')
// object3Folder.add(object3.rotation, 'x', 0, Math.PI * 2, 0.01).name('X Rotation')
// object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X Scale')
// object3Folder.open()

const cubeFolder = gui.addFolder("Cube")
cubeFolder.add(cube, "visible")

const cubeRotationFolder = cubeFolder.addFolder("Rotation")
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)

const cubePositionFolder = cubeFolder.addFolder("Position")
cubePositionFolder.add(cube.position, "x", -10, 10)
cubePositionFolder.add(cube.position, "y", -10, 10)
cubePositionFolder.add(cube.position, "z", -10, 10)

const cubeScaleFolder = cubeFolder.addFolder("Scale")
cubeScaleFolder.add(cube.scale, "x", 0, 5)
cubeScaleFolder.add(cube.scale, "y", 0, 5)
cubeScaleFolder.add(cube.scale, "z", 0, 5)

const cubeData = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
}
const cubePropertiesFolder = cubeFolder.addFolder('Properties')
cubePropertiesFolder.add(cubeData, 'width', 1, 30).onChange(regenerateBoxGeometry).onFinishChange(() => console.dir(cube.geometry))
cubePropertiesFolder.add(cubeData, 'height', 1, 30).onChange(regenerateBoxGeometry)
cubePropertiesFolder.add(cubeData, 'depth', 1, 30).onChange(regenerateBoxGeometry)
cubePropertiesFolder.add(cubeData, 'widthSegments', 1, 30).onChange(regenerateBoxGeometry)
cubePropertiesFolder.add(cubeData, 'heightSegments', 1, 30).onChange(regenerateBoxGeometry)
cubePropertiesFolder.add(cubeData, 'depthSegments', 1, 30).onChange(regenerateBoxGeometry)
function regenerateBoxGeometry() {
    const newGeometry = new THREE.BoxGeometry(
        cubeData.width,
        cubeData.height,
        cubeData.depth,
        cubeData.widthSegments,
        cubeData.heightSegments,
        cubeData.depthSegments
    )
    cube.geometry.dispose()
    cube.geometry = newGeometry
}

const sphereData = {
    radius: 1,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: Math.PI * 2,
    thetaStart: 0,
    thetaLength: Math.PI,
}
const sphereFolder = gui.addFolder('Sphere')
const spherePropertiesFolder = sphereFolder.addFolder('Properties')
spherePropertiesFolder.add(sphereData, 'radius', 0.1, 30).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'widthSegments', 1, 32).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'heightSegments', 1, 16).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'phiStart', 0, Math.PI * 2).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'phiLength', 0, Math.PI * 2).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'thetaStart', 0, Math.PI).onChange(regenerateSphereGeometry)
spherePropertiesFolder.add(sphereData, 'thetaLength', 0, Math.PI).onChange(regenerateSphereGeometry)
function regenerateSphereGeometry() {
    const newGeometry = new THREE.SphereGeometry(
        sphereData.radius,
        sphereData.widthSegments,
        sphereData.heightSegments,
        sphereData.phiStart,
        sphereData.phiLength,
        sphereData.thetaStart,
        sphereData.thetaLength
    )
    sphere.geometry.dispose()
    sphere.geometry = newGeometry
}

const icosahedronData = {
    radius: 1,
    detail: 0,
}
const icosahedronFolder = gui.addFolder('Icosahedron')
const icosahedronPropertiesFolder = icosahedronFolder.addFolder('Properties')
icosahedronPropertiesFolder.add(icosahedronData, 'radius', 0.1, 10).onChange(regenerateIcosahedronGeometry)
icosahedronPropertiesFolder.add(icosahedronData, 'detail', 0, 5).step(1).onChange(regenerateIcosahedronGeometry)
function regenerateIcosahedronGeometry() {
    const newGeometry = new THREE.IcosahedronGeometry(
        icosahedronData.radius,
        icosahedronData.detail
    )
    icosahedron.geometry.dispose()
    icosahedron.geometry = newGeometry
}

// const cameraFolder = gui.addFolder("Camera")
// cameraFolder.add(camera.position, "z", 0, 20)

// Setup stats ------------------------------
const stats = Stats()
document.body.append(stats.dom)

const debug = document.getElementById('debug1') as HTMLDivElement

// Final steps and rendering =========================
function animate() {
    requestAnimationFrame(animate)

    // const object1WorldPosition = new THREE.Vector3()
    // object1.getWorldPosition(object1WorldPosition)
    // const object2WorldPosition = new THREE.Vector3()
    // object2.getWorldPosition(object2WorldPosition)
    // const object3WorldPosition = new THREE.Vector3()
    // object3.getWorldPosition(object3WorldPosition)

    // debug.innerText =
    //     'Red\n' +
    //     'Local Pos X : ' +
    //     object1.position.x.toFixed(2) +
    //     '\n' +
    //     'World Pos X : ' +
    //     object1WorldPosition.x.toFixed(2) +
    //     '\n' +
    //     '\nGreen\n' +
    //     'Local Pos X : ' +
    //     object2.position.x.toFixed(2) +
    //     '\n' +
    //     'World Pos X : ' +
    //     object2WorldPosition.x.toFixed(2) +
    //     '\n' +
    //     '\nBlue\n' +
    //     'Local Pos X : ' +
    //     object3.position.x.toFixed(2) +
    //     '\n' +
    //     'World Pos X : ' +
    //     object3WorldPosition.x.toFixed(2) +
    //     '\n'

    debug.innerText = 'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n')

    stats.update()
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()