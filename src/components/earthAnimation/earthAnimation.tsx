import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import image from '../../media/flat_earth_Largest_still.0330.jpg';

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

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const mountNode = mountRef.current; // Capture the mountRef value in a variable

    mountNode.appendChild(renderer.domElement);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(image);

    // Sphere geometry
    const sphereRadius = 1;
    const geometry = new THREE.SphereGeometry(sphereRadius, 100, 100);
    const material = new THREE.MeshBasicMaterial({ map: earthTexture });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    const tiltAngle = -15.5 * (Math.PI / 180);
    sphere.rotation.x = tiltAngle;
    sphere.rotation.y = tiltAngle;
    scene.add(sphere);

    const boxes = [
      { x: sphereRadius + 0.1, y: 0, z: 0, color: 0xff0000, label: 'box 1' },
      { x: 0, y: sphereRadius + 0.3, z: 0, color: 0x00ff00, label: 'box 2' },
      { x: 0, y: 0, z: sphereRadius + 0.5, color: 0x0000ff, label: 'box 334434534534534' },
      { x: -sphereRadius - 0.7, y: 0, z: 0, color: 0xffff00, label: 'box 4' },
      { x: 0, y: -sphereRadius - 0.9, z: 0, color: 0xff00ff, label: 'box 5' },
    ];

    boxes.map(({ x, y, z, color, label }) => {
      const boxSize = 0.05;
      const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      const boxMaterial = new THREE.MeshBasicMaterial({ color });
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(x, y, z);
      scene.add(box);

      const createLabelTexture = (label: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return new THREE.Texture(canvas);

        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.fillText(label, 100, 40);
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
      };

      const spriteMaterial = new THREE.SpriteMaterial({
        map: createLabelTexture(label),
        transparent: true
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(x, y, z);
      sprite.scale.set(0.2, 0.2, 1);
      scene.add(sprite);
    });

    camera.position.z = 3;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const renderScene = () => {
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(renderScene);

    return () => {
      if (mountNode) { // Now we use the captured mountNode
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default EarthAnimation;
