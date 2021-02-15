import {paginator} from "../helpers/pagination-helper.js";

function showAllProduct(data){
    let dataMenuRaw = ""
    let category = null;
    let paginations = paginator(data.data, 1, 10);
    paginations.data.forEach(element => {
        const {id, categoryid, name} = element;
        switch(categoryid){
            case 1:
                category = "Pizza";
                break;
            case 2:
                category = "Burger";
                break;
            case 3:
                category = "Pasta";
                break;
            case 4:
                category = "Salad";
                break;
            default:
                category = "Information Not Found";
        }
        dataMenuRaw += 
        `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${category}</td>
            <td><a href="product-details.html?id=${id}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = dataMenuRaw;

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
                paginations = paginator(data.data, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {id, categoryid, name} = element;
                    switch(categoryid){
                        case 1:
                            category = "Pizza";
                            break;
                        case 2:
                            category = "Burger";
                            break;
                        case 3:
                            category = "Pasta";
                            break;
                        case 4:
                            category = "Salad";
                            break;
                        default:
                            category = "Information Not Found";
                    }
                    dataMenuRaw += 
                    `<tr>
                        <td>${id}</td>
                        <td>${name}</td>
                        <td>${category}</td>
                        <td><a href="product-details.html?id=${id}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
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
           return element.name.toLowerCase().includes(searchProductInput);
        });
        filteredData.forEach(element => {
            const {id, categoryid, name} = element;
            switch(categoryid){
                case 1:
                    category = "Pizza";
                    break;
                case 2:
                    category = "Burger";
                    break;
                case 3:
                    category = "Pasta";
                    break;
                case 4:
                    category = "Salad";
                    break;
                default:
                    category = "Information Not Found";
            }
            dataMenuSearch += 
            `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${category}</td>
                <td><a href="product-details.html?id=${id}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
            </tr>`;
        });
        productContainer.innerHTML = dataMenuSearch;
        dataMenuSearch = "";
        if(filteredData.length == 0){
            productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
        }
    });
}

function showAllEmployee(dataResponse){
    const {data: data} = dataResponse;
    let dataMenuRaw = ""
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {Name, Code, Email, Role} = element;
        dataMenuRaw += 
        `<tr>
            <td>${Name}</td>
            <td>${Code}</td>
            <td>${Email}</td>
            <td>${Role}</td>
            <td><a href="employee-details.html?code=${Code}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
        </tr>`;
    });
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = dataMenuRaw;

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
                paginations = paginator(data, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {Name, Code, Email, Role} = element;
                    dataMenuRaw += 
                    `<tr>
                        <td>${Name}</td>
                        <td>${Code}</td>
                        <td>${Email}</td>
                        <td>${Role}</td>
                        <td><a href="employee-details.html?code=${Code}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
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

    const searchEmployeeContainer = document.getElementById("search-employee");
    let dataMenuSearch = "";
    searchEmployeeContainer.addEventListener("keyup", function(event){
        let searchEmployeeInput = document.getElementById("search-employee").value.toLowerCase();
        let filteredData = paginations.data.filter(element => {
           return element.Name.toLowerCase().includes(searchEmployeeInput);
        });
        filteredData.forEach(element => {
            const {Name, Code, Email, Role} = element;
            dataMenuSearch += 
            `<tr>
                <td>${Name}</td>
                <td>${Code}</td>
                <td>${Email}</td>
                <td>${Role}</td>
                <td><a href="employee-details.html?code=${Code}" class="btn btn-primary text-white product-detail-button">Lihat Detail</a></td>
            </tr>`;
        });
        productContainer.innerHTML = dataMenuSearch;
        dataMenuSearch = "";
        if(filteredData.length == 0){
            productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
        }
    });
}


function productDetailHTML(){
    return ` <div class="col-lg-4">
    <label for="path-hidden-input">Ketuk Gambar Untuk Mengganti Gambar</label>
    <input type="file" class="custom-file-input d-none" id="path-hidden-input">
    <img src="" class="img-fluid rounded" style="max-height: 500px;object-fit: cover;" id="path">
</div>
<div class="col-lg-6">
    <div class="form-group">
        <label for="name">Nama Produk</label>
        <input type="text" name="name" id="name" class="form-control" placeholder="Nama Produk" value="">
    </div>
    <div class="form-group">
        <label for="description">Deskripsi Produk</label>
        <textarea type="text" name="description" id="description" cols="30" rows="10" class="form-control" placeholder="Deskripsi Produk" value=""></textarea>
    </div>
    <div class="form-group">
        <label for="price">Harga Produk</label>
        <input type="text" name="price" id="price" class="form-control" placeholder="Harga Produk" value="">
    </div>
    <div class="form-group">
        <label for="categoryid">Kategori Produk</label>
        <select name="categoryid" id="categoryid" class="form-control">
        </select>
    </div>
    <div class="form-group">
        <label for="show_hide">Show / Hide</label>
        <select name="show_hide" id="show_hide" class="form-control">
        </select>
    </div>
    <div class="d-flex">
        <button type="button" class="btn btn-danger text-white" data-toggle="modal" data-target="#delete-modal">Delete</button>
        <a class="btn btn-primary text-white ml-auto" id="update-button">Update</a>
        <!-- Delete Modal -->
        <div class="modal fade" id="delete-modal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-body">
                  <h5 class="modal-title">Anda yakin ingin menghapus produk ini ?</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary mr-auto" id="delete-button">Ya, Hapus !</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batalkan</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>`;
}

