// Happy Sania site script
document.addEventListener('DOMContentLoaded', () => {
  loadCompliments();
  setupCanvas();
  setupButtons();
});

// Load compliments from API
async function loadCompliments() {
  try {
    const response = await fetch('/api/compliments');
    const data = await response.json();
    const list = document.getElementById('compliments-list');
    list.innerHTML = '';
    data.compliments.forEach((comp, index) => {
      const div = document.createElement('div');
      div.className = 'compliment';
      div.textContent = comp;
      div.style.animationDelay = `${index * 0.2}s`;
      list.appendChild(div);
    });
    document.querySelector('.subtitle').textContent += ` ${data.message}`;
  } catch (err) {
    console.error('Error loading compliments:', err);
  }
}

// Random compliment button
function setupButtons() {
  document.getElementById('random-btn').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/random-compliment');
      const data = await response.json();
      
      // Confetti explosion!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Show random compliment popup
      showPopup(data.compliment);
    } catch (err) {
      console.error('Error:', err);
    }
  });
}

// Simple drawing canvas with hearts
function setupCanvas() {
  const canvas = document.getElementById('drawing-canvas');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mousemove', draw);

  function draw(e) {
    if (!drawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.fillStyle = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`; // Pink/purple hearts
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Heart trail
    for (let i = 0; i < 3; i++) {
      setTimeout(() => drawHeart(x + Math.random() * 20 - 10, y + Math.random() * 20 - 10), i * 100);
    }
  }

  function drawHeart(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.bezierCurveTo(10, -20, 20, -10, 20, 0);
    ctx.bezierCurveTo(20, 10, 10, 20, 0, 15);
    ctx.bezierCurveTo(-10, 20, -20, 10, -20, 0);
    ctx.bezierCurveTo(-20, -10, -10, -20, 0, -10);
    ctx.fillStyle = '#ff69b4';
    ctx.fill();
    ctx.restore();
  }
}

// Popup for compliments
function showPopup(text) {
  const popup = document.createElement('div');
  popup.className = 'compliment-popup';
  popup.textContent = text;
  popup.style.cssText = `
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
    padding: 30px;
    border-radius: 20px;
    font-size: 1.5rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 1000;
    animation: popIn 0.5s ease;
  `;
  document.body.appendChild(popup);
  
  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Add CSS for popup
const style = document.createElement('style');
style.textContent = `
  @keyframes popIn {
    0% { transform: translateX(-50%) scale(0); opacity: 0; }
    50% { transform: translateX(-50%) scale(1.1); }
    100% { transform: translateX(-50%) scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Hearts floating background
function createFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
      position: fixed;
      font-size: 20px;
      left: ${Math.random() * 100}vw;
      animation: float ${Math.random() * 3 + 2}s linear forwards;
      z-index: 10;
      pointer-events: none;
    `;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
  }, 2000);
}

const floatStyle = document.createElement('style');
floatStyle.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(floatStyle);

createFloatingHearts();

