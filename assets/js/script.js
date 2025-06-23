  const cards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));

const pcards = document.querySelectorAll('.project-card');
const descriptionBox = document.getElementById('projectDescription');

// Example data — link each project title to a description
const projectDescriptions = {
  "Spam Detector": `
    A machine learning system to classify messages as spam or not using NLP techniques.
    <br><strong>Tools:</strong> Python, Scikit-learn, NLTK, Pandas, Jupyter.
    <br><strong>Impact:</strong> Achieved 98% accuracy using Naive Bayes and SVM models.
  `,

  "FPL Predictor": `
    Predicts Fantasy Premier League player scores based on historical stats and upcoming fixtures.
    <br><strong>Tools:</strong> Python, Pandas, NumPy, Matplotlib.
    <br><strong>Impact:</strong> Helps users make informed player choices to maximize weekly points.
  `,

  "Legal Document Analyzer": `
    Analyzes legal documents to extract keywords and summarize content using NLP.
    <br><strong>Tools:</strong> JavaScript, NLP.js, Express.js.
    <br><strong>Impact:</strong> Streamlines the review process for legal professionals.
  `,

  "Floor Plan Explainer": `
    Uploads a floor plan PDF and provides room analysis with improvement suggestions.
    <br><strong>Tools:</strong> OpenCV, Python, Flask.
    <br><strong>Impact:</strong> Helps non-architects understand house plans quickly.
  `,

  "Email Scheduler": `
    Web app to schedule emails between sender and receiver using Flask and JS.
    <br><strong>Tools:</strong> JavaScript, Flask, HTML/CSS, SQLite.
    <br><strong>Impact:</strong> Automates communication for reminders and follow-ups.
  `,

  "Messi vs Ronaldo GOAT Stats": `
    Statistical and graphical comparison between Messi and Ronaldo using all-time career data.
    <br><strong>Tools:</strong> Python, Pandas, Matplotlib.
    <br><strong>Impact:</strong> Presents an unbiased data-driven argument on the GOAT debate.
  `
};


cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const title = card.querySelector('h3').innerText;
    descriptionBox.innerHTML = projectDescriptions[title] || "Description not available.";
  });
});


const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const scrollContainer = document.getElementById('projectScroll');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

const scrollAmount = 320; // Adjust based on card width

scrollLeftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

scrollRightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

function updateArrowVisibility() {
  const visibleCards = Array.from(projectCards).filter(card => card.style.display !== 'none');
  const shouldHideArrows = visibleCards.length <= 3;

  if (shouldHideArrows) {
    scrollLeftBtn.classList.add('hidden');
    scrollRightBtn.classList.add('hidden');
  } else {
    scrollLeftBtn.classList.remove('hidden');
    scrollRightBtn.classList.remove('hidden');
  }
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const tags = card.getAttribute('data-tags').split(" ");
      if (filter === 'all' || tags.includes(filter)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // 🔁 Check after filtering
    updateArrowVisibility();
  });
});

// 🔁 Initial check on page load
updateArrowVisibility();


const skillsSection = document.querySelector('.skills-section');

  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    skillsSection.style.setProperty('--x', `${x}%`);
    skillsSection.style.setProperty('--y', `${y}%`);
  });

document.querySelectorAll('.bubble').forEach(bubble => {
  const skillGroup = bubble.dataset.skillgroup;
  const proficiency = bubble.dataset.proficiency;
  const skillBarSpan = document.querySelector(`.skills-sub[data-skillgroup="${skillGroup}"] .skill-bar span`);

  bubble.addEventListener('mouseenter', () => {
    if(skillBarSpan){
      skillBarSpan.style.width = proficiency + '%';
    }
  });

  bubble.addEventListener('mouseleave', () => {
    if(skillBarSpan){
      skillBarSpan.style.width = '100%';
    }
  });
});


const section = document.querySelector("#education");
const canvas = document.getElementById("shootingStars");
const ctx = canvas.getContext("2d");

// Make sure the section has relative positioning
section.style.position = "relative";

