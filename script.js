
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });

    // Light and dark theme toggle
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();
    });

    function updateThemeButton() {
        const isDark = document.body.classList.contains("dark-theme");
        themeToggle.textContent = isDark ? "☀" : "☾";
        themeToggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );
    }

    // Typing animation
    const typingText = document.getElementById("typingText");
    const roles = [
        "Software Developer",
        "Web Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];

    let roleIndex = 0;
    let charIndex = roles[0].length;
    let deleting = true;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentRole.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === currentRole.length) {
            deleting = true;
            delay = 1300;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
        }

        setTimeout(typeRole, delay);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setTimeout(typeRole, 1500);
    }

    // Project category filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach((card) => {
                const matches =
                    filter === "all" ||
                    card.dataset.category === filter;

                card.classList.toggle("hidden", !matches);
            });
        });
    });

    // Reveal elements when they enter the screen
    const revealElements = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("show");
        });
    }

    // Highlight the active navigation section
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navItems.forEach((link) => {
                            const isActive =
                                link.getAttribute("href") ===
                                `#${entry.target.id}`;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            { rootMargin: "-30% 0px -55% 0px" }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    // Back-to-top button
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle(
            "visible",
            window.scrollY > 400
        );
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
        });
    });

    // Automatic footer year
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // Contact form: prepare a message in the visitor's email app
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Replace this with your actual email address.
        const recipient = "your.email@example.com";

        const emailSubject = encodeURIComponent(subject);
        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        formMessage.textContent =
            "Opening your email application. Please send the prepared message there.";

        window.location.href =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
    });
});
