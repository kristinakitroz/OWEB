
// Cuva podatoci za kolata vo localstorage
document.addEventListener('DOMContentLoaded', function() {
    
    localStorage.setItem('carsData', JSON.stringify(cars));
    
    document.getElementById('brand').addEventListener('change', loadModels);
    document.getElementById('car-filter-form').addEventListener('submit', filterCars);
    
    loadModels();
    displayFilteredCars(cars);
});
// Brendovi i modeli
const brandModels = {
    Tesla: ["Model 3", "Model S", "Model X", "Model Y"],
    Ford: ["Mustang", "Explorer", "F-150", "Escape","Kuga"],
    BMW: ["X5", "3 Series", "M3", "X3"],
    Kia: ["EV9", "Sportage"],
    MercedesBenz: ["GLB 200", "35 AMG", "CLA 200"],
    Opel: ["Astra"],
    Volkswagen: ["Golf", "T-cross", "Tiguan", "T-roc"],
    Toyota: ["Camry", "Corolla", "RAV4"],
    Lamborghini: ["Urus", "Huracan", "Aventador"],
    Porsche: ["911", "Cayenne", "Panamera"],
    Ferrari: ["F8", "SF90", "Roma"]
};
//niza na koli i nivni karakteristiki
const cars = [
    { 
        id: 1, brand: "Kia", model: "EV9", year: "2022", kilometers: "20,000", price: "35000", overallrating: "★★★★★", 
        imageUrl:"kiaev9used.jpg", gearbox: "Automatic", fuelType: "Electric" 
    },
    { 
        id: 2, brand: "Kia", model: "Sportage", year: "2020", kilometers: "20,000", price: "35000", overallrating: "★★★★☆", 
        imageUrl: "kiasportageused.avif", gearbox: "Manual", fuelType: "Gasoline" 
    },
    { 
        id: 3, brand: "MercedesBenz", model: "GLB 200", year: "2021", kilometers: "10,000", price: "40000", overallrating: "★★★★★", 
        imageUrl: "mercedezbenzglb200used.webp",  gearbox: "Automatic", fuelType: "Diesel" 
    },
    { 
        id: 4, brand: "MercedesBenz", model: "35 AMG", year: "2023", kilometers: "5,000", price: "50000", overallrating: "★★★★☆", 
        imageUrl: "mercedezbenz35amgused.webp",  gearbox: "Automatic", fuelType: "Petrol" 
    },
    { 
        id: 5, brand: "MercedesBenz", model: "CLA 200", year: "2023", kilometers: "3,000", price: "70000", overallrating: "★★★★☆", 
        imageUrl: "mercedezbenzcla200used.webp",  gearbox: "Automatic", fuelType: "Diesel" 
    },
    { 
        id: 6, brand: "Opel", model: "Astra", year: "2023", kilometers: "3,000", price: "70000", overallrating: "★★★★★", 
        imageUrl: "opelastraused.webp", gearbox: "Manual", fuelType: "Petrol" 
    },
    { 
        id: 7, brand: "Volkswagen", model: "Golf", year: "2023", kilometers: "80,000", price: "70000", overallrating: "★★★☆☆", 
        imageUrl: "volkswagengolfused.webp", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 8, brand: "Volkswagen", model: "T-cross", year: "2015", kilometers: "20,000", price: "70000", overallrating: "★★★★☆", 
        imageUrl: "volkswagent-crossused.webp", gearbox: "Manual", fuelType: "Diesel" 
    },
    { 
        id: 9, brand: "Volkswagen", model: "Tiguan", year: "2017", kilometers: "10,000", price: "70000", overallrating: "★★★★★", 
        imageUrl: "volkswagentiguanused.webp", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 10, brand: "Volkswagen", model: "T-roc", year: "2019", kilometers: "50,000", price: "70000", overallrating: "★★★★☆", 
        imageUrl: "volkswagent-rocused.webp", gearbox: "Automatic", fuelType: "Petrol" 
    },
    { 
        id: 11, brand: "Tesla", model: "Model 3", year: "2022", kilometers: "20,000", price: "45000", overallrating: "★★★★★", 
        imageUrl: "teslamodel3used.jpg", gearbox: "Automatic", fuelType: "Electric" 
    },
    { 
        id: 12, brand: "Ford", model: "Mustang", year: "2021", kilometers: "15,000", price: "38000", overallrating: "★★★★☆", 
        imageUrl: "fordmustangused.jpg", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 13, brand: "BMW", model: "X5", year: "2023", kilometers: "10,000", price: "75000", overallrating: "★★★★★", 
        imageUrl: "bmwx5used.jpg", gearbox: "Automatic", fuelType: "Diesel" 
    },
    { 
        id: 14, brand: "Toyota", model: "Camry", year: "2022", kilometers: "10,000", price: "33000", overallrating: "★★★★☆", 
        imageUrl: "toyotacamryused.jpg", gearbox: "Automatic", fuelType: "Hybrid" 
    },
    { 
        id: 14, brand: "Toyota", model: "SUV", year: "2023", kilometers: "20,000", price: "40000", overallrating: "★★★★☆", 
        imageUrl: "toyotacamryused.jpg", gearbox: "Automatic", fuelType: "Hybrid" 
    },
    { 
        id: 15, brand: "Lamborghini", model: "Huracan", year: "2023", kilometers: "2,000", price: "220000", overallrating: "★★★★★", 
        imageUrl: "lamborghinihuracanused.jpg", gearbox: "Automatic", fuelType: "Petrol" 
    },
    { 
        id: 16, brand: "Porsche", model: "911", year: "2021", kilometers: "5,000", price: "120000", overallrating: "★★★★★", 
        imageUrl: "porsche911used.jpg", gearbox: "Automatic", fuelType: "Gasoline" 
    },
    { 
        id: 17, brand: "Ferrari", model: "Roma", year: "2023", kilometers: "2,000", price: "250000", overallrating: "★★★★★", 
        imageUrl: "ferrariromaused.jpg", gearbox: "Automatic", fuelType: "Petrol" 
    }
];


// Vcitaj modeli na selektiraniot brendot
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
    const kilometersSelect = document.getElementById("kilometers").value;
    const year = document.getElementById("year").value;
    const priceSelect = document.getElementById("price").value;

    const filteredCars = cars.filter(car => {
        const carKilometers = parseInt(car.kilometers.replace(/,/g, ''));
        const carPrice = parseInt(car.price);

        const kilometersMatch = !kilometersSelect ? true :
            (kilometersSelect === 'under-10000' && carKilometers < 10000) ||
            (kilometersSelect === 'under-20000' && carKilometers < 20000) ||
            (kilometersSelect === 'under-40000' && carKilometers < 40000) ||
            (kilometersSelect === 'under-80000' && carKilometers < 80000) ||
            (kilometersSelect === 'more than 80000' && carKilometers >= 80000);

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
            kilometersMatch &&
            priceMatch
        );
    });
    displayFilteredCars(filteredCars);
}


// Prikazuva koli koi gi ispolnuvaat uslovite
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
                        <span class="spec-item">${car.kilometers} km</span>
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
    window.location.href = `usedvehiclesdetails.html?id=${carId}`;
}


//Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('brand').addEventListener('change', loadModels);
    document.getElementById('car-filter-form').addEventListener('submit', filterCars);
    
     //Prvo se vcituvaat site dostapni koli
    loadModels();
   
    displayFilteredCars(cars);
});