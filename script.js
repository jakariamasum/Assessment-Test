function submitForm() {
    const carType = document.getElementById('carType').value.toLowerCase();
    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const year = parseInt(document.getElementById('year').value);
    let carData = { carType, name, model, year };

    if (carType === 'electric') {
        const batteryCapacity = parseFloat(document.getElementById('batteryCapacity').value);
        carData = { ...carData, batteryCapacity, fuelEfficiency: 'N/A' };
    } else if (carType === 'gas') {
        const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
        carData = { ...carData, fuelEfficiency, batteryCapacity: 'N/A' };
    }

    // Make an HTTP request to the server to store the data
    fetch('https://serve-js.vercel.app/submitForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(data);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
function toggleAttributes() {
    const carType = document.getElementById('carType').value;
    const electricAttributes = document.getElementById('electricAttributes');
    const gasAttributes = document.getElementById('gasAttributes');

    if (carType === 'electric') {
        electricAttributes.style.display = 'block';
        gasAttributes.style.display = 'none';
    } else if (carType === 'gas') {
        electricAttributes.style.display = 'none';
        gasAttributes.style.display = 'block';
    }
}

function displayCarData() {
    fetch('https://serve-js.vercel.app/getCarData')
        .then(response => response.json())
        .then(data => {
            $('#carDataTable').DataTable({
                data: data,
                columns: [
                    { data: 'carType' },
                    { data: 'name' },
                    { data: 'model' },
                    { data: 'year' },
                    { data: 'batteryCapacity' },
                    { data: 'fuelEfficiency' },
                ]
            });
        })
        .catch(error => console.error('Error fetching car data:', error));
}

// Call the function when the document is ready
$(document).ready(function () {
    displayCarData();
});