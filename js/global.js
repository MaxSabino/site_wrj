// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

function initializeWebsite() {
  handlePreloader();
  setupMobileMenu();
  setupScrollEffects();
  setupAnimations();
  setupTypingEffect();
  setupCounters();
  setupTestimonialSlider();
  setupPortfolioFilter();
  setupForms();
  setupThemeToggle();
  setupChatWidget();
  setupProgressBar();
}

// Preloader
function handlePreloader() {
  window.addEventListener("load", function () {
    setTimeout(() => {
      document.getElementById("preloader").classList.add("hidden");
    }, 1000);
  });
}

// Mobile Menu
function setupMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.getElementById("navLinks");

  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  // Close menu when clicking on links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenu.classList.remove("active");
    });
  });
}

// Scroll Effects
function setupScrollEffects() {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Header background
    if (scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll Animations
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// Typing Effect
function setupTypingEffect() {
  const typingText = document.getElementById("typingText");
  const words = [
    "Tecnologia",
    "Inovação",
    "Soluções",
    "Futuro",
    "Transformação",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
}

// Animated Counters
function setupCounters() {
  const counters = document.querySelectorAll(".stat-number");
  let hasRun = false;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counters.forEach((counter) => {
            animateCounter(counter);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  counterObserver.observe(document.querySelector(".stats"));
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-count"));
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counter.textContent = target + (target > 10 ? "+" : "");
      clearInterval(timer);
    } else {
      counter.textContent = Math.floor(current) + (target > 10 ? "+" : "");
    }
  }, 50);
}

// Testimonial Slider
function setupTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".nav-dot");
  let currentSlide = 0;

  function showSlide(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-advance testimonials
  setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }, 5000);
}

// Portfolio Filter
function setupPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      // Filter items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Forms
function setupForms() {
  // Contact Form
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      if (!name || !email || !subject || !message) {
        showNotification(
          "Por favor, preencha todos os campos obrigatórios.",
          "error"
        );
        return;
      }

      // Simulate form submission
      showLoading(true);
      setTimeout(() => {
        showLoading(false);
        showModal();
        this.reset();
      }, 2000);
    });

  // Newsletter Form
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (!email) {
        showNotification("Por favor, insira um email válido.", "error");
        return;
      }

      showNotification(
        "Obrigado! Você foi inscrito em nossa newsletter.",
        "success"
      );
      this.reset();
    });
}

// Theme Toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// Chat Widget
function setupChatWidget() {
  const chatWidget = document.getElementById("chatWidget");

  chatWidget.addEventListener("click", function () {
    showNotification(
      "Chat em desenvolvimento! Entre em contato pelo formulário.",
      "info"
    );
  });
}

// Progress Bar
function setupProgressBar() {
  const progressBar = document.getElementById("progressBar");

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// Modal Functions
function showModal() {
  document.getElementById("successModal").classList.add("active");
}

function closeModal() {
  document.getElementById("successModal").classList.remove("active");
}

document.getElementById("modalClose").addEventListener("click", closeModal);

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                z-index: 10001;
                animation: slideInRight 0.3s ease-out;
                max-width: 300px;
            `;

  switch (type) {
    case "success":
      notification.style.background = "var(--accent)";
      break;
    case "error":
      notification.style.background = "#ff4444";
      break;
    default:
      notification.style.background = "var(--primary-light)";
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

function showLoading(show) {
  const submitBtn = document.querySelector(".submit-btn");
  if (show) {
    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";
  } else {
    submitBtn.textContent = "Enviar Mensagem 🚀";
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  }
}

// Add CSS for notification animation
const style = document.createElement("style");
style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
document.head.appendChild(style);
