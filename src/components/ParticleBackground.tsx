import { useEffect, useRef } from 'react';
import '../styles/ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 166, 108, 0.3)';
        ctx.fill();

        // Connect particles
        const maxDistance = 150;
        
        // Connect with mouse
        const distToMouse = Math.sqrt(
          Math.pow(mouseRef.current.x - particle.x, 2) + 
          Math.pow(mouseRef.current.y - particle.y, 2)
        );
        
        if (distToMouse < maxDistance * 1.5) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const opacity = 1 - distToMouse / (maxDistance * 1.5);
          ctx.strokeStyle = `rgba(255, 123, 41, ${opacity * 0.5})`;
          ctx.lineWidth = particle.size / 2;
          ctx.stroke();
        }

        // Connect with other particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - particle2.x, 2) + 
            Math.pow(particle.y - particle2.y, 2)
          );

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(249, 166, 108, ${opacity * 0.2})`;
            ctx.lineWidth = (particle.size + particle2.size) / 8;
            ctx.stroke();
          }
        }
      });
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-background" />;
};

export default ParticleBackground; 