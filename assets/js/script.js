// Initialize Mapbox with zoom controls
mapboxgl.accessToken = 'no access token because it require money for token';  // Replace with your Mapbox access token
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.44, 37.76], // Starting position [lng, lat]
    zoom: 10 // Initial zoom level
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Dummy boat data (you can replace this with an external JSON file or a backend API)
var boats = [
    {id: 'Boat-1', speed: 25, direction: 'NE', coordinates: [-122.44, 37.76]},
    {id: 'Boat-2', speed: 15, direction: 'SW', coordinates: [-122.46, 37.78]},
    {id: 'Boat-3', speed: 30, direction: 'NW', coordinates: [-122.48, 37.80]},
    {id: 'Boat-4', speed: 20, direction: 'SE', coordinates: [-122.42, 37.74]}
];

// Function to add boats to the map
function addBoatsToMap(boats) {
    boats.forEach(function(boat) {
        new mapboxgl.Marker()
            .setLngLat(boat.coordinates)
            .setPopup(new mapboxgl.Popup().setText(`${boat.id}, Speed: ${boat.speed} knots, Direction: ${boat.direction}`))
            .addTo(map);
    });
}

// Initial rendering of boats on the map
addBoatsToMap(boats);

// Chart.js for analytics (visualizing boat speeds)
var ctx = document.getElementById('boatChart').getContext('2d');
var boatChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: boats.map(b => b.id),
        datasets: [{
            label: 'Boat Speed (knots)',
            data: boats.map(b => b.speed),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Search functionality for boats by ID
document.getElementById('search').addEventListener('input', function(e) {
    var searchText = e.target.value.toLowerCase();
    var filteredBoats = boats.filter(boat => boat.id.toLowerCase().includes(searchText));

    // Clear all existing markers from the map
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove());

    // Add filtered boats to the map
    addBoatsToMap(filteredBoats);
});
