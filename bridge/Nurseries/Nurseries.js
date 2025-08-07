
document.addEventListener("DOMContentLoaded", function () {
    const openBtns = document.querySelectorAll('.more-info-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            const logo = btn.dataset.logo;
            const location = btn.dataset.location;
            const price = btn.dataset.price;
            const whatsapp = btn.dataset.whatsapp;
            const instagram = btn.dataset.instagram;
            const tiktok = btn.dataset.tiktok;
            const phone = btn.dataset.phone;
            const xapp = btn.dataset.xapp;
            const maplink = btn.dataset.maplink; // <<--- NEW line (get the Google Maps link)

            document.getElementById('modal-daycare-name').textContent = name;
            document.getElementById('modal-daycare-logo').src = logo;
            document.getElementById('modal-location').textContent = location;
            document.getElementById('modal-price').textContent = price;

            // Handle contact links smartly
            setContactLink('modal-whatsapp', whatsapp);
            setContactLink('modal-instagram', instagram);
            setContactLink('modal-tiktok', tiktok);
            setContactLink('modal-phone', phone);
            setContactLink('modal-xapp', xapp);
            setContactLink('modal-map', maplink); // <<--- NEW line (for Visit Us Earth Icon)

            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });

    function setContactLink(elementId, link) {
        const element = document.getElementById(elementId);
        if (link) {
            element.href = link;
            element.style.display = 'inline-block';
        } else {
            element.style.display = 'none';
        }
    }



    // ======================================
    // 2. STAR RATING SYSTEM LOGIC
    // ======================================


    const starContainers = document.querySelectorAll('.star-rating-container');

    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.fa-star');
        const userRating = container.querySelector('.user-rating');
        const daycareId = container.dataset.daycareId;

        // Initialize savedRating (check if a rating exists)
        let savedRating = Number(localStorage.getItem(daycareId)) || 0; // Default to 0 if no saved rating

        // Initialize the stars based on saved rating or default
        updateStars(savedRating);

        // Update user rating text if no saved rating
        if (savedRating == 0) {
            userRating.textContent = "Not rated yet";
        }

        // Add event listeners for each star
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const ratingValue = star.dataset.value;
                localStorage.setItem(daycareId, ratingValue); // Save rating in localStorage
                savedRating = ratingValue; // Update saved rating
                updateStars(ratingValue); // Update star colors
            });

            // Hover effects (mouseover)
            star.addEventListener('mouseover', () => {
                updateStars(star.dataset.value); // Preview hover effect
            });

            // Mouseout effect (reset to saved rating)
            star.addEventListener('mouseout', () => {
                updateStars(savedRating); // Reset to saved rating after mouse leaves
            });
            star.addEventListener('mouseout', () => {
                // If no rating has been clicked, clear the preview (reset to savedRating)
                if (!savedRating) {
                    updateStars(0); // Set all stars to unfilled when not rated
                } else {
                    updateStars(savedRating); // Otherwise, reset to the saved rating
                }
            });

        });

        // Function to update star appearance based on the rating value
        function updateStars(ratingValue) {
            stars.forEach(star => {
                if (star.dataset.value <= ratingValue) {
                    star.classList.add('rated'); // Highlight stars up to the rating value
                } else {
                    star.classList.remove('rated'); // Remove highlight from remaining stars
                }
            });

            // Update the user rating text
            if (ratingValue == 0) {
                userRating.textContent = "Not rated yet";
            } else {
                userRating.textContent = `Rating: ${ratingValue} stars`;
            }
        }
    });



    // ======================================
    // 3. LIKE / DISLIKE SYSTEM LOGIC
    // ======================================

    const photoCards = document.querySelectorAll('.photo-card');

    photoCards.forEach(card => {
        const id = card.dataset.id;
        const likeBtn = card.querySelector('.like-btn');
        const dislikeBtn = card.querySelector('.dislike-btn');
        const resetBtn = card.querySelector('.reset-btn');
        const likeSpan = likeBtn.querySelector('span');
        const dislikeSpan = dislikeBtn.querySelector('span');

        const stored = JSON.parse(localStorage.getItem(id)) || { likes: 0, dislikes: 0 };
        likeSpan.textContent = stored.likes;
        dislikeSpan.textContent = stored.dislikes;

        function showEmoji(card, emoji) {
            const emojiEl = document.createElement('div');
            emojiEl.className = 'emoji-pop';
            emojiEl.textContent = emoji;
            emojiEl.style.left = `${Math.random() * 50 + 25}px`;
            emojiEl.style.top = `50%`;
            card.appendChild(emojiEl);
            setTimeout(() => emojiEl.remove(), 700);
        }

        likeBtn.addEventListener('click', () => {
            stored.likes++;
            likeSpan.textContent = stored.likes;
            localStorage.setItem(id, JSON.stringify(stored));
            likeBtn.classList.add('clicked');
            setTimeout(() => likeBtn.classList.remove('clicked'), 300);
            showEmoji(card, '👍');
        });

        dislikeBtn.addEventListener('click', () => {
            stored.dislikes++;
            dislikeSpan.textContent = stored.dislikes;
            localStorage.setItem(id, JSON.stringify(stored));
            dislikeBtn.classList.add('clicked');
            setTimeout(() => dislikeBtn.classList.remove('clicked'), 300);
            showEmoji(card, '👎');
        });

        resetBtn.addEventListener('click', () => {
            stored.likes = 0;
            stored.dislikes = 0;
            likeSpan.textContent = '0';
            dislikeSpan.textContent = '0';
            localStorage.setItem(id, JSON.stringify(stored));
            resetBtn.classList.add('clicked');
            setTimeout(() => resetBtn.classList.remove('clicked'), 300);
            showEmoji(card, '🔄');
        });
    });

    // ======================================
    // 4. FILTER SYSTEM LOGIC
    // ======================================

const locationFilter = document.getElementById('location-filter');
const priceFilter = document.getElementById('price-filter');
const motherFriendlyFilter = document.getElementById('mother-friendly-filter'); // Changed
const applyFiltersButton = document.getElementById('apply-filters');
const clearFiltersButton = document.getElementById('clear-filters');
const daycares = document.querySelectorAll('.box');

applyFiltersButton.addEventListener('click', function () {
    console.log("Apply Filters button clicked");
    const locationValue = locationFilter.value;
    const priceValue = priceFilter.value;
    const motherFriendlyValue = motherFriendlyFilter.value;
    filterDaycares(locationValue, priceValue, motherFriendlyValue);
});

clearFiltersButton.addEventListener('click', function () {
    console.log("Clean Filters button clicked");
    locationFilter.value = '';
    priceFilter.value = '';
    motherFriendlyFilter.value = '';
    filterDaycares('', '', '');
});

function filterDaycares(location, price, motherFriendly) {
    console.log(`Filtering daycares with: Location: ${location}, Price: ${price}, Mother Friendly: ${motherFriendly}`);
    daycares.forEach(function (daycare) {
        const daycareLocation = daycare.dataset.location;
        const daycarePrice = daycare.dataset.price;
        const daycareMotherFriendly = daycare.dataset.motherfriendly;

        if (
            (location === '' || daycareLocation.includes(location)) &&
            (price === '' || daycarePrice.includes(price)) &&
            (motherFriendly === '' || daycareMotherFriendly === motherFriendly)
        ) {
            daycare.style.display = ''; // Show
        } else {
            daycare.style.display = 'none'; // Hide
        }
    });
}


});// Function


