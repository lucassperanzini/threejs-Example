// // campo de visáo do usuario
// const fieldOfView = 75;
// // aspect ?
// const aspect = w / h;
// // distancia maxima que o site vai renderizar objetos
// const near = 0.1;
// //quao longe vai renderizar
// const far = 10;
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

import getStarfield from "./src/getStarfield.js";

const w = window.innerWidth
const h = window.innerHeight
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 60);
camera.position.z = 3;

// render
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// controle de rotação
const controls = new OrbitControls(camera, renderer.domElement);
//nao sei ainda
controls.enableDamping = true;
//o quao fluido é a rotação quanto maior o numero menos fluido
controls.dampingFactor = 0.05;


const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(earthGroup)

const detail = 12
const loader = new THREE.TextureLoader();
// geometria , tipo de mesh exmeplo, cubo esphera etc..
// tipo de material se pe metalico por exemplo
const geometry = new THREE.IcosahedronGeometry(1, detail); // Create a cube geometry
const material = new THREE.MeshPhongMaterial({


    map: loader.load("./textures/00_earthmap1k.jpg"),
    specularMap: loader.load("./textures/earthspec1k.jpg"),
    bumpMap: loader.load("./textures/earthbump1k.jpg"),
    bumpScale: 0.04,
    // mostra vertices e edges do objeto

})

// a mesh e o tipo de eobjeto mais seu material 
const earth = new THREE.Mesh(geometry, material);
earthGroup.add(earth);

const lightMaterial = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending


})
const lightMesh = new THREE.Mesh(geometry, lightMaterial)
earthGroup.add(lightMesh)

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);


// const cloudsMat = new THREE.MeshStandardMaterial({
//     map:loader.load("./textures/earthcloudmaptrans.jpg"),
//     transparent: true,
//     opacity: 0.9,
//     blending: THREE.NormalBlending,
//     alphaMap: loader.load('./textures/earthcloudmaptrans.jpg'),


// })

// const cloudMesh = new THREE.Mesh(geometry,cloudsMat)
// cloudMesh.scale.setScalar(1.003)
// earthGroup.add(cloudMesh)



const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat)
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh)



// tipo de iluminacao
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
directionalLight.position.set(-2, 0.5, 1.5)
scene.add(directionalLight);
// funcao para animar a cena

// Move camera along the X-axis by 2 units


const circulo = document.querySelector(".meu_circulo")
const texto = document.querySelector("#texto_earth")

circulo.addEventListener("click", (e) => {

    console.log(e)
    if (texto.style.display === "none") {
        texto.style.display = "block";
    } else {

        texto.style.display = "none";
    }



})
function animate() {
    // camera.position.x += 0.1;
    // // Rotate camera on the Y-axis by PI/4 radians (45 degrees)
    // camera.rotation.y += Math.PI / 4;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    //udpate por frame do control
    controls.update();
    earth.rotation.y += 0.0008;
    lightMesh.rotation.y += 0.0008
    glowMesh.rotation.y += 0.0008
    // cloudMesh.rotation.y += 0.0008


}


animate();