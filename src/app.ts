import axios from "axios";

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const API_KEY = "YOUR_KEY_HERE"

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function GET_GOOGLE_API_URL(address: string, apiKay: string) {
    const fixedAddress = encodeURI(address)
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${fixedAddress}&key=${apiKay}`;
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to Google's API!
    const apiUrl = GET_GOOGLE_API_URL(enteredAddress, API_KEY);

    axios.get<GoogleGeocodingResponse>(apiUrl)
        .then(r => {
            if (r.data.status !== 'OK') {
                throw new Error('Could not fetch Location!');
            }
            const coordinates = r.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map')!, {
                center: coordinates,
                zoom: 8,
            })
            new google.maps.Marker({position: coordinates, map: map});

            console.log(coordinates)
        })
        .catch(e => {
            alert(e.message);
            console.log(e)
        });
}

form.addEventListener('submit', searchAddressHandler);
