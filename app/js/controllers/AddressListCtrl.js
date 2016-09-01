addressBookApp.controller('AddressListCtrl', ['$scope', '$log', '$http', 'DataService',
    function ($scope, $log, $http, DataService) {
        /*For testing suppose then server located on a localhost
         and run by Sympfony's cgi(app/console server:run command) on remote port 8000
         */
        var serverURL = "http://localhost:8000";

        $scope.dataLoading = true;
        DataService.getData(serverURL).then(function (response) {
            $scope.addresses = response;
        }, function () {
            $log.debug("Can't load the data!");
            $scope.msgBox.show("Не удалось установить соединение с сервером")
        }).finally(function () {
            $scope.dataLoading = false;
        });

        /*Test array
         From database formAT 2016-08-24 23:00:00.000000
         $scope.addresses = [
         {
         country: 'Россия',
         city: 'Москва',
         street: 'Колбина',
         house: 25,
         postcode: 432056,
         date: '2016-12-05'
         }, {
         country: 'Россия',
         city: 'Москва',
         street: 'Лебедева',
         house: 18,
         postcode: 567895,
         date: '2016-11-05'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Ленина',
         house: 65,
         postcode: 432001,
         date: '2013-04-08'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Карла Маркса',
         house: 1,
         postcode: 433001,
         date: '2016-11-01'
         }, {
         country: 'Россия',
         city: 'Москва',
         street: 'Победы',
         house: 2,
         postcode: 6789001,
         date: '2012-07-01'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Победы',
         house: 10,
         postcode: 6789001,
         date: '2016-11-01'
         }, {
         country: 'Россия',
         city: 'Москва',
         street: 'Аблукова',
         house: 35,
         postcode: 6789001,
         date: '2015-05-01'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Нариманова',
         house: 4,
         postcode: 1549001,
         date: '2016-12-01'
         }, {
         country: 'Россия',
         city: 'Москва',
         street: 'Краснопресненская',
         house: 125,
         postcode: 678154,
         date: '2016-11-01'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Марата',
         house: 8,
         postcode: 145951,
         date: '2012-04-01'
         }, {
         country: 'Россия',
         city: 'Ульяновск',
         street: 'Марата',
         house: 10,
         postcode: 146551,
         date: '2013-09-01'
         }

         ];
         */

        //set default parameters for sortType
        $scope.sortType = "country";
        $scope.sortReverse = false;

        //set default parameters for pagination
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 5;

        $scope.filterStatus = {
            country: false,
            city: false,
            street: false,
            house: false,
            postcode: false,
            date: false
        };
        $scope.filter = {
            country: function () {
                $scope.filterStatus.country = $scope.search.country == "" ? false : true;  //check if filter is applied or not
                $log.debug($scope.search.country);
            },
            city: function () {
                $scope.filterStatus.city = $scope.search.city == "" ? false : true;        //check if filter is applied or not
                $log.debug($scope.search.city);
            },
            street: function () {
                $scope.filterStatus.street = $scope.search.street == "" ? false : true;     //check if filter is applied or not
                $log.debug($scope.search.street);
            },
            house: function () {
                $scope.filterStatus.house = $scope.search.house == "" ? false : true;       //check if filter is applied or not
                $log.debug($scope.search.house);
            },
            postcode: function () {
                $scope.filterStatus.postcode = $scope.search.postcode == "" ? false : true; //check if filter is applied or not
                $log.debug($scope.search.postcode);
            },
            date: function () {
                $scope.filterStatus.date = $scope.search.date == "" ? false : true;         //check if filter is applied or not
                $log.debug($scope.search.date);
            }
        }

        //Message box element for error information
        $scope.msgBox = {
            status : false,
            message : "",
            show : function(msg){
                this.status = true;
                this.message = msg;
            },
            hide : function(){
                this.status = false;
            },
            clear : function(){
                this.message = "";
            }
        };

        //Not used
        $scope.paginationChanged = function () {
        }
    }]);