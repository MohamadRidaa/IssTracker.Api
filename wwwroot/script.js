
const map = L.map("map").setView([0, 0], 2);

// Add the world map imagery.

L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 19,
        attribution: "Tiles &copy; Esri — Esri, HERE, Garmin, USGS, OpenStreetMap contributors, and GIS User Community"
    }
).addTo(map);

let issMarker = null;



async function getISSPosition() {
    try {
        const response = await fetch(
            "https://api.wheretheiss.at/v1/satellites/25544"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        const latitude = data.latitude;
        const longitude = data.longitude;
        
        const altitude = data.altitude;
        const speed = data.velocity;
        
        document.getElementById("altitude").textContent =
          altitude.toFixed(1) + " km";

        document.getElementById("speed").textContent =
          Math.round(speed).toLocaleString("en-US") + " km/h";


        
        const popupContent = `
           <strong>International Space Station</strong><br>
         Latitude: ${latitude.toFixed(2)}°<br>
         Longitude: ${longitude.toFixed(2)}°<br>
         Altitude: ${altitude.toFixed(1)} km<br>
         Speed: ${Math.round(speed).toLocaleString("en-US")} km/h
                        `;

         if (issMarker === null) {
           issMarker = L.marker([latitude, longitude]).addTo(map);

           issMarker.bindPopup(popupContent);

           map.setView([latitude, longitude], 4);
        } else {
            issMarker.setLatLng([latitude, longitude]);

            issMarker.setPopupContent(popupContent);
              }

        document.getElementById("status").textContent =
            "Latitude: " + latitude.toFixed(2) +
            " | Longitude: " + longitude.toFixed(2);
          
    
         const connectionStatus =
          document.getElementById("connection-status");

          connectionStatus.textContent =
          "● Live — Receiving ISS data";

            connectionStatus.dataset.state = "connected";

         const lastUpdated =
             document.getElementById("last-updated");

         const currentTime = new Date().toLocaleTimeString("en-GB");

           lastUpdated.textContent =
              "Last successful update: " + currentTime;

    } catch (error) {
        
              const connectionStatus =
                 document.getElementById("connection-status");

              connectionStatus.textContent =
                 "● Unable to refresh ISS data";
 
              connectionStatus.dataset.state = "error";

                console.error("Error getting ISS position:", error);
                   document.getElementById("status").textContent =
                 "Unable to load ISS position.";
    }
}


getISSPosition();
setInterval(getISSPosition, 5000);
