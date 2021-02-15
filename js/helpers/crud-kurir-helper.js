import {getAllProductCourrier} from "../services/api/employee/order-courrier.js";
import {logoutATAPI} from "../services/api/logout-token.js";
import {refreshTokenAPI} from "../services/api/refresh-token.js";
import {isTokenExpired} from "./token-expired-helper.js";
import {isTokenNull} from "./token-null-helper.js";
import {paginator} from "../helpers/pagination-helper.js";

const EMPLOYEE_TOKEN = JSON.parse(localStorage.getItem("EMPLOYEE_TOKEN")) ?? null;
isTokenNull(EMPLOYEE_TOKEN, '../login.html');

if(EMPLOYEE_TOKEN != null){
    const {access_token, employee: {name}} = EMPLOYEE_TOKEN;

    getAllProductCourrier(access_token).then(response => {
        if(response.msg =="token expired"){
            refreshTokenAPI(access_token)
                .then(response => isTokenExpired(response, "EMPLOYEE_TOKEN", "../login.html"));
        }
        if(response.msg == "Token has been revoked"){
            localStorage.removeItem("EMPLOYEE_TOKEN");
            location.href = "../login.html";
        }
        else {
            const {data} = response;
            const courrierNameContainer = document.getElementById("courrier-name");
            courrierNameContainer.innerHTML += name;
            let dataOrderRaw = "";
            let paginations = paginator(data, 1, 10);
            paginations.data.forEach(element => {
                const {codeOrder, address, distance} = element;
                dataOrderRaw += `<tr>
                                    <td>${codeOrder}</td>
                                    <td>${address}</td>
                                    <td>${distance} km</td>
                                    <td><a href="order-details.html?code=${codeOrder}" class="btn btn-primary">Lihat Detail</a></td>
                                </tr>`;
            });
            const productContainer = document.getElementById("product-container");
            if(dataOrderRaw == ""){
                productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
            else {
                productContainer.innerHTML = dataOrderRaw;
            }
            
            const paginationContainer = document.getElementById("pagination-container");
            if(paginationContainer.childElementCount == 0){
                for(let i = 1; i <= paginations.total_pages; i++){
                    paginationContainer.innerHTML += `<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
                }
            }
            const paginationButton = document.querySelectorAll("#pagination-container a");
            paginationButton.forEach(element => {
                    if(element.innerHTML == paginations.page){
                        element.parentElement.classList.add("active");
                    }
                    element.addEventListener("click", function(event){
                        dataOrderRaw = "";
                        paginations = paginator(menu, event.target.innerHTML, 10);
                        paginations.data.forEach(element => {
                            const {codeOrder, address, distance} = element;
                            dataOrderRaw += `<tr>
                                                <td>${codeOrder}</td>
                                                <td>${address}</td>
                                                <td>${distance} km</td>
                                                <td><a href="order-details.html?code=${codeOrder}" class="btn btn-primary">Lihat Detail</a></td>
                                            </tr>`;
                        }); 
                        if(event.target.innerHTML == paginations.page){
                            const paginationLi = document.querySelectorAll("#pagination-container li");
                            paginationLi.forEach(element => element.classList.remove("active"));
                            event.target.parentElement.classList.add("active");
                        }
                        productContainer.innerHTML = dataOrderRaw;
                    });
            });   
        }
    });
    const logoutButton = document.getElementById("logout-button");
                            logoutButton.addEventListener("click", function(){
                                logoutButton.innerHTML += "...";
                                logoutATAPI(access_token).then(response => {
                                    if(response.msg == "Successfully logged out"){
                                        localStorage.removeItem("EMPLOYEE_TOKEN");
                                        sessionStorage.removeItem("message");
                                        location.href = "../login.html";
                                    }
                                });
                            });
}