(function () {
    "use strict";

    angular
		.module("shoppingCart")
		.directive("categories", categories);

    function categories() {
        var directive = {
            restrict: "EA",
            templateUrl: "./categories.directive.html",
            controller: "ShoppingCartController",
            controllerAs: "cart",
            bindToController: true
        };

        return directive;
    }
})();