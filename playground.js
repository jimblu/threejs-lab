import './style.css'
import * as THREE from 'three'
import {BoxGeometry, MeshBasicMaterial} from 'three'

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Screen

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

// Basic configs

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
camera.position.z = 3
camera.position.y = 1

// Cube ground

const createCube = (color, zPosition, xPosition) => {
    const cube = new THREE.Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color: color}))
    scene.add(cube)
    cube.position.z = -zPosition
    cube.position.x = -xPosition
}

const makeColor = () => {
    const color = ['red', 'yellow', 'green', 'blue', 'purple', 'grey', 'black', 'pink']
    return color[Math.floor(Math.random()*8)]
}

const color = ['red', 'yellow', 'green', 'blue']

for (let i=0;  i <= 50; i++) {
    for (let j=0; j <=50; j++) {
        createCube(makeColor(), i, j)
    }
}


