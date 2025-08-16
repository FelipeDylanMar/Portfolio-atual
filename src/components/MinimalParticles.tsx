import React, { useEffect, useRef } from 'react';

interface ReactParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const ReactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<ReactParticle[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawReactLogo = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      // React logo color - darker tone
      ctx.strokeStyle = '#64748b';
      ctx.fillStyle = '#64748b';
      ctx.lineWidth = size / 20;
      
      // Draw the three ellipses
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 3);
        
        // Draw ellipse
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size / 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      }
      
      // Draw center dot
      ctx.beginPath();
      ctx.arc(0, 0, size / 8, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const animate = (currentTime: number) => {
      // Limitar FPS para 30fps para melhor performance
      if (currentTime - lastTimeRef.current < 33.33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTimeRef.current = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Usar for loop para melhor performance
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        // Continuous movement
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Mouse repulsion effect (força muito aumentada)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < 10000) { // 100^2 - área muito maior
          const distance = Math.sqrt(distanceSquared);
          const force = (100 - distance) / 100;
          const repulsionStrength = 0.3; // Força muito aumentada
          particle.vx -= (dx / distance) * force * repulsionStrength;
          particle.vy -= (dy / distance) * force * repulsionStrength;
        }
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Apply gentle friction to prevent excessive speed
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        // Add slight random movement for natural drift (aumentado)
        particle.vx += (Math.random() - 0.5) * 0.03;
        particle.vy += (Math.random() - 0.5) * 0.03;
        
        // Limit maximum speed (otimizado com limite maior)
        const maxSpeedSquared = 9; // 3^2 - velocidade máxima aumentada
        const currentSpeedSquared = particle.vx * particle.vx + particle.vy * particle.vy;
        if (currentSpeedSquared > maxSpeedSquared) {
          const currentSpeed = Math.sqrt(currentSpeedSquared);
          particle.vx = (particle.vx / currentSpeed) * 3;
          particle.vy = (particle.vy / currentSpeed) * 3;
        }
        
        // Boundary wrapping
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Draw particle
        drawReactLogo(
          particle.x,
          particle.y,
          particle.size,
          particle.rotation,
          particle.opacity
        );
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };



    const resizeCanvas = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
     };

     const createParticles = () => {
       const particleCount = Math.min(15, Math.floor((canvas.width * canvas.height) / 50000)); // Aumentado para 15 partículas máximo
       particlesRef.current = [];
       
       for (let i = 0; i < particleCount; i++) {
         particlesRef.current.push({
           x: Math.random() * canvas.width,
           y: Math.random() * canvas.height,
           vx: (Math.random() - 0.5) * 2.0, // Velocidade mais rápida
           vy: (Math.random() - 0.5) * 2.0, // Velocidade mais rápida
           size: Math.random() * 20 + 15, // Tamanho original
           rotation: Math.random() * Math.PI * 2,
           rotationSpeed: (Math.random() - 0.5) * 0.005, // Rotação mais lenta
           opacity: Math.random() * 0.2 + 0.05 // Opacidade reduzida
         });
       }
     };

     const handleMouseMove = (e: MouseEvent) => {
       mouseRef.current.x = e.clientX;
       mouseRef.current.y = e.clientY;
     };

     const handleResize = () => {
       resizeCanvas();
       createParticles();
     };

     resizeCanvas();
     createParticles();
     animate(performance.now());

     window.addEventListener('mousemove', handleMouseMove);
     window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ReactBackground;