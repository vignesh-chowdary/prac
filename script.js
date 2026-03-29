document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) enableDarkMode();

    themeToggle.addEventListener('click', () =>
        body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode()
    );

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const professions = ['Full Stack Developer', 'AI Engineer', 'Java Developer', 'Machine Learning Enthusiast'];
    let professionIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 150;

    function type() {
        if (!typingText) return;
        const current = professions[professionIndex];
        typingText.textContent = isDeleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 800;
        } else {
            typingSpeed = isDeleting ? 50 : 150;
        }
        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);

    // Skills
    const skillsData = [
        { name: 'HTML5', level: 95, icon: 'fab fa-html5' },
        { name: 'CSS3', level: 90, icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', level: 88, icon: 'fab fa-js' },
        { name: 'Java', level: 85, icon: 'fab fa-java' },
        { name: 'Python', level: 92, icon: 'fab fa-python' },
        { name: 'React', level: 80, icon: 'fab fa-react' },
        { name: 'MySQL', level: 80, icon: 'fas fa-database' },
        { name: 'MongoDB', level: 80, icon: 'fas fa-leaf' },
        { name: 'Machine Learning', level: 88, icon: 'fas fa-robot' },
        { name: 'Deep Learning', level: 75, icon: 'fas fa-brain' },
        { name: 'Git & GitHub', level: 90, icon: 'fab fa-git-alt' }
    ];

    function renderSkills() {
        const container = document.querySelector('.skills-grid');
        if (!container) return;
        container.innerHTML = skillsData.map(skill => `
            <div class="skill-item">
                <div class="skill-header">
                    <i class="${skill.icon}"></i>
                    <span class="skill-name">${skill.name}</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                </div>
            </div>
        `).join('');
    }

    // Projects
    const projectsData = [
        {
            title: "Bus Ticket Booking System",
            description: "Web app for booking and managing bus tickets using Java, JSP, MySQL.",
            technologies: ["Java", "JSP", "MySQL", "HTML", "CSS"],
            github: "https://github.com/vignesh-chowdary/bus-ticket-booking-system",
            live: "",
            image: "images/bus.png"
        },
        {
            title: "Automated OCR Mark Extractor",
            description: "OCR system using YOLOv9 and Vision Transformers to auto-extract exam marks.",
            technologies: ["Python", "YOLOv9", "Transformers", "OpenCV"],
            github: "#",
            live: "",
            image: "images/ocr.png"
        },
        {
            title: "Health Tracker",
            description: "Personal wellness tracker with graphs for water, calories, and sleep.",
            technologies: ["HTML", "CSS", "JavaScript", "Chart.js"],
            github: "",
            live: "",
            image: "images/health.png"
        }
    ];

    function renderProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;
        container.innerHTML = projectsData.map(project => `
            <div class="project-card">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i></a>` : ''}
                        ${project.live ? `<a href="${project.live}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Animate Sections on Scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.id === 'skills') animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));

    function animateProgressBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = width, 100);
        });
    }

    // Back to Top
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (backToTopBtn) backToTopBtn.classList.toggle('active', window.scrollY > 400);
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth Scroll for Internal Links
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = document.querySelector('.header').offsetHeight;
                window.scrollTo({ top: target.offsetTop - offset - 10, behavior: 'smooth' });
            }
        });
    });

    // Initial Render
    renderSkills();
    renderProjects();
});
