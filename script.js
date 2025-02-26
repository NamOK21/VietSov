document.addEventListener('DOMContentLoaded', function () {
    // --- SLIDER FUNCTIONALITY ---
    const slider = document.querySelector('.slider');
    const navDots = document.querySelectorAll('.slider-nav a');
    const slides = document.querySelectorAll('.image-wrapper');
    const overlays = document.querySelectorAll('.overlay');
    const intervalTime = 5000; // Auto-scroll interval
    let currentSlideIndex = 0;
    const slideWidth = slider.offsetWidth;
    let autoScrollInterval;
    let isTransitioning = false;
    let isPaused = false;

    const updateActiveDot = () => {
        navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlideIndex);
        });
    };

    const triggerOverlayAnimation = (direction) => {
        overlays.forEach((overlay) => {
            overlay.classList.remove('animate-from-left', 'animate-from-right');
            void overlay.offsetWidth; // Reset animations
            overlay.classList.add(direction === 'left' ? 'animate-from-right' : 'animate-from-left');
        });
    };

    const scrollToSlide = (index, direction) => {
        if (isTransitioning) return;
        isTransitioning = true;
        slider.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
        currentSlideIndex = index;
        triggerOverlayAnimation(direction);
        updateActiveDot();
        setTimeout(() => (isTransitioning = false), 300);
    };

    const autoScrollSlides = () => {
        if (isPaused) return;
        const nextIndex = (currentSlideIndex + 1) % slides.length;
        scrollToSlide(nextIndex, 'left');
    };

    const restartAutoScroll = () => {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(autoScrollSlides, intervalTime);
    };

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSlide(index, index > currentSlideIndex ? 'left' : 'right');
            restartAutoScroll();
        });
    });

    const pauseButton = document.querySelectorAll('.pause-btn');
    pauseButton.forEach((button) => {
        button.addEventListener('click', function () {
            isPaused = !isPaused;
            this.textContent = isPaused ? 'Resume' : 'Pause';
            isPaused ? clearInterval(autoScrollInterval) : restartAutoScroll();
        });
    });

    autoScrollInterval = setInterval(autoScrollSlides, intervalTime);
    scrollToSlide(0, 'left');

    // --- SWIPER INITIALIZATION ---
    var swiper = new Swiper(".news-container", {
        slidesPerView: 4,
        spaceBetween: 24,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
        }
    });

    // --- CARD TOGGLE FUNCTIONALITY ---
    const toggleCardButton = document.getElementById('card');
    toggleCardButton.addEventListener('click', () => {
        const card1 = document.getElementById('card1');
        const card2 = document.getElementById('card2');
        const isCard1Visible = !card1.classList.contains('hidden');
        card1.classList.toggle('hidden', isCard1Visible);
        card2.classList.toggle('hidden', !isCard1Visible);
    });

    // --- CAROUSEL FUNCTIONALITY ---
    const carouselContainer = document.querySelector('.res-card');
    const carouselSlides = document.querySelectorAll('.res-card-slides');
    const nextButtons = document.querySelectorAll('#right, .cta-button:not([id])');
    const prevButtons = document.querySelectorAll('#left, .cta-button[style*="rotate(180deg)"]');

    let carouselIndex = 0;

    const showCarouselSlide = (index) => {
        carouselSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    };

    // Show next slide on button click
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            carouselIndex = (carouselIndex + 1) % carouselSlides.length;
            showCarouselSlide(carouselIndex);
        });
    });

    // Show previous slide on button click
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
            showCarouselSlide(carouselIndex);
        });
    });

    // Initialize the carousel to show the first slide
    showCarouselSlide(carouselIndex);
});

