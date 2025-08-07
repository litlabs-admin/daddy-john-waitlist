
const supabaseUrl = 'https://nekpotkicuvjrvqkgzze.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la3BvdGtpY3V2anJ2cWtnenplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0OTg0ODgsImV4cCI6MjA3MDA3NDQ4OH0.Boq5H0kUs7UrtQMCgcb6ElR2GgUj3Dex6x5n96lztUc';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
    if (constellations.length > 5) return; // Limit number of constellations
    const numPoints = Math.floor(Math.random() * 3) + 3; // 3-5 stars
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push(stars[Math.floor(Math.random() * numStars)]);
    }
    constellations.push({
        points,
        life: 0,
        phase: 'in' // 'in' or 'out'
    });
}
setInterval(createConstellation, 4000);

let angle = 0;
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);
    
    // Draw regular stars
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x - canvas.width / 2, star.y - canvas.height / 2, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 226, 226, ${star.alpha * 0.5})`;
        ctx.fill();
    });
    ctx.restore();
    angle += 0.00005;

    // Draw constellations
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

// --- DOM ELEMENTS ---
const form = document.getElementById('waitlist-form');
const submitButton = document.getElementById('submit-button');
const toast = document.getElementById('toast');

// --- FORM SUBMISSION LOGIC ---
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('waitlist-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Optionally, collect form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();

            // TODO: Add your Supabase or backend submission logic here
            // Example:
            // const { data, error } = await supabase.from('waitlist').insert([{ name, email }]);
            // if (!error) {
            //     window.location.href = 'thank-you.html';
            // }

            // For now, just redirect after a short delay
            window.location.href = 'thank-you.html';
        });
    }
});

// --- NOTIFICATION TOAST FUNCTION ---
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 z-20 ${type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`;
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
}

// --- INITIALIZATION CHECK ---
if (supabaseUrl.includes('YOUR_SUPABASE_URL') || supabaseKey.includes('YOUR_SUPABASE_ANON_KEY')) {
     console.warn('Supabase credentials are not set. Please update js/main.js with your project URL and anon key.');
     showToast('Supabase not configured. See console.', 'error');
}
