let prayerTimes = {};

// Function to fetch prayer times from Aladhan API based on geolocation or manual input
async function fetchPrayerTimes() {
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;

    if (navigator.geolocation) {
        // Use device geolocation for accurate coordinates
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await getPrayerTimesByCoords(latitude, longitude);
        }, async (error) => {
            // Fallback to manual city and country input if geolocation fails
            if (city && country) {
                await getPrayerTimesByCity(city, country);
            } else {
                alert("Geolocation failed and city/country not provided. Please enable location or enter manually.");
            }
        });
    } else if (city && country) {
        // Geolocation not supported, use manual input
        await getPrayerTimesByCity(city, country);
    } else {
        alert("Please enable location or enter city and country.");
    }
}

// Function to fetch prayer times by coordinates
async function getPrayerTimesByCoords(latitude, longitude) {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
    await fetchPrayerData(apiUrl);
}

// Function to fetch prayer times by city and country
async function getPrayerTimesByCity(city, country) {
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;
    await fetchPrayerData(apiUrl);
}

// General function to handle API call and update UI
async function fetchPrayerData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.code === 200) {
            prayerTimes = data.data.timings;
            displayPrayerTimes();
            checkPrayerTimes();
        } else {
            alert("Could not fetch prayer times. Please check your input.");
        }
    } catch (error) {
        alert("An error occurred while fetching prayer times. Please try again.");
    }
}

// Function to display the prayer times
function displayPrayerTimes() {
    const prayerListElement = document.getElementById("prayerList");
    prayerListElement.innerHTML = "";

    Object.entries(prayerTimes).forEach(([prayer, time]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${prayer}: ${time}`;
        prayerListElement.appendChild(listItem);
    });
}

// Function to check if it's time for any of the prayers
function checkPrayerTimes() {
    setInterval(() => {
        const currentTime = new Date();
        const currentHours = String(currentTime.getHours()).padStart(2, '0');
        const currentMinutes = String(currentTime.getMinutes()).padStart(2, '0');
        const formattedCurrentTime = `${currentHours}:${currentMinutes}`;

        Object.entries(prayerTimes).forEach(([prayer, time]) => {
            if (time === formattedCurrentTime) {
                document.getElementById("reminderMessage").textContent = `It's time for ${prayer}!`;
            }
        });
    }, 60000); // Check every minute
}
