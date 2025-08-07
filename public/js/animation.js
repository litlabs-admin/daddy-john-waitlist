// --- MOUSE-TRACKING FOR AURORA ---
const aurora = document.querySelector('.aurora-bg');
if (aurora) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
        aurora.style.transform = `translate(${x - 50}%, ${y - 50}%)`;
    });
}


// --- STARFIELD ANIMATION ---
const canvas = document.getElementById('starfield');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    const numStars = 500;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            alpha: Math.random()
        });
    }

    const constellations = [];
    function createConstellation() {
        if (constellations.length > 5) return;
        const numPoints = Math.floor(Math.random() * 3) + 3;
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            points.push(stars[Math.floor(Math.random() * numStars)]);
        }
        constellations.push({
            points,
            life: 0,
            phase: 'in'
        });
    }
    setInterval(createConstellation, 4000);

    let angle = 0;
    function drawStars() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x - canvas.width / 2, star.y - canvas.height / 2, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226, 226, 226, ${star.alpha * 0.5})`;
            ctx.fill();
        });
        ctx.restore();
        angle += 0.00005;

        for (let i = constellations.length - 1; i >= 0; i--) {
            const c = constellations[i];
            ctx.beginPath();
            ctx.moveTo(c.points[0].x, c.points[0].y);
            for (let j = 1; j < c.points.length; j++) {
                ctx.lineTo(c.points[j].x, c.points[j].y);
            }
            ctx.strokeStyle = `rgba(139, 92, 246, ${c.life * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            if (c.phase === 'in') {
                c.life += 0.01;
                if (c.life >= 1) c.phase = 'out';
            } else {
                c.life -= 0.01;
                if (c.life <= 0) constellations.splice(i, 1);
            }
        }

        requestAnimationFrame(drawStars);
    }
    drawStars();
}
