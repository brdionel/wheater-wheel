import { useEffect, useRef } from "react";
import * as THREE from "three";

const SmokeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let w = window.innerWidth;
    let h = window.innerHeight;

    // Escena, cámara y renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.setClearColor(0x333333, 1);
    mount?.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.set(-1, 3, 1);
    scene.add(light);

    // Partículas de humo
    const smokeParticles = [];
    const loader = new THREE.TextureLoader();

    loader.load("humo.webp", (texture) => {
      const smokeGeo = new THREE.PlaneGeometry(300, 300);
      const smokeMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
      });

      for (let p = 0; p < 300; p++) {
        const particle = new THREE.Mesh(smokeGeo, smokeMaterial);
        particle.position.set(
          Math.random() * 500 - 250,
          Math.random() * 500 - 250,
          Math.random() * 1000 - 100
        );
        particle.rotation.z = Math.random() * 360;

        scene.add(particle);
        smokeParticles.push(particle);
      }
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w/h;
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      smokeParticles.forEach((particle) => {
        particle.rotation.z += 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener("resize", resize)
  }, []);

  return <div ref={mountRef} className="-z-10 fixed top-0 h-full w-full"></div>;
};

export default SmokeBackground;
