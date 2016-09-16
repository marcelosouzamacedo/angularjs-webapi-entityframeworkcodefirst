(function () {
    "use strict";

    angular
		.module("shoppingCart")
		.directive("delivery", delivery);

    function delivery() {
        var directive = {
            restrict: "EA",
            templateUrl: "./delivery.directive.html",
            controller: "ShoppingCartController",
            controllerAs: "cart",
            bindToController: true
        };

        return directive;
    }
})();