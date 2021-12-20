import './style.css'
import * as THREE from 'three'


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Screen

window.addEventListener('resize', () => {
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

// Movement on the X Y axis using the keyboard arrows

let ArrowDown = false, ArrowUp = false, ArrowLeft = false, ArrowRight = false

document.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.key == 'ArrowLeft') ArrowLeft = true
    if (e.key == 'ArrowRight') ArrowRight = true
    if (e.key == 'ArrowUp') ArrowUp = true
    if (e.key == 'ArrowDown') ArrowDown = true
})

document.addEventListener('keyup', (e) => {
    if (e.key == 'ArrowLeft') ArrowLeft = false
    if (e.key == 'ArrowRight') ArrowRight = false
    if (e.key == 'ArrowUp') ArrowUp = false
    if (e.key == 'ArrowDown') ArrowDown = false
})

const anim = () => {
    if (ArrowUp == true) camera.position.z -= 0.1
    if (ArrowDown == true) camera.position.z += 0.1
    if (ArrowLeft == true) camera.position.x -= 0.1
    if (ArrowRight == true) camera.position.x += 0.1
    renderer.render(scene, camera)
    requestAnimationFrame(anim)
}
anim()

