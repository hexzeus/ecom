document.addEventListener('DOMContentLoaded', function () {
    const productsContainer = document.querySelector('.products-container');
    const products = Array.from(document.querySelectorAll('.product'));
    let totalWidth = 0;
    let totalHeight = 0;

    // Calculate total width and height for horizontal and vertical scrolling
    products.forEach(product => {
        totalWidth += product.offsetWidth + 20; // Include margin
        totalHeight += product.offsetHeight + 20; // Include margin
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
        if (window.innerWidth >= 600) {
            scrollPosition += scrollSpeed;
            productsContainer.scrollLeft = scrollPosition;

            if (scrollPosition >= totalWidth) {
                scrollPosition = 0; // Reset scroll position to the beginning
            }
        } else {
            scrollPosition += scrollSpeed;
            productsContainer.scrollTop = scrollPosition;

            if (scrollPosition >= totalHeight) {
                scrollPosition = 0; // Reset scroll position to the beginning
            }
        }

        requestAnimationFrame(scrollProducts);
    }

    scrollProducts();

    // Pause scrolling on hover for horizontal scrolling
    if (window.innerWidth >= 600) {
        productsContainer.addEventListener('mouseover', () => {
            scrollSpeed = 0;
        });

        productsContainer.addEventListener('mouseout', () => {
            scrollSpeed = 1;
        });
    }

    // Ensure smooth scrolling on user interaction
    productsContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollPosition += evt.deltaY * 0.3; // Adjust scrolling speed
    });

    // Touch events for mobile scrolling
    let isDragging = false;
    let startX, startY;
    let scrollLeft, scrollTop;

    productsContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - productsContainer.offsetLeft;
        startY = e.touches[0].pageY - productsContainer.offsetTop;
        scrollLeft = productsContainer.scrollLeft;
        scrollTop = productsContainer.scrollTop;
        scrollSpeed = 0; // Stop the automatic scroll when user starts dragging
    });

    productsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - productsContainer.offsetLeft;
        const y = e.touches[0].pageY - productsContainer.offsetTop;
        const walkX = (x - startX) * 2; // Adjust the scroll speed
        const walkY = (y - startY) * 2; // Adjust the scroll speed

        if (window.innerWidth >= 600) {
            productsContainer.scrollLeft = scrollLeft - walkX;
            scrollPosition = productsContainer.scrollLeft; // Update scroll position
        } else {
            productsContainer.scrollTop = scrollTop - walkY;
            scrollPosition = productsContainer.scrollTop; // Update scroll position
        }
    });

    productsContainer.addEventListener('touchend', () => {
        isDragging = false;
        scrollSpeed = 1; // Resume the automatic scroll
    });

    // Modal Functionality
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeBtn = document.getElementsByClassName('close')[0];

    function openModal(product) {
        const title = product.querySelector('h3').innerText;
        const description = product.querySelector('.description').innerText;
        const price = product.querySelector('.price').innerText;

        modal.style.display = 'flex';
        modalImg.src = product.querySelector('.product-img').src;
        modalTitle.innerText = title;
        modalDescription.innerText = description;
        modalPrice.innerText = price;
    }

    document.querySelectorAll('.product-img, .price').forEach(element => {
        element.addEventListener('click', function () {
            const product = element.closest('.product');
            openModal(product);
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Ensure modal is hidden and empty on load
    modal.style.display = 'none';
    modalImg.src = '';
    modalTitle.innerText = '';
    modalDescription.innerText = '';
    modalPrice.innerText = '';
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    toggleButton.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });
});