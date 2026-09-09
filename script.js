/* ═══════════════════════════════════════════════════════════
   JavaScript for Shreyas Phansalkar Portfolio
   ═══════════════════════════════════════════════════════════ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveNav();
});

// ── Hamburger menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link highlighting ──────────────────────────────
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ── Typewriter Effect ─────────────────────────────────────────
const phrases = [
  'RTL Design Engineer',
  'Embedded Systems Engineer',
  'VLSI · RTL to GDS Flow',
  'Firmware Developer',
  'FPGA Developer',
  'Verilog · Cadence · Synopsys',
  'STM32 · ESP32 · PIC18F',
  'LoRa · UART · SPI · I2C',
  'Fresher · Class of 2027',
  'Agentic RTL Pipeline',
];
let twIndex = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById('typewriter');

function typeWrite() {
  const current = phrases[twIndex];
  if (!twDeleting) {
    twEl.textContent = current.substring(0, ++twChar);
    if (twChar === current.length) {
      twDeleting = true;
      setTimeout(typeWrite, 1800);
      return;
    }
    setTimeout(typeWrite, 65);
  } else {
    twEl.textContent = current.substring(0, --twChar);
    if (twChar === 0) {
      twDeleting = false;
      twIndex = (twIndex + 1) % phrases.length;
      setTimeout(typeWrite, 400);
      return;
    }
    setTimeout(typeWrite, 35);
  }
}
setTimeout(typeWrite, 1000);

// ── Intersection Observer — Reveal animations ─────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Animate skill bars
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.pct + '%';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .tl-card, .proj-card, .pub-card, .award-card, .cert-card, .contact-link')
  .forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

// Also observe section headers
document.querySelectorAll('.section-header').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Skill bar animate on section visible ─────────────────────
const skillsSection = document.getElementById('skills');
let skillsAnimated = false;
const skillsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      setTimeout(() => {
        bar.style.width = bar.dataset.pct + '%';
      }, 300);
    });
  }
}, { threshold: 0.2 });
if (skillsSection) skillsObserver.observe(skillsSection);

// ── Project filtering ─────────────────────────────────────────
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.proj-card').forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const cats = card.dataset.category || '';
        card.classList.toggle('hidden', !cats.includes(filter));
      }
    });
  });
});

// ── Modal system ──────────────────────────────────────────────
const modalData = {
  'rtl-gen': {
    title: 'Agentic RTL Generation Pipeline',
    subtitle: 'AI · VLSI · NL → Synthesizable Verilog',
    content: `
      <p>An end-to-end multi-agent pipeline that converts natural language hardware specifications into verified, synthesizable Verilog RTL code.</p>
      <div class="mb-section-title">Architecture</div>
      <ul>
        <li><strong>Agent 1 — Architect (A1 · 1.5B):</strong> Generates a Design Contract (JSON) specifying I/O, Clk, Reset, and Pinout from NL spec.</li>
        <li><strong>Agent 2 — Engineer (A2 · Remote Colab):</strong> Performs Logic Generation via Flat AST — implementing Counters, ALUs, MUXes, and FSMs.</li>
        <li><strong>Agent 3 — Builder (A3 · 3B):</strong> Outputs the Final Verilog Module with correct module declarations and endmodule boundaries.</li>
      </ul>
      <div class="mb-section-title">Data Pipeline</div>
      <ul>
        <li>Dataset sourced from Resyn27k and OpenRTLSet with syntax guardrails via Icarus Verilog (iverilog).</li>
        <li>Role-specific datasets curated for A1, A2, A3 pipelines.</li>
        <li>AST extraction for both Combinational and Sequential logic blocks.</li>
        <li>Hot-swap memory optimization (A1 → A3) for VRAM efficiency on constrained hardware.</li>
      </ul>
      <div class="mb-section-title">Validation</div>
      <ul>
        <li>Syntactic correctness verified via compilation checks.</li>
        <li>Logical correctness validated against Behavior + Intent specifications.</li>
        <li>Output: Verified RTL Code ready for synthesis.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>Verilog HDL · Python · LLM Fine-tuning · Icarus Verilog · RTL Synthesis · Hugging Face</li>
      </ul>
    `
  },
  'uart-fpga': {
    title: 'UART Transmitter on FPGA',
    subtitle: 'FPGA · Digital Design · Aug–Dec 2025',
    content: `
      <p>Design and full verification of a UART (Universal Asynchronous Receiver-Transmitter) TX/RX module implemented in Verilog on a Xilinx FPGA platform.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>Complete UART Transmitter and Receiver in synthesizable Verilog HDL.</li>
        <li>Configurable baud rate generation using FPGA clock divider logic.</li>
        <li>Start bit, data frame, optional parity, and stop bit generation/detection.</li>
        <li>Functional simulation in Xilinx Vivado with waveform verification.</li>
        <li>Real-time serial monitoring and debugging via USB-UART bridge.</li>
      </ul>
      <div class="mb-section-title">Tools & Platforms</div>
      <ul>
        <li>Xilinx Vivado Design Suite · Artix-7 / Basys3 FPGA · Verilog HDL · Logic Analyzer</li>
      </ul>
    `
  },
  'adaptive-optics': {
    title: 'FPGA-Based Adaptive Optics System',
    subtitle: 'FPGA · Real-time Signal Processing · Aug–Sep 2025',
    content: `
      <p>A real-time image stabilization system implemented on FPGA to compensate for telescope vibrations and atmospheric turbulence, enabling sharper astronomical imaging.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>Real-time vibration detection and correction using FPGA-based sensor fusion.</li>
        <li>Actuator control loop implemented in reconfigurable hardware for minimal latency.</li>
        <li>High-speed parallel processing using FPGA fabric for sub-millisecond response.</li>
        <li>Custom signal processing pipeline in Verilog for image quality improvement.</li>
      </ul>
      <div class="mb-section-title">Tools</div>
      <ul>
        <li>Xilinx Vivado · Verilog HDL · Real-time Control · Signal Processing IP</li>
      </ul>
    `
  },
  'riscv-secure': {
    title: 'SecureBoot & Encryption using RISC-V Core',
    subtitle: 'RISC-V · Security · Digital Design · Aug 2025–Present',
    content: `
      <p>Developing a hardware-level secure boot and encrypted storage system using the PICORV32 RISC-V soft-core implemented on FPGA, with AES encryption for protected storage access.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>PICORV32 RISC-V soft-core integration and customization on FPGA.</li>
        <li>AES-128/256 encryption engine implemented in Verilog for storage security.</li>
        <li>Trusted boot chain with cryptographic signature verification at each stage.</li>
        <li>Encrypted memory subsystem preventing unauthorized data access.</li>
        <li>Hardware security primitives for tamper-resistant key storage.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>RISC-V ISA · PICORV32 · AES Encryption · Verilog · Xilinx Vivado · Embedded C</li>
      </ul>
    `
  },
  'lora-control': {
    title: 'LoRa-Based Refrigerator Control System',
    subtitle: 'Embedded IoT · Sponsored by Amotech Lab · Aug–Dec 2025',
    content: `
      <p>An industrial-grade refrigerator monitoring and control system using LoRa long-range wireless communication with PIC18F452 microcontroller as the backbone.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>UART-based LoRa module interfacing on PIC18F452 with validated data framing.</li>
        <li>Real-time temperature and humidity monitoring with threshold-based alerts.</li>
        <li>Long-range wireless control (up to 5km LoS) for industrial deployments.</li>
        <li>End-to-end LoRa monitoring demonstrating full embedded integration stack.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>PIC18F452 · LoRa SX1276 · UART · MPLAB X IDE · XC8 Compiler · Industrial IoT</li>
      </ul>
    `
  },
  'wireless-drone': {
    title: 'Wireless Inductive Charging for Drones',
    subtitle: 'Power Electronics · Industry Sponsored · Jul–Nov 2024',
    content: `
      <p>Industry-sponsored project implementing an inductive wireless charging system for autonomous drone landing pads, enabling fully automatic battery replenishment.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>Resonant inductive power transfer coil design and optimization.</li>
        <li>Resonant frequency matching circuit for maximum power transfer efficiency.</li>
        <li>Embedded control system managing charge initiation, monitoring, and termination.</li>
        <li>PCB design for transmitter and receiver pads with thermal management.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>Inductive Charging · Power Electronics · Embedded C · KiCAD PCB · STM32</li>
      </ul>
    `
  },
  'lora-remote': {
    title: 'LoRa-Based Remote Control & Monitoring (Cold Storage)',
    subtitle: 'Embedded · Industry Sponsored · Aug 2023–Dec 2025',
    content: `
      <p>Long-running industry-sponsored project developing a complete LoRa-based system for cold storage facility monitoring, using dual PIC18F microcontrollers.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>PIC18F47K42 and PIC18F452 based dual-node architecture for sensor + gateway.</li>
        <li>Real-time temperature, humidity, and door status monitoring.</li>
        <li>LoRa wireless communication for extended range in industrial environments.</li>
        <li>Remote control capabilities for compressor and alarm management.</li>
        <li>Cold chain compliance monitoring for pharmaceutical/food storage.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>PIC18F47K42 · PIC18F452 · LoRa · UART · SPI · MPLAB IDE · Industrial Sensors</li>
      </ul>
    `
  },
  'laser-engraver': {
    title: '2-Axis GRBL Laser Engraver (AgriTech)',
    subtitle: 'Embedded · Computer Vision · Jun–Aug 2026',
    content: `
      <p>Precision 2-axis laser engraving system designed for agricultural weed detection and selective elimination, combining machine vision with embedded motion control.</p>
      <div class="mb-section-title">Key Features</div>
      <ul>
        <li>GRBL-based motion control with 1mm positioning accuracy on both axes.</li>
        <li>OpenCV-based weed detection feeding target coordinates to GRBL controller.</li>
        <li>Custom 7-pin voltage level shifter PCB for mixed-voltage board interfacing (KiCAD).</li>
        <li>Targeted laser actuation minimizes crop damage while eliminating weeds.</li>
        <li>Real-time coordinate streaming from vision pipeline to motor controller.</li>
      </ul>
      <div class="mb-section-title">Tech Stack</div>
      <ul>
        <li>GRBL · OpenCV · Python · KiCAD · Stepper Motor Drivers · Embedded C · AgriTech</li>
      </ul>
    `
  },
};

const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.proj-expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const data = modalData[key];
    if (!data) return;
    modalBody.innerHTML = `
      <h2>${data.title}</h2>
      <p class="mb-subtitle">${data.subtitle}</p>
      ${data.content}
    `;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Contact form ──────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('cf-submit');

  // Loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.75';
  btn.style.cursor = 'not-allowed';

  try {
    const formData = new FormData(contactForm);
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      // ✅ Success
      btn.textContent = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.4)';
      btn.style.opacity = '1';
      btn.style.cursor = 'default';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        btn.style.cursor = 'pointer';
      }, 4000);
    } else {
      // ❌ Formspree returned an error
      const data = await response.json();
      const errorMsg = (data.errors || []).map(e => e.message).join(', ') || 'Submission failed. Please try again.';
      btn.textContent = '✗ Error — Try Again';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      btn.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.4)';
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.disabled = false;
      console.error('Formspree error:', errorMsg);
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.boxShadow = '';
      }, 4000);
    }
  } catch (err) {
    // ❌ Network / fetch error
    btn.textContent = '✗ Network Error';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
    btn.disabled = false;
    console.error('Fetch error:', err);
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 4000);
  }
});

// ── Circuit board canvas animation ────────────────────────────
(function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], lines = [], pulses = [];
  const NODE_COUNT = 55;
  const LINE_COUNT = 60;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createNetwork() {
    nodes = [];
    lines = [];
    pulses = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 1,
        glow: Math.random(),
        glowSpeed: 0.02 + Math.random() * 0.02,
      });
    }
    // Create L-shaped circuit paths
    for (let i = 0; i < LINE_COUNT; i++) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      const b = nodes[Math.floor(Math.random() * nodes.length)];
      if (a !== b) {
        lines.push({ a, b, opacity: 0.2 + Math.random() * 0.25 });
        if (Math.random() < 0.4) {
          pulses.push({
            line: lines[lines.length - 1],
            t: Math.random(),
            speed: 0.003 + Math.random() * 0.006,
          });
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw lines (L-shaped for circuit feel)
    lines.forEach(line => {
      const { a, b } = line;
      const midX = a.x;
      const midY = b.y;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(midX, midY);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(0, 180, 220, ${line.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(n => {
      n.glow += n.glowSpeed;
      const alpha = 0.4 + 0.6 * Math.abs(Math.sin(n.glow));
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
      ctx.fill();
    });

    // Draw pulses
    pulses.forEach(pulse => {
      pulse.t += pulse.speed;
      if (pulse.t > 1) pulse.t = 0;
      const { a, b } = pulse.line;
      const midX = a.x, midY = b.y;
      const t = pulse.t;
      let px, py;
      if (t < 0.5) {
        const tt = t * 2;
        px = a.x + (midX - a.x) * tt;
        py = a.y + (midY - a.y) * tt;
      } else {
        const tt = (t - 0.5) * 2;
        px = midX + (b.x - midX) * tt;
        py = midY + (b.y - midY) * tt;
      }
      const grad = ctx.createRadialGradient(px, py, 0, px, py, 6);
      grad.addColorStop(0, 'rgba(0, 212, 255, 0.95)');
      grad.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  resize();
  createNetwork();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createNetwork();
  });
})();

// ── Staggered card entrance delay ────────────────────────────
document.querySelectorAll('.proj-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});
document.querySelectorAll('.cert-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
