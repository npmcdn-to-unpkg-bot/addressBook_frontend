/**
 * Created by majak on 28.08.16.
 */
addressBookApp.service('DataService', ['$http', '$log', '$timeout', function ($http, $log, $timeout) {
    return {
        getData: function (serverURL) {
            var promise = $http.get(serverURL).then(function (response) {
                $log.debug("Connection ok");
                //Parse date to angular's date format
                angular.forEach(response.data, function (value, key) {
                    var tmp = value.date.date.split(/[- :]/);
                    value.date = new Date(Date.UTC(tmp[0], tmp[1] - 1, tmp[2] - 1, tmp[3], tmp[4], tmp[5]));
                    delete(value.date.date);
                });
                return response.data;
            });
            return promise;
        }
    };
}]);