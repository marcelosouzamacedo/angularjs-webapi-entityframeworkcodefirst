(function () {
    "use strict";

    angular
      .module("shoppingCart")
      .controller("ShoppingCartController", ShoppingCartController);

    ShoppingCartController.$inject = ["$scope", "shoppingCartService", "$uibModal", "$window"];

    function ShoppingCartController($scope, shoppingCartService, $uibModal, $window) {
        var vm = this;

        vm.categories = [];
        vm.checkOut = checkOut;
        vm.deliveryAddress = "";
        vm.deliveryDate = null;
        vm.deliveryOption = "";
        vm.disableSubCategories = disableSubCategories;
        vm.getMinDateForDelivery = getMinDateForDelivery;
        vm.isValidToCheckOut = isValidToCheckOut;
        vm.products = [];
        vm.removeFromCart = removeFromCart;
        vm.selectedCategory = {};
        vm.selectedProduct = {};
        vm.selectedProductStillHasStock = selectedProductStillHasStock;
        vm.selectedSubCategory = {};
        vm.shoppingCart = [];
        vm.subCategories = [];
        vm.sumCartItemsPrices = sumCartItemsPrices;
        vm.sumCartItemsQuantities = sumCartItemsQuantities;
        vm.viewProductDetails = viewProductDetails;

        $scope.$watch(function () { return vm.selectedCategory; }, updateSubCategories);
        $scope.$watch(function () { return vm.selectedSubCategory; }, updateProducts);

        listCategories();

        function checkOut() {
            var order = {
                "DeliveryOption": vm.deliveryOption,
                "DeliveryDate": vm.deliveryDate,
                "DeliveryAddress": vm.deliveryAddress,
                "TotalValue": vm.sumCartItemsPrices(),
                "Items": vm.shoppingCart.map(function (i) {
                    return {
                        "Quantity": i.Quantity,
                        "Product": { "Id": i.Id }
                    };
                })
            };

            shoppingCartService.checkOut(order)
                .then(function () { $window.location.href = "/Orders/index.html"; });
        }

        function disableSubCategories() {
            return vm.selectedCategory == null || typeof (vm.selectedCategory) == "undefined" || !vm.selectedCategory.Id;
        }

        function getMinDateForDelivery() {
            var now = new Date();
            var month = (now.getMonth() + 1);
            var day = now.getDate();
            if (month < 10)
                month = "0" + month;
            if (day < 10)
                day = "0" + day;
            var today = now.getFullYear() + "-" + month + "-" + day;
            return today;
        }

        function getShoppingCartItem() {
            for (var i = 0; i < vm.shoppingCart.length; i++)
                if (vm.shoppingCart[i].Id === vm.selectedProduct.Id)
                    return vm.shoppingCart[i];
            return null;
        }

        function isValidToCheckOut() {
            return vm.shoppingCart.length > 0 &&
                vm.deliveryDate != null &&
                vm.deliveryDate !== "" &&
                ((vm.deliveryOption === "home" && vm.deliveryAddress !== "") || (vm.deliveryOption === "site"));
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

        function selectedProductStillHasStock() {
            var cartItem = getShoppingCartItem();
            if (cartItem == null)
                return vm.selectedProduct.InStock > 0;
            return vm.selectedProduct.InStock > cartItem.Quantity;
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
                    var cartItem = getShoppingCartItem();
                    if (cartItem != null) {
                        cartItem.Quantity++;
                        return;
                    }

                    cartItem = vm.selectedProduct;
                    cartItem.Quantity = 1;
                    vm.shoppingCart.push(cartItem);
                }
            });
        }
    }
})();