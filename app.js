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

