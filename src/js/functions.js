// App
var wBooksApp = angular.module('wBooksApp', ['ngResource','ngRoute']);

// Controllers  
// wBooksApp.controller('resultsCtrl', ['$scope', function($scope, BookService) {
wBooksApp.controller('resultsCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.searched = false;

    $scope.getSearch = function () {
    	var searchTerm = $scope.searchTerm.replace(/ /g, '+');
    	var index = 0;

    	getJson(searchTerm, index);

		$scope.getPage = function () {
			totalItems -=  10;

			if (totalItems > 0) {
				index += 10;
				getJson(searchTerm, index);
			} else {
				// console.log("N falta mais");
			}

		}
    }

    var getJson = function (searchTerm, index) {
    	url = 'https://www.googleapis.com/books/v1/volumes?q='+searchTerm+'&startIndex='+index+'&key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY';
    	// console.log(url);

		$http.get(url).
			then(function(response) {
				$scope.searched = true;
				$scope.actualSearchTerm = $scope.searchTerm;

				if (index == 0) { 
					totalItems = response.data.totalItems;
					// console.log(totalItems);
					$scope.bookResults = response.data.items;
				} else {
					$scope.bookResults = $scope.bookResults.concat(response.data.items);
				}
			});
    }

    $scope.bookInfo = function (idBook) {
    	$http.get('https://www.googleapis.com/books/v1/volumes/'+idBook+'?key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY').
			then(function(response) {
				$scope.bookData = response.data;
			});
    }
}]);

// Filters
wBooksApp.filter('yearFilter', function () {
    return function (value) {
        if (value !== null) {
            var date = new Date(value);
            var year = date.getFullYear();
            return year;
        }   
    };
});

wBooksApp.filter("htmlFilter", ['$sce', function($sce) {
	return function(htmlCode){
		return $sce.trustAsHtml(htmlCode);
	}
}]);