import {getAllProductAdmin, addProductAdmin, getAllEmployeeAdmin, addEmployeeAdmin, getAllOrderAdmin} from "../services/api/admin/crud-admin.js";
import {logoutATAPI} from "../services/api/logout-token.js";
import {showAllProduct, showAllEmployee, showAllOrder} from "../helpers/crud-admin-helper.js";
import {refreshTokenAPI} from "../services/api/refresh-token.js";
import {isTokenExpired} from "../helpers/token-expired-helper.js";
import {isTokenNull} from "../helpers/token-null-helper.js";

const TOKEN = JSON.parse(localStorage.getItem("TOKEN")) ?? null;
isTokenNull(TOKEN, 'login.html');
if(TOKEN != null){
    const {data: {access_token, refresh_token}} = TOKEN;

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
                    if(page == "all-products"){
                        document.getElementById("all-products").classList.replace("text-secondary", "text-primary");
                     }
                    else if(page == "add-product"){
                        document.getElementById("add-product").classList.replace("text-secondary", "text-primary");
                    }
                    else if(page == "all-employee"){
                        document.getElementById("all-employee").classList.replace("text-secondary", "text-primary");
                    }
                    else if(page == "add-employee"){
                        document.getElementById("add-employee").classList.replace("text-secondary", "text-primary");
                    }
                    else if(page == "product-orders"){
                        document.getElementById("product-orders").classList.replace("text-secondary", "text-primary");
                    }
                    document.querySelectorAll(".sidebar a").forEach(element => {
                        element.addEventListener("click", function(event){
                            let elementAttributes = event.target.getAttribute("href").substr(1);
                            if(elementAttributes == "all-products"){
                                document.getElementById("add-product").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-products").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "add-product"){
                                document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-product").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "all-employee"){
                                document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-product").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "add-employee"){
                                document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-product").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-employee").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "product-orders"){
                                document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-product").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("add-employee").classList.replace("text-primary", "text-secondary");
                                document.getElementById("product-orders").classList.replace("text-secondary", "text-primary");
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
                                localStorage.removeItem("TOKEN");
                                location.href = "login.html";
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
                    if(page == "all-products"){
                        document.getElementById("all-products-mobile").classList.replace("text-secondary", "text-primary");
                     }
                    else if(page == "all-employee"){
                        document.getElementById("all-employee-mobile").classList.replace("text-secondary", "text-primary");
                    }
                    document.querySelectorAll(".bottom-navbar a").forEach(element => {
                        element.addEventListener("click", function(event){
                            let elementAttributes = event.target.getAttribute("href").substr(1);
                            if(elementAttributes == "all-products"){
                                document.getElementById("all-employee-mobile").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-products-mobile").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "all-employee"){
                                document.getElementById("all-products-mobile").classList.replace("text-primary", "text-secondary");
                                document.getElementById("all-employee-mobile").classList.replace("text-secondary", "text-primary");
                            }
                            else if(elementAttributes == "logout"){
                                logoutATAPI(access_token).then(response => {
                                    if(response.msg == "Successfully logged out"){
                                        localStorage.removeItem("TOKEN");
                                        location.href = "../index.html";
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
                    if(page == "all-products"){
                        document.getElementById("product-pages-container").innerHTML = response;
                        getAllProductAdmin(access_token)
                            .then(response => {
                                if(response.msg =="token expired"){
                                    refreshTokenAPI(access_token)
                                        .then(response => isTokenExpired(response, "TOKEN", "./login.html"));
                                }
                                else if(response.msg == "Token has been revoked"){
                                    localStorage.removeItem("TOKEN");
                                    location.href = "./login.html";
                                }
                                if(sessionStorage.getItem("message")){
                                    const alertContainer = document.getElementById("alert-container");
                                    alertContainer.classList.add("alert","alert-success","alert-dismissible","fade","show");
                                    alertContainer.innerHTML = `${sessionStorage.getItem("message")} <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>`;
                                    sessionStorage.removeItem("message");
                                }
                                showAllProduct(response);
                                const addProductButton = document.getElementById("add-product-button");
                                addProductButton.addEventListener("click", function(event){
                                    let elementAttributes = event.target.getAttribute("href").substr(1);
                                    page = elementAttributes;
                                    if(elementAttributes == "add-product"){
                                        document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("add-employee").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("add-product").classList.replace("text-secondary", "text-primary");
                                    }
                                    loadPageContent(page);
                                });
                            });
                    }
                    else if(page == "add-product"){
                        document.getElementById("product-pages-container").innerHTML = response;
                        const productNameInput = document.getElementById("product-name");
                        const productDescriptionInput = document.getElementById("product-description");
                        const productPriceInput = document.getElementById("product-price");
                        const productCategoryInput = document.getElementById("product-category");
                        const productVisibilityInput = document.getElementById("product-visibility");
                        const productImageInput = document.getElementById("product-image");
                        let pathBase64 = null;
                        productImageInput.addEventListener("change", function(event){
                            const previewTitleContainer = document.getElementById("preview-title");
                            const previewContainer = document.getElementById("preview");
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.addEventListener("load", function(){
                                pathBase64 = reader.result.slice(22);
                                previewTitleContainer.innerHTML = "Preview Gambar";
                                previewContainer.src = reader.result;
                            });
                            if(file){
                                reader.readAsDataURL(file);
                            }
                        });
                        const createProductForm = document.getElementById("create-product");
                        createProductForm.addEventListener("submit", function(event){
                            event.preventDefault();
                            if(productNameInput.value && productDescriptionInput.value &&  productPriceInput.value && productCategoryInput.value && productVisibilityInput.value && pathBase64 !== null){
                                createProductForm[6].value = "Dibuat...";
                                addProductAdmin(productNameInput.value, productDescriptionInput.value, productPriceInput.value, productCategoryInput.value, productVisibilityInput.value, pathBase64, access_token)
                                .then(response => {
                                    if(response.msg == "POST success"){
                                        const productNameInput = document.getElementById("product-name").value;
                                        sessionStorage.setItem("message", `Produk ${productNameInput} berhasil ditambahkan`);
                                        location.href = "./dashboard.html";
                                    }
                                    else if(response.msg == "token expired"){
                                        refreshTokenAPI(access_token)
                                            .then(response => isTokenExpired(response, access_token, "./login.html"));
                                    }
                                    else if(response.msg == "Token has been revoked"){
                                        localStorage.removeItem("TOKEN");
                                        location.href = "./login.html";
                                    }
                                });
                            }
                            else {
                                const productErrorContainer = document.getElementById("product-error-container");
                                let error = [];
                                if(productNameInput.value == ""){
                                    error.push("Silahkan isi kolom nama");
                                }
                                if(productPriceInput.value == ""){
                                    error.push("Silahkan isi kolom harga")
                                }
                                if(productCategoryInput.value == ""){
                                    error.push("Silahkan isi kolom kategori");
                                }
                                if(productStockInput.value == ""){
                                    error.push("Silahkan isi kolom stok");
                                }
                                if(productVisibilityInput.value == ""){
                                    error.push("Silahkan isi pilih tampilkan atau sembunyikan produk");
                                }
                                if(pathBase64 == undefined || pathBase64 == null || pathBase64 == ""){
                                    error.push("Silahkan pilih gambar produk");
                                }
                                let errorRaw = "";
                                error.forEach(element => {
                                    errorRaw += `<li>${element}</li>`;
                                });
                                productErrorContainer.innerHTML = `<div class="alert alert-danger">
                                                                    <p>Silahkan isi semua kolom !</p>
                                                                    <ul>
                                                                        ${errorRaw}
                                                                    </ul>
                                                                </div>`;
                            }
                        });
                    }
                    else if(page == "all-employee"){
                        document.getElementById("product-pages-container").innerHTML = response;
                        getAllEmployeeAdmin(access_token)
                            .then(response => {
                                if(response.msg =="token expired"){
                                    refreshTokenAPI(access_token)
                                        .then(response => isTokenExpired(response, "TOKEN", "./login.html"));
                                }
                                else if(response.msg == "Token has been revoked"){
                                    localStorage.removeItem("TOKEN");
                                    location.href = "./login.html";
                                }
                                if(sessionStorage.getItem("message")){
                                    const alertContainer = document.getElementById("alert-container");
                                    alertContainer.classList.add("alert");
                                    alertContainer.classList.add("alert-success");
                                    alertContainer.classList.add("alert-dismissible");
                                    alertContainer.classList.add("fade");
                                    alertContainer.classList.add("show");
                                    alertContainer.innerHTML = `${sessionStorage.getItem("message")} <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>`;
                                    sessionStorage.removeItem("message");
                                }
                                showAllEmployee(response);
                                const addEmployeeButton = document.getElementById("add-employee-button");
                                addEmployeeButton.addEventListener("click", function(event){
                                    let elementAttributes = event.target.getAttribute("href").substr(1);
                                    page = elementAttributes;
                                    if(elementAttributes == "add-employee"){
                                        document.getElementById("all-products").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("add-product").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("all-employee").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("product-orders").classList.replace("text-primary", "text-secondary");
                                        document.getElementById("add-employee").classList.replace("text-secondary", "text-primary");
                                    }
                                    loadPageContent(page);
                                });
                            });
                    }
                    else if(page == "add-employee"){
                        document.getElementById("product-pages-container").innerHTML = response;
                        const alertContainer = document.getElementById("alert-container");
                        const employeeNameInput = document.getElementById("employee-name");
                        const pobInput = document.getElementById("pob");
                        const employeeAddressInput = document.getElementById("employee-address");
                        const employeeCategoryInput = document.getElementById("employee-category");
                        const employeePhoneInput = document.getElementById("employee-phone-number");
                        const employeeEmailInput = document.getElementById("employee-email");
                        const createEmployeeForm = document.getElementById("create-employee");
                        createEmployeeForm.addEventListener("submit", function(event){
                            event.preventDefault();
                            const daysInput = document.getElementById("days");
                            const monthsInput = document.getElementById("months");
                            const yearsInput = document.getElementById("years");
                            const birthdayInput = `${yearsInput.value}-${monthsInput.value}-${daysInput.value}`;
                            const genderInput = document.getElementById("male").checked ? document.getElementById("male").value : document.getElementById("female").checked ? document.getElementById("female").value : null;
                            createEmployeeForm[11].value = "Dibuat...";
                            addEmployeeAdmin(employeeCategoryInput.value, employeeNameInput.value, genderInput, pobInput.value, birthdayInput, employeePhoneInput.value, employeeEmailInput.value, employeeAddressInput.value, access_token)
                                .then(response => {
                                    if(response.msg == "POST success"){
                                        const employeeNameInput = document.getElementById("employee-name").value;
                                        sessionStorage.setItem("message", `Produk ${employeeNameInput} berhasil ditambahkan`);
                                        location.href = "./dashboard.html";
                                    }
                                    else if(response.msg == "token expired"){
                                        refreshTokenAPI(access_token)
                                            .then(response => isTokenExpired(response, access_token, "./login.html"));
                                    }
                                    else if(response.msg == "Already account email"){
                                        registerForm[11].value = "Create Employee";
                                        alertContainer.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
                                        alertContainer.innerHTML = `Pembuatan pegawai gagal, email sudah terpakai ! <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>`;
                                    }
                                    else if(response.msg == "Already phone number"){
                                        registerForm[11].value = "Create Employee";
                                        alertContainer.classList.add("alert", "alert-danger", "alert-dismissible", "fade", "show");
                                        alertContainer.innerHTML = `Pembuatan pegawai gagal, nomor handphone sudah terpakai ! <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>`;
                                    }
                                    else if(response.msg == "Token has been revoked"){
                                        localStorage.removeItem("TOKEN");
                                        location.href = "./login.html";
                                    }
                                });
                        });
                    }
                    else if(page == "product-orders"){
                        document.getElementById("product-pages-container").innerHTML = response;
                        getAllOrderAdmin(access_token).then(response => {
                            if(response.msg =="token expired"){
                                refreshTokenAPI(access_token)
                                    .then(response => isTokenExpired(response, "TOKEN", "./login.html"));
                            }
                            else if(response.msg == "Token has been revoked"){
                                localStorage.removeItem("TOKEN");
                                location.href = "./login.html";
                            }
                            else if(response.msg == "success"){
                               showAllOrder(response);
                                const monthInput = document.getElementById("month");
                                const yearInput = document.getElementById("year");
                                const exportForm = document.getElementById("export-form");
                                const modalFooterContainer = document.getElementById("modal-footer");
                                exportForm.addEventListener("submit", function(event){
                                    event.preventDefault();
                                    exportForm[2].innerHTML += "...";
                                    fetch(`https://rest-orderapp.herokuapp.com/admin/order/export?month=${monthInput.value}&year=${yearInput.value}`, {
                                    headers: {
                                        'Authorization': `Bearer ${access_token}`
                                    }
                                    }).then(response => response.blob()).then(responseData => {
                                        if(response.msg =="token expired"){
                                            refreshTokenAPI(access_token)
                                                .then(response => isTokenExpired(response, "TOKEN", "./login.html"));
                                        }
                                        else if(response.msg == "Token has been revoked"){
                                            localStorage.removeItem("TOKEN");
                                            location.href = "./login.html";
                                        }
                                        exportForm[2].innerHTML = "Export";
                                        const url = URL.createObjectURL(responseData);
                                        if(document.getElementById("export-csv") == null){
                                            modalFooterContainer.innerHTML += `<a href="${url}" id="export-csv" class="btn btn-success btn-block" download="Orders Report ${monthInput.value == "null" ? "" : monthInput.value}/${yearInput.value}">Export To CSV</a>`;
                                        }
                                        document.getElementById("export-csv").addEventListener("click", function(){
                                            setInterval(location.reload(), 3000);
                                        });
                                    });
                                });
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
    page === "" ? page = "all-products" : page = page;
    loadPageContent(page);
    loadSidebarContent();
    loadBottomNavbarContent();
}