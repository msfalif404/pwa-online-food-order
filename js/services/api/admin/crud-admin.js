import {BACKEND_URL, fetchAPI} from "../../../helpers/api-helper.js";

const getAllProductAdmin = async (jwt) =>  {
    const ENDPOINT = `${BACKEND_URL}admin/menu`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const getIdProductAdmin = async (id, jwt) => {
    const ENDPOINT = `${BACKEND_URL}admin/menu/${id}`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const addProductAdmin = async (name, description, price, categoryId, showHide, image, jwt) => {
    const ENDPOINT = `${BACKEND_URL}admin/menu`;
    const bodyValue = JSON.stringify({
        name: name,
        description: description,
        price: price,
        categoryid: categoryId,
        "show-hide": showHide,
        image: image 
    });
    return fetchAPI(ENDPOINT, bodyValue, 'POST', jwt);
}

const updateProductAdmin = async (id, name, description, price, categoryId, showHide, image, jwt) => {
    const ENDPOINT = `${BACKEND_URL}admin/menu/${id}`;
    const bodyValue = JSON.stringify({
        name: name,
        description: description,
        price: price,
        categoryid: categoryId,
        "show-hide": showHide,
        image: image 
    });
    return fetchAPI(ENDPOINT, bodyValue, 'PUT', jwt);
}

const deleteProductAdmin = async (id, jwt) => {
    const ENDPOINT = `${BACKEND_URL}admin/menu/${id}`;
    return fetchAPI(ENDPOINT, null, 'DELETE', jwt);
}

const getAllEmployeeAdmin = async (jwt) => {
    const ENDPOINT = `${BACKEND_URL}employee`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const getIdEmployeeAdmin = async (id, jwt) => {
    const ENDPOINT = `${BACKEND_URL}employee/${id}`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

const addEmployeeAdmin = async (role, name, gender, pob, dob, phone, email, address, jwt) => {
    const ENDPOINT = `${BACKEND_URL}employee`;
    const bodyValue = JSON.stringify({
        role: role,
        name: name,
        gender: gender,
        pob: pob,
        dob: dob,
        phone: phone,
        email: email,
        address: address
    });
    console.log(bodyValue);
    return fetchAPI(ENDPOINT, bodyValue, 'POST', jwt);
}

const updateEmployeeAdmin = async (id, role, name, gender, pob, dob, phone, email, address, jwt) => {
    const ENDPOINT = `${BACKEND_URL}employee/${id}`;
    const bodyValue = JSON.stringify({
        role: role,
        name: name,
        gender: gender,
        pob: pob,
        dob: dob,
        phone: phone,
        email: email,
        address: address
    });
    return fetchAPI(ENDPOINT, bodyValue, 'PUT', jwt);
}

const deleteEmployeeAdmin = async (id, jwt) => {
    const ENDPOINT = `${BACKEND_URL}employee/${id}}`;
    return fetchAPI(ENDPOINT, bodyValue, 'DELETE', jwt);
}

const getAllOrderAdmin = async (jwt) => {
    const ENDPOINT = `${BACKEND_URL}admin/order`;
    return fetchAPI(ENDPOINT, null, 'GET', jwt);
}

export {getAllProductAdmin, getIdProductAdmin, addProductAdmin, updateProductAdmin, deleteProductAdmin, getAllEmployeeAdmin, getIdEmployeeAdmin, addEmployeeAdmin, updateEmployeeAdmin, deleteEmployeeAdmin, getAllOrderAdmin}