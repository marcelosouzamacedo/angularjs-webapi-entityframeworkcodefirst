(function () {
    "use strict";

    angular
      .module("orders")
      .controller("OrdersController", OrdersController);

    OrdersController.$inject = ["$scope", "ordersService"];

    function OrdersController($scope, ordersService) {
        var vm = this;

        vm.describeDeliveryOption = describeDeliveryOption;
        vm.orders = [];
        vm.removeOrder = removeOrder;

        listOrders();

        function describeDeliveryOption(deliveryOption) {
            switch (deliveryOption) {
                case "site":
                    return "No Local";
                case "home":
                    return "Em Domicílio";
            }
        }

        function listOrders() {
            return ordersService
              .getOrders()
              .then(function (data) {
                  vm.orders = data;
                  return vm.orders;
              });
        }

        function removeOrder(order) {
            return ordersService.removeOrder(order).then(function() {
                for (var i = 0; i < vm.orders.length; i++) {
                    if (vm.orders[i].Id === order.Id)
                        vm.orders.splice(i, 1);
                }
            });
        }
    }
})();