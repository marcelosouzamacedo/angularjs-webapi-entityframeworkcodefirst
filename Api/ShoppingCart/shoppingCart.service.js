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
            var address = "/api/categories";
            if (parentCategory != null && parentCategory.Id)
                address = "/api/category/" + parentCategory.Id + "/categories";

            return $http.get(address)
              .then(getCategoriesComplete);

            function getCategoriesComplete(response) {
                return response.data;
            }
        }

        function getProducts(category) {
            var address = "/api/category/" + category.Id + "/products";

            return $http.get(address)
                .then(getProductsComplete);

            function getProductsComplete(response) {
                return response.data;
            }
        }
    }
})();