import {getAllProductCourrier} from "../services/api/employee/order-courrier.js";
import {logoutATAPI} from "../services/api/logout-token.js";
import {refreshTokenAPI} from "../services/api/refresh-token.js";
import {isTokenExpired} from "./token-expired-helper.js";
import {isTokenNull} from "./token-null-helper.js";
import {paginator} from "../helpers/pagination-helper.js";

const EMPLOYEE_TOKEN = JSON.parse(localStorage.getItem("EMPLOYEE_TOKEN")) ?? null;
isTokenNull(EMPLOYEE_TOKEN, '../login.html');
if(EMPLOYEE_TOKEN != null){
    const {access_token} = EMPLOYEE_TOKEN;

    const fetchContent = async (url) => {
        try {
            const response = await fetch(url);
            const result = await response.text();
            return result;
        }
        catch(error){
            console.log(error);
        }
    }

    async function loadSidebarContent(){
        try {
            fetchContent("sidebar.html")
                .then(response => {
                    document.getElementById("sidebar-container").innerHTML = response;
                    if(page == "ondelivery-products"){
                        document.getElementById("ondelivery-products").classList.replace("text-secondary", "text-primary");
                    }
                    else if(page == "delivered-products"){
                        document.getElementById("delivered-products").classList.replace("text-secondary", "text-primary");
                    }
                    document.querySelectorAll(".sidebar a").forEach(element => {
                        element.addEventListener("click", function(event){
                            let elementAttributes = event.target.getAttribute("href").substr(1);
                            if(elementAttributes == "ondelivery-products"){
                                document.getElementById("delivered-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("ondelivery-products").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "delivered-products"){
                                document.getElementById("ondelivery-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("delivered-products").classList.replace("text-secondary", "text-primary");
                            }
                            page = event.target.getAttribute("href").substr(1);
                            loadPageContent(page);
                        });
                    });
                    const logoutButton = document.getElementById("logout-button");
                    logoutButton.addEventListener("click", function(){
                        logoutButton.innerHTML += "...";
                        logoutATAPI(access_token).then(response => {
                            if(response.msg == "Successfully logged out"){
                                localStorage.removeItem("EMPLOYEE_TOKEN");
                                location.href = "../login.html";
                            }
                        });
                    });
                });
        }
        catch(error){
            console.log(error);
        }
    }
    
    async function loadBottomNavbarContent(){
        try {
            fetchContent("bottom-navbar.html")
                .then(response => {
                    document.getElementById("bottom-navbar-container").innerHTML = response;
                    if(page == "ondelivery-products"){
                        document.getElementById("ondelivery-products").classList.replace("text-secondary", "text-primary");
                    }
                    else if(page == "delivered-products"){
                        document.getElementById("delivered-products").classList.replace("text-secondary", "text-primary");
                    }
                    document.querySelectorAll(".bottom-navbar a").forEach(element => {
                        element.addEventListener("click", function(event){
                            let elementAttributes = event.target.getAttribute("href").substr(1);
                            if(elementAttributes == "ondelivery-products"){
                                document.getElementById("delivered-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("ondelivery-products").classList.replace("text-secondary","text-primary");
                            }
                            else if(elementAttributes == "delivered-products"){
                                document.getElementById("ondelivery-products").classList.replace("text-primary","text-secondary");
                                document.getElementById("delivered-products").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "logout"){
                                logoutATAPI(access_token).then(response => {
                                    if(response.msg == "Successfully logged out"){
                                        localStorage.removeItem("TOKEN");
                                        location.href = "../login.html";
                                    }
                                });
                            }
                            page = elementAttributes;
                            loadPageContent(page);
                        });
                    });
                });
        }
        catch(error){
            console.log(error);
        }
    }
    
    async function loadPageContent(page){
        try {
            fetchContent(`pages/${page}-page.html`)
                .then(response => {
                    if(page == "ondelivery-products"){
                        document.getElementById("product-pages-container").innerHTML = response;
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
                                let {data} = response;
                                data = data.filter(element => {return element.status == "dikirim"});
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

                                const alertContainer = document.getElementById("alert-container");
                                if(sessionStorage.getItem("message")){
                                    alertContainer.innerHTML = sessionStorage.getItem("message");
                                    alertContainer.classList.add("alert","alert-success","alert-dismissible","fade","show");
                                }
                            }
                        });
                    }
                    else if(page == "delivered-products"){
                        document.getElementById("product-pages-container").innerHTML = response;
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
                                let {data} = response;
                                data = data.filter(element => {return element.status == "diterima"});
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
                                const alertContainer = document.getElementById("alert-container");
                                if(sessionStorage.getItem("message")){
                                    alertContainer.innerHTML = sessionStorage.getItem("message");
                                    alertContainer.classList.add("alert","alert-success","alert-dismissible","fade","show");
                                }
                            }
                        });
                    }
                });
        }
        catch(error){
            console.log(error);
        }
    }

    let page = window.location.hash.substr(1);
    page === "" ? page = "ondelivery-products" : page = page;
    loadPageContent(page);
    loadSidebarContent();
    loadBottomNavbarContent();
}