function showProductDetail(data){
    const {data: {categoryid, name, description, path, price, sh}} = data;
    const productDetailContainer = document.getElementById("product-detail-container");
    productDetailContainer.innerHTML = productDetailHTML();
    const currentPageContainer = document.getElementById("current-page");
    const pathContainer = document.getElementById("path");
    const nameContainer = document.getElementById("name");
    const descriptionContainer = document.getElementById("description");
    const priceContainer = document.getElementById("price");
    const categoryIdContainer = document.getElementById("categoryid");
    const showHideContainer = document.getElementById("show_hide");
    currentPageContainer.innerHTML = `${name} Product Details`;
                pathContainer.src = `https://rest-orderapp.herokuapp.com/${path}`;
                nameContainer.value = name;
                descriptionContainer.value = description;
                priceContainer.value = price;
                categoryIdContainer.innerHTML += 
                    `<option value="1" ${categoryid == 1 ? "selected" : null}>Pizza</option>
                    <option value="2" ${categoryid == 2 ? "selected" : null}>Burger</option>
                    <option value="3" ${categoryid == 3 ? "selected" : null}>Pasta</option>
                    <option value="4" ${categoryid == 4 ? "selected" : null}>Salad</option>`;
                showHideContainer.innerHTML += 
                    `<option value="0" ${sh == 0 ? "selected" : null}>Hide</option>
                    <option value="1" ${sh == 1 ? "selected" : null}>Show</option>`;
}

function showProductDetailAfterUpdate(data){
    const {data: {categoryid, name, description, path, price, sh}} = data;
    const currentPageContainer = document.getElementById("current-page");
    const nameContainer = document.getElementById("name");
    const descriptionContainer = document.getElementById("description");
    const priceContainer = document.getElementById("price");
    const categoryIdContainer = document.getElementById("categoryid");
    const showHideContainer = document.getElementById("show_hide");
    currentPageContainer.innerHTML = `${name} Product Details`;
                nameContainer.value = name;
                descriptionContainer.value = description;
                priceContainer.value = price;
                categoryIdContainer.innerHTML = 
                    `<option value="1" ${categoryid == 1 ? "selected" : null}>Pizza</option>
                    <option value="2" ${categoryid == 2 ? "selected" : null}>Burger</option>
                    <option value="3" ${categoryid == 3 ? "selected" : null}>Pasta</option>
                    <option value="4" ${categoryid == 4 ? "selected" : null}>Salad</option>`;
                showHideContainer.innerHTML += 
                    `<option value="0" ${sh == 0 ? "selected" : null}>Hide</option>
                    <option value="1" ${sh == 1 ? "selected" : null}>Show</option>`;
}

