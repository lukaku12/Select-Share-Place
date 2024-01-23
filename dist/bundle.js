var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("app", ["require", "exports", "axios"], function (require, exports, axios_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    axios_1 = __importDefault(axios_1);
    const form = document.querySelector('form');
    const addressInput = document.getElementById('address');
    const API_KEY = "AIzaSyA5afr5YylcKIc1rfUDM6CpNHz0uVFolMU";
    function GET_GOOGLE_API_URL(address, apiKay) {
        const fixedAddress = encodeURI(address);
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${fixedAddress}&key=${apiKay}`;
    }
    function searchAddressHandler(event) {
        event.preventDefault();
        const enteredAddress = addressInput.value;
        const apiUrl = GET_GOOGLE_API_URL(enteredAddress, API_KEY);
        axios_1.default.get(apiUrl)
            .then(r => {
            console.log(r);
        })
            .catch(e => {
            console.log(e);
        });
    }
    form.addEventListener('submit', searchAddressHandler);
});
//# sourceMappingURL=bundle.js.map