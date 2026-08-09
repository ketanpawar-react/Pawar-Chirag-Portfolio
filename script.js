// ==========================================================================
// CHIRAG PAWAR - PORTFOLIO JAVASCRIPT
// Simple, Clean & Beginner-Friendly Code
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. Sticky Navbar & Active Nav Indicator on Scroll ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        // Add background when scrolled
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Check if user is near bottom of the page (activates Contact immediately)
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 120);

        let currentSectionId = '';
        if (isAtBottom) {
            currentSectionId = 'contact';
        } else {
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 160;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        if (currentSectionId) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Set immediate active on click
    navLinks.forEach((link) => {
        link.addEventListener('click', function () {
            navLinks.forEach((l) => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 3. Mobile Navigation Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            if (openIcon && closeIcon) {
                openIcon.style.display = isOpen ? 'none' : 'block';
                closeIcon.style.display = isOpen ? 'block' : 'none';
            }
        });

        // Close menu when clicking on any link
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (openIcon && closeIcon) {
                    openIcon.style.display = 'block';
                    closeIcon.style.display = 'none';
                }
            });
        });
    }

    // --- 4. Projects Slider (Dot Indicator Navigation) ---
    const projectsTrack = document.getElementById('projectsTrack');
    const indicatorDots = document.querySelectorAll('.indicator-dot');

    if (projectsTrack && indicatorDots.length > 0) {
        // Calculate card width + gap for smooth sliding
        const getCardStep = () => {
            const card = projectsTrack.querySelector('.project-card');
            return card ? card.offsetWidth + 32 : 360;
        };

        // Update active dot on scroll
        projectsTrack.addEventListener('scroll', () => {
            const activeIndex = Math.round(projectsTrack.scrollLeft / getCardStep());
            indicatorDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });

        // Click on dot to jump directly to that project card
        indicatorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                projectsTrack.scrollTo({
                    left: index * getCardStep(),
                    behavior: 'smooth'
                });
            });
        });
    }

    // --- 5. Journey 3-Way Tabs Switcher (Projects, Education, Experience) ---
    const journeyTabs = document.querySelectorAll('.journey-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    journeyTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const targetPanelId = tab.getAttribute('data-target');

            // Set active tab button
            journeyTabs.forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            // Show matching panel
            tabPanels.forEach((panel) => {
                if (panel.id === targetPanelId) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // --- 6. In-Place Copy Email (Button text updates to 'Copied email!' without popup) ---
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyBtnText = document.getElementById('copyBtnText');
    const copyBtnIcon = document.getElementById('copyBtnIcon');
    let copyResetTimer;

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'chiragpawar@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
            } catch (err) {
                // Fallback method
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }

            // In-place button feedback
            if (copyBtnText && copyBtnIcon) {
                copyBtnText.textContent = 'Copied email!';
                copyBtnIcon.className = 'ri-check-line';
                copyEmailBtn.style.borderColor = '#4ade80';
                copyEmailBtn.style.boxShadow = '0 0 30px rgba(74, 222, 128, 0.5)';

                clearTimeout(copyResetTimer);
                copyResetTimer = setTimeout(() => {
                    copyBtnText.textContent = 'Copy email';
                    copyBtnIcon.className = 'ri-file-copy-line';
                    copyEmailBtn.style.borderColor = '';
                    copyEmailBtn.style.boxShadow = '';
                }, 2500);
            }
        });
    }

});