function employeeDetailHTML(){
    return `<div class="col-lg-12">
    <form id="employee-details">
        <div class="form-group">
            <label for="name">Nama Pegawai</label>
            <input type="text" name="name" id="name" class="form-control" placeholder="Nama Pegawai" value="" required>
        </div>
        <div class="form-group">
            <label for="categoryid">Kategori Pegawai</label>
            <select name="categoryid" id="categoryid" class="form-control" required>
            </select>
        </div>
        <div class="form-group">
            <label for="dob">Tempat Lahir</label>
            <input type="text" name="pob" id="pob" class="form-control" placeholder="Tempat Lahir" value="" required>
        </div>
        <div>
            <label>Tanggal Lahir</label>
            <div class="form-row">
                <div class="form-group col-4">
                    <input type="text" name="days" id="days" class="form-control" placeholder="dd" required minlength="2" maxlength="2">
                </div>
                <div class="form-group col-4">
                    <select name="months" id="months" class="form-control" required>
                    </select>
                </div>
                <div class="form-group col-4">
                    <input type="text" name="years" id="years" class="form-control" placeholder="yyyy" required minlength="4" maxlength="4">
                </div>
            </div>
        </div>
        <div class="form-group">
            <label>Jenis Kelamin</label>
            <div id="gender-container">                                
            </div>
        </div>
        <div class="form-group">
            <label for="name">Nomor Telepon</label>
            <input type="text" name="phone" id="phone" class="form-control" placeholder="Nomor Telepon Pegawai" value="" required>
        </div>
        <div class="form-group">
            <label for="alamat">Alamat Pegawai</label>
            <textarea name="alamat" id="alamat" cols="30" rows="5" class="form-control" required></textarea>
        </div>
        <div class="form-group">
            <label for="name">Email</label>
            <input type="email" name="email" id="email" class="form-control" placeholder="Email Pegawai" value="" required>
        </div>
        <div class="form-group">
            <label for="Password">Password</label>
            <input type="password" name="password" id="password" class="form-control" placeholder="Password Pegawai" value="" required>
        </div>
        <div class="form-group d-flex">
            <button type="button" class="btn btn-danger text-white" data-toggle="modal" data-target="#delete-modal">Delete</button>
            <button type="submit" class="btn btn-primary ml-auto" form="employee-details">Update</button>
            <!-- Delete Modal -->
            <div class="modal fade" id="delete-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-body">
                      <h5 class="modal-title">Anda yakin ingin menghapus Pegawai ini ?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary mr-auto" id="delete-button">Ya, Hapus !</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batalkan</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </form>
</div>`;
}

function showEmployeeDetail(dataResponse){
    const {data: {Address, Dob, Email, Gender, Name, Pasw, Phone, Pob, Role}} = dataResponse;
    const employeeDetailContainer = document.getElementById("employee-detail-container");
    employeeDetailContainer.innerHTML = employeeDetailHTML();
    const currentPageContainer = document.getElementById("current-page");
    const nameContainer = document.getElementById("name");
    const categoryIdContainer = document.getElementById("categoryid");
    const pobContainer = document.getElementById("pob");

    const convertedDate = new Date(Dob);
    const convertedDateDay = convertedDate.getDate();
    const convertedDateMonth = convertedDate.getMonth();
    const convertedDateYear = convertedDate.getFullYear();
    const daysInput = document.getElementById("days");
    const monthsInput = document.getElementById("months");
    const yearsInput = document.getElementById("years");
    daysInput.value = convertedDateDay;
    monthsInput.innerHTML = `<option selected disabled hidden>mm</option>
    <option value="01" ${convertedDateMonth == 0 ? "selected" : null}>Januari</option>
    <option value="02" ${convertedDateMonth == 1 ? "selected" : null}>Februari</option>
    <option value="03" ${convertedDateMonth == 2 ? "selected" : null}>Maret</option>
    <option value="04" ${convertedDateMonth == 3 ? "selected" : null}>April</option>
    <option value="05" ${convertedDateMonth == 4 ? "selected" : null}>Mei</option>
    <option value="06" ${convertedDateMonth == 5 ? "selected" : null}>Juni</option>
    <option value="07" ${convertedDateMonth == 6 ? "selected" : null}>Juli</option>
    <option value="08" ${convertedDateMonth == 7 ? "selected" : null}>Agustus</option>
    <option value="09" ${convertedDateMonth == 8 ? "selected" : null}>September</option>
    <option value="10" ${convertedDateMonth == 9 ? "selected" : null}>Oktober</option>
    <option value="11" ${convertedDateMonth == 10 ? "selected" : null}>November</option>
    <option value="12" ${convertedDateMonth == 11 ? "selected" : null}>Desember</option>`;
    yearsInput.value = convertedDateYear;
    

    const genderContainer = document.getElementById("gender-container");
    currentPageContainer.innerHTML = `${Name} Product Details`;
    nameContainer.value = Name;
    categoryIdContainer.innerHTML = `<option value="kasir" ${Role == "kasir" ? "selected" : null}>Kasir</option>
                            <option value="kurir" ${Role == "kurir" ? "selected" : null}>Kurir</option>`;
    pobContainer.value = Pob;
    
    genderContainer.innerHTML = `<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gender" id="male" value="L" required ${Gender == "L" ? "checked" : null}>
    <label class="form-check-label" for="male">Laki-laki</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gender" id="female" value="P" ${Gender == "P" ? "checked" : null}>
    <label class="form-check-label" for="female">Perempuan</label>
  </div>`;
  const addressContainer = document.getElementById("alamat");
  const phoneContainer = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  addressContainer.innerHTML = Address;
  phoneContainer.value = Phone;
  emailInput.value = Email;
  passwordInput.value = Pasw;
}

