import {BACKEND_URL, fetchAPI} from "../../../helpers/api-helper.js";

const getAllProductCourrier = async (jwt) => {
    const ENDPOINT = `${BACKEND_URL}kurir/order`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const putProductOrderCourrier = async (code, status, confirmation, jwt) => {
    const ENDPOINT = `${BACKEND_URL}kurir/order/${code}`;
    const bodyValue = JSON.stringify({
        status: status,
        confirm: confirmation
    });
    return fetchAPI(ENDPOINT, bodyValue, 'PUT', jwt);
}

export {getAllProductCourrier, putProductOrderCourrier};