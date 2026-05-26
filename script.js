document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. TYPING TEXT ANIMATION ENGINE --- */
    const words = ["Full-Stack Developer", "Web Developer", "Software Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 40;
    const delayBetweenWords = 2200;
    const typingTarget = document.getElementById("typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 400);
        } else {
            setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
        }
    }
    
    // Initial Trigger
    setTimeout(typeEffect, 500);


    /* --- 2. MOBILE RESPONSIVE HAMBURGER NAVIGATION --- */
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinksList = document.getElementById("nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinksList.classList.toggle("active");
        const icon = mobileMenuBtn.querySelector("i");
        if(navLinksList.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });

    // Close menu when a link item is selected
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinksList.classList.remove("active");
            mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        });
    });


    /* --- 3. SCROLL REVEAL ENGINE --- */
    const revealSections = document.querySelectorAll(".hidden-reveal");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-reveal");
            }
        });
    }, { threshold: 0.15 });

    revealSections.forEach(section => revealObserver.observe(section));


    /* --- 4. DYNAMIC NAVIGATION ACTIVE LINK ON SCROLL --- */
    window.addEventListener("scroll", () => {
        let activeId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                activeId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(activeId)) {
                link.classList.add("active");
            }
        });
    });


    /* --- 5. HIGH-PERFORMANCE BACKGROUND PARTICLES CANVAS --- */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 55;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        buildParticlesArray();
    });

    class CleanParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = 'rgba(0, 242, 254, ' + (Math.random() * 0.35 + 0.1) + ')';
        }
        move() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        render() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function buildParticlesArray() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new CleanParticle());
        }
    }

    function drawConnections() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 8) * (canvas.height / 8)) {
                    let opacity = 1 - (distance / 18000);
                    ctx.strokeStyle = `rgba(5, 150, 105, ${opacity * 0.12})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function runLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].move();
            particlesArray[i].render();
        }
        drawConnections();
        requestAnimationFrame(runLoop);
    }

    buildParticlesArray();
    runLoop();
});