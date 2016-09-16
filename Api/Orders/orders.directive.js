(function () {
    "use strict";

    angular
		.module("orders")
		.directive("orders", orders);

    function orders() {
        var directive = {
            restrict: "EA",
            templateUrl: "./orders.directive.html",
            controller: "OrdersController",
            controllerAs: "ord",
            bindToController: true
        };

        return directive;
    }
})();