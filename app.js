// ---------------------------
// EMAILJS CONTACT FORM INTEGRATION
// ---------------------------
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your EmailJS public key
        var contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                    .then(function() {
                        alert('Message sent successfully!');
                        contactForm.reset();
                    }, function(error) {
                        alert('Failed to send message. Please try again.');
                    });
            });
        }
    }
});
// ...existing code...
// ---------------------------
// SIDEBAR OPEN / CLOSE
// ---------------------------
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const closeIcon = document.querySelector(".close-icon");

menuIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeIcon.addEventListener("click", () => {
    sidebar.classList.remove("active");
});


// ---------------------------
// AUTO BLUR SECTIONS ON SCROLL
// ---------------------------

const autoBlurElements = document.querySelectorAll(".autoBlur");

window.addEventListener("scroll", () => {
    autoBlurElements.forEach((el) => {
        let rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.filter = "blur(0px)";
            el.style.opacity = "1";
            el.style.transform = "translateY(0px)";
        } else {
            el.style.filter = "blur(5px)";
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
        }
    });
});

// Initial blur state
autoBlurElements.forEach((el) => {
    el.style.transition = "0.8s ease";
    el.style.filter = "blur(5px)";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
});


// ---------------------------
// AUTO DISPLAY ANIMATION ON SCROLL
// ---------------------------
const autoDisplay = document.querySelectorAll(".autoDisplay");

window.addEventListener("scroll", () => {
    autoDisplay.forEach((el) => {
        let rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("show");
        }
    });
});

autoDisplay.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.8s ease";
});


// ---------------------------
// SMOOTH SCROLL DOWN BUTTON
// ---------------------------
const scrollDownBtn = document.querySelector(".scroll-down");

if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    });
}


// ---------------------------
// NAVBAR ACTIVE ON SCROLL (OPTIONAL)
// ---------------------------
const navLinks = document.querySelectorAll("header ul li a");

