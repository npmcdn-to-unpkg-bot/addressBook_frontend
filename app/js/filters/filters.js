addressBookApp.filter('startFrom',function(){
	return function(input,start,end){
		if(input) {
			start = +start; //parse to int ?
			return input.slice(start,end);
		}
		return[];
	}
});
addressBookApp.filter('dateFilter', ['$log', function($log){
	/*TODO need to check correctly work*/
	return function(input,minDate,maxDate){
		var out = [];
		if (minDate == undefined || maxDate == undefined) return input;
		//if (maxDate.getTime() <= minDate.getTime())
		angular.forEach(input,function(value,key){
			if(value.date.getTime() >= minDate.getTime() && value.date.getTime() <= maxDate.getTime())
				out.push(value);
		});
		return out;
	}	
}]);
addressBookApp.filter('rangeFilter', ['$log', function($log){
	return function(input, range){
		$log.debug("Range filter. Input data: ");
		$log.debug(input);
		//var tmp = input.split(/[-]/);
		//$log.debug("range checked: " + tmp);
		return input;
	}
}]);