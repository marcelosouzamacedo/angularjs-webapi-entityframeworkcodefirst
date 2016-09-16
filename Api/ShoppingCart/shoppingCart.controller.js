(function () {
    "use strict";

    angular
      .module("shoppingCart")
      .controller("ShoppingCartController", ShoppingCartController);

    ShoppingCartController.$inject = ["$scope", "shoppingCartService", "$uibModal"];

    function ShoppingCartController($scope, shoppingCartService, $uibModal) {
        var vm = this;

        vm.categories = [];
        vm.disableSubCategories = disableSubCategories;
        vm.products = [];
        vm.removeFromCart = removeFromCart;
        vm.selectedCategory = {};
        vm.selectedProduct = {};
        vm.selectedSubCategory = {};
        vm.shoppingCart = [];
        vm.subCategories = [];
        vm.sumCartItemsPrices = sumCartItemsPrices;
        vm.sumCartItemsQuantities = sumCartItemsQuantities;
        vm.viewProductDetails = viewProductDetails;

        $scope.$watch(function () { return vm.selectedCategory; }, updateSubCategories);
        $scope.$watch(function () { return vm.selectedSubCategory; }, updateProducts);

        listCategories();

        function disableSubCategories() {
            return vm.selectedCategory == null || typeof (vm.selectedCategory) == "undefined" || !vm.selectedCategory.Id;
        }

        function listCategories() {
            return shoppingCartService
              .getCategories()
              .then(function (data) {
                  vm.categories = data;
                  return vm.categories;
              });
        }

        function listProducts() {
            return shoppingCartService
              .getProducts(vm.selectedSubCategory)
              .then(function (data) {
                  vm.products = data;
                  return vm.categories;
              });
        }

        function listSubCategories() {
            return shoppingCartService
              .getCategories(vm.selectedCategory)
              .then(function (data) {
                  vm.subCategories = data;
                  return vm.subCategories;
              });
        }

        function removeFromCart(item) {
            for (var i = 0; i < vm.shoppingCart.length; i++) {
                if (vm.shoppingCart[i].Id === item.Id) {
                    vm.shoppingCart.splice(i, 1);
                    return;
                }
            }
        }

        function sumCartItemsQuantities() {
            var sum = 0;
            for (var i = 0; i < vm.shoppingCart.length; i++) {
                sum += vm.shoppingCart[i].Quantity;
            }
            return sum;
        }

        function sumCartItemsPrices() {
            var sum = 0;
            for (var i = 0; i < vm.shoppingCart.length; i++) {
                sum += vm.shoppingCart[i].Price * vm.shoppingCart[i].Quantity;
            }
            return sum;
        }

        function updateProducts(value) {
            if (value != null && value.Id > 0) {
                vm.products = listProducts();
            }
            else {
                vm.products = [];
            }
        }

        function updateSubCategories(value) {
            vm.products = [];

            if (value != null && value.Id > 0) {
                vm.subCategories = listSubCategories();
                vm.selectSubCategoryDefaultText = "Selecione uma Subcategoria";
            }
            else {
                vm.subCategories = [];
                vm.selectSubCategoryDefaultText = "";
            }
        }

        function viewProductDetails(product) {
            vm.selectedProduct = product;
            var modalInstance = $uibModal.open({
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                templateUrl: "/ShoppingCart/productDetails.html",
                controller: "ShoppingCartController",
                scope: $scope,
                resolve: {
                    product: function () {
                        return $scope.cart.selectedProduct;
                    }
                }
            });

            modalInstance.result.then(function (added) {
                if (added) {
                    for (var i = 0; i < vm.shoppingCart.length; i++) {
                        if (vm.shoppingCart[i].Id === vm.selectedProduct.Id) {
                            vm.shoppingCart[i].Quantity++;
                            return;
                        }
                    }
                    var cartItem = vm.selectedProduct;
                    cartItem.Quantity = 1;
                    vm.shoppingCart.push(cartItem);
                }
            });
        }
    }
})();