import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import image from '../../media/flat_earth_Largest_still.0330.jpg'

const EarthAnimation = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth , window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(image); 

    const geometry = new THREE.SphereGeometry(2, 100,100);
    const material = new THREE.MeshStandardMaterial({map: earthTexture})
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0,0,1)
    sphere.castShadow = true; 
    const tiltAngle = -15.5 * (Math.PI / 180);
    sphere.rotation.x = tiltAngle;
    sphere.rotation.y = tiltAngle
    scene.add(sphere);

    const boxSize=0.05
    const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize); // Sześcian o wymiarach 1x1x1
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Czerwony materiał
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    // Ustawienie pozycji sześcianu o 100 jednostek (100px) od sfery wzdłuż osi X
    const orbitRadius= 3
    box.position.set(orbitRadius, 0, 0); 

    scene.add(box);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-0.1, 0.5, 1);
    light.castShadow = true;  
    scene.add(light);

    camera.position.z = 5;
    scene.rotation.y = -1*Math.PI /4;

    let angle = 0; 
    const animValue = 0.01
    const animate = () => {
      sphere.rotation.y += animValue;
      angle += -animValue;
      box.position.x = orbitRadius * Math.cos(angle); 
      box.position.z = orbitRadius * Math.sin(angle); 
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default EarthAnimation;
