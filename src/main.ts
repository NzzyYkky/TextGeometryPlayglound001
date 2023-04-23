import './style.scss'
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
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

// text loading
const fontLoader = new FontLoader();

fontLoader.load('fonts/Roboto_Condensed_Regular.json', function (font) {
  console.log(font)
  const textGeometry = new TextGeometry('Hello three.js!', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  });
  const textMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  textMesh.castShadow = true;
  textMesh.position.y += 15;
  textMesh.position.z -= 40;
  textMesh.position.x = -8;
  textMesh.rotation.y = -0.50;
  scene.add(textMesh);
});

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

window.addEventListener('resize', () => {
  // update size
	size.width = window.innerWidth;
  size.height = window.innerHeight;

  // update camera
	camera.aspect = size.width / size.height;
	// need this method.
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(window.devicePixelRatio) // ブラウザの可変対応
	camera.updateProjectionMatrix();

})

document.body.appendChild(renderer.domElement);
animate();