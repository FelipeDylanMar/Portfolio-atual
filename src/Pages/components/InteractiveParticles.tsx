import { useEffect, useRef, useCallback } from "react";

const InteractiveParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const mouse = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const mouseThrottle = useRef(0);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Throttle mouse events para melhor performance
    const now = Date.now();
    if (now - mouseThrottle.current < 16) return; // ~60fps
    mouseThrottle.current = now;
    
    mouse.current.x = event.clientX;
    mouse.current.y = event.clientY;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];

    class Particle {
      x!: number;
      y!: number;
      radius!: number;
      speedX!: number;
      speedY!: number;
      opacity!: number;
      baseOpacity!: number;

      constructor() {
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1; // Reduzido de 4 para 3
        this.speedX = (Math.random() - 0.5) * 1.5; // Reduzido velocidade
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.baseOpacity = Math.random() * 0.5 + 0.3;
        this.opacity = this.baseOpacity;
      }

      update() {
        if (!canvas) return;

        this.x += this.speedX;
        this.y += this.speedY;

        // Otimização: usar operador ternário em vez de if
        this.speedX = (this.x < 0 || this.x > canvas.width) ? -this.speedX : this.speedX;
        this.speedY = (this.y < 0 || this.y > canvas.height) ? -this.speedY : this.speedY;

        // Otimização: usar distância quadrada para evitar Math.sqrt
        const dx = this.x - mouse.current.x;
        const dy = this.y - mouse.current.y;
        const distanceSquared = dx * dx + dy * dy;
        const interactionRadius = 10000; // 100^2

        if (distanceSquared < interactionRadius) {
          const distance = Math.sqrt(distanceSquared);
          const force = (100 - distance) / 100;
          this.x += (dx / distance) * force * 1.5;
          this.y += (dy / distance) * force * 1.5;
          this.opacity = Math.min(1, this.baseOpacity + force * 0.7);
        } else {
          this.opacity = Math.max(this.baseOpacity, this.opacity - 0.02);
        }
      }

      draw() {
        if (!ctx || this.opacity < 0.1) return;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffff';
        ctx.fill();
      }
    }

    function initParticles() {
      if (!canvas) return;
      // Reduzido para 30 partículas para melhor performance
      const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 25000));
      particles.length = 0; // Limpar array
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;
      
      // Limitar FPS para 60fps
      if (currentTime - lastTime.current < 16.67) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime.current = currentTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Otimização: usar for loop em vez de forEach
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    const handleResizeInternal = () => {
      handleResize();
      initParticles();
    };

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      animationRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResizeInternal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResizeInternal);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default InteractiveParticles;
