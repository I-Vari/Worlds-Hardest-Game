const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

let x = 0;
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(x, 200, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    
    // Move circle
    x += 2;
    if (x > canvas.width) x = 0;
    
    requestAnimationFrame(draw);
}
draw();