function resizeCanvas() {
  canvas.width = section.clientWidth;
  canvas.height = section.clientHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "0";
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// --- Background stars --- 
class Star {
  constructor(x, y, radius, alpha, alphaSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = alpha;
    this.alphaSpeed = alphaSpeed; // twinkle speed
  }

  update() {
    this.alpha += this.alphaSpeed;
    if (this.alpha <= 0 || this.alpha >= 1) {
      this.alphaSpeed = -this.alphaSpeed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 239, 255, ${this.alpha})`;
    ctx.fill();
  }
}

const starsCount = 100;
let backgroundStars = [];

// Initialize background stars randomly in the canvas
function initBackgroundStars() {
  backgroundStars = [];
  for (let i = 0; i < starsCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.5 + 0.3; // small stars
    const alpha = Math.random();
    const alphaSpeed = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1); // twinkle speed and direction
    backgroundStars.push(new Star(x, y, radius, alpha, alphaSpeed));
  }
}

initBackgroundStars();

class ShootingStar {
  constructor(x, y, angle, speed, length) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.len = length;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  draw(ctx) {
    // Draw the shooting star trail line
    ctx.strokeStyle = "rgba(0, 239, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    ctx.stroke();

    // Draw the glowing head
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 5);
    gradient.addColorStop(0, "rgba(0, 239, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 239, 255, 0)");
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  isOutOfBounds(width, height) {
    return (
      this.x < -this.len ||
      this.x > width + this.len ||
      this.y < -this.len ||
      this.y > height + this.len
    );
  }
}

let stars = [];

function randomAngleNearMouse() {
  const minAngle = (20 * Math.PI) / 180;
  const maxAngle = (70 * Math.PI) / 180;
  return minAngle + Math.random() * (maxAngle - minAngle);
}

let canSpawn = true;

function spawnStar(x, y) {
  const angle = randomAngleNearMouse();
  const speed = 4 + Math.random() * 2;
  const length = 80 + Math.random() * 40;
  stars.push(new ShootingStar(x, y, angle, speed, length));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background stars first
  backgroundStars.forEach(star => {
    star.update();
    star.draw(ctx);
  });

  // Then draw shooting stars on top
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].draw(ctx);

    if (stars[i].isOutOfBounds(canvas.width, canvas.height)) {
      stars.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();

section.addEventListener("mousemove", (e) => {
  const rect = section.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (canSpawn) {
    spawnStar(mouseX, mouseY);
    canSpawn = false;
    setTimeout(() => {
      canSpawn = true;
    }, 2500);  // spawn one shooting star every 5 seconds
  }
});


let currentIndex = 0;

  function scrollGallery(direction) {
    const track = document.getElementById('galleryTrack');
    const images = track.querySelectorAll('img');
    const total = images.length;

    currentIndex = (currentIndex + direction + total) % total;
    track.style.transform = `translateX(-${currentIndex * 320}px)`;
  }

// Neon cursor movement
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

  
  particlesJS("aboutParticles", {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#0ef"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": true
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#0ef",
        "opacity": 0.3,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "random": true,
        "out_mode": "out"
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        }
      },
      "modes": {
        "repulse": {
          "distance": 100
        }
      }
    },
    "retina_detect": true
  });

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const lines = [
  "Spending more time with models than people.",
  "My neural networks are better at pattern recognition than I am.",
  "Statistically speaking, I'm probably overfitting life.",
  "If it's not broken, I probably haven't touched it yet."
];

let i = 0, j = 0, currentLine = "", isDeleting = false;
const speed = 100, pause = 1500;
const typewriter = document.getElementById("typewriter");

function type() {
  currentLine = lines[i];

  if (isDeleting) {
    j--;
    typewriter.textContent = currentLine.substring(0, j);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % lines.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, speed / 2);
    }
  } else {
    j++;
    typewriter.textContent = currentLine.substring(0, j);
    if (j === currentLine.length) {
      isDeleting = true;
      setTimeout(type, pause);
    } else {
      setTimeout(type, speed);
    }
  }
}

document.addEventListener("DOMContentLoaded", type);
