// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Step i) Listen for clicks on the button with id "lookup"
    const lookupBtn = document.getElementById('lookup');
    const resultDiv = document.getElementById('result');
    const countryInput = document.getElementById('country-input'); // Assuming you have an input field

    lookupBtn.addEventListener('click', () => {
        const country = countryInput.value.trim(); // Get the country name from input

        if (country === "") {
            resultDiv.innerHTML = "<p>Please enter a country name.</p>";
            return;
        }

        // Step ii) Create an AJAX request to world.php
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `world.php?country=${encodeURIComponent(country)}`, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) { // Request completed
                if (xhr.status === 200) { // HTTP OK
                    try {
                        // Step iii) Parse JSON response
                        const data = JSON.parse(xhr.responseText);

                        if (data.length === 0) {
                            resultDiv.innerHTML = "<p>No results found.</p>";
                            return;
                        }

                        // Display the results
                        let html = "<ul>";
                        data.forEach(item => {
                            html += `<li>${item.name} - ${item.continent} - Population: ${item.population}</li>`;
                        });
                        html += "</ul>";

                        resultDiv.innerHTML = html;

                    } catch (e) {
                        resultDiv.innerHTML = "<p>Error parsing server response.</p>";
                        console.error(e);
                    }
                } else {
                    resultDiv.innerHTML = `<p>Error fetching data. Status: ${xhr.status}</p>`;
                }
            }
        };

        xhr.send(); // Send the request
    });
});
