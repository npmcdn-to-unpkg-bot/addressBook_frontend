addressBookApp.controller('AddressListCtrl', ['$scope', '$log', 'DataService',
    function ($scope, $log, DataService) {
        /*For testing suppose then server located on a localhost
         and run by Sympfony's cgi(app/console server:run command) on remote port 8000
         */
        //$translate.use('en');
        var serverURL = "http://localhost:8000";
        /*
         $scope.dataLoading = true;
         DataService.getData(serverURL).then(function (response) {
         $scope.addresses = response;
         }, function () {
         $log.debug("Can't load the data!");
         $scope.msgBox.show("Не удалось установить соединение с сервером")
         }).finally(function () {
         $scope.dataLoading = false;
         $log.debug($scope.addresses);
         });
         */

        /*Test array
         From database formAT 2016-08-24 23:00:00.000000
         */


//       /*
        $scope.addresses = [
            {
                country: 'Россия',
                city: 'Москва',
                street: 'Колбина',
                house: 25,
                postcode: 432056,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Москва',
                street: 'Лебедева',
                house: 18,
                postcode: 567895,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Ленина',
                house: 65,
                postcode: 432001,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Карла Маркса',
                house: 1,
                postcode: 433001,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Москва',
                street: 'Победы',
                house: 2,
                postcode: 679001,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Победы',
                house: 10,
                postcode: 678901,
                date: {
                    date: '2014-10-12 11:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Москва',
                street: 'Аблукова',
                house: 35,
                postcode: 678900,
                date: {
                    date: '2014-10-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Нариманова',
                house: 4,
                postcode: 154901,
                date: {
                    date: '2012-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Москва',
                street: 'Краснопресненская',
                house: 125,
                postcode: 678154,
                date: {
                    date: '2013-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Марата',
                house: 8,
                postcode: 145951,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }, {
                country: 'Россия',
                city: 'Ульяновск',
                street: 'Марата',
                house: 10,
                postcode: 146551,
                date: {
                    date: '2016-08-24 23:00:00.000000'
                }
            }
        ];
        //Date parsing to angular date format
        angular.forEach($scope.addresses, function (value, key) {
            var tmp = value.date.date.split(/[- :]/);
            value.date = new Date(Date.UTC(tmp[0], tmp[1] - 1, tmp[2] - 1, tmp[3], tmp[4], tmp[5]));
            delete(value.date.date);
        });
        //        */
        $scope.search = {
            country: "",
            street: "",
            postcode: "",
        }
        //House's fields and actions
        $scope.house = {
            houseNum : "",
            houseRangeShowed : false,
            houseClicked : function(){
                $log.debug("House clicked");
                this.houseRangeShowed = !this.houseRangeShowed;
            },
            houseRangeHide : function(){
                this.houseRangeShowed = false;
            }
        };
        //Regular expressions for fields house and postcode
        $scope.regexSet = {
            postcode: '\\d{1,9}',
            house: '\\d*-?\\d*'
        }

        //$log.debug($scope.addresses);
        //Default filter image is hided
        $scope.filterStatus = {
            country: false,
            city: false,
            street: false,
            house: false,
            postcode: false,
            date: false
        };

        //When filters are active filters img is showed
        $scope.filterApplied = {
            country: function () {
                $scope.filterStatus.country = $scope.search.country == "" ? false : true;  //check if filter is applied or not
            },
            city: function () {
                $scope.filterStatus.city = $scope.search.city == "" ? false : true;        //check if filter is applied or not
            },
            street: function () {
                $scope.filterStatus.street = $scope.search.street == "" ? false : true;     //check if filter is applied or not
            },
            house: function () {
                if ($scope.houseNum == null) {
                    $scope.filterStatus.house = false;
                    $scope.houseNum = "";
                    return;
                }
                $scope.filterStatus.house = true;
            },
            postcode: function () {
                if ($scope.search.postcode == null) {      // Default Angular's filter doesn't show null value
                    $scope.filterStatus.postcode = false;
                    $scope.search.postcode = "";
                    return;
                }
                $scope.filterStatus.postcode = true;
            },
            date: {
                startChanged: function () {
                    $scope.filterStatus.date = (($scope.minDate == "") ||
                    ($scope.minDate == null)) ? false : true; //check if filter is applied or not
                },
                endChanged: function () {
                    $scope.filterStatus.date = (($scope.maxDate == "") ||
                    ($scope.maxDate == null)) ? false : true; //check if filter is applied or not
                }
            }
        }

        //Default field and parameter for ordering
        $scope.sortType = "country";
        $scope.sortReverse = false;

        //Default parameters for pagination
        $scope.currentPage = 1;
        $scope.itemsPerPage = 25;
        $scope.maxSize = 5;

        //Datepickers settings
        $scope.dataPickers = {
            opened: {
                min: false,
                max: false
            },
            clicked: {
                min: function () {
                    $scope.dataPickers.opened.min = true;
                    //$log.debug("click event min");
                },
                max: function () {
                    $scope.dataPickers.opened.max = true;
                    //$log.debug("click event max");
                }

            }
        };

        //Message box element for error information
        $scope.msgBox = {
            status: false,
            message: "",
            show: function (msg) {
                this.status = true;
                this.message = msg;
            },
            hide: function () {
                this.status = false;
            },
            clear: function () {
                this.message = "";
            }
        };

        //Not used
        $scope.paginationChanged = function () {
        }
    }]);