document.addEventListener('DOMContentLoaded', function() {
    const ratingsForm = document.getElementById('ratingsForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const nameFields = document.getElementById('nameFields');
    const anonymousCheckbox = document.getElementById('anonymous');

    // Handle star rating clicks
    const starRatings = document.querySelectorAll('.star-rating');

    starRatings.forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        const inputField = rating.querySelector('input[type="hidden"]');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                
                // Reset all stars to unselected
                stars.forEach(star => star.classList.remove('checked'));
                
                // Select the clicked star and all previous stars
                for (let i = 0; i < value; i++) {
                    stars[i].classList.add('checked');
                }
                
                // Update the hidden input value
                inputField.value = value;
            });
        });
    });

    // Toggle name fields based on anonymous checkbox
    anonymousCheckbox.addEventListener('change', function() {
        if (this.checked) {
            nameFields.style.display = 'none';
        } else {
            nameFields.style.display = 'block';
        }
    });

    // Form submission
    ratingsForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Collect form data
        const availabilityRating = document.getElementById('availabilityRatingInput').value;
        const carQualityRating = document.getElementById('carQualityRatingInput').value;
        const serviceRating = document.getElementById('serviceRatingInput').value;
        const overallRating = document.getElementById('overallRatingInput').value;
        const message = document.getElementById('message').value;
        const anonymous = document.getElementById('anonymous').checked;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        // For now, log the form data (you can replace this with AJAX or form submission to a server)
        console.log({
            availabilityRating,
            carQualityRating,
            serviceRating,
            overallRating,
            message,
            anonymous,
            firstName,
            lastName
        });

        // Display confirmation message
        confirmationMessage.textContent = 'Thank you for your feedback!';
        ratingsForm.reset();
    });
});
