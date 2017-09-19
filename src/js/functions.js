// App
var wBooksApp = angular.module('wBooksApp', ['ngResource','ngRoute']);

// Controllers  
// wBooksApp.controller('resultsCtrl', ['$scope', function($scope, BookService) {
wBooksApp.controller('resultsCtrl', ['$scope', '$http', 'FavoriteService', function($scope, $http, FavoriteService) {
	$scope.wasSearched = false;
	$scope.invalidSearch = false;
	$scope.thereAreMoreBooks = false;
	$scope.loadDefault = false;
	$scope.loadItems = false;
	$scope.loadBookData = false;
	$scope.getBookData = false;

    $scope.getSearch = function () {
    	$scope.loadDefault = true;
    	var searchTerm = $scope.searchTerm.replace(/ /g, '+');
    	var index = 0;

    	getJson(searchTerm, index);

		$scope.getPage = function () {
    		$scope.loadItems = true;
			totalItems -=  10;

			if (totalItems > 0) {
				index += 10;
				getJson(searchTerm, index);
			}
		}
    }

    var getJson = function (searchTerm, index) {
    	url = 'https://www.googleapis.com/books/v1/volumes?q='+searchTerm+'&startIndex='+index+'&key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY';

		$http.get(url).
			then(function(response) {
				$scope.actualSearchTerm = $scope.searchTerm;

				if(response.data.items) {
					if (index == 0) { 
						totalItems = response.data.totalItems;
						$scope.bookResults = response.data.items;
						$scope.searchStatus = "itemsFound";
					} else {
						$scope.bookResults = $scope.bookResults.concat(response.data.items);
						$scope.loadItems = false;
					}

					if (totalItems >= 10){
						$scope.thereAreMoreBooks = true;
					} else {
						$scope.thereAreMoreBooks = false;
					}
					
					controlFavorites($scope.bookResults);
				} else {
					$scope.searchStatus = "404";
				}
				
				$scope.loadDefault = false;
			});
    }

    $scope.bookInfo = function (idBook) {
		$scope.getBookData = true;
		$scope.loadBookData = true;
    	
    	$http.get('https://www.googleapis.com/books/v1/volumes/'+idBook+'?key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY').
			then(function(response) {
				$scope.bookData = response.data;
				$scope.loadBookData = false;
			});
    }

    var controlFavorites = function(items) {
    	for (var i = 0; i < items.length; i++){
			items[i].isLocalStorageEnable = FavoriteService.isLocalStorageEnable;
			items[i].isFavorite = FavoriteService.isFavorite(items[i]);

			itemTesting = "alok2";

			items[i].markAs = function(type) {
				thisItem = this;

				switch(type) {
					case true :
						FavoriteService.setFav(thisItem);
						break;
					case false :
						FavoriteService.deleteFav(thisItem);
						break;
				}

				thisItem.isFavorite = type;
			}
    	}
    }
}]);

// Services
wBooksApp.service("FavoriteService",[function(){
    this.isLocalStorageEnable = function() {
        if(typeof (Storage) !== "undefined"){
            return true;
        }
        else{
            return false;
        }
    };

    this.isFavorite = function(scope){
        var fav = localStorage.getItem(scope.id);
        return fav === "1";
    };

    this.setFav = function(item){
        localStorage.setItem(item.id,"1");
    };

    this.deleteFav = function(item){
        localStorage.removeItem(item.id);
    };
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