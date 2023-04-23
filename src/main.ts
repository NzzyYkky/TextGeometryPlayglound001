import './style.scss'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// size
const size = {
  height: window.innerHeight,
  width: window.innerWidth
}

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)

// camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000);
camera.position.z = 45;
camera.position.x = 3;
camera.position.y = 20;
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(size.width, size.height);
renderer.shadowMap.enabled = true;

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target = new THREE.Vector3(0, 0, -40);
controls.update();

const plane = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0x0a7d15 }));
plane.rotation.x = - Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane)

// init hemisphere light
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light1 = new THREE.PointLight(0xff6666, 1, 100);
light1.castShadow = true;
light1.shadow.mapSize.width = 4096;
light1.shadow.mapSize.height = 4096;
scene.add(light1)

const light2 = new THREE.PointLight(0x33ff33, 1, 100);
light2.castShadow = true;
light2.shadow.mapSize.width = 4096;
light2.shadow.mapSize.height = 4096;
scene.add(light2)

// animate
function animate() { 
  renderer.render(scene, camera);
  const now = Date.now() / 1000;
  light1.position.y = 15;
  light1.position.x = Math.cos(now) * 20;
  light1.position.z = Math.sin(now) * 20;

  light2.position.y = 15;
  light2.position.x = Math.cos(now) * 20;
  light2.position.z = Math.sin(now) * 20;
  requestAnimationFrame(animate)
}

document.body.appendChild(renderer.domElement);
animate();