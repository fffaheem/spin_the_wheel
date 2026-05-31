// ============================================================
// CONFETTI — Top-down gravity shower (ribbons + dots)
// ============================================================
// Fixes previous bottom-cannon approach.
// Particles fall from the top of the screen with realistic physics,
// ribbons tumble, alpha fades out gracefully, DPR-aware canvas.

var CONFETTI_COLORS = [
    '#f43f5e','#fb923c','#fbbf24','#a3e635','#34d399',
    '#22d3ee','#818cf8','#c084fc','#f472b6','#60a5fa'
];

function startConfetti(durationMs) {
    durationMs = durationMs || 3000;

    // Remove any existing confetti canvas
    var old = document.getElementById('confetti-canvas');
    if (old) old.remove();

    var el = document.createElement('canvas');
    el.id = 'confetti-canvas';
    Object.assign(el.style, {
        position: 'fixed',
        top: '0', left: '0',
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: '9998'
    });
    document.body.appendChild(el);

    var dpr = window.devicePixelRatio || 1;
    var vW  = window.innerWidth;
    var vH  = window.innerHeight;
    el.width  = vW * dpr;
    el.height = vH * dpr;

    var c = el.getContext('2d');
    c.scale(dpr, dpr);

    function onResize() {
        vW = window.innerWidth;
        vH = window.innerHeight;
        el.width  = vW * dpr;
        el.height = vH * dpr;
        c.scale(dpr, dpr);
    }
    window.addEventListener('resize', onResize);

    var particles   = [];
    var startTime   = Date.now();
    var spawnActive = true;
    var rafId;

    // ---- Create a single particle ----
    function makeParticle(forcedY) {
        var isRibbon = Math.random() > 0.35;   // 65% ribbons, 35% circles
        var w = isRibbon ? (Math.random() * 6 + 3)  : (Math.random() * 8 + 4);
        var h = isRibbon ? (Math.random() * 16 + 8) : w;
        return {
            x:        Math.random() * vW,
            y:        (forcedY !== undefined) ? forcedY : -(Math.random() * 80 + 10),
            vx:       (Math.random() - 0.5) * 3.2,
            vy:       Math.random() * 2.2 + 1.2,
            gravity:  0.055 + Math.random() * 0.045,
            w:        w,
            h:        h,
            isRibbon: isRibbon,
            color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            rot:      Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 6.5,
            alpha:    1,
            born:     Date.now(),
            life:     Math.random() * 2800 + 2200   // 2.2 – 5 seconds
        };
    }

    // ---- Initial burst — staggered vertically for instant visual fill ----
    var burstCount = durationMs > 2500 ? 180 : 100;
    for (var i = 0; i < burstCount; i++) {
        // Spread start Y from far above screen to near top for natural cascade
        var p = makeParticle(-(Math.random() * vH * 0.6));
        particles.push(p);
    }

    // ---- Continuous trickle while spawn is active ----
    var spawnInterval = setInterval(function() {
        if (!spawnActive) { clearInterval(spawnInterval); return; }
        for (var k = 0; k < 4; k++) particles.push(makeParticle());
    }, 100);

    // ---- Draw loop ----
    function draw() {
        var now     = Date.now();
        var elapsed = now - startTime;
        if (elapsed >= durationMs) spawnActive = false;

        c.clearRect(0, 0, vW, vH);

        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            var age = now - p.born;

            // ---- Physics ----
            p.vy  += p.gravity;
            p.vx  *= 0.9995;
            p.x   += p.vx;
            p.y   += p.vy;
            p.rot += p.rotSpeed;

            // ---- Alpha fade: starts at 65% of lifetime ----
            var fadeStart = p.life * 0.65;
            if (age > fadeStart) {
                p.alpha = Math.max(0, 1 - (age - fadeStart) / (p.life - fadeStart));
            }

            // ---- Remove dead particles ----
            if (age >= p.life || (p.y > vH + 30 && !spawnActive)) {
                particles.splice(i, 1);
                continue;
            }

            // ---- Render ----
            c.save();
            c.globalAlpha = p.alpha;
            c.translate(p.x, p.y);
            c.rotate((p.rot * Math.PI) / 180);
            c.fillStyle = p.color;

            if (p.isRibbon) {
                // Long thin rectangle that tumbles
                c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            } else {
                // Solid circle dot
                c.beginPath();
                c.arc(0, 0, p.w / 2, 0, Math.PI * 2);
                c.fill();
            }
            c.restore();
        }

        // ---- Stop when all particles gone and spawn finished ----
        if (particles.length === 0 && !spawnActive) {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', onResize);
            el.remove();
            return;
        }

        rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
}
