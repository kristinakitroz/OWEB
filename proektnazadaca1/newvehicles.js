// Cuvaj carsdata vo local storage
document.addEventListener('DOMContentLoaded', function() {
    
    localStorage.setItem('carsData', JSON.stringify(cars));
    
    document.getElementById('brand').addEventListener('change', loadModels);
    document.getElementById('car-filter-form').addEventListener('submit', filterCars);
    
    loadModels();
    displayFilteredCars(cars);
});

// Modeli i brendovi
const brandModels = {
    Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
    Ford: ["Mustang", "Explorer", "F-150", "Escape", "Kuga", "Ranger"],
    BMW: ["X5", "3 Series", "M3", "X3"],
    Kia: ["EV9", "Sportage", "Sorento"],
    MercedesBenz: ["GLB 200", "35 AMG", "CLA 200"],
    Opel: ["Astra", "Grandland"],
    Volkswagen: ["Golf", "T-cross", "Tiguan", "T-roc"],
    Toyota: ["Camry", "Corolla", "RAV4"],
    Lamborghini: ["Urus", "Huracan", "Aventador"],
    Porsche: ["911", "Cayenne", "Panamera", "Macan"],
    Ferrari: ["F8", "SF90", "Roma", "Portofino M"]
};

// Niza na koli i nivnite karakteristiki
const cars = [
    { 
        id: 1, brand: "BMW", model: "X5", year: "2023", price: "75000", overallrating: "★★★★★", 
        imageUrl: "bmwx5new.avif", gearbox: "Automatic", fuelType: "Electric" 
    },
    { 
        id: 2, brand: "Ford", model: "Mustang", year: "2021", price: "38000", overallrating: "★★★★☆", 
        imageUrl: "fordmustangnew.avif", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 3, brand: "Ford", model: "Ranger", year: "2022", price: "35000", overallrating: "★★★★☆", 
        imageUrl: "fordrangernew.avif", gearbox: "Manual", fuelType: "Diesel" 
    },
    { 
        id: 4, brand: "Kia", model: "Sorento", year: "2023", price: "42000", overallrating: "★★★★★", 
        imageUrl: "kiasorentonew.jpg", gearbox: "Automatic", fuelType: "Hybrid" 
    },
    { 
        id: 5, brand: "Opel", model: "Grandland", year: "2022", price: "35000", overallrating: "★★★★☆", 
        imageUrl: "opelgrandlandnew.jpg", gearbox: "Automatic", fuelType: "Diesel" 
    },
    { 
        id: 6, brand: "Toyota", model: "RAV4", year: "2022", price: "35000", overallrating: "★★★★☆", 
        imageUrl: "toyotarav4new.jpg", gearbox: "Automatic", fuelType: "Hybrid" 
    },
    { 
        id: 7, brand: "Porsche", model: "Macan", year: "2021", price: "120000", overallrating: "★★★★★", 
        imageUrl: "porschemacannew.webp", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 8, brand: "Ferrari", model: "Portofino M", year: "2023", price: "250000", overallrating: "★★★★★", 
        imageUrl: "ferrariportofinomnew.avif", gearbox: "Automatic", fuelType: "Petrol" 
    },
    { 
        id: 9, brand: "Lamborghini", model: "Urus", year: "2023", price: "220000", overallrating: "★★★★★", 
        imageUrl: "lamborghiniurusnew.jpg", gearbox: "Automatic", fuelType: "Petrol" 
    }
];

//Otvara modeli na selektiraniot brend
function loadModels() {
    const brand = document.getElementById("brand").value.trim();
    const modelSelect = document.getElementById("model");
    const modelSelectionDiv = document.getElementById("model-selection");

    modelSelect.innerHTML = '<option value="">Select Model</option>';

    if (brand && brandModels[brand]) {
        
        modelSelectionDiv.style.display = "block";
        modelSelect.disabled = false;

       
        brandModels[brand].forEach(model => {
            const option = document.createElement("option");
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    } else {
       
        modelSelectionDiv.style.display = "none";
        modelSelect.disabled = true;
    }
}

// Filtriranje na kolite
function filterCars(event) {
    event.preventDefault();

    const brand = document.getElementById("brand").value.trim();
    const model = document.getElementById("model").value;
    const year = document.getElementById("year").value;
    const priceSelect = document.getElementById("price").value;

    const filteredCars = cars.filter(car => {
        const carPrice = parseInt(car.price);

        // Price range
        const priceMatch = !priceSelect ? true :
            (priceSelect === 'under-10000' && carPrice < 10000) ||
            (priceSelect === '10000-20000' && carPrice >= 10000 && carPrice <= 20000) ||
            (priceSelect === '20000-30000' && carPrice >= 20000 && carPrice <= 30000) ||
            (priceSelect === '30000-40000' && carPrice >= 30000 && carPrice <= 40000) ||
            (priceSelect === 'more than 40000' && carPrice > 40000);

        return (
            (brand === '' || car.brand === brand) &&
            (model === '' || car.model === model) &&
            (year === '' || car.year === year) &&
            priceMatch
        );
    });

    displayFilteredCars(filteredCars);
}

// Funkcija koja gi vcituva kolite
function displayFilteredCars(filteredCars) {
    const carResults = document.getElementById('car-results');
    carResults.innerHTML = '';

    if (filteredCars.length === 0) {
        carResults.innerHTML = `
            <div class="no-results">
                <h3>No cars found matching your criteria</h3>
                <p>Try adjusting your filters to see more results</p>
            </div>
        `;
        return;
    }

    filteredCars.forEach(car => {
        const formattedPrice = parseInt(car.price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-card-link" onclick="navigateToDetails(${car.id})">
                <div class="car-image-container">
                    <img src="${car.imageUrl}" alt="${car.brand} ${car.model}" class="car-image">
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.brand} ${car.model}</h3>
                    <div class="car-specs">
                        <span class="spec-item">${car.year}</span>
                        <span class="spec-separator">•</span>
                    </div>
                    <div class="car-price">${formattedPrice}</div>
                </div>
            </div>
        `;
        carResults.appendChild(carCard);
    });
}


function navigateToDetails(carId) {
    console.log('Navigating to details for car:', carId); 
    window.location.href = `newvehiclesdetails.html?id=${carId}`;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('brand').addEventListener('change', loadModels);
    document.getElementById('car-filter-form').addEventListener('submit', filterCars);
    
    
    loadModels();
    // Prvo pokazi gi site dostapni koli
    displayFilteredCars(cars);
});
