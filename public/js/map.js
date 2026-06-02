const map = L.map("map").setView([22.5726, 88.3639], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
}).addTo(map);

L.marker([22.5726, 88.3639])
    .addTo(map)
    .bindPopup("excat location will be provide after the bookings")
    .openPopup();