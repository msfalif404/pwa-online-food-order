import {paginator} from "../helpers/pagination-helper.js";
import {getAllCourrierEmployee, putProductOrderEmployee} from "../../js/services/api/employee/crud-employee.js";

function showAllPendingProducts(dataResponse){
    let {data} = dataResponse;
    let dataPendingStatusRaw = "";
    data = data.filter(element => {return element.status == "pending"});
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, dateOrder, status} = element;
        let date = new Date(dateOrder);
        let UTCTime = date.toLocaleTimeString("id-ID");
        let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
        let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
        dataPendingStatusRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${fullUTC}</td>
            <td>${status == "pending" ? "Pending" : "Information Not Found"}</td>
            <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    if(dataPendingStatusRaw == ""){
        productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
    }
    else {
        productContainer.innerHTML = dataPendingStatusRaw;
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
                dataMenuRaw = "";
                paginations = paginator(menu, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, dateOrder, status} = element;
                    dataPendingStatusRaw += 
                    `<tr>
                        <td>${codeOrder}</td>
                        <td>${dateOrder}</td>
                        <td>${status == "pending" ? "Pending" : "Information Not Found"}</td>
                        <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                    </tr>`;
                }); 
                if(event.target.innerHTML == paginations.page){
                    const paginationLi = document.querySelectorAll("#pagination-container li");
                    paginationLi.forEach(element => element.classList.remove("active"));
                    event.target.parentElement.classList.add("active");
                }
                productContainer.innerHTML = dataMenuRaw;
            });
    });

    const searchProductContainer = document.getElementById("search-product");
    let dataMenuSearch = "";
    searchProductContainer.addEventListener("keyup", function(event){
            let searchProductInput = document.getElementById("search-product").value.toLowerCase();
            let filteredData = paginations.data.filter(element => {
            return element.codeOrder.toLowerCase().includes(searchProductInput);
            });
            filteredData.forEach(element => {
                const {codeOrder, dateOrder, status} = element;
                dataMenuSearch += 
                `<tr>
                    <td>${codeOrder}</td>
                    <td>${dateOrder}</td>
                    <td>${status == "pending" ? "Pending" : "Information Not Found"}</td>
                    <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
    });
}

function showAllProcessedProducts(dataResponse){
    let {data} = dataResponse;
    let dataPendingStatusRaw = "";
    data = data.filter(element => {return element.status == "diproses"});
    
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, dateOrder, status} = element;
        let date = new Date(dateOrder);
        let UTCTime = date.toLocaleTimeString("id-ID");
        let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
        let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
        dataPendingStatusRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${fullUTC}</td>
            <td>${status == "diproses" ? "Diproses" : "Information Not Found"}</td>
            <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    if(dataPendingStatusRaw == ""){
        productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
    }
    else {
        productContainer.innerHTML = dataPendingStatusRaw;
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
                dataMenuRaw = "";
                paginations = paginator(menu, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, dateOrder, status} = element;
                    dataPendingStatusRaw += 
                    `<tr>
                        <td>${codeOrder}</td>
                        <td>${dateOrder}</td>
                        <td>${status == "diproses" ? "Diproses" : "Information Not Found"}</td>
                        <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                    </tr>`;
                }); 
                if(event.target.innerHTML == paginations.page){
                    const paginationLi = document.querySelectorAll("#pagination-container li");
                    paginationLi.forEach(element => element.classList.remove("active"));
                    event.target.parentElement.classList.add("active");
                }
                productContainer.innerHTML = dataMenuRaw;
            });
    });

    const searchProductContainer = document.getElementById("search-product");
    let dataMenuSearch = "";
    searchProductContainer.addEventListener("keyup", function(event){
            let searchProductInput = document.getElementById("search-product").value.toLowerCase();
            let filteredData = paginations.data.filter(element => {
            return element.codeOrder.toLowerCase().includes(searchProductInput);
            });
            filteredData.forEach(element => {
                const {codeOrder, dateOrder, status} = element;
                dataMenuSearch += 
                `<tr>
                    <td>${codeOrder}</td>
                    <td>${dateOrder}</td>
                    <td>${status == "diproses" ? "Diproses" : "Information Not Found"}</td>
                    <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
    });
}

function showAllOndeliveryProducts(dataResponse){
    let {data} = dataResponse;
    let dataPendingStatusRaw = "";
    data = data.filter(element => {return element.status == "dikirim"});
    
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, dateOrder, status} = element;
        let date = new Date(dateOrder);
        let UTCTime = date.toLocaleTimeString("id-ID");
        let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
        let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
        dataPendingStatusRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${fullUTC}</td>
            <td>${status == "dikirim" ? "Dikirim" : "Information Not Found"}</td>
            <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    if(dataPendingStatusRaw == ""){
        productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
    }
    else {
        productContainer.innerHTML = dataPendingStatusRaw;
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
                dataMenuRaw = "";
                paginations = paginator(menu, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, dateOrder, status} = element;
                    dataPendingStatusRaw += 
                    `<tr>
                        <td>${codeOrder}</td>
                        <td>${dateOrder}</td>
                        <td>${status == "dikirim" ? "Dikirim" : "Information Not Found"}</td>
                        <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                    </tr>`;
                }); 
                if(event.target.innerHTML == paginations.page){
                    const paginationLi = document.querySelectorAll("#pagination-container li");
                    paginationLi.forEach(element => element.classList.remove("active"));
                    event.target.parentElement.classList.add("active");
                }
                productContainer.innerHTML = dataMenuRaw;
            });
    });

    const searchProductContainer = document.getElementById("search-product");
    let dataMenuSearch = "";
    searchProductContainer.addEventListener("keyup", function(event){
            let searchProductInput = document.getElementById("search-product").value.toLowerCase();
            let filteredData = paginations.data.filter(element => {
            return element.codeOrder.toLowerCase().includes(searchProductInput);
            });
            filteredData.forEach(element => {
                const {codeOrder, dateOrder, status} = element;
                dataMenuSearch += 
                `<tr>
                    <td>${codeOrder}</td>
                    <td>${dateOrder}</td>
                    <td>${status == "dikirim" ? "Dikirim" : "Information Not Found"}</td>
                    <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
    });
}

function showAllAcceptedProducts(dataResponse){
    let {data} = dataResponse;
    let dataPendingStatusRaw = "";
    data = data.filter(element => {return element.status == "diterima"});
    
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, dateOrder, status} = element;
        let date = new Date(dateOrder);
        let UTCTime = date.toLocaleTimeString("id-ID");
        let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
        let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
        dataPendingStatusRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${fullUTC}</td>
            <td>${status == "diterima" ? "Diterima" : "Information Not Found"}</td>
            <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    if(dataPendingStatusRaw == ""){
        productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
    }
    else {
        productContainer.innerHTML = dataPendingStatusRaw;
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
                dataMenuRaw = "";
                paginations = paginator(menu, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, dateOrder, status} = element;
                    dataPendingStatusRaw += 
                    `<tr>
                        <td>${codeOrder}</td>
                        <td>${dateOrder}</td>
                        <td>${status == "diterima" ? "Diterima" : "Information Not Found"}</td>
                        <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                    </tr>`;
                }); 
                if(event.target.innerHTML == paginations.page){
                    const paginationLi = document.querySelectorAll("#pagination-container li");
                    paginationLi.forEach(element => element.classList.remove("active"));
                    event.target.parentElement.classList.add("active");
                }
                productContainer.innerHTML = dataMenuRaw;
            });
    });

    const searchProductContainer = document.getElementById("search-product");
    let dataMenuSearch = "";
    searchProductContainer.addEventListener("keyup", function(event){
            let searchProductInput = document.getElementById("search-product").value.toLowerCase();
            let filteredData = paginations.data.filter(element => {
            return element.codeOrder.toLowerCase().includes(searchProductInput);
            });
            filteredData.forEach(element => {
                const {codeOrder, dateOrder, status} = element;
                dataMenuSearch += 
                `<tr>
                    <td>${codeOrder}</td>
                    <td>${dateOrder}</td>
                    <td>${status == "diterima" ? "Diterima" : "Information Not Found"}</td>
                    <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
    });
}

function showAllCanceledProducts(dataResponse){
    let {data} = dataResponse;
    let dataPendingStatusRaw = "";
    data = data.filter(element => {return element.status == "dibatalkan"});
    
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, dateOrder, status} = element;
        let date = new Date(dateOrder);
        let UTCTime = date.toLocaleTimeString("id-ID");
        let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
        let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
        dataPendingStatusRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${fullUTC}</td>
            <td>${status == "dibatalkan" ? "Dibatalkan" : "Information Not Found"}</td>
            <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    if(dataPendingStatusRaw == ""){
        productContainer.innerHTML =   `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
    }
    else {
        productContainer.innerHTML = dataPendingStatusRaw;
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
                dataMenuRaw = "";
                paginations = paginator(menu, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, dateOrder, status} = element;
                    dataPendingStatusRaw += 
                    `<tr>
                        <td>${codeOrder}</td>
                        <td>${dateOrder}</td>
                        <td>${status == "dibatalkan" ? "Dibatalkan" : "Information Not Found"}</td>
                        <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                    </tr>`;
                }); 
                if(event.target.innerHTML == paginations.page){
                    const paginationLi = document.querySelectorAll("#pagination-container li");
                    paginationLi.forEach(element => element.classList.remove("active"));
                    event.target.parentElement.classList.add("active");
                }
                productContainer.innerHTML = dataMenuRaw;
            });
    });

    const searchProductContainer = document.getElementById("search-product");
    let dataMenuSearch = "";
    searchProductContainer.addEventListener("keyup", function(event){
            let searchProductInput = document.getElementById("search-product").value.toLowerCase();
            let filteredData = paginations.data.filter(element => {
            return element.codeOrder.toLowerCase().includes(searchProductInput);
            });
            filteredData.forEach(element => {
                const {codeOrder, dateOrder, status} = element;
                dataMenuSearch += 
                `<tr>
                    <td>${codeOrder}</td>
                    <td>${dateOrder}</td>
                    <td>${status == "dibatalkan" ? "Dibatalkan" : "Information Not Found"}</td>
                    <td><a href="product-details.html?code=${codeOrder}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
                </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
    });
}

