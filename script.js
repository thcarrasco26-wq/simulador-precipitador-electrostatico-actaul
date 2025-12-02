const world = document.getElementById('world');
let phase = 0;
let particles = [];

function crearParticulas() {
  particles = [];
  for(let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle dirty';
    p.style.left = '150px';
    p.style.top = (120 + Math.random()*460) + 'px';
    world.appendChild(p);
    particles.push({el: p, charged: false});
  }
}
crearParticulas();

function irAFase(n) {
  if (n < 0 || n > 3) return;
  phase = n;
  world.style.transform = `translateX(-${n * 100}vw)`;
  const offset = n * window.innerWidth;

  if (n === 1) {
    particles.forEach((p, i) => {
      setTimeout(() => {
        p.el.style.transition = 'all 3s ease-out';
        p.el.style.left = (offset + 300 + Math.random()*300) + 'px';
        p.el.style.top = (120 + Math.random()*460) + 'px';
      }, i*60);
    });
    setTimeout(() => {
      particles.forEach(p => {
        if (Math.random() < 0.7) {
          p.charged = true;
          p.el.classList.replace('dirty', 'charged');
        }
      });
    }, 3200);
  }

  if (n === 2) {
    particles.forEach(p => {
      if (p.charged) {
        const placas = [15, 35, 65, 85];
        const destX = placas[Math.floor(Math.random()*4)];
        p.el.style.transition = 'all 2.8s ease-in-out';
        p.el.style.left = (offset + destX/100 * window.innerWidth) + 'px';
        p.el.style.top = (120 + Math.random()*460) + 'px';
      } else {
        p.el.style.transition = 'all 4s linear';
        p.el.style.left = (offset + window.innerWidth + 300) + 'px';
      }
    });
  }

  if (n === 3) {
    particles.forEach(p => {
      if (!p.charged) {
        p.el.classList.replace('dirty', 'clean');
        p.el.style.transition = 'all 1.5s ease-out';
        const baseX = offset + 150;
        const baseY = 120;
        p.el.style.left = (baseX + Math.random()*500) + 'px';
        p.el.style.top  = (baseY + Math.random()*460) + 'px';
      }
    });

    setTimeout(() => {
      alert("¡Aire 100% limpio y purificado!\nLas partículas verdes flotan felices");
    }, 2000);
  }
}

document.getElementById('next').onclick    = () => irAFase(phase + 1);
document.getElementById('before').onclick = () => irAFase(phase - 1);
document.getElementById('reset').onclick  = () => location.reload();
