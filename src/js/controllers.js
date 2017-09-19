wBooksApp.controller('booksCtrl', ['$scope', '$http', 'BookSearchService', 'BookDataService', function($scope, $http, BookSearchService, BookDataService) {
	// Default settings for scopes
	$scope.showLoadDefault = false;
	$scope.showLoadPagination = false;
	$scope.showItemData = false;

	// Search function
    $scope.getSearch = function () {
    	$scope.showLoadDefault = true;
    	searchedTerm = $scope.typingSearchTerm.replace(/ /g, '+');
    	indexOfFirstItemOfThisPage = 0;

    	BookSearchService.getSearch(searchedTerm, indexOfFirstItemOfThisPage, $scope);
    }

    // Pagination
	$scope.getMoreItems = function () {
		$scope.showLoadPagination = true;
		totalItemsForShow -= 10;
		indexOfFirstItemOfThisPage += 10;
		
		BookSearchService.getSearch(searchedTerm, indexOfFirstItemOfThisPage, $scope);
	}

	// Details of item
    $scope.getItemData = function (idItemForReturnData) {
		$scope.showItemData = true;
		$scope.showLoadItemData = true;

		BookDataService.getData(idItemForReturnData, $scope);
    }
}]);