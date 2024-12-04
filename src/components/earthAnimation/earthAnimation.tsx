import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import image from '../../media/flat_earth_Largest_still.0330.jpg';

const EarthAnimation = (coordinates) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const earthRadius = 6378

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    
    const scale = 1/earthRadius

    const boxes =[]
    for(let i=0; i<coordinates.coordinates.length; i++){ 
      boxes.push({
        x:coordinates.coordinates[i].x*scale,
        y:coordinates.coordinates[i].y*scale,
        z:coordinates.coordinates[i].z*scale,
        color: 'grey',
        label: coordinates.coordinates[i].id
      }) 
    }

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

    boxes.map(item => {
      // Box size
      const boxSize = 0.05;
      const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
      
      // Material with correct color format
      const boxMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(item.color) });
      
      // Create the 3D box
      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.set(item.x, item.y, item.z);
      scene.add(box);
    
      // Create label texture using canvas
      const createLabelTexture = (label: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return new THREE.Texture(canvas);
    
        context.font = '50px Arial';
        context.fillStyle = 'white';
        context.fillText(label, 10, 40); // Adjust the text position if needed
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
      };
    
      // Sprite material for the label
      const spriteMaterial = new THREE.SpriteMaterial({
        map: createLabelTexture(item.label),
        transparent: true
      });
    
      // Create sprite for the label and position it above the box
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(item.x, item.y + 0.1, item.z); // Adjust Y to place the label above the box
      sprite.scale.set(0.2, 0.2, 1); // Scale the label to fit properly
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
