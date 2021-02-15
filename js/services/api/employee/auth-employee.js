import {BACKEND_URL, fetchAPI} from "../../../helpers/api-helper.js";

const loginEmployeeAPI = async (username, password) => {
    const ENDPOINT = `${BACKEND_URL}employee/login`;
    const bodyValue = JSON.stringify({
        username: username,
        password: password
    });
    return fetchAPI(ENDPOINT, bodyValue, 'POST');
}

export {loginEmployeeAPI};