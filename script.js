let whiskyContainer = document.getElementById('whiskyContainer');

// Function to generate star rating using FontAwesome
const generateStars = (rating) => {
    let stars = '';
    const fullStar = '<i class="fas fa-star"></i>';
    const halfStar = '<i class="fas fa-star-half-alt"></i>';
    const emptyStar = '<i class="far fa-star"></i>';

    // Add full stars
    for (let i = 0; i < Math.floor(rating); i++) {
        stars += fullStar;
    }

    // Add half star if rating has 0.5
    if (rating % 1 !== 0) {
        stars += halfStar;
    }

    // Fill the remaining with empty stars
    while (stars.split('<i').length - 1 < 5) {
        stars += emptyStar;
    }

    return stars;
};

// Function to generate country flag
const generateCountryFlag = (country) => {
    const flagIcons = {
        Scotland: '<i class="fas fa-flag"></i>', // Replace with a real flag icon as needed
        // Add more countries if necessary
    };

    return flagIcons[country] || country; // Fallback to country name if flag is not available
};

/// Helper to generate unique options for a dropdown
const generateUniqueOptions = (data, attribute) => {
    return [...new Set(data.map(item => item[attribute]))];
};

// Helper to create a dropdown HTML string
const createDropdown = (id, label, options) => {
    const optionsHTML = options
        .map(option => `<option value="${option}">${option}</option>`)
        .join('');
    return `
        <label for="${id}">${label}:</label>
        <select id="${id}">
            <option value="all">All</option>
            ${optionsHTML}
        </select>
    `;
};

// Generate filter and sorting controls dynamically
const renderControls = () => {
    const controls = [
        { id: 'filter-region', label: 'Filter by Region', attribute: 'region' },
        { id: 'filter-country', label: 'Filter by Country', attribute: 'country' },
        { id: 'filter-flavour', label: 'Filter by Flavour', attribute: 'flavour' },
    ];

    const sorters = [
        { id: 'sort-price', label: 'Sort by Price' },
        { id: 'sort-rating', label: 'Sort by Rating' },
    ];

    const controlsHTML = controls
        .map(control =>
            createDropdown(
                control.id,
                control.label,
                generateUniqueOptions(whiskies, control.attribute)
            )
        )
        .join('');

    const sortersHTML = sorters
        .map(
            sorter => `
            <label for="${sorter.id}">${sorter.label}:</label>
            <select id="${sorter.id}">
                <option value="none">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        `
        )
        .join('');

    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controls';
    controlsContainer.innerHTML = controlsHTML + sortersHTML;

    document.body.insertBefore(controlsContainer, document.getElementById('whiskyContainer'));
};

// Generic filter and sort logic
const filterAndSortData = (data) => {
    const filters = [
        { id: 'filter-region', attribute: 'region' },
        { id: 'filter-country', attribute: 'country' },
        { id: 'filter-flavour', attribute: 'flavour' },
    ];

    const sorters = [
        { id: 'sort-price', attribute: 'price' },
        { id: 'sort-rating', attribute: 'rating' },
    ];

    // Apply filters
    let filteredData = [...data];
    filters.forEach(filter => {
        const value = document.getElementById(filter.id).value;
        if (value !== 'all') {
            filteredData = filteredData.filter(item => item[filter.attribute] === value);
        }
    });

    // Apply sorting
    sorters.forEach(sorter => {
        const value = document.getElementById(sorter.id).value;
        if (value === 'asc') {
            filteredData.sort((a, b) => a[sorter.attribute] - b[sorter.attribute]);
        } else if (value === 'desc') {
            filteredData.sort((a, b) => b[sorter.attribute] - a[sorter.attribute]);
        }
    });

    return filteredData;
};

// Render whisky cards
const renderWhiskies = (data) => {
    const whiskyContainer = document.getElementById('whiskyContainer');
    whiskyContainer.innerHTML = ''; // Clear container

    data.forEach(whisky => {
        const stars = generateStars(whisky.rating);
        const flag = `<span class="fi fi-${whisky.flagIcon}"></span>`; // Flag from FlagIcons CDN

        const cardHTML = `
            <div class="card">
                <div class="info-container">
                    <div>
                        <h2 class="whisky-name">${whisky.name}</h2>
                        <p class="whisky-details">
                            ${stars}<br>
                            ${flag} ${whisky.country} - ${whisky.region}<br><br>
                            <img src="assets/icons/whisky.png" class="icon" />${whisky.type}<br>
                            <img src="assets/icons/money.png" class="icon" />£${whisky.price}.00<br>
                            <img src="assets/icons/flavour.png" class="icon" />${whisky.flavour}<br>
                        </p>
                    </div>
                    
                    <div class="whisky-image-container">
                        <img src="assets/images/${whisky.image}" alt="${whisky.name}" class="whisky-image" />
                    </div>
                </div>

                <p class="whisky-review">
                    <strong>Review:</strong> ${whisky.review}
                </p>
            </div>
        `;
        whiskyContainer.innerHTML += cardHTML;
    });
};

// Attach event listeners
const attachListeners = () => {
    const allControls = document.querySelectorAll('#controls select');
    allControls.forEach(control => {
        control.addEventListener('change', () => {
            const filteredAndSortedData = filterAndSortData(whiskies);
            renderWhiskies(filteredAndSortedData);
        });
    });
};

// Render everything
renderControls();
renderWhiskies(whiskies);
attachListeners();
