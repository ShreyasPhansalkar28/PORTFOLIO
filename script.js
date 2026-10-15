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
  'RTL Design · Static Timing Analysis',
  'Embedded Systems Engineer',
  'VLSI · RTL to GDS Flow',
  'Firmware Developer',
  'FPGA Developer',
  'Verilog · Cadence Virtuoso · Synopsys: VCS & Verdi',
  'STM32 · ESP32 · PIC18F',
  'LoRa · UART · SPI · I2C',
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
let resumeDownloadRequested = false;

const resumeBtn = document.getElementById('hero-resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeDownloadRequested = true;
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
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
      
      if (resumeDownloadRequested) {
        const link = document.createElement('a');
        link.href = 'RESUME.pdf';
        link.download = 'Shreyas_Phansalkar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resumeDownloadRequested = false;
      }

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

// ── Theme Toggle ──────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// ═══════════════════════════════════════════════════════════════
// CERTIFICATIONS & DOCUMENT VIEWER SYSTEM
// ═══════════════════════════════════════════════════════════════

const certsList = [
  {
    id: 'maven-digital-design',
    title: 'Digital Design (RTL to GDSII Flow)',
    issuer: 'Maven Silicon',
    category: 'VLSI & EDA',
    categoryFilter: 'vlsi',
    date: '20 May 2026',
    meta: 'MSUID: 9921062050 · Centre of Excellence in Semicon & RISC-V Partner',
    filePath: 'certificates/Maven_Silicon_Digital_Design_Certificate.pdf',
    thumbPath: 'certificates/thumbnails/Maven_Silicon_Digital_Design_Certificate_thumb.webp',
    isPdf: true,
    tags: ['Verilog HDL', 'RTL to GDSII', 'STA', 'ASIC', 'EDA Sign-off'],
    desc: 'Official industry certification in complete ASIC digital design flow covering RTL modeling, logic synthesis, Static Timing Analysis (STA), clock tree synthesis, and GDSII tape-out.'
  },
  {
    id: 'udemy-verilog-fpga',
    title: 'Verilog for an FPGA Engineer with Xilinx Vivado',
    issuer: 'Udemy',
    category: 'VLSI & EDA',
    categoryFilter: 'vlsi',
    date: '27 March 2026',
    meta: 'ID: UC-6cd73604-650a-4f28-9308-82b6070ef2fc · 16.5 Total Hours',
    filePath: 'certificates/Udemy_Verilog_FPGA_Xilinx_Vivado_Design_Suite.pdf',
    thumbPath: 'certificates/thumbnails/Udemy_Verilog_FPGA_Xilinx_Vivado_Design_Suite_thumb.webp',
    isPdf: true,
    tags: ['Verilog HDL', 'Xilinx Vivado', 'FPGA Prototyping', 'RTL Simulation', 'STA'],
    desc: 'Comprehensive training on synthesizable Verilog HDL coding styles, testbench generation, simulation, timing constraints, and Vivado synthesis for Xilinx FPGAs.'
  },
  {
    id: 'udemy-computer-arch',
    title: 'Advanced Computer Architecture & Organization',
    issuer: 'Udemy',
    category: 'Embedded & Architecture',
    categoryFilter: 'hardware-embedded',
    date: '18 January 2026',
    meta: 'ID: UC-fffb1d33-36b5-4bd0-9654-fc756adaf5b2 · 4.5 Total Hours',
    filePath: 'certificates/Udemy_Advanced_Computer_Architecture_and_Organization.pdf',
    thumbPath: 'certificates/thumbnails/Udemy_Advanced_Computer_Architecture_and_Organization_thumb.webp',
    isPdf: true,
    tags: ['Microarchitecture', 'Pipelining', 'Branch Prediction', 'Cache Hierarchy', 'ILP'],
    desc: 'Mastery of modern processor microarchitecture, multi-stage pipelining hazards, cache memory hierarchies, memory interleaving, and instruction-level parallelism.'
  },
  {
    id: 'coursera-deeplearning',
    title: 'Deep Learning Specialization (5 Courses)',
    issuer: 'DeepLearning.AI · Coursera',
    category: 'VLSI & EDA',
    categoryFilter: 'vlsi',
    date: '29 March 2026',
    meta: 'Credential ID: 8EHPZA8GVCFA · Andrew Ng',
    filePath: 'certificates/DeepLearning_AI_Coursera_Specialization.pdf',
    thumbPath: 'certificates/thumbnails/DeepLearning_AI_Coursera_Specialization_thumb.webp',
    isPdf: true,
    tags: ['Deep Learning', 'CNNs', 'Sequence Models', 'Transformers', 'TensorFlow', 'Edge AI'],
    desc: '5-course specialization by Andrew Ng mastering Convolutional Neural Networks (CNNs), RNNs/LSTMs, Transformers, and optimization strategies for AI hardware acceleration.'
  },
  {
    id: 'ieee-icft2025',
    title: 'Smart Voltaic Keys (IEEE ICFT 2025 Presentation)',
    issuer: 'IEEE Maharashtra Section · WCE Sangli',
    category: 'Research & Honors',
    categoryFilter: 'research-awards',
    date: '7–8 November 2025',
    meta: 'Certificate ID: WCE/ICFT2025/66708/Author/086 · IEEE Sponsored',
    filePath: 'certificates/IEEE_ICFT2025_Smart_Voltaic_Keys_Paper_Presentation.pdf',
    thumbPath: 'certificates/thumbnails/IEEE_ICFT2025_Smart_Voltaic_Keys_Paper_Presentation_thumb.webp',
    isPdf: true,
    tags: ['IEEE ICFT 2025', 'Piezoelectric', 'Smart Keyboards', 'Energy Harvesting', 'MEMS'],
    desc: 'Official conference presentation certificate for co-authoring the peer-reviewed research paper "Smart Voltaic Keys of Keyboard for Energy Generation" at IEEE ICFT 2025.'
  },
  {
    id: 'physics-brawl-charles',
    title: 'Physics Brawl Online — 208th Rank Globally',
    issuer: 'Charles University, Prague & FYKOS',
    category: 'Research & Honors',
    categoryFilter: 'research-awards',
    date: '23 November 2022',
    meta: 'Faculty of Mathematics and Physics · Category A · Team: The Three Musketeers',
    filePath: 'certificates/Charles_University_Physics_Brawl_208th_Rank.png',
    thumbPath: 'certificates/thumbnails/Charles_University_Physics_Brawl_208th_Rank_thumb.webp',
    isPdf: false,
    tags: ['Physics Brawl', 'Charles University', 'Global Rank 208th', 'Analytical Physics'],
    desc: 'Global physics competition diploma awarded by Charles University Prague. Ranked 208th internationally in Category A solving advanced mechanics and electromagnetism problems.'
  },
  {
    id: 'devfolio-hackspiration',
    title: 'Hackspiration\'24 Certificate of Innovation',
    issuer: 'Devfolio · MLSC VIT Pune',
    category: 'Research & Honors',
    categoryFilter: 'research-awards',
    date: '2024',
    meta: 'Microsoft Learn Student Ambassador · Devfolio Hackathon',
    filePath: 'certificates/Devfolio_MLSC_Hackspiration24_Certificate.pdf',
    thumbPath: 'certificates/thumbnails/Devfolio_MLSC_Hackspiration24_Certificate_thumb.webp',
    isPdf: true,
    tags: ['Devfolio', 'Microsoft Learn', 'Hackspiration', 'Rapid Prototyping', 'Hardware Innovation'],
    desc: 'Certificate of active participation and technical achievement at Hackspiration\'24 hackathon, building rapid hardware and embedded automation prototypes.'
  },
  {
    id: 'aashman-internship',
    title: 'Embedded Systems Internship Experience Letter',
    issuer: 'Aashman Technicals Pvt. Ltd.',
    category: 'Internships & Letters',
    categoryFilter: 'experience',
    date: '7 October 2026',
    meta: 'Tenure: June 2, 2026 – October 5, 2026 · Chetan S. Shinde (Director/CTO)',
    filePath: 'certificates/Aashman_Technicals_Embedded_Systems_Internship_Letter.pdf',
    thumbPath: 'certificates/thumbnails/Aashman_Technicals_Embedded_Systems_Internship_Letter_thumb.webp',
    isPdf: true,
    tags: ['Firmware', 'GRBL', 'KiCAD', 'XY Gantry', 'Motor Control', 'Mesh Network'],
    desc: 'Official experience letter validating 2-axis GRBL motion controller for agricultural laser weeding (1mm accuracy), custom PCB level-shifters, and wireless networking.'
  },
  {
    id: 'ust-rtl-internship',
    title: 'RTL Code Generator for VLSI Project Completion',
    issuer: 'UST Global & VIT Pune',
    category: 'Internships & Letters',
    categoryFilter: 'experience',
    date: '26 May 2026',
    meta: 'Tenure: Jan 5, 2026 – May 4, 2026 · Mentors: Roshan Dsouza (UST), Dr. Yenkikar & Dr. Chopde',
    filePath: 'certificates/UST_Global_VIT_RTL_Code_Generator_Internship_Confirmation.pdf',
    thumbPath: 'certificates/thumbnails/UST_Global_VIT_RTL_Code_Generator_Internship_Confirmation_thumb.webp',
    isPdf: true,
    tags: ['UST Global', 'Agentic RTL', 'Verilog Synthesis', 'Automated Testbench', 'Icarus Verilog'],
    desc: 'Formal industry project letter for engineering an automated AI RTL code generation pipeline for VLSI design, testbench synthesis, and automated simulation verification.'
  },
  {
    id: 'amotech-lora-completion',
    title: 'LoRa Industrial Automation Project Completion Letter',
    issuer: 'Amotech Labs & VIT Pune',
    category: 'Internships & Letters',
    categoryFilter: 'experience',
    date: '7 November 2025',
    meta: 'Mentors: Amol Manal (Amotech Labs) & Prof. Ashwinee Barbadekar (VIT)',
    filePath: 'certificates/Amotech_Labs_LoRa_Industrial_Automation_Completion_Letter.pdf',
    thumbPath: 'certificates/thumbnails/Amotech_Labs_LoRa_Industrial_Automation_Completion_Letter_thumb.webp',
    isPdf: true,
    tags: ['LoRa E220', 'PIC18F452', 'ESP32', 'Industrial IoT', 'UART Telemetry'],
    desc: 'Validation letter for architecting a multi-node LoRa remote monitoring and relay actuation system across ESP32 and PIC18F microcontrollers with long-range RF telemetry.'
  },
  {
    id: 'ait-thailand-acceptance',
    title: 'AIT Thailand Research Internship Acceptance Letter',
    issuer: 'Asian Institute of Technology, Thailand',
    category: 'Internships & Letters',
    categoryFilter: 'experience',
    date: '20 July 2026',
    meta: 'Passport Y7839111 · Special Degree Programs · Dr. Ranadheer Mandadi',
    filePath: 'certificates/AIT_Thailand_Research_Internship_Acceptance_Letter.pdf',
    thumbPath: 'certificates/thumbnails/AIT_Thailand_Research_Internship_Acceptance_Letter_thumb.webp',
    isPdf: true,
    tags: ['AIT Thailand', 'Global Immersion', 'Research Internship', 'Robotics & Automation'],
    desc: 'Official acceptance letter for the International Project-based Research Internship Program and Cultural Exposure at Asian Institute of Technology (Pathum Thani, Thailand).'
  },
  {
    id: 'upthink-internship-agreement',
    title: 'Process Automation & Full Stack Internship Agreement',
    issuer: 'UpThink Edutech Services Pvt. Ltd.',
    category: 'Internships & Letters',
    categoryFilter: 'experience',
    date: '1 April 2025',
    meta: 'Agreement Ref: UpThink/INTERNSHIP ANNEXURE/25-26/1.1 · Apurva Yadav (AVP)',
    filePath: 'certificates/UpThink_Edutech_Internship_Agreement_Annexure.pdf',
    thumbPath: 'certificates/thumbnails/UpThink_Edutech_Internship_Agreement_Annexure_thumb.webp',
    isPdf: true,
    tags: ['Process Automation', 'Full Stack Development', 'Python', 'Web Solutions'],
    desc: 'Signed internship agreement annexure covering business process automation, full-stack application development, and software lifecycle maintenance solutions.'
  }
];

let activeCertIdx = 0;
const certModalOverlay = document.getElementById('certModalOverlay');
const certModalTitle = document.getElementById('certModalTitle');
const certModalIssuer = document.getElementById('certModalIssuer');
const certModalCategory = document.getElementById('certModalCategory');
const certModalMeta = document.getElementById('certModalMeta');
const certModalDesc = document.getElementById('certModalDesc');
const certModalTags = document.getElementById('certModalTags');
const certModalIframe = document.getElementById('certModalIframe');
const certModalImgWrap = document.getElementById('certModalImgWrap');
const certModalImg = document.getElementById('certModalImg');
const certMobileFallback = document.getElementById('certMobileFallback');
const certMobileOpenBtn = document.getElementById('certMobileOpenBtn');
const certModalNewTab = document.getElementById('certModalNewTab');
const certModalDownload = document.getElementById('certModalDownload');
const certCounter = document.getElementById('certCounter');
const certThumbsScroll = document.getElementById('certThumbsScroll');
const certNavPrev = document.getElementById('certNavPrev');
const certNavNext = document.getElementById('certNavNext');
const certModalClose = document.getElementById('certModalClose');

// Populate thumbnail strip
if (certThumbsScroll) {
  certThumbsScroll.innerHTML = certsList.map((c, i) => `
    <div class="cert-thumb-chip ${i === 0 ? 'active' : ''}" data-index="${i}" title="${c.title}">
      <img src="${c.thumbPath}" alt="${c.title}" loading="lazy" />
    </div>
  `).join('');

  certThumbsScroll.querySelectorAll('.cert-thumb-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.dataset.index, 10);
      renderCertModal(idx);
    });
  });
}

