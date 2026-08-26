/**
 * =========================================================================
 * RAKSHA BANDHAN DIGITAL SURPRISE — MASTER CONFIGURATION & LOGIC
 * =========================================================================
 */

// =========================================================================
// 1. CHANGE THESE DETAILS (SINGLE POINT OF CUSTOMIZATION)
// =========================================================================
const defaultSisterData = {
  name: "Priya",
  nickname: "My Crime Partner",
  brotherName: "Vijay",
  relationship: "Brother & Sister",
  messages: {
    emotional: "Growing up with you has been the greatest adventure of my life. Through every up and down, you've been my constant anchor, loudest cheerleader, and truest protector. No matter how many miles or years pass, our bond will always remain unbreakable. ❤️",
    funny: "Let's be real: 90% of our childhood was you threatening 'Mummy ko bata dungi', stealing my favorite snacks from the fridge, and blaming me for every broken vase. But honestly? Life would be utterly boring without your daily drama! 😂",
    final: "Thank you for being the most incredible sister in the world. Forever your brother and forever on your team!"
  }
};

// Preset profiles for instant lookup (?sister=Neha or ?name=Anjali)
const sisterProfiles = {
  priya: { name: "Priya", nickname: "Pihu" },
  neha: { name: "Neha", nickname: "Nishu" },
  anjali: { name: "Anjali", nickname: "Anju" },
  shreya: { name: "Shreya", nickname: "Chhoti" },
  pooja: { name: "Pooja", nickname: "Didi" }
};

// =========================================================================
// 2. RUNTIME STATE & RESOLUTION
// =========================================================================
let currentSister = { ...defaultSisterData };

/**
 * Resolves the sister name dynamically from URL search params:
 * e.g., index.html?name=Sneha OR index.html?sister=neha
 */
function resolvePersonalization() {
  const urlParams = new URLSearchParams(window.location.search);
  const nameQuery = urlParams.get('name') || urlParams.get('sister');

  if (nameQuery) {
    const cleanKey = nameQuery.trim().toLowerCase();
    if (sisterProfiles[cleanKey]) {
      currentSister.name = sisterProfiles[cleanKey].name;
      currentSister.nickname = sisterProfiles[cleanKey].nickname;
    } else {
      // Direct raw name entered in URL
      currentSister.name = decodeURIComponent(nameQuery.trim());
      currentSister.nickname = "My Favourite Sibling";
    }
  }

  injectDynamicData();
}

/**
 * Populates all placeholders throughout the DOM
 */
function injectDynamicData() {
  document.querySelectorAll('.inject-sister-name').forEach(el => {
    el.textContent = currentSister.name;
  });

  document.querySelectorAll('.inject-sister-nickname').forEach(el => {
    el.textContent = currentSister.nickname;
  });

  document.querySelectorAll('.inject-brother-name').forEach(el => {
    el.textContent = currentSister.brotherName;
  });

  const loaderNameEl = document.getElementById('loaderSisterName');
  if (loaderNameEl) loaderNameEl.textContent = currentSister.name;

  const emotionalMsgEl = document.getElementById('emotionalMessageText');
  if (emotionalMsgEl) emotionalMsgEl.textContent = currentSister.messages.emotional;

  const funnyMsgEl = document.getElementById('funnyMessageText');
  if (funnyMsgEl) funnyMsgEl.textContent = currentSister.messages.funny;

  // Update design prompt box
  const promptEl = document.getElementById('aiPosterPromptText');
  if (promptEl) {
    promptEl.textContent = `A heartwarming, cinematic Raksha Bandhan poster (1:1 ratio), featuring an intricate gold and ruby Rakhi glowing at the center, surrounded by floating golden bokeh, royal purple backdrop, elegant typography saying 'Happy Raksha Bandhan ${currentSister.name}', warm studio lighting, 8k render, masterpiece quality.`;
  }
}

