addressBookApp.controller('AddressListCtrl',['$scope','$log',function($scope,$log){
        $scope.addresses = [
            {
                country: 'Россия',
                city:'Москва',
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

    //set default parameters for sortType
    $scope.sortType = "country";
    $scope.sortReverse = false;

    //set default parameters for pagination
    $scope.currentPage = 1;
    $scope.itemsPerPage = 5;
    $scope.maxSize = 5;
	
	$scope.filterStatus = {
	    country : false,
        city: false,
        street: false,
        house: false,
        postcode: false,
        date: false
    };
    $scope.cityClickEvent = function(){
                $log.debug("click on filter");
    };
	$scope.filter = {
		country : function(){
            $scope.filterStatus.country = $scope.search.country == "" ? false : true;
            $log.debug($scope.search.country);
		},
		city : function(){
			$scope.filterStatus.city = $scope.search.city == "" ? false : true;
            $log.debug($scope.search.city);
		}
	}
    //
    $scope.paginationChanged = function() {
    }
}]);