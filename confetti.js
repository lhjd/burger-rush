function createConfetti(container) {
  // Remove any existing confetti
  const existingConfetti = container.querySelectorAll('.confetti');
  existingConfetti.forEach(c => c.remove());

  // Number of confetti particles
  const particleCount = 250;

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

    // Distribute confetti across the full height for more even raining
    const y = Math.random() * -300; // Start above the container at different heights

    // Random fall duration for more natural effect
    const fallDuration = Math.random() * 2 + 3; // 3-5 seconds

    // Random delay to stagger the falling
    const fallDelay = Math.random() * 0.5; // 0-0.5 second delay

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = Math.random() * 8 + 4;

    // Random rotation
    const rotation = Math.random() * 360;

    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 10;

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
      animation: confetti-fall ${fallDuration}s ease-in-out ${fallDelay}s forwards;
      animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
      pointer-events: none;
    `;

    // Add custom property for drift
    particle.style.setProperty('--drift', `${drift}px`);

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
    }, (fallDuration + fallDelay) * 1000);
  }
} 