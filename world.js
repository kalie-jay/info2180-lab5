document.addEventListener('DOMContentLoaded', () => {
    const countryInput = document.getElementById('country-input');
    const resultDiv = document.getElementById('result');
    const lookupBtn = document.getElementById('lookup');
    const lookupCitiesBtn = document.getElementById('lookup-cities');

    // Lookup country
    lookupBtn.addEventListener('click', () => {
        const country = countryInput.value.trim();
        if (country === "") {
            resultDiv.innerHTML = "<p>Please enter a country name.</p>";
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `world.php?country=${encodeURIComponent(country)}`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resultDiv.innerHTML = xhr.responseText; // Country table HTML
                } else {
                    resultDiv.innerHTML = `<p>Error fetching data. Status: ${xhr.status}</p>`;
                }
            }
        };
        xhr.send();
    });

    // Lookup cities
    lookupCitiesBtn.addEventListener('click', () => {
        const country = countryInput.value.trim();
        if (country === "") {
            resultDiv.innerHTML = "<p>Please enter a country name.</p>";
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `world.php?country=${encodeURIComponent(country)}&lookup=cities`, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resultDiv.innerHTML = xhr.responseText; // Cities table HTML
                } else {
                    resultDiv.innerHTML = `<p>Error fetching data. Status: ${xhr.status}</p>`;
                }
            }
        };
        xhr.send();
    });
});
