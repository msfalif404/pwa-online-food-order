importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.precaching.precacheAndRoute([
  {url: './index.html', revision: 1},
  {url: './navbar.html', revision: 1},
  {url: './bottom-navbar.html', revision: 1},
  {url: './footer.html', revision: 1},
  {url: './offline.html', revision: 1},
  {url: './product-details.html', revision: 1},
  {url: './landing-mobile.html', revision: 1},

  {url: './pages/account-detail-page.html', revision: 1},
  {url: './pages/all-products-page.html', revision: 1},
  {url: './pages/cart-page.html', revision: 1},
  {url: './pages/edit-password-page.html', revision: 1},
  {url: './pages/edit-profile-page.html', revision: 1},
  {url: './pages/order-details-code-order-page.html', revision: 1},
  {url: './pages/order-details-data-order-page.html', revision: 1},
  {url: './pages/order-details-page.html', revision: 1},

  {url: './admin/login.html', revision: 1},
  {url: './admin/dashboard.html', revision: 1},
  {url: './admin/sidebar.html', revision: 1},
  {url: './admin/bottom-navbar.html', revision: 1},
  {url: './admin/add-product.html', revision: 1},
  {url: './admin/employee-details.html', revision: 1},
  {url: './admin/product-details.html', revision: 1},
  {url: './admin/pages/add-employee-page.html', revision: 1},
  {url: './admin/pages/add-product-page.html', revision: 1},
  {url: './admin/pages/all-employee-page.html', revision: 1},
  {url: './admin/pages/all-products-page.html', revision: 1},
  {url: './admin/pages/product-orders-page.html', revision: 1},

  {url: './customer/account-detail.html', revision: 1},
  {url: './customer/login.html', revision: 1},
  {url: './customer/order-details.html', revision: 1},
  {url: './customer/register.html', revision: 1},

  {url: './employee/login.html', revision: 1},

  {url: './employee/kasir/dashboard.html', revision: 1},
  {url: './employee/kasir/sidebar.html', revision: 1},
  {url: './employee/kasir/bottom-navbar.html', revision: 1},
  {url: './employee/kasir/product-details.html', revision: 1},
  {url: './employee/kasir/pages/accepted-products-page.html', revision: 1},
  {url: './employee/kasir/pages/canceled-products-page.html', revision: 1},
  {url: './employee/kasir/pages/ondelivery-products-page.html', revision: 1},
  {url: './employee/kasir/pages/pending-products-page.html', revision: 1},
  {url: './employee/kasir/pages/processed-products-page.html', revision: 1},

  {url: './employee/kurir/dashboard.html', revision: 1},
  {url: './employee/kurir/sidebar.html', revision: 1},
  {url: './employee/kurir/bottom-navbar.html', revision: 1},
  {url: './employee/kurir/order-details.html', revision: 1},
  {url: './employee/kurir/pages/delivered-products-page.html', revision: 1},
  {url: './employee/kurir/pages/ondelivery-products-page.html', revision: 1},

  {url: './css/bootstrap.min.css', revision: 1},
  {url: './css/boxicons.min.css', revision: 1},
  {url: './css/foundation-icons.css', revision: 1},
  {url: './css/mapbox-gl-geocoder.css', revision: 1},
  {url: './css/mapbox-gl.css', revision: 1},
  {url: './css/style.css', revision: 1},
  {url: './css/swiper-bundle.min.css', revision: 1},

  {url: './js/helpers/api-helper.js', revision: 1},
  {url: './js/helpers/crud-admin-helper.js', revision: 1},
  {url: './js/helpers/crud-kasir-helper.js', revision: 1},
  {url: './js/helpers/crud-kurir-helper.js', revision: 1},
  {url: './js/helpers/error-helper.js', revision: 1},
  {url: './js/helpers/pagination-helper.js', revision: 1},
  {url: './js/helpers/spa-customer-helper.js', revision: 1},
  {url: './js/helpers/spa-helper.js', revision: 1},
  {url: './js/helpers/spa-kasir-helper.js', revision: 1},
  {url: './js/helpers/spa-kurir-helper.js', revision: 1},
  {url: './js/helpers/token-expired-helper.js', revision: 1},
  {url: './js/helpers/token-null-helper.js', revision: 1},

  {url: './js/services/api/admin/auth-admin.js', revision: 1},
  {url: './js/services/api/admin/crud-admin.js', revision: 1},

  {url: './js/services/api/customer/auth-customer.js', revision: 1},
  {url: './js/services/api/customer/product-order.js', revision: 1},
  {url: './js/services/api/customer/product-review.js', revision: 1},
  {url: './js/services/api/customer/profile-customer.js', revision: 1},

  {url: './js/services/api/employee/auth-employee.js', revision: 1},
  {url: './js/services/api/employee/crud-employee.js', revision: 1},
  {url: './js/services/api/employee/order-courrier.js', revision: 1},

  {url: './js/services/api/check-location.js', revision: 1},
  {url: './js/services/api/logout-token.js', revision: 1},
  {url: './js/services/api/product-detail.js', revision: 1},
  {url: './js/services/api/product-index.js', revision: 1},
  {url: './js/services/api/refresh-token.js', revision: 1},

  {url: './js/bootstrap.min.js', revision: 1},
  {url: './js/db.js', revision: 1},
  {url: './js/idb.js', revision: 1},
  {url: './js/jquery-3.5.1.slim.min.js', revision: 1},
  {url: './js/mapbox-gl-geocoder.min.js', revision: 1},
  {url: './js/mapbox-gl.js', revision: 1},
  {url: './js/popper.min.js', revision: 1},
  {url: './js/swiper.js', revision: 1},
  
  {url: './images/food.svg', revision: 1},
  {url: './images/motor.svg', revision: 1},
  {url: './images/waiting.svg', revision: 1},
  {url: './images/chicken.svg', revision: 1},
  {url: './images/icon-192x192.png', revision: 1},
  {url: './images/icon-512x512.png', revision: 1},

  {url: './svg/regular/bx-star.svg', revision: 1},
  
  {url: './fonts/boxicons.eot', revision: 1},
  {url: './fonts/boxicons.svg', revision: 1},
  {url: './fonts/boxicons.ttf', revision: 1},
  {url: './fonts/boxicons.woff', revision: 1},
  {url: './fonts/boxicons.woff2', revision: 1},

  {url: './manifest.json', revision: 1},

  {url: 'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459WRhyzbi.woff2', revision: 1},
], {
  ignoreURLParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp("https://rest-orderapp.herokuapp.com/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "api-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponse({statuses: [0, 200]}),
      new workbox.expiration.ExpirationPlugin({maxAgeSeconds: 7 * 24 * 60 * 60, maxEntries: 30})
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "pages-cache",
    plugins: [
      new workbox.cacheableResponse.CacheableResponse({statuses: [0, 200]}),
      new workbox.expiration.ExpirationPlugin({maxAgeSeconds: 7 * 24 * 60 * 60, maxEntries: 30})
    ]
  })
);

// workbox.setConfig({
//   debug: true
// });