// =========================================================================
// 3. CINEMATIC NAME LOADER TIMELINE
// =========================================================================
function initLoaderExperience() {
  const loaderOverlay = document.getElementById('loaderOverlay');
  const enterBtn = document.getElementById('enterSurpriseBtn');

  // Allow enter after animations run
  setTimeout(() => {
    if (enterBtn) enterBtn.style.display = "inline-flex";
  }, 2600);

  enterBtn.addEventListener('click', () => {
    triggerConfetti();
    playChimeSound();
    loaderOverlay.classList.add('fade-out');
    document.body.style.overflow = "auto";
  });
}

// =========================================================================
// 4. FULLSCREEN CANVAS PARTICLES (CONFETTI & FLOATING SPARKLES)
// =========================================================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingParticle {
  constructor(isConfetti = false) {
    this.reset(isConfetti);
  }

  reset(isConfetti) {
    this.isConfetti = isConfetti;
    this.x = Math.random() * canvas.width;
    this.y = isConfetti ? -20 : Math.random() * canvas.height;
    this.size = isConfetti ? Math.random() * 8 + 4 : Math.random() * 2.5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = isConfetti ? Math.random() * 4 + 2 : Math.random() * 0.6 - 0.3;
    this.color = isConfetti
      ? ['#FFD700', '#FF2A6D', '#FF5400', '#FFF', '#7B2CBF'][Math.floor(Math.random() * 5)]
      : 'rgba(255, 215, 0, ' + (Math.random() * 0.4 + 0.1) + ')';
    this.rotation = Math.random() * 360;
    this.rotSpeed = Math.random() * 10 - 5;
    this.life = isConfetti ? 180 : Infinity;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotSpeed;

    if (this.isConfetti) {
      this.life--;
    } else {
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;

    if (this.isConfetti) {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// Initial ambient stars/sparkles
for (let i = 0; i < 45; i++) {
  particles.push(new FloatingParticle(false));
}

function triggerConfetti(amount = 80) {
  for (let i = 0; i < amount; i++) {
    particles.push(new FloatingParticle(true));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();

    if (p.isConfetti && p.life <= 0) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// =========================================================================
// 5. WEB AUDIO SYNTHESIZER (NO EXTERNAL AUDIO FILE REQUIRED)
// =========================================================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 0.85);
    });
  } catch (e) {
    // Graceful fallback for restricted audio environments
  }
}

// =========================================================================
// 6. UI INTERACTION HANDLERS
// =========================================================================

// Global Toast Utility
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Music Play / Pause Toggle
function setupAudioControls() {
  const audioBtn = document.getElementById('audioToggleBtn');
  const bgAudio = document.getElementById('bgAudio');
  const audioIcon = document.getElementById('audioIcon');
  const audioText = document.getElementById('audioText');
  let isPlaying = false;

  audioBtn.addEventListener('click', () => {
    getAudioContext();
    if (!isPlaying) {
      bgAudio.play().then(() => {
        isPlaying = true;
        audioIcon.textContent = "⏸️";
        audioText.textContent = "Pause Music";
        showToast("🎵 Playing Rakhi Music");
      }).catch(() => {
        // If local mp3 is missing, play pleasant synth chime
        playChimeSound();
        isPlaying = true;
        audioIcon.textContent = "✨";
        audioText.textContent = "Sound FX On";
        showToast("✨ Sound Effects Active");
      });
    } else {
      bgAudio.pause();
      isPlaying = false;
      audioIcon.textContent = "🎵";
      audioText.textContent = "Play Music";
      showToast("🔇 Audio Paused");
    }
  });
}

// Gift Box Opening Interaction
function setupGiftBox() {
  const giftContainer = document.getElementById('giftBoxContainer');
  const giftBox = document.getElementById('giftBoxElement');
  const revealedContent = document.getElementById('giftRevealedContent');

  if (!giftContainer) return;

  giftContainer.addEventListener('click', () => {
    if (!giftBox.classList.contains('opened')) {
      giftBox.classList.add('opened');
      playChimeSound();
      triggerConfetti(100);

      setTimeout(() => {
        giftContainer.style.display = 'none';
        revealedContent.style.display = 'block';
      }, 500);
    }
  });
}

// Virtual Rakhi Tying Ceremony
function setupRakhiCeremony() {
  const tieBtn = document.getElementById('tieRakhiBtn');
  const blessingPanel = document.getElementById('rakhiBlessingPanel');
  const svgRakhi = document.getElementById('rakhiSvgIllustration');

  if (!tieBtn) return;

  tieBtn.addEventListener('click', () => {
    playChimeSound();
    triggerConfetti(120);

    tieBtn.style.display = 'none';
    blessingPanel.style.display = 'block';

    if (svgRakhi) {
      svgRakhi.style.transform = 'scale(1.15)';
      svgRakhi.style.transition = 'transform 0.6s ease';
    }

    showToast(`🪢 Rakhi Tied for ${currentSister.name}! ❤️`);
  });
}

// Secret Vault Unlock
function setupSecretVault() {
  const unlockBtn = document.getElementById('unlockSecretBtn');
  const lockedState = document.getElementById('vaultLockedState');
  const unlockedState = document.getElementById('vaultUnlockedState');

  if (!unlockBtn) return;

  unlockBtn.addEventListener('click', () => {
    playChimeSound();
    triggerConfetti(50);
    lockedState.style.display = 'none';
    unlockedState.style.display = 'block';
  });
}

// Card Flip for Mobile & Touch
function setupFlipCards() {
  document.querySelectorAll('.interactive-flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}

// Copy Action Buttons
function setupCopyActions() {
  // 1. Copy Rakhi Message
  const copyMsgBtn = document.getElementById('copyMessageBtn');
  if (copyMsgBtn) {
    copyMsgBtn.addEventListener('click', () => {
      const msg = `Happy Raksha Bandhan, ${currentSister.name}! ❤️\n\n${currentSister.messages.emotional}\n\n— From ${currentSister.brotherName}`;
      navigator.clipboard.writeText(msg).then(() => {
        showToast("💌 Message Copied to Clipboard!");
      });
    });
  }

  // 2. Copy Poster Prompt
  const copyPromptBtn = document.getElementById('copyPosterPromptBtn');
  const promptEl = document.getElementById('aiPosterPromptText');
  if (copyPromptBtn && promptEl) {
    copyPromptBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(promptEl.textContent).then(() => {
        showToast("📋 Design Prompt Copied!");
      });
    });
  }

  // 3. Link Generator
  const generateBtn = document.getElementById('generateLinkBtn');
  const inputEl = document.getElementById('customSisterInput');
  const displayBox = document.getElementById('generatedLinkDisplay');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const miniCopyBtn = document.getElementById('copyDirectLinkBtn');

  if (generateBtn && inputEl) {
    generateBtn.addEventListener('click', () => {
      const val = inputEl.value.trim();
      if (!val) {
        showToast("⚠️ Please enter a name first!");
        return;
      }

      const baseUrl = window.location.origin + window.location.pathname;
      const finalUrl = `${baseUrl}?name=${encodeURIComponent(val)}`;

      shareUrlInput.value = finalUrl;
      displayBox.style.display = 'block';

      navigator.clipboard.writeText(finalUrl).then(() => {
        showToast(`🎉 Link Copied for ${val}!`);
      });
    });

    if (miniCopyBtn) {
      miniCopyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(shareUrlInput.value).then(() => {
          showToast("Link Copied! ❤️");
        });
      });
    }
  }

  // 4. Finale Re-celebration
  const finaleBtn = document.getElementById('celebrateAgainBtn');
  if (finaleBtn) {
    finaleBtn.addEventListener('click', () => {
      playChimeSound();
      triggerConfetti(150);
      showToast(`❤️ Happy Raksha Bandhan, ${currentSister.name}!`);
    });
  }
}

// =========================================================================
// 7. INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  resolvePersonalization();
  initLoaderExperience();
  setupAudioControls();
  setupGiftBox();
  setupRakhiCeremony();
  setupSecretVault();
  setupFlipCards();
  setupCopyActions();
});