function showEmployeeDetailAfterUpdate(dataResponse){
    const {data: {Address, Dob, Email, Gender, Name, Pasw, Phone, Pob, Role}} = dataResponse;
    const currentPageContainer = document.getElementById("current-page");
    const nameContainer = document.getElementById("name");
    const categoryIdContainer = document.getElementById("categoryid");
    const pobContainer = document.getElementById("pob");

    const convertedDate = new Date(Dob);
    const convertedDateDay = convertedDate.getDate();
    const convertedDateMonth = convertedDate.getMonth();
    const convertedDateYear = convertedDate.getFullYear();
    const daysInput = document.getElementById("days");
    const monthsInput = document.getElementById("months");
    const yearsInput = document.getElementById("years");
    daysInput.value = convertedDateDay;
    monthsInput.innerHTML = `<option selected disabled hidden>mm</option>
    <option value="01" ${convertedDateMonth == 0 ? "selected" : null}>Januari</option>
    <option value="02" ${convertedDateMonth == 1 ? "selected" : null}>Februari</option>
    <option value="03" ${convertedDateMonth == 2 ? "selected" : null}>Maret</option>
    <option value="04" ${convertedDateMonth == 3 ? "selected" : null}>April</option>
    <option value="05" ${convertedDateMonth == 4 ? "selected" : null}>Mei</option>
    <option value="06" ${convertedDateMonth == 5 ? "selected" : null}>Juni</option>
    <option value="07" ${convertedDateMonth == 6 ? "selected" : null}>Juli</option>
    <option value="08" ${convertedDateMonth == 7 ? "selected" : null}>Agustus</option>
    <option value="09" ${convertedDateMonth == 8 ? "selected" : null}>September</option>
    <option value="10" ${convertedDateMonth == 9 ? "selected" : null}>Oktober</option>
    <option value="11" ${convertedDateMonth == 10 ? "selected" : null}>November</option>
    <option value="12" ${convertedDateMonth == 11 ? "selected" : null}>Desember</option>`;
    yearsInput.value = convertedDateYear;

    const genderContainer = document.getElementById("gender-container");
    currentPageContainer.innerHTML = `${Name} Product Details`;
    nameContainer.value = Name;
    categoryIdContainer.innerHTML = `<option value="kasir" ${Role == "kasir" ? "selected" : null}>Kasir</option>
                            <option value="kurir" ${Role == "kurir" ? "selected" : null}>Kurir</option>`;
    pobContainer.value = Pob;
    
    genderContainer.innerHTML = `<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gender" id="male" value="L" required ${Gender == "L" ? "checked" : null}>
    <label class="form-check-label" for="male">Laki-laki</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gender" id="female" value="P" ${Gender == "P" ? "checked" : null}>
    <label class="form-check-label" for="female">Perempuan</label>
  </div>`;
  const addressContainer = document.getElementById("alamat");
  const phoneContainer = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  addressContainer.innerHTML = Address;
  phoneContainer.value = Phone;
  emailInput.value = Email;
  passwordInput.value = Pasw;
}

function showAllOrder(dataResponse){
    const {data} = dataResponse;
    const productContainer = document.getElementById("product-container");
    let dataMenuRaw = ""
    let paginations = paginator(data, 1, 10);
    paginations.data.forEach(element => {
        const {codeOrder, confirmation, dateOrder} = element;
        dataMenuRaw += 
        `<tr>
            <td>${codeOrder}</td>
            <td>${confirmation}</td>
            <td>${dateOrder}</td>
        </tr>`;
    });
    productContainer.innerHTML = dataMenuRaw;

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
                paginations = paginator(data, event.target.innerHTML, 10);
                paginations.data.forEach(element => {
                    const {codeOrder, confirmation, dateOrder} = element;
                        dataMenuRaw += 
                        `<tr>
                            <td>${codeOrder}</td>
                            <td>${confirmation}</td>
                            <td>${dateOrder}</td>
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
                const {codeOrder, confirmation, dateOrder} = element;
                        dataMenuSearch += 
                        `<tr>
                            <td>${codeOrder}</td>
                            <td>${confirmation}</td>
                            <td>${dateOrder}</td>
                        </tr>`;
            });
            productContainer.innerHTML = dataMenuSearch;
            dataMenuSearch = "";
            if(filteredData.length == 0){
                productContainer.innerHTML = `<tr><td colspan="5" class="text-center">Tidak Ditemukan Data</td></tr>`;
            }
        });
}

export {showAllProduct, showProductDetail, showProductDetailAfterUpdate, showAllEmployee, showEmployeeDetail, showEmployeeDetailAfterUpdate, showAllOrder};