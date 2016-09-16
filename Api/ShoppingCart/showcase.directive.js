(function () {
	"use strict";

	angular
		.module("shoppingCart")
		.directive("showcase", showcase);

	function showcase() {
		var directive = {
			restrict: "EA",
			templateUrl: "./showcase.directive.html",
			controller: "ShoppingCartController",
			controllerAs: "cart",
			bindToController: true
		};

		return directive;
	}
})();