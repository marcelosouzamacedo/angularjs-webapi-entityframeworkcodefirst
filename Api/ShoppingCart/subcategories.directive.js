(function () {
    "use strict";

    angular
		.module("shoppingCart")
		.directive("subcategories", subcategories);

    function subcategories() {
        var directive = {
            restrict: "EA",
            templateUrl: "./subcategories.directive.html",
            controller: "ShoppingCartController",
            controllerAs: "cart",
            bindToController: true
        };

        return directive;
    }
})();