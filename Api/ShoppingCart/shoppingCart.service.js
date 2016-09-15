(function () {
    "use strict";

    angular
      .module("shoppingCart")
      .service("shoppingCartService", shoppingCart);

    shoppingCart.$inject = ["$http"];

    function shoppingCart($http) {
        var service = {
            getCategories: getCategories,
            getProducts: getProducts
        };

        return service;

        function getCategories(parentCategory) {
            var address = "/api/categories/";
            if (parentCategory != null && parentCategory.id)
                address = address + parentCategory.id;

            return $http.get(address)
              .then(getCategoriesComplete);

            function getCategoriesComplete(data) {
                return data;
            }
        }

        function getProducts(category) {
            var address = "/api/products/" + category.id;

            return $http.get(address)
                .then(getProductsComplete);

            function getProductsComplete(data) {
                return data;
            }
        }
    }
})();