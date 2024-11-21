let whiskyContainer = document.getElementById('whiskyContainer');

// Function to generate star rating using FontAwesome
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

// Function to generate country flag
const generateCountryFlag = (country) => {
    const flagIcons = {
        Scotland: '<i class="fas fa-flag"></i>',
    };
    return flagIcons[country] || country;
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
        <div class="col-12 col-md-6 col-lg-2">
            <label for="${id}">${label}:</label>
            <select id="${id}">
                <option value="all">All</option>
                ${optionsHTML}
            </select>
        </div>
    `;
};

// Save filters and sorting to localStorage
const saveToLocalStorage = () => {
    const allControls = document.querySelectorAll('#controls select');
    const filterSettings = {};
    allControls.forEach(control => {
        filterSettings[control.id] = control.value;
    });
    localStorage.setItem('filterSettings', JSON.stringify(filterSettings));
};

// Load filters and sorting from localStorage
const loadFromLocalStorage = () => {
    const filterSettings = JSON.parse(localStorage.getItem('filterSettings'));
    if (filterSettings) {
        Object.keys(filterSettings).forEach(id => {
            const control = document.getElementById(id);
            if (control) {
                control.value = filterSettings[id];
            }
        });
    }
};

// Generate filter and sorting controls dynamically
const renderControls = () => {
    const controls = [
        { id: 'filter-region', label: 'Filter by Region', attribute: 'region' },
        { id: 'filter-country', label: 'Filter by Country', attribute: 'country' },
        { id: 'filter-flavour', label: 'Filter by Flavour', attribute: 'flavour' },
        { id: 'filter-type', label: 'Filter by Type', attribute: 'type' },
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
            <div class="col-12 col-md-6 col-lg-2">
                <label for="${sorter.id}">${sorter.label}:</label>
                <select id="${sorter.id}">
                    <option value="none">None</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
        `
        )
        .join('');

    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controls';
    controlsContainer.className = 'row';
    controlsContainer.innerHTML = controlsHTML + sortersHTML;

    document.body.insertBefore(controlsContainer, document.getElementById('whiskyContainer'));
    loadFromLocalStorage(); // Apply stored settings
};

// Generic filter and sort logic
const filterAndSortData = (data) => {
    const filters = [
        { id: 'filter-region', attribute: 'region' },
        { id: 'filter-country', attribute: 'country' },
        { id: 'filter-flavour', attribute: 'flavour' },
        { id: 'filter-type', attribute: 'type' },
    ];

    const sorters = [
        { id: 'sort-price', attribute: 'price' },
        { id: 'sort-rating', attribute: 'rating' },
    ];

    let filteredData = [...data];
    filters.forEach(filter => {
        const value = document.getElementById(filter.id).value;
        if (value !== 'all') {
            filteredData = filteredData.filter(item => item[filter.attribute] === value);
        }
    });

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

function bottlesHtml(bottleCount) {
    let bottles = '';
    for (let i = 0; i < bottleCount; i++) {
        bottles += '<img src="assets/icons/bottle.png" class="whisky-bottle-count" />';
    }
    return bottles;
}

// Render whisky cards
const renderWhiskies = (data) => {
    const whiskyContainer = document.getElementById('whiskyContainer');
    whiskyContainer.innerHTML = '';
    
    data.forEach(whisky => {
        const rating = whisky.wishlist ? '<div class="wishlist">Wishlist</div>' : generateStars(whisky.rating);
        const flag = `<span class="fi fi-${whisky.flagIcon}"></span>`;
        const cardHTML = `
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <div class="whisky-container">
                    <div class="row">
                        <div class="col-8">
                            <h2 class="whisky-name">${whisky.name}</h2>
                            <p class="whisky-description">${whisky.description}</p>
                            <p class="whisky-details">
                            <p class="whisky-location">${flag} ${whisky.country} - ${whisky.region}</p>
                            
                            ${rating}<br>
                            ${bottlesHtml(whisky.bottleCount)}<br><br>

                            <p class="whisky-info"><b>Type:</b> ${whisky.type}<br></p>
                            <p class="whisky-info"><b>Price:</b> £${whisky.price}.00<br></p>
                            <p class="whisky-info"><b>Flavour:</b> ${whisky.flavour}<br></p>
                            <p class="whisky-info"><b>Brand:</b> ${whisky.brand}<br></p>
                            <p class="whisky-info"><b>Cask:</b> ${whisky.cask}<br></p>
                            </p>
                        </div>
                        
                        <div class="col-4">
                            <img src="assets/images/whiskies/${whisky.image}" alt="${whisky.name}" class="whisky-image" />
                        </div>
                    </div>

                    <p class="whisky-review">
                        <strong>Review:</strong> ${whisky.review}
                    </p>

                    <a href="${whisky.link}" target="_blank" class="button">Info</a>
                </div>
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
            saveToLocalStorage();
            const filteredAndSortedData = filterAndSortData(whiskies);
            renderWhiskies(filteredAndSortedData);
        });
    });
};

// Render everything
renderControls();
renderWhiskies(filterAndSortData(whiskies)); // Apply filters and sorting immediately after loading controls
attachListeners();
