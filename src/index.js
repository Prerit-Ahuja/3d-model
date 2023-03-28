import './style/style.scss';
import iphone from './assets/iphone.glb';
import * as THREE from 'three';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log(THREE);
const model = document.querySelector('.model');
gsap.registerPlugin(ScrollTrigger);

// defining scene:
const scene = new THREE.Scene();

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height, 0.1, 100)
camera.position.set(0,0,2);
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({
    canvas: model
})

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

renderer.shadowMap.enabled = true;

const loader = new GLTFLoader();
loader.load(iphone, function(glb){
    const model = glb.scene;
    scene.add(model);
    model.position.y = -3;

    gsap.to(model.position, {
        y:0,
        scrollTrigger:{
            trigger: '.model',
            start:"200px top",
            end:"600px top",
            scrub:1,
        }
    })

    gsap.to(model.rotation, {
        y:3.2,
        scrollTrigger:{
            trigger: '.model',
            start:"600px top",
            end:"1200px top",
            scrub:1,
        }
    })

    gsap.to(model.rotation, {
        z:1.56,
        scrollTrigger:{
            trigger: '.model',
            start:"1200px top",
            end:"1600px top",
            scrub:1,
        }
    })

    gsap.to(camera.position, {
        z:0,
        scrollTrigger:{
            trigger: '.model',
            start:"1600px top",
            end:"2100px top",
            scrub:1,
        }
    })

    gsap.to(".second__text",{
        y: 500,
        scrollTrigger:{
            trigger: '.second',
            start:"2200px top",
            scrub:1,
        }
    })
});

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(1,7,10);
scene.add(light);








