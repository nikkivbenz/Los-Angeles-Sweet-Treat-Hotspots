// Los Angeles Coffee Shop Map - Dynamic CSV loading

let map;
let markers = [];
let coffeeShops = [];
let currentlySelected = null;

// CSV parsing function
function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
            });
            data.push(obj);
        }
    }
    return data;
}

// Load coffee shop data from CSV
async function loadCoffeeShops() {
    try {
        // Try to fetch CSV file
        const response = await fetch('coffee_shops.csv');
        const csvText = await response.text();
        coffeeShops = parseCSV(csvText);
        
        console.log(`Loaded ${coffeeShops.length} coffee shops from CSV`);
        
    } catch (error) {
        console.error('Error loading CSV, using fallback method:', error);
        
        // Fallback: try to load via file input or show error
        const errorMsg = 'Unable to load coffee shop data. Please make sure coffee_shops.csv is in the same folder.';
        document.querySelector('#coffee-list').innerHTML = `<li style="color: red; padding: 20px;">${errorMsg}</li>`;
        return;
    }
    
    // Remove loading messages
    document.querySelector('#coffee-list .loading')?.remove();
    document.querySelector('#map .loading')?.remove();
    
    // Populate sidebar and map
    populateSidebar();
    initMap();
}

// Populate sidebar with coffee shop list
function populateSidebar() {
    const coffeeList = document.getElementById('coffee-list');
    coffeeList.innerHTML = '';
    
    coffeeShops.forEach((shop, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'coffee-item';
        listItem.dataset.index = index;
        
        listItem.innerHTML = `
            <h3>${shop.name}</h3>
            <p>${shop.address}</p>
            <p class="rating">★ ${shop.rating}</p>
            <p>${shop.specialty}</p>
        `;
        
        listItem.addEventListener('click', () => selectCoffeeShop(index));
        coffeeList.appendChild(listItem);
    });
}

// Select coffee shop (from sidebar or map)
function selectCoffeeShop(index) {
    const shop = coffeeShops[index];
    
    // Update sidebar selection
    document.querySelectorAll('.coffee-item').forEach(item => {
        item.classList.remove('selected');
    });
    document.querySelector(`[data-index="${index}"]`).classList.add('selected');
    
    // Show detail view
    showDetailView(shop, index);
    
    // Pan map to marker and open popup
    if (markers[index]) {
        map.setView([parseFloat(shop.lat), parseFloat(shop.lng)], 15);
        markers[index].openPopup();
    }
    
    currentlySelected = index;
}

// Show detailed view in sidebar
function showDetailView(shop, index) {
    const detailView = document.getElementById('detail-view');
    detailView.className = 'detail-view active';
    
    detailView.innerHTML = `
        <h3>${shop.name}</h3>
        <p><strong>Address:</strong> ${shop.address}</p>
        <p><strong>Phone:</strong> ${shop.phone}</p>
        <p><strong>Rating:</strong> <span class="rating">★ ${shop.rating}</span></p>
        <p><strong>Specialty:</strong> ${shop.specialty}</p>
        <p><strong>Hours:</strong> ${shop.hours}</p>
        <a href="${shop.yelp_url}" target="_blank" class="yelp-link">View on Yelp</a>
    `;
}

// Initialize the map
function initMap() {
    // Center map on Los Angeles
    map = L.map('map').setView([34.0522, -118.2437], 11);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add coffee shop markers
    addCoffeeShopMarkers();
}

// Add markers to map
function addCoffeeShopMarkers() {
    coffeeShops.forEach((shop, index) => {
        // Create custom coffee icon
        const coffeeIcon = L.divIcon({
            html: '☕',
            iconSize: [30, 30],
            className: 'coffee-marker',
            iconAnchor: [15, 15]
        });

        // Create marker
        const marker = L.marker([parseFloat(shop.lat), parseFloat(shop.lng)], { icon: coffeeIcon })
            .addTo(map);

        // Create popup content
        const popupContent = `
            <div class="coffee-popup">
                <h3>${shop.name}</h3>
                <p><strong>Address:</strong> ${shop.address}</p>
                <p><strong>Phone:</strong> ${shop.phone}</p>
                <p><strong>Rating:</strong> ★ ${shop.rating}</p>
                <p><strong>Specialty:</strong> ${shop.specialty}</p>
                <p><strong>Hours:</strong> ${shop.hours}</p>
                <a href="${shop.yelp_url}" target="_blank" class="yelp-link">View on Yelp</a>
            </div>
        `;

        marker.bindPopup(popupContent);
        
        // Add click event to select in sidebar
        marker.on('click', () => {
            selectCoffeeShop(index);
        });
        
        markers.push(marker);
    });
}

// Add custom CSS for coffee markers
const style = document.createElement('style');
style.textContent = `
    .coffee-marker {
        background: none !important;
        border: none !important;
        font-size: 24px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    .coffee-marker:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadCoffeeShops);