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
    const scrollSpeed = 1; // Control the speed of scrolling

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
});
