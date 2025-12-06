document.addEventListener('DOMContentLoaded', () => {
    const lookupBtn = document.getElementById('lookup');
    const countryInput = document.getElementById('country-input');
    const resultDiv = document.getElementById('result');

    lookupBtn.addEventListener('click', () => {
        const country = countryInput.value.trim();

        if (country === "") {
            resultDiv.innerHTML = "<p>Please enter a country name.</p>";
            return;
        }

        // Create AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `world.php?country=${encodeURIComponent(country)}`, true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) { // Request finished
                if (xhr.status === 200) {
                    // Insert the returned HTML table directly
                    resultDiv.innerHTML = xhr.responseText;
                } else {
                    resultDiv.innerHTML = `<p>Error fetching data. Status: ${xhr.status}</p>`;
                }
            }
        };

        xhr.send();
    });
});
