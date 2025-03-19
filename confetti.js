function createConfetti(container) {
  // Remove any existing confetti
  const existingConfetti = container.querySelectorAll('.confetti');
  existingConfetti.forEach(c => c.remove());

  // Number of confetti particles
  const particleCount = 100;

  // Colors for the confetti
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
    '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

  // Create the confetti particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti';

    // Random position within the container
    const x = Math.random() * 100;
    const y = Math.random() * -50; // Start above the container

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = Math.random() * 10 + 5;

    // Random rotation
    const rotation = Math.random() * 360;

    // Apply styles
    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      transform: rotate(${rotation}deg);
      opacity: 0.8;
      animation: confetti-fall 3s ease-in-out forwards;
      pointer-events: none;
    `;

    // Make different shapes: square, rectangle, circle
    const shape = Math.floor(Math.random() * 3);
    if (shape === 0) {
      particle.style.borderRadius = '50%'; // Circle
    } else if (shape === 1) {
      particle.style.width = `${size * 0.5}px`; // Rectangle
      particle.style.height = `${size * 1.5}px`;
    }

    // Add to container
    container.appendChild(particle);

    // Remove after animation completes
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
} 