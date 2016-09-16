(function () {
    "use strict";

    angular
		.module("shoppingCart")
		.directive("cartItems", cartItems);

    function cartItems() {
        var directive = {
            restrict: "EA",
            templateUrl: "./cartItems.directive.html",
            controller: "ShoppingCartController",
            controllerAs: "cart",
            bindToController: true
        };

        return directive;
    }
})();