function renderCertModal(index) {
  if (index < 0) index = certsList.length - 1;
  if (index >= certsList.length) index = 0;
  activeCertIdx = index;
  const cert = certsList[activeCertIdx];
  if (!cert) return;

  certModalTitle.textContent = cert.title;
  certModalIssuer.textContent = cert.issuer;
  certModalCategory.textContent = cert.category;
  certModalMeta.textContent = `📅 Issued: ${cert.date} · ${cert.meta}`;
  certModalDesc.textContent = cert.desc;
  certModalTags.innerHTML = cert.tags.map(t => `<span>${t}</span>`).join('');
  certCounter.textContent = `Document ${activeCertIdx + 1} of ${certsList.length}`;

  certModalNewTab.href = cert.filePath;
  certModalDownload.href = cert.filePath;
  if (certMobileOpenBtn) certMobileOpenBtn.href = cert.filePath;

  if (cert.isPdf) {
    certModalImgWrap.style.display = 'none';
    certModalIframe.style.display = 'block';
    certModalIframe.src = cert.filePath;
  } else {
    certModalIframe.style.display = 'none';
    certModalIframe.src = '';
    certModalImgWrap.style.display = 'flex';
    certModalImg.src = cert.filePath;
    certModalImg.alt = cert.title;
  }

  // Update active thumbnail chip
  if (certThumbsScroll) {
    certThumbsScroll.querySelectorAll('.cert-thumb-chip').forEach((chip, i) => {
      chip.classList.toggle('active', i === activeCertIdx);
      if (i === activeCertIdx) {
        chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  }
}

function openCertModal(identifier) {
  let idx = 0;
  if (typeof identifier === 'number') {
    idx = identifier;
  } else if (typeof identifier === 'string') {
    const found = certsList.findIndex(c => c.id === identifier);
    if (found !== -1) idx = found;
  }
  renderCertModal(idx);
  certModalOverlay.classList.add('open');
  certModalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModalOverlay.classList.remove('open');
  certModalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!certModalOverlay.classList.contains('open')) {
      certModalIframe.src = '';
    }
  }, 300);
}