function accordionHTML(){
    return `<div class="accordion" id="accordionExample">
    <div class="card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Data Pesanan <span class="icon-arrow-down ml-auto"></span></button></h2>
      </div>
      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
            <div class="form-group">
                <label for="code-order">Code Order</label>
                <input type="text" name="code-order" id="code-order" class="form-control" placeholder="Code Order" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="code-confirmation">Code Confirmation</label>
                <input type="text" name="code-confirmation" id="code-confirmation" class="form-control" placeholder="Code Confirmation" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="date-order">Tanggal Pesanan</label>
                <input type="text" name="date-order" id="date-order" class="form-control" placeholder="Tanggal Pemesanan" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="status">Status Pemesanan</label>
                <input type="text" name="status" id="status" class="form-control" placeholder="Status Pemesanan" readonly="readonly">
            </div>
            <label for="process-food-container">Detail Pemesanan</label>
            <div id="process-food-container"></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingTwo">
        <h2 class="mb-0">
          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Data Pemesan Makanan <span class="icon-arrow-down ml-auto"></span>
          </button>
        </h2>
      </div>
      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
        <div class="card-body">
          <div class="form-group">
              <label for="customer-name">Nama Pelanggan</label>
              <input type="text" name="customer-name" id="customer-name" class="form-control" placeholder="Nama Pelanggan" readonly="readonly">
          </div>
          <div class="form-group">
              <label for="customer-email">Email Pelanggan</label>
              <input type="text" name="customer-email" id="customer-email" class="form-control" placeholder="Email Pelanggan" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="customer-phone">Nomor Telepon Pelanggan</label>
                <input type="text" name="customer-phone" id="customer-phone" class="form-control" placeholder="Nomor Telepon Pelanggan" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="customer-address">Alamat Pelanggan</label>
                <input type="text" name="customer-address" id="customer-address" class="form-control" placeholder="Alamat Pelanggan Dengan Toko" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="range">Jarak Alamat Pelanggan Dengan Toko</label>
                <input type="text" name="range" id="range" class="form-control" placeholder="Jarak Alamat Pelanggan Dengan Toko" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="fee">Pajak</label>
                <input type="text" name="fee" id="fee" class="form-control" placeholder="Pajak" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="total-price">Total Harga Pesanan</label>
                <input type="text" name="total-price" id="total-price" class="form-control" placeholder="Total Harga Pesanan" readonly="readAsDataURL">
            </div>
            <div class="form-group">
                <label for="note">Catatan Pesanan</label>
                <input type="text" name="note" id="note" class="form-control" placeholder="Catatan Pesanan" readonly="readonly">
            </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header" id="headingThree">
        <h2 class="mb-0">
          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Proses Makanan <span class="icon-arrow-down ml-auto"></span>
          </button>
        </h2>
      </div>
      <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <div class="card-body">
          <div id="courrier-process-container">
            <div class="form-group">
                <select name="courrier-select" id="courrier-select" class="form-control">
                </select>
            </div>
        <div class="form-group">
            <label for="courrier-name">Nama Kurir</label>
            <input type="text" name="courrier-name" id="courrier-name" class="form-control" placeholder="Nama Kurir" readonly="readonly">
        </div>
        <div class="form-group">
            <label for="courrier-code">Kode Kurir</label>
            <input type="text" name="courrier-code" id="courrier-code" class="form-control" placeholder="Kode Kurir" readonly="readonly">
        </div>
            <div class="form-group">
                <label for="courrier-email">Email Kurir</label>
                <input type="text" name="courrier-email" id="courrier-email" class="form-control" placeholder="Email Kurir" readonly="readonly">
            </div>
            <div class="form-group">
                <label for="courrier-phone">Nomor Telepon Kurir</label>
                <input type="text" name="courrier-phone" id="courrier-phone" class="form-control" placeholder="Nomor Telepon Kurir" readonly="readonly">
            </div>
          </div>
          <div class="row" id="process-button-container">
              <div class="col-6">
                <a href="#" class="btn btn-primary btn-block" id="process-button">Proses Pesanan</a>
              </div>
              <div class="col-6">
                <a href="#" class="btn btn-danger btn-block" id="cancel-button">Batalkan Pesanan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>`;
}

