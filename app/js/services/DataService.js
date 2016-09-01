/**
 * Created by majak on 28.08.16.
 */
addressBookApp.service('DataService', ['$http','$log', function ($http, $log) {
    var DataService = {
        getData: function (serverURL) {
            var promise = $http.get(serverURL).then(function (response) {
                $log.debug("JSON acepted");
                $log.debug(response);
                return response.data;
            });
            return promise;
        }
        };
        return DataService;
}]);