// Create floating stars in the background
const starContainer = document.querySelector('.floating-stars');

function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3 + 2}px`;
        star.style.height = star.style.width; // Make it circular
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
        starContainer.appendChild(star);
    }
}

// Generate 80 floating stars
createStars(80);