// Event Listeners for Document Modal
if (certNavPrev) certNavPrev.addEventListener('click', () => renderCertModal(activeCertIdx - 1));
if (certNavNext) certNavNext.addEventListener('click', () => renderCertModal(activeCertIdx + 1));
if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
if (certModalOverlay) {
  certModalOverlay.addEventListener('click', (e) => {
    if (e.target === certModalOverlay) closeCertModal();
  });
}

// Card button clicks & thumbnail clicks
document.querySelectorAll('.cert-view-btn, .cert-thumb-box').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = el.dataset.certId;
    openCertModal(id);
  });
});

// Gallery button in section header
const openCertGalleryBtn = document.getElementById('open-cert-gallery-btn');
if (openCertGalleryBtn) {
  openCertGalleryBtn.addEventListener('click', () => {
    openCertModal(0);
  });
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (certModalOverlay && certModalOverlay.classList.contains('open')) {
    if (e.key === 'Escape') closeCertModal();
    if (e.key === 'ArrowLeft') renderCertModal(activeCertIdx - 1);
    if (e.key === 'ArrowRight') renderCertModal(activeCertIdx + 1);
  }
});

// Category filtering for certifications
document.querySelectorAll('.cf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.certFilter;
    document.querySelectorAll('.cf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.cert-card').forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const cat = card.dataset.category || '';
        card.classList.toggle('hidden', cat !== filter);
      }
    });
  });
});

// Hero CTA button smooth scroll
const heroCertsBtn = document.getElementById('hero-certs-btn');
if (heroCertsBtn) {
  heroCertsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('certifications');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