function setActiveNav() {
    let fromTop = window.scrollY + 150;

    navLinks.forEach(link => {
        let section = document.querySelector(link.getAttribute("href"));
        if (!section) return;

        if (section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", setActiveNav);


// ---------------------------
// PROJECT CARDS VIDEO PLAY ON HOVER
// ---------------------------
const projectVideos = document.querySelectorAll(".project-vidbox video");

projectVideos.forEach(video => {
    video.addEventListener("mouseenter", () => video.play());
    video.addEventListener("mouseleave", () => video.pause());
});
// app.js - Replace your existing file with this

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CONFIG - set these values
     ========================= */
  const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  // -------------------------
  // EmailJS init (if script loaded)
  if (typeof emailjs !== "undefined" && EMAILJS_PUBLIC_KEY) {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("EmailJS initialized");
    } catch (e) {
      console.warn("EmailJS init failed:", e);
    }
  }

  /* =========================
     SELECTORS
     ========================= */
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.querySelector(".sidebar");
  const closeIcon = document.querySelector(".close-icon");
  const navLinks = document.querySelectorAll("header ul li a");
  const allContactButtons = document.querySelectorAll("button, a"); // we'll filter by dataset later
  const contactSection = document.querySelector("#contact") || document.querySelector(".contact-section") || document.querySelector(".contact");
  const contactForm = document.getElementById("contact-form");
  const contactNameInput = contactForm?.querySelector("input[name='user_name']") || contactForm?.querySelector("input[type='text']");
  const contactEmailInput = contactForm?.querySelector("input[name='user_email']") || contactForm?.querySelector("input[type='email']");
  const contactMessage = contactForm?.querySelector("textarea[name='message']") || contactForm?.querySelector("textarea");
  const projectVideos = document.querySelectorAll(".project-vidbox video");
  const autoBlurElements = document.querySelectorAll(".autoBlur");
  const autoDisplayElements = document.querySelectorAll(".autoDisplay");

  /* =========================
     UTILS
     ========================= */
  function smoothScrollTo(element, offset = -20) {
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // Debounce for scroll handlers
  function debounce(fn, wait = 15) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  /* =========================
     MENU / SIDEBAR
     ========================= */
  if (menuIcon && sidebar) {
    menuIcon.addEventListener("click", () => {
      sidebar.classList.toggle("open-sidebar");
      // also toggle a class on body to prevent background scroll when open (optional)
      document.body.classList.toggle("no-scroll", sidebar.classList.contains("open-sidebar"));
    });
  }
  if (closeIcon && sidebar) {
    closeIcon.addEventListener("click", () => {
      sidebar.classList.remove("open-sidebar");
      document.body.classList.remove("no-scroll");
    });
  }

  // Close mobile sidebar when a sidebar link is clicked
  sidebar?.querySelectorAll("a")?.forEach(a => {
    a.addEventListener("click", () => {
      sidebar.classList.remove("open-sidebar");
      document.body.classList.remove("no-scroll");
    });
  });

  /* =========================
     NAV LINK SMOOTH SCROLL
     ========================= */
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // If link has href to section (#something)
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) smoothScrollTo(target, -80); // account for fixed header
      }
    });
  });

  /* =========================
     CONTACT BUTTONS - scroll & optional prefill
     - To use: add data-contact="true" to any button or link.
     - Optionally add data-name / data-email to prefill the form.
     ========================= */
  document.querySelectorAll("[data-contact='true']").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (!contactSection) return;

      // Prefill if attributes provided
      const name = el.dataset.name || el.getAttribute("data-name");
      const email = el.dataset.email || el.getAttribute("data-email");
      if (name && contactNameInput) contactNameInput.value = name;
      if (email && contactEmailInput) contactEmailInput.value = email;

      // Focus message textarea after scrolling
      smoothScrollTo(contactSection, -80);
      setTimeout(() => {
        if (contactMessage) contactMessage.focus();
      }, 900);
    });
  });

  // Also make any button text "Contact Me" work (fallback)
  Array.from(document.querySelectorAll("button, a")).forEach(el => {
    const text = (el.textContent || "").toLowerCase().trim();
    if (text.includes("contact") && !el.matches("[data-contact='true']")) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        if (!contactSection) return;
        smoothScrollTo(contactSection, -80);
        setTimeout(() => contactMessage?.focus(), 700);
      });
    }
  });

  /* =========================
     EMAILJS FORM SUBMIT
     - Your template must expect variables matching the form fields
       (e.g. user_name, user_email, message) or adapt below
     ========================= */
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector("button[type='submit']") || contactForm.querySelector("button");
      const originalBtnText = submitBtn?.textContent || "Send";

      if (typeof emailjs === "undefined") {
        alert("Email service unavailable. Make sure EmailJS script is loaded.");
        return;
      }
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
        alert("EmailJS service/template not configured. Put SERVICE/ TEMPLATE IDs in app.js.");
        return;
      }

      // disable while sending
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        // sendForm works with <form id="contact-form"> and input names
        const res = await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
        // success
        // You can replace this with a better UI modal
        if (submitBtn) submitBtn.textContent = "Sent ✓";
        setTimeout(() => {
          contactForm.reset();
          if (submitBtn) submitBtn.textContent = originalBtnText;
        }, 1600);
      } catch (err) {
        console.error("EmailJS error:", err);
        alert("Failed to send message. Try again later.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      } finally {
        // re-enable
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* =========================
     AUTO BLUR / AUTO DISPLAY ON SCROLL
     ========================= */
  function handleScrollReveal() {
    const vh = window.innerHeight;
    // autoBlur: toggle inline styles for subtle effect
    autoBlurElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - 100) {
        el.style.filter = "blur(0px)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0px)";
      } else {
        el.style.filter = "blur(6px)";
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
      }
    });

    // autoDisplay: add .show when element visible
    autoDisplayElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh - 60) el.classList.add("show");
    });
  }
  // set initial states
  autoBlurElements.forEach(el => {
    el.style.transition = "0.7s ease";
    el.style.filter = "blur(6px)";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
  });
  autoDisplayElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "0.7s ease";
  });

  window.addEventListener("scroll", debounce(handleScrollReveal, 12));
  // run once on load
  handleScrollReveal();

  /* =========================
     NAV ACTIVE ON SCROLL
     ========================= */
  function setActiveNav() {
    let fromTop = window.scrollY + 160; // offset for header
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const section = document.querySelector(href);
      if (!section) return;
      if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  window.addEventListener("scroll", debounce(setActiveNav, 10));
  setActiveNav();

  /* =========================
     PROJECT VIDEOS: play on hover (and pause)
     ========================= */
  projectVideos.forEach(video => {
    // prefer pointer events only if available
    video.addEventListener("mouseenter", () => {
      // guard: only attempt play if video can be played
      try { video.play(); } catch (e) {}
    });
    video.addEventListener("mouseleave", () => {
      try { video.pause(); } catch (e) {}
    });
    // also resume/pause on touch for mobile
    video.addEventListener("touchstart", () => {
      try {
        if (video.paused) video.play();
        else video.pause();
      } catch (e) {}
    });
  });
  Array.from(document.querySelectorAll("button, a")).forEach(el => {
    const text = (el.textContent || "").toLowerCase().trim();
    if (text.includes("contact") && !el.matches("[data-contact='true']")) {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            if (!contactSection) return;
            smoothScrollTo(contactSection, -80);
            setTimeout(() => contactMessage?.focus(), 700);
        });
    }
});


  /* =========================
     SCROLL DOWN BUTTON (hero)
     ========================= */
  const scrollDownBtn = document.querySelector(".scroll-down");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // scroll one viewport down or to #about if exists
      const about = document.querySelector("#about");
      if (about) smoothScrollTo(about, -80);
      else window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
  }

  /* =========================
     Accessible keyboard: close sidebar on Esc
     ========================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open-sidebar")) {
      sidebar.classList.remove("open-sidebar");
      document.body.classList.remove("no-scroll");
    }
  });

 

  

  console.log("app.js loaded and initialized.");
  


});
