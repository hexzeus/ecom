document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products-container');
    const products = Array.from(document.querySelectorAll('.product'));
    let totalWidth = 0;

    products.forEach(product => {
        totalWidth += product.offsetWidth + 20; // Include margin
    });

    // Clone products to make the scroll seamless
    products.forEach(product => {
        const clone = product.cloneNode(true);
        productsContainer.appendChild(clone);
    });

    products.forEach(product => {
        const clone = product.cloneNode(true);
        productsContainer.appendChild(clone);
    });

    let scrollPosition = 0;
    let scrollSpeed = 1; // Control the speed of scrolling

    function scrollProducts() {
        scrollPosition += scrollSpeed;
        productsContainer.scrollLeft = scrollPosition;

        if (scrollPosition >= totalWidth) {
            scrollPosition = 0; // Reset scroll position to the beginning
        }

        requestAnimationFrame(scrollProducts);
    }

    scrollProducts();

    // Pause scrolling on hover
    productsContainer.addEventListener('mouseover', () => {
        scrollSpeed = 0;
    });

    productsContainer.addEventListener('mouseout', () => {
        scrollSpeed = 1;
    });

    // Ensure smooth scrolling on user interaction
    productsContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollPosition += evt.deltaY * 0.3; // Adjust scrolling speed
    });

    // Touch events for mobile scrolling
    let isDragging = false;
    let startX;
    let scrollLeft;

    productsContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - productsContainer.offsetLeft;
        scrollLeft = productsContainer.scrollLeft;
        scrollSpeed = 0; // Stop the automatic scroll when user starts dragging
    });

    productsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - productsContainer.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the scroll speed
        productsContainer.scrollLeft = scrollLeft - walk;
        scrollPosition = productsContainer.scrollLeft; // Update scroll position
    });

    productsContainer.addEventListener('touchend', () => {
        isDragging = false;
        scrollSpeed = 1; // Resume the automatic scroll
    });
});
