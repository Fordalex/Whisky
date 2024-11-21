// Group whiskies by brand
const groupWhiskiesByBrand = (data) => {
    return data.reduce((grouped, whisky) => {
        const brand = whisky.brand || "Unknown Brand";
        if (!grouped[brand]) {
            grouped[brand] = [];
        }
        grouped[brand].push(whisky);
        return grouped;
    }, {});
};

// Render whiskies grouped by brand with horizontal scrolling
const renderWhiskiesByBrand = (data) => {
    const groupedWhiskies = groupWhiskiesByBrand(data);
    const whiskyContainer = document.getElementById('whiskyContainer');

    whiskyContainer.innerHTML = ''; // Clear existing content

    const brandContainer = document.createElement('div');
    brandContainer.className = 'brand-section-container';

    Object.keys(groupedWhiskies).forEach(brand => {
        // Create brand section
        const brandSection = document.createElement('div');
        brandSection.className = 'brand-section';

        const brandTitle = document.createElement('h2');
        brandTitle.textContent = brand;
        brandSection.appendChild(brandTitle);

        // Create cards for each whisky in the brand
        const whiskyCards = groupedWhiskies[brand]
            .map(whisky => `
                <div class="whisky-card">
                    <img src="assets/images/whiskies/${whisky.image}" alt="${whisky.name}" class="whisky-image" />
                    <h3 class="whisky-name">${whisky.name}</h3>
                    <p class="whisky-details">
                        <strong>Price:</strong> £${whisky.price}<br>
                        <strong>Type:</strong> ${whisky.type}<br>
                        <strong>Rating:</strong> ${generateStars(whisky.rating)}
                    </p>
                    <a href="${whisky.link}" target="_blank" class="button">View Details</a>
                </div>
            `)
            .join('');

        const cardsContainer = document.createElement('div');
        cardsContainer.innerHTML = whiskyCards;

        brandSection.appendChild(cardsContainer);
        brandContainer.appendChild(brandSection);
    });

    whiskyContainer.appendChild(brandContainer);
};

// Utility function to generate stars
const generateStars = (rating) => {
    let stars = '';
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';

    for (let i = 0; i < Math.floor(rating); i++) {
        stars += fullStar;
    }
    if (rating % 1 !== 0) {
        stars += halfStar;
    }
    while (stars.split('<i').length - 1 < 5) {
        stars += emptyStar;
    }
    return stars;
};

// Initial render
renderWhiskiesByBrand(whiskies);