function showProductDetail(dataResponse, code){
    const EMPLOYEE_TOKEN = JSON.parse(localStorage.getItem("EMPLOYEE_TOKEN")) ?? null;
    if(EMPLOYEE_TOKEN == null){
        location.href = "./login.html";
        sessionStorage.setItem("message", "Waktu Anda Telah Habis, Harap Masuk Kembali");
    }
    else {
        const {access_token} = EMPLOYEE_TOKEN;
        let {data} = dataResponse;
        data = data.filter(element => {return element.codeOrder == code});
        const accordionContainer = document.getElementById("accordion-container");
        accordionContainer.innerHTML = accordionHTML();

        const productAlertContainer = document.getElementById("product-alert-container");
        const courrierProcessContainer = document.getElementById("courrier-process-container");

        const codeOrderInput = document.getElementById("code-order");
        const codeConfirmationInput = document.getElementById("code-confirmation");
        const dateOrderInput = document.getElementById("date-order");
        const statusInput = document.getElementById("status");
        const customerNameInput = document.getElementById("customer-name");
        const customerEmailInput = document.getElementById("customer-email");
        const customerPhoneInput = document.getElementById("customer-phone");
        const customerAddressInput = document.getElementById("customer-address");
        const rangeInput = document.getElementById("range");
        const feeInput = document.getElementById("fee");
        const totalPriceInput = document.getElementById("total-price");
        const noteInput = document.getElementById("note");
        const courrierSelect = document.getElementById("courrier-select");
        const courrierEmail = document.getElementById("courrier-email");
        const courrierPhone = document.getElementById("courrier-phone");
        const courrierName = document.getElementById("courrier-name");
        const courrierCode = document.getElementById("courrier-code");

        data.forEach(element => {
            const {codeOrder, confirmation, dateOrder, status, customer: {email, phone, name}, details, distance, fee, finalPrice, note, address} = element;
            if(status == "pending" || status == "dibatalkan"){
                courrierProcessContainer.classList.add("d-none");
            }
            if(status == "dikirim"){
                courrierSelect.setAttribute("disabled","disabled");
            }
            let date = new Date(dateOrder);
            let UTCTime = date.toLocaleTimeString("id-ID");
            let UTCDate = date.toLocaleDateString('id-ID', {timeZone: "UTC"});
            let fullUTC = `${UTCDate} - ${UTCTime.replaceAll(".",":")}`;
            let processFoodRaw = "";
            details.forEach(element => {
                const {Name, Amount} = element;
                processFoodRaw += `<div class="form-group"><div class="form-row">
                <div class="col">
                  <input type="text" class="form-control" placeholder="Nama Pesanan" readonly="readonly" value=${Name}>
                </div>
                <div class="col">
                  <input type="text" class="form-control" placeholder="Jumlah Pesanan" readonly="readonly" value="Jumlah Pesan ${Amount}">
                </div>
              </div></div>`;
            });
            document.getElementById("process-food-container").innerHTML = processFoodRaw;
            document.getElementById("current-page").innerHTML = `${codeOrder} Product Order Details`;
            codeOrderInput.value = codeOrder;
            codeConfirmationInput.value = confirmation;
            dateOrderInput.value = fullUTC;
            statusInput.value = status;
            customerNameInput.value = name;
            customerEmailInput.value = email;
            customerPhoneInput.value = phone;
            customerAddressInput.value = address;
            rangeInput.value = distance;
            feeInput.value = `Rp. ${fee.toLocaleString("ID-Id")}`;
            totalPriceInput.value = `Rp. ${finalPrice.toLocaleString("ID-id")}`;
            noteInput.value = note;
            if(courrierEmail != null){
                element.kurir.email != null ? courrierEmail.value = element.kurir.email : null;
            }
            if(courrierPhone != null){
                element.kurir.phone != null ? courrierPhone.value = element.kurir.phone : null;
            }
            if(courrierName != null){
                element.kurir.name != null ? courrierName.value = element.kurir.name : null;
            }
            if(courrierCode != null){
                element.kurir.id != null ? courrierCode.value = element.kurir.id : null;
            }
        });

        getAllCourrierEmployee(access_token).then(response => {
            if(response.msg == "success"){
                response.data.forEach(element => {
                    const {Code, Name} = element;
                    courrierSelect.innerHTML += `<option selected disabled hidden>Pilih Kurir</option>
                                                <option value="${Code}">${Name} - ${Code}</option>`;
                });
                courrierSelect.addEventListener("change", function(event){
                    response = response.data.filter(element => element.Code == courrierSelect.value);
                    response.forEach(element => {
                        const {Code, Name, Email, Phone} = element;
                        courrierEmail.value = Email;
                        courrierPhone.value = Phone;
                        courrierName.value = Name;
                        courrierCode.value = Code;
                    });
                });
            }
        });

        const processButtonContainer = document.getElementById("process-button-container");
        const processButton = document.getElementById("process-button");
        const cancelButton = document.getElementById("cancel-button");
        if(statusInput.value == "dikirim" || statusInput.value == "diterima" || statusInput.value == "dibatalkan"){
            processButtonContainer.classList.add("d-none");
        }
            processButton.addEventListener("click", function(){
                processButton.innerHTML = "Diproses...";
                if(statusInput.value == "pending"){
                    putProductOrderEmployee(codeOrderInput.value, "diproses", null, access_token).then(response => {
                        statusInput.value = "diproses";
                        sessionStorage.setItem("message", `Pesanan ${codeOrderInput.value} Berhasil Diproses`);
                        productAlertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show">
                                                                        ${sessionStorage.getItem("message")}
                                                                        <button type="button" class="close" data-dismiss="alert">
                                                                        <span>&times;</span></button>
                                                                    </div>`;
                        sessionStorage.removeItem("message");
                        processButton.innerHTML = "Kirim Pesanan";
                        courrierProcessContainer.classList.remove("d-none");
                    });
                }
                else if(statusInput.value == "diproses"){
                    putProductOrderEmployee(codeOrderInput.value, "dikirim", courrierCode.value, access_token).then(response => {
                        processButtonContainer.classList.add("d-none");
                        courrierSelect.setAttribute("disabled","disabled");
                        statusInput.value = "dikirim";
                        sessionStorage.setItem("message", `Pesanan ${codeOrderInput.value} Berhasil Dikirim`);
                        productAlertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show">
                                                                        ${sessionStorage.getItem("message")}
                                                                        <button type="button" class="close" data-dismiss="alert">
                                                                        <span>&times;</span></button>
                                                                    </div>`;
                        sessionStorage.removeItem("message");
                    });
                }   
            });
            cancelButton.addEventListener("click", function(){
                cancelButton.innerHTML += `<div class="spinner-border spinner-border-sm text-light ml-2"></div>`;
                if(statusInput.value == "pending"){
                    putProductOrderEmployee(codeOrderInput.value, "dibatalkan", null, access_token).then(response => {
                        statusInput.value = "dibatalkan";
                        sessionStorage.setItem("message", `Pesanan ${codeOrderInput.value} Berhasil Dibatalkan`);
                        productAlertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show">
                                                                        ${sessionStorage.getItem("message")}
                                                                        <button type="button" class="close" data-dismiss="alert">
                                                                        <span>&times;</span></button>
                                                                    </div>`;
                        sessionStorage.removeItem("message");
                        processButton.innerHTML = "Kirim Pesanan";
                        processButtonContainer.classList.add("d-none");
                        courrierProcessContainer.classList.add("d-none");
                    });
                }
                else if(statusInput.value == "diproses"){
                    putProductOrderEmployee(codeOrderInput.value, "dibatalkan", null, access_token).then(response => {
                        statusInput.value = "dibatalkan";
                        sessionStorage.setItem("message", `Pesanan ${codeOrderInput.value} Berhasil Dibatalkan`);
                        productAlertContainer.innerHTML = `<div class="alert alert-success alert-dismissible fade show">
                                                                        ${sessionStorage.getItem("message")}
                                                                        <button type="button" class="close" data-dismiss="alert">
                                                                        <span>&times;</span></button>
                                                                    </div>`;
                        sessionStorage.removeItem("message");
                        processButtonContainer.classList.add("d-none");
                        courrierProcessContainer.classList.add("d-none");
                    });
                }
            });
    }
}

export {showAllPendingProducts, showAllProcessedProducts, showAllOndeliveryProducts, showAllAcceptedProducts, showAllCanceledProducts, showProductDetail};