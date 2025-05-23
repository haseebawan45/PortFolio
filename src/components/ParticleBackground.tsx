import { useEffect, useRef } from 'react';
import '../styles/ParticleBackground.css';

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  angle: number;
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

    // Create particles with enhanced properties
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles with enhanced effects
      particlesRef.current.forEach((particle, i) => {
        // Update position with smooth circular motion
        particle.angle += 0.02;
        particle.x += Math.cos(particle.angle) * particle.speedX;
        particle.y += Math.sin(particle.angle) * particle.speedY;

        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -0.9;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -0.9;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, 'rgba(255, 180, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 180, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Enhanced particle connections
        const maxDistance = 150;
        
        // Connect with mouse with elegant gradient effect
        const distToMouse = Math.sqrt(
          Math.pow(mouseRef.current.x - particle.x, 2) + 
          Math.pow(mouseRef.current.y - particle.y, 2)
        );
        
        if (distToMouse < maxDistance * 1.5) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const opacity = 1 - distToMouse / (maxDistance * 1.5);
          const connectionGradient = ctx.createLinearGradient(
            particle.x, particle.y, 
            mouseRef.current.x, mouseRef.current.y
          );
          connectionGradient.addColorStop(0, `rgba(255, 180, 0, ${opacity * 0.4})`);
          connectionGradient.addColorStop(1, `rgba(255, 123, 41, ${opacity * 0.4})`);
          ctx.strokeStyle = connectionGradient;
          ctx.lineWidth = (particle.size / 2) * opacity;
          ctx.stroke();
          
          // Add glow effect
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          glowGradient.addColorStop(0, `rgba(255, 180, 0, ${opacity * 0.2})`);
          glowGradient.addColorStop(1, `rgba(255, 180, 0, 0)`);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Connect with other particles with enhanced visuals
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
            const particleGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              particle2.x, particle2.y
            );
            particleGradient.addColorStop(0, `rgba(255, 180, 0, ${opacity * 0.2})`);
            particleGradient.addColorStop(1, `rgba(255, 123, 41, ${opacity * 0.2})`);
            ctx.strokeStyle = particleGradient;
            ctx.lineWidth = (particle.size + particle2.size) / 6;
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