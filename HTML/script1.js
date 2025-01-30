document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".memory-image");
    images.forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = "1"; // Fade in
            img.style.filter = "blur(0px)"; // Remove blur
        }, index * 500); // Staggered effect
    });
});
