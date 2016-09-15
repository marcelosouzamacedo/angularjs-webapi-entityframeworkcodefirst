(function () {
    "use strict";

    angular
      .module("shoppingCart")
      .controller("CategoryController", ShoppingCartController);

    ShoppingCartController.$inject = ["$scope", "shoppingCartService"];

    function ShoppingCartController($scope, shoppingCartService) {
        var vm = this;

        vm.categories = [];
        vm.disableSubCategories = disableSubCategories;
        vm.products = [];
        vm.selectedCategory = {};
        vm.selectedSubCategory = {};
        vm.subCategories = [];

        $scope.$watch(function () { return vm.selectedCategory; }, updateSubCategories);
        $scope.$watch(function () { return vm.selectedSubCategory; }, updateProducts);

        listCategories();

        function disableSubCategories() {
            return vm.selectedCategory == null || typeof (vm.selectedCategory) == "undefined" || !vm.selectedCategory.id;
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
              .getProducts()
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

        function updateSubCategories(value) {
            vm.products = [];

            if (value != null && value.id > 0) {
                vm.subCategories = listSubCategories();
                vm.selectSubCategoryDefaultText = "Selecione uma sub-categoria";
            }
            else {
                vm.subCategories = [];
                vm.selectSubCategoryDefaultText = "";
            }
        }

        function updateProducts(value) {
            if (value != null && value.id > 0) {
                vm.products = listProducts();
            }
            else {
                vm.products = [];
            }
        }
    }
})();