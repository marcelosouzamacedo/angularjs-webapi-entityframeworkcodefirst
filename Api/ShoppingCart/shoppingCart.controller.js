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
        vm.selectedCategory = {};
        vm.selectedProduct = {};
        vm.selectedSubCategory = {};
        vm.shoppingCart = [];
        vm.subCategories = [];
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

        function viewProductDetails(product) {
            vm.selectedProduct = product;
            var modalInstance = $uibModal.open({
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                templateUrl: "/ShoppingCart/productDetails.html",
                controller: "ShoppingCartController",
                scope: $scope,
                resolve: {
                    product: function() {
                        return $scope.cart.selectedProduct;
                    }
                }
            });

            modalInstance.result.then(function (added) {
                if (added) {
                    var cartItem = vm.selectedProduct;
                    cartItem.Quantity = 1;
                    vm.shoppingCart.push(cartItem);
                }
            });
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

        function updateProducts(value) {
            if (value != null && value.Id > 0) {
                vm.products = listProducts();
            }
            else {
                vm.products = [];
            }
        }
    }
})();