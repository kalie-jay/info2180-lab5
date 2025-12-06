<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "<p>Database connection failed: " . $e->getMessage() . "</p>";
    exit();
}

// Get query parameters
$country = isset($_GET['country']) ? trim($_GET['country']) : '';
$lookup = isset($_GET['lookup']) ? $_GET['lookup'] : '';

// If lookup=cities, return cities for the country
if ($lookup === 'cities') {
    if ($country === '') {
        echo "<p>Please provide a country name.</p>";
        exit();
    }

    $stmt = $conn->prepare("
        SELECT cities.name AS city_name, cities.district, cities.population
        FROM cities
        JOIN countries ON cities.country_code = countries.code
        WHERE countries.name LIKE :country
    ");
    $stmt->execute(['country' => "%$country%"]);

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output HTML table for cities
    echo '<table border="1" cellpadding="5" cellspacing="0">';
    echo '<thead><tr><th>Name</th><th>District</th><th>Population</th></tr></thead><tbody>';
    if (count($results) > 0) {
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . htmlspecialchars($row['city_name']) . '</td>';
            echo '<td>' . htmlspecialchars($row['district']) . '</td>';
            echo '<td>' . htmlspecialchars($row['population']) . '</td>';
            echo '</tr>';
        }
    } else {
        echo '<tr><td colspan="3">No cities found.</td></tr>';
    }
    echo '</tbody></table>';

} else {
    // Regular country lookup
    if ($country !== '') {
        $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
        $stmt->execute(['country' => "%$country%"]);
    } else {
        $stmt = $conn->query("SELECT * FROM countries");
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output HTML table for countries
    echo '<table border="1" cellpadding="5" cellspacing="0">';
    echo '<thead><tr><th>Country Name</th><th>Continent</th><th>Independence Year</th><th>Head of State</th></tr></thead><tbody>';
    if (count($results) > 0) {
        foreach ($results as $row) {
            echo '<tr>';
            echo '<td>' . htmlspecialchars($row['name']) . '</td>';
            echo '<td>' . htmlspecialchars($row['continent']) . '</td>';
            echo '<td>' . htmlspecialchars($row['independence_year']) . '</td>';
            echo '<td>' . htmlspecialchars($row['head_of_state']) . '</td>';
            echo '</tr>';
        }
    } else {
        echo '<tr><td colspan="4">No results found.</td></tr>';
    }
    echo '</tbody></table>';
}
?>
