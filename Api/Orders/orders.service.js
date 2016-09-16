(function () {
    "use strict";

    angular
      .module("orders")
      .service("ordersService", ordersService);

    ordersService.$inject = ["$http"];

    function ordersService($http) {
        var service = {
            getOrders: getOrders,
            removeOrder: removeOrder
        };

        return service;

        function getOrders() {
            var address = "/api/orders";

            return $http.get(address)
              .then(getOrdersComplete);

            function getOrdersComplete(response) {
                return response.data;
            }
        }

        function removeOrder(order) {
            var address = "/api/orders/" + order.Id;

            return $http.delete(address)
              .then(removeOrderComplete);

            function removeOrderComplete(response) {
                return response;
            }
        }
    }
})();