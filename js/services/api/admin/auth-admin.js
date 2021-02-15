import {BACKEND_URL, fetchAPI} from "../../../helpers/api-helper.js";

const loginAdminAPI = async (username, password) => {
    const ENDPOINT = `${BACKEND_URL}admin/login`;
    const bodyValue = JSON.stringify({
        username: username,
        pasw: password
    });
    return fetchAPI(ENDPOINT, bodyValue, 'POST');
}

export {loginAdminAPI};