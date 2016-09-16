(function () {
    "use strict";

    angular
		.module("shoppingCart")
		.directive("purchaseSummary", purchaseSummary);

    function purchaseSummary() {
        var directive = {
            restrict: "EA",
            templateUrl: "./purchaseSummary.directive.html",
            controller: "ShoppingCartController",
            controllerAs: "cart",
            bindToController: true
        };

        return directive;
    }
})();