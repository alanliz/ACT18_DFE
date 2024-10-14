// Arreglo local con los nombres completos y abreviaturas de los estados
const states = {
    'al': 'Alabama',
    'ak': 'Alaska',
    'az': 'Arizona',
    'ar': 'Arkansas',
    'ca': 'California',
    'co': 'Colorado',
    'ct': 'Connecticut',
    'de': 'Delaware',
    'fl': 'Florida',
    'ga': 'Georgia',
    'hi': 'Hawái',
    'id': 'Idaho',
    'il': 'Illinois',
    'in': 'Indiana',
    'ia': 'Iowa',
    'ks': 'Kansas',
    'ky': 'Kentucky',
    'la': 'Luisiana',
    'me': 'Maine',
    'md': 'Maryland',
    'ma': 'Massachusetts',
    'mi': 'Michigan',
    'mn': 'Minnesota',
    'ms': 'Misisipi',
    'mo': 'Misuri',
    'mt': 'Montana',
    'ne': 'Nebraska',
    'nv': 'Nevada',
    'nh': 'Nueva Hampshire',
    'nj': 'Nueva Jersey',
    'nm': 'Nuevo México',
    'ny': 'Nueva York',
    'nc': 'Carolina del Norte',
    'nd': 'Dakota del Norte',
    'oh': 'Ohio',
    'ok': 'Oklahoma',
    'or': 'Oregón',
    'pa': 'Pensilvania',
    'ri': 'Rhode Island',
    'sc': 'Carolina del Sur',
    'sd': 'Dakota del Sur',
    'tn': 'Tennessee',
    'tx': 'Texas',
    'ut': 'Utah',
    'vt': 'Vermont',
    'va': 'Virginia',
    'wa': 'Washington',
    'wv': 'Virginia Occidental',
    'wi': 'Wisconsin',
    'wy': 'Wyoming'
};

// Función para cargar el menú de selección de estados
function loadStates() {
    const stateSelect = document.getElementById('state-select');

    // Agregar cada estado como opción en el menú desplegable
    for (let abbreviation in states) {
        const option = document.createElement('option');
        option.value = abbreviation;
        option.textContent = states[abbreviation];
        stateSelect.appendChild(option);
    }
}

// Función para obtener datos de COVID-19 de la API
function fetchCovidData(stateAbbr) {
    const apiUrl = `https://api.covidtracking.com/v1/states/${stateAbbr}/current.json`;

    // Obtener el nombre completo del estado
    const stateFullName = states[stateAbbr];

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Ver los datos en la consola

            // Insertar los datos en tarjetas
            document.getElementById('covid-stats').innerHTML = `
            <h2>Datos de COVID-19 para ${stateFullName}</h2>
            <div class="card-container">
                <div class="card">
                    <h3>Casos confirmados</h3>
                    <p>${data.positive}</p>
                </div>
                <div class="card">
                    <h3>Hospitalizaciones</h3>
                    <p>${data.hospitalizedCurrently}</p>
                </div>
                <div class="card">
                    <h3>Recuperaciones</h3>
                    <p>${data.recovered || 'N/A'}</p>
                </div>
                <div class="card">
                    <h3>Muertes</h3>
                    <p>${data.death}</p>
                </div>
            </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Evento para cuando el usuario presiona el botón
document.getElementById('fetch-data-btn').addEventListener('click', function() {
    const selectedState = document.getElementById('state-select').value;
    fetchCovidData(selectedState);
});

// Cargar los estados en el menú desplegable al cargar la página
loadStates();
