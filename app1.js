
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
var k=0;
const camera =new THREE.PerspectiveCamera(10,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z=6;
const scene=new THREE.Scene();
let bee;
const renderer=new THREE.WebGLRenderer({alpha:true});
const loader=new GLTFLoader();
let mixer;
const light=new THREE.AmbientLight(0xffffff,1.6);
scene.add(light);
loader.load('./fantasy_butterfly_animation.glb',
    function (gltf){
        bee=gltf.scene;
       
       bee.rotation.y=90;
        bee.position.y=-0.1;
     mixer=new THREE.AnimationMixer(bee);
     mixer.clipAction(gltf.animations[0]).play();
    mixer.update(0.01);
        scene.add(bee);
    },
    function (xhr){},
    function (error){}
)
renderer.setSize(window.innerWidth,window.innerHeight);
document.querySelector(".container").appendChild(renderer.domElement);
const rerender=()=>
    {
         
        requestAnimationFrame(rerender);
        renderer.render(scene,camera);
      
        if(mixer)mixer.update(0.01);
        
    };
    rerender();
  