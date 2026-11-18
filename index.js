document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // 2. Sticky Navbar & Scroll Background
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Active Navigation on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 5. Cars Filtering System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            carCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 10. Count-up Animation for Statistics
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    window.addEventListener('scroll', () => {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && !counted) {
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        stat.innerText = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
            counted = true;
        }
    });

    // 9. Countdown Timer
    const countDate = new Date('March 22, 2026 15:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const gap = countDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(gap / day);
        const hours = Math.floor((gap % day) / hour);
        const minutes = Math.floor((gap % hour) / minute);
        const seconds = Math.floor((gap % minute) / second);

        if (gap < 0) {
            document.getElementById('countdown').innerHTML = '<span style="color:var(--accent-red); font-family:var(--font-heading);">Musobaqa yakunlandi</span>';
        } else {
            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    };
    setInterval(updateCountdown, 1000);

    // 11. Testimonials Slider
    const track = document.getElementById('testimonialTrack');
    const cards = Array.from(track.children);
    const nextBtn = document.getElementById('nextTestimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    let currentIndex = 0;

    const updateSlider = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider(currentIndex);
    });

    // 12. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 13 & 14. Form Validation & Notification
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toastNotification');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const phoneError = document.getElementById('phoneError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');

        // Name validation
        if (name.value.trim() === '') {
            name.classList.add('error');
            nameError.classList.add('visible');
            isValid = false;
        } else {
            name.classList.remove('error');
            nameError.classList.remove('visible');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            emailError.classList.add('visible');
            isValid = false;
        } else {
            email.classList.remove('error');
            emailError.classList.remove('visible');
        }

        // Phone validation
        if (phone.value.trim() === '') {
            phone.classList.add('error');
            phoneError.classList.add('visible');
            isValid = false;
        } else {
            phone.classList.remove('error');
            phoneError.classList.remove('visible');
        }

        // Subject validation
        if (subject.value.trim() === '') {
            subject.classList.add('error');
            subjectError.classList.add('visible');
            isValid = false;
        } else {
            subject.classList.remove('error');
            subjectError.classList.remove('visible');
        }

        // Message validation
        if (message.value.trim() === '') {
            message.classList.add('error');
            messageError.classList.add('visible');
            isValid = false;
        } else {
            message.classList.remove('error');
            messageError.classList.remove('visible');
        }

        if (isValid) {
            toast.classList.add('active');
            contactForm.reset();
            setTimeout(() => {
                toast.classList.remove('active');
            }, 4000);
        }
    });

    // 11. Video Section Play Button
    const playBtn = document.getElementById('playVideoBtn');
    const videoPoster = document.getElementById('videoPoster');
    const videoContainer = document.getElementById('videoContainer');

    playBtn.addEventListener('click', () => {
        videoPoster.style.opacity = '0';
        setTimeout(() => {
            videoPoster.style.display = 'none';
            videoContainer.classList.add('active');
            const iframe = videoContainer.querySelector('iframe');
            iframe.src += '&autoplay=1';
        }, 500);
    });
});

// 6. Car Modal Functions
function openCarModal(title, team, speed, power, engine, img, desc) {
    document.getElementById('modalCarTitle').innerText = title;
    document.getElementById('modalTeamBadge').innerText = team;
    document.getElementById('modalCarSpeed').innerText = speed;
    document.getElementById('modalCarPower').innerText = power;
    document.getElementById('modalCarEngine').innerText = engine;
    document.getElementById('modalCarImg').src = img;
    document.getElementById('modalCarDesc').innerText = desc;
    document.getElementById('carModal').classList.add('active');
}

function closeCarModal() {
    document.getElementById('carModal').classList.remove('active');
}

// Circuit Modal Functions
function openCircuitModal(title, country, desc, img) {
    document.getElementById('modalCircuitTitle').innerText = title;
    document.getElementById('modalCircuitCountry').innerText = country;
    document.getElementById('modalCircuitDesc').innerText = desc;
    document.getElementById('modalCircuitImg').src = img;
    document.getElementById('circuitModal').classList.add('active');
}

function closeCircuitModal() {
    document.getElementById('circuitModal').classList.remove('active');
}

// 7 & 8. Lightbox Gallery Functions
const galleryImages = [
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1541348263662-e0626628d0cf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
];
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
    document.getElementById('lightboxModal').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightboxModal').classList.remove('active');
}

function nextLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
}

function prevLightboxImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('lightboxImg').src = galleryImages[currentLightboxIndex];
}

// ESC Key Close Modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCarModal();
        closeCircuitModal();
        closeLightbox();
    }
});