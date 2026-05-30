import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ isAudioPlaying = false }) {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas: containerRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles (Starfield / Floating dust)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Accent Colors
    const colorBlue = new THREE.Color('#00E5FF');
    const colorPurple = new THREE.Color('#7B2EFF');
    const colorGold = new THREE.Color('#FFD700');

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Random color blend
      const rand = Math.random();
      let chosenColor = colorPurple;
      if (rand < 0.33) chosenColor = colorBlue;
      else if (rand < 0.66) chosenColor = colorGold;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Round Particle Texture (using canvas)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const ctx = pCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(8, 8, 8, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create 3D Wave Grid (Mesh representing audio waves)
    const gridRows = 40;
    const gridCols = 40;
    const gridCount = gridRows * gridCols;
    const gridGeometry = new THREE.BufferGeometry();
    
    const gridPositions = new Float32Array(gridCount * 3);
    const gridColors = new Float32Array(gridCount * 3);
    
    const spacing = 4;
    const startX = -(gridCols * spacing) / 2;
    const startZ = -(gridRows * spacing) / 2;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const index = r * gridCols + c;
        
        // Position
        gridPositions[index * 3] = startX + c * spacing;       // X
        gridPositions[index * 3 + 1] = -15;                     // Y (Default flat height)
        gridPositions[index * 3 + 2] = startZ + r * spacing;   // Z

        // Color gradient (based on distance from center)
        const dist = Math.sqrt(
          Math.pow((c - gridCols/2) / (gridCols/2), 2) + 
          Math.pow((r - gridRows/2) / (gridRows/2), 2)
        );
        const lerpColor = new THREE.Color().lerpColors(colorBlue, colorPurple, dist);

        gridColors[index * 3] = lerpColor.r;
        gridColors[index * 3 + 1] = lerpColor.g;
        gridColors[index * 3 + 2] = lerpColor.b;
      }
    }

    gridGeometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
    gridGeometry.setAttribute('color', new THREE.BufferAttribute(gridColors, 3));

    const gridMaterial = new THREE.PointsMaterial({
      size: 0.6,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const grid = new THREE.Points(gridGeometry, gridMaterial);
    scene.add(grid);

    // Event listeners
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e) => {
      // Normalize coordinates: -1 to +1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Parallax effect on overall scene rotation
      particles.rotation.y = elapsedTime * 0.02 + mouseRef.current.x * 0.05;
      particles.rotation.x = mouseRef.current.y * 0.05;

      // Move dust particles down slowly
      const particlePositions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3 + 1] -= 0.03; // fall Y
        if (particlePositions[i * 3 + 1] < -75) {
          particlePositions[i * 3 + 1] = 75; // reset to top
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Animate grid waves (equalizer look)
      const gridPosArray = grid.geometry.attributes.position.array;
      const speedMult = isAudioPlaying ? 5 : 1.5;
      const heightMult = isAudioPlaying ? 8 : 2;

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const index = r * gridCols + c;
          
          // Waves formula
          const x = gridPosArray[index * 3];
          const z = gridPosArray[index * 3 + 2];
          
          // Combine radial and diagonal sine waves
          const dist = Math.sqrt(x*x + z*z);
          const waveValue = 
            Math.sin(dist * 0.08 - elapsedTime * speedMult) * 
            Math.cos(x * 0.03 + elapsedTime * speedMult * 0.5);
            
          // Update Y position
          gridPosArray[index * 3 + 1] = -12 + waveValue * heightMult;
        }
      }
      grid.geometry.attributes.position.needsUpdate = true;

      // Tilt grid slightly based on mouse
      grid.rotation.x = 0.5 + mouseRef.current.y * 0.08;
      grid.rotation.y = mouseRef.current.x * 0.08;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Cleanup geometries and materials
      particleGeometry.dispose();
      particleMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      texture.dispose();
    };
  }, [isAudioPlaying]);

  return <canvas id="three-bg-canvas" ref={containerRef} />;
}
