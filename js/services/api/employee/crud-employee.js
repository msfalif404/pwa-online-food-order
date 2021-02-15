import {BACKEND_URL, fetchAPI} from "../../../helpers/api-helper.js";

const getAllProductEmployee = async (jwt) => {
    const ENDPOINT = `${BACKEND_URL}/kasir/order`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const getAllCourrierEmployee = async (jwt) => {
    const ENDPOINT = `${BACKEND_URL}kurir`
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const putProductOrderEmployee = async (code, status, courrierId, jwt) => {
    const ENDPOINT = `${BACKEND_URL}kasir/order/${code}`
    let bodyValue = ""
    if(courrierId == null){
        bodyValue = JSON.stringify({
            status: status,
        });
    }
    else {
        bodyValue = JSON.stringify({
            status: status,
            kurirID: courrierId
        });
    }
    return fetchAPI(ENDPOINT, bodyValue, 'PUT', jwt);
}

export {getAllProductEmployee, getAllCourrierEmployee, putProductOrderEmployee};