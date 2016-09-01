/**
 * Created by majak on 28.08.16.
 */
addressBookApp.service('DataService', ['$http','$log','$timeout', function ($http, $log, $timeout) {
    return {
        getData: function (serverURL) {
            var promise = $http.get(serverURL).then(function (response) {
                $log.debug("Connection ok");
                return response.data;
            });
            return promise;
        }
        };
}]);