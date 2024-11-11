document.addEventListener('DOMContentLoaded', function() {
    console.log('Details page script loaded');
    
    //go zema Id na kolata od URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = parseInt(urlParams.get('id'));
    console.log('Car ID from URL:', carId);

    // Baraj ja kolata vo dadenite podatoci
    const car = cars.find(c => c.id === carId);
    console.log('Found car:', car);

    if (!car) {
        console.log('Car not found!');
        document.getElementById('car-details-container').innerHTML = '<h2>Car not found</h2>';
        return;
    }

    let currentImageIndex = 0;
    const images = [car.imageUrl1, car.imageUrl2, car.imageUrl3];

    //HTMPL template so info za kolata
    const detailsHTML = `
    <div class="container">
        <button onclick="window.location.href='usedvehicles.html'" class="back-button">
            ← Back to Vehicles
        </button>

        <div class="details-flex">
            <!-- Left side - Image gallery -->
            <div class="image-gallery">
                <div class="main-image">
                    <img id="main-car-image" src="${images[currentImageIndex]}" alt="Car Image" />
                    <button class="arrow arrow-left" onclick="navigateImage(-1)">&#10094;</button>
                    <button class="arrow arrow-right" onclick="navigateImage(1)">&#10095;</button>
                </div>

                <div class="scrollable-images">
                    <div class="scroll-images-container">
                        ${images.map((img, index) => `<img src="${img}" alt="Car Image ${index + 1}" onclick="updateMainImage(${index})" />`).join('')}
                    </div>
                    <div class="image-buttons">
                        <span id="like-count" class="like-count">0</span>
                        <button class="like-button" id="like-button">
                            <span class="heart-icon">♡</span>
                            <span class="like-text">Like</span>
                        </button>
                        <button class="comment-button" id="comment-button">
                            <span>💬</span>
                            <span>Comment</span>
                        </button>
                    </div>
                </div>

                <div class="comment-section" id="comment-section" style="display:none;">
                    <input type="text" id="comment-input" placeholder="Add a comment..." />
                    <input type="text" id="user-name" placeholder="Your Name (Optional)" />
                    <button class="submit-comment">Submit</button>
                    <div id="comments-container"></div>
                </div>
            </div>

            <!-- Right side - Car details -->
            <div class="car-details">
                <h2>${car.brand} ${car.model}</h2>
                <p><strong>Price:</strong> $${car.price}</p>
                <p><strong>Year:</strong> ${car.year}</p>
                <p><strong>Kilometers:</strong> ${car.kilometers}</p>
                <p><strong>Gearbox:</strong> ${car.gearbox}</p>
                <p><strong>Fuel Type:</strong> ${car.fuelType}</p>
                <p><strong>Overall Rating:</strong> ${car.overallrating}</p>

                <div class="rating-section">
                    <h3>Rate this Car</h3>
                    <div class="stars">
                        <span class="star" data-rating="1">&#9733;</span>
                        <span class="star" data-rating="2">&#9733;</span>
                        <span class="star" data-rating="3">&#9733;</span>
                        <span class="star" data-rating="4">&#9733;</span>
                        <span class="star" data-rating="5">&#9733;</span>
                    </div>
                    <p id="rating-message"></p>
                </div>

                <!-- Test drive form -->
                <div id="test-drive-form">
                    <h3>Schedule a Test Drive</h3>
                    <form id="testDriveForm">
                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required />
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required />
                        </div>
                        <div class="form-group">
                            <label for="contactNumber">Contact Number:</label>
                            <input type="text" id="contactNumber" name="contactNumber" required />
                        </div>
                        <div class="form-group">
                            <label for="message">Message:</label>
                            <textarea id="message" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="test-drive-submit">Submit</button>
                    </form>
                    <p id="confirmationMessage" class="confirmation-message" style="display: none;"></p>
                </div>
            </div>
        </div>
    </div>`;

    document.getElementById('car-details-container').innerHTML = detailsHTML;

    // Rating
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('rating-message');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(star.getAttribute('data-rating'));

        
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });

            
            ratingMessage.innerText = `You rated this car ${rating} stars!`;
        });
    });


    window.updateMainImage = function(index) {
        currentImageIndex = index;
        document.getElementById('main-car-image').src = images[currentImageIndex];
    };

    
    window.navigateImage = function(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        updateMainImage(currentImageIndex);
    };

    // Like kopce funkcionalnost
    let likeCount = 0;
    document.getElementById('like-button').addEventListener('click', function() {
        const heartIcon = document.querySelector('.heart-icon');
        const likeText = document.querySelector('.like-text');
        const likeCountSpan = document.getElementById('like-count');
        
        if (heartIcon.textContent === '♡') {
            heartIcon.textContent = '♥';
            likeText.textContent = 'Liked';
            likeCount++;
        } else {
            heartIcon.textContent = '♡';
            likeText.textContent = 'Like';
            likeCount--;
        }
        
        
        likeCountSpan.textContent = likeCount;
    });

    // Comment kopce
    document.getElementById('comment-button').addEventListener('click', function() {
        document.getElementById('comment-section').style.display = 'block';
    });

    // Submit kopce
    document.querySelector('.submit-comment').addEventListener('click', function() {
        const commentInput = document.getElementById('comment-input');
        const userNameInput = document.getElementById('user-name');
        const commentText = commentInput.value.trim();
        const userName = userNameInput.value.trim() || 'Anonymous';  
        const timestamp = new Date().toLocaleString(); 

        if (commentText) {
            const commentContainer = document.getElementById('comments-container');
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <strong>${userName}</strong> <span class="timestamp">(${timestamp})</span>
                <p>${commentText}</p>
            `;
            commentContainer.appendChild(newComment);

            
            let commentLikeCount = 0;
            const likeCountSpan = newComment.querySelector('.like-count');
            const heartIcon = newComment.querySelector('.heart-icon');

            newComment.querySelector('.like-section').addEventListener('click', function() {
                commentLikeCount++;
                likeCountSpan.textContent = commentLikeCount;
                heartIcon.textContent = '♥';  
            });

            commentInput.value = ''; 
            userNameInput.value = ''; 
        }
    });

    // Form submission handler za test drive
    document.getElementById('testDriveForm').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const message = document.getElementById('message').value;

        // Validacija
        if (!firstName || !lastName || !contactNumber || !message) {
            alert('All fields are required!');
            return;
        }

        // Simuliraj form submission (ova se zamenuva so vistinska aplikacija(podnesuvanje) do server)
        console.log('Test drive scheduled:', { firstName, lastName, contactNumber, message });

        // Confirmation message
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.innerText = 'Thank you for scheduling a test drive! We will contact you soon.';
        confirmationMessage.style.display = 'block'; 
        // Clear form
        document.getElementById('testDriveForm').reset();
    });
});