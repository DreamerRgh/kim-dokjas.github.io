document.addEventListener("DOMContentLoaded", function() {
    const playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function(event) {
        event.preventDefault();
        smoothScrollTo(document.querySelector("#how-to-play"), 1000);
    });

    function smoothScrollTo(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    const slider = document.querySelector('.carousel');
    let currentSlide = 0;

    function showSlide(index) {
        const slides = slider.querySelectorAll('.carousel-item');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slider.querySelectorAll('.carousel-item').length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slider.querySelectorAll('.carousel-item').length) % slider.querySelectorAll('.carousel-item').length;
        showSlide(currentSlide);
    }

    document.querySelector('.carousel-control-next').addEventListener('click', nextSlide);
    document.querySelector('.carousel-control-prev').addEventListener('click', prevSlide);

    showSlide(currentSlide);

    const cardContainer = document.querySelector('.card-container');
    const cardsData = [
        {
            title: "Server Features",
            description: "Explore the amazing features of our Minecraft server!",
            status: "Online"
        },
        {
            title: "Server Rules",
            description: "Please follow the rules to ensure a great experience for everyone.",
            status: "Active"
        },
        {
            title: "Community Events",
            description: "Join our community events and win exciting prizes!",
            status: "Upcoming"
        }
    ];

    cardsData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'mb-4');
        cardElement.innerHTML = `
            <div class="card-body">
                <h3 class="card-title">${card.title}</h3>
                <p class="card-text">${card.description}</p>
                <span>Status: ${card.status}</span>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
});