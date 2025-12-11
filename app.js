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

window.addEventListener("scroll", setActiveNav, {passive: true});


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

  // Performance: lazy-load images and reduce video preload
  try{
    if ('requestIdleCallback' in window) {
      requestIdleCallback(()=>{
        document.querySelectorAll('img').forEach(img=>{ if(!img.loading) img.loading = 'lazy'; });
        document.querySelectorAll('video').forEach(v=>{ try{ v.preload = 'metadata'; }catch(e){} });
      });
    } else {
      // fallback
      setTimeout(()=>{
        document.querySelectorAll('img').forEach(img=>{ if(!img.loading) img.loading = 'lazy'; });
        document.querySelectorAll('video').forEach(v=>{ try{ v.preload = 'metadata'; }catch(e){} });
      }, 1200);
    }
  }catch(e){console.warn('lazy init failed', e)}

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
        // set active immediately for feedback
        navLinks.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Also wire sidebar links to set active state (and close sidebar)
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) smoothScrollTo(target, -80);
        // sync active state in header and sidebar
        navLinks.forEach(l=>l.classList.remove('active'));
        sidebarLinks.forEach(l=>l.classList.remove('active'));
        // try to find matching header link
        const headLink = document.querySelector(`header ul li a[href="${href}"]`);
        if(headLink) headLink.classList.add('active');
        link.classList.add('active');
        // close sidebar
        sidebar.classList.remove('open-sidebar');
        document.body.classList.remove('no-scroll');
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

      // Prefer EmailJS when configured; otherwise fall back to mailto link so user can send via their mail client
      const canUseEmailJS = (typeof emailjs !== "undefined" && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID);
      if (!canUseEmailJS) {
        // compose mailto fallback
        const name = contactNameInput?.value || '';
        const email = contactEmailInput?.value || '';
        const message = contactMessage?.value || '';
        const subject = encodeURIComponent('Portfolio contact from ' + (name || email || 'website'));
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto = `mailto:rvwathsula@gmail.com?subject=${subject}&body=${body}`;

        // Ask user to open their email client
        if (confirm('Email service is not configured on this site. Open your email app to send the message?')) {
          // open mail client with prefilled content
          window.location.href = mailto;
          // give visual feedback
          if (submitBtn) {
            submitBtn.textContent = 'Opening mail app...';
            setTimeout(() => {
              contactForm.reset();
              if (submitBtn) submitBtn.textContent = originalBtnText;
            }, 1200);
          }
        }
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

  window.addEventListener("scroll", debounce(handleScrollReveal, 12), {passive: true});
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
  window.addEventListener("scroll", debounce(setActiveNav, 10), {passive: true});
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

  // footer year
  try{ document.getElementById('footer-year').textContent = new Date().getFullYear(); }catch(e){}
