wBooksApp.service('BookSearchService', ['$http', 'FavoriteService', function($http, FavoriteService){
    this.getSearch = function(searchedTerm, indexOfFirstItemOfThisPage, $scope){
        urlOfJson = 'https://www.googleapis.com/books/v1/volumes?q='+searchedTerm+'&startIndex='+indexOfFirstItemOfThisPage+'&key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY';

        $http.get(urlOfJson).
            then(function(response) {
                $scope.actualSearchTerm = $scope.typingSearchTerm;

                if(response.data.items) { // Verify if there are results for show
                    if (indexOfFirstItemOfThisPage == 0) { // When it's a new search
                        totalItemsForShow = response.data.totalItems;
                        $scope.itemsFound = response.data.items;
                        $scope.searchStatus = "itemsFound";
                    } else { // When it's a pagination
                        $scope.itemsFound = $scope.itemsFound.concat(response.data.items);
                        $scope.showLoadPagination = false;
                    }

                    // Toggle button for show more items
                    if (totalItemsForShow >= 10){
                        $scope.thereAreMoreItems = true;
                    } else {
                        $scope.thereAreMoreItems = false;
                    }
                    
                    FavoriteService.getService($scope.itemsFound, "calledFromBookSearch");
                } else { // If there aren't results for show
                    $scope.searchStatus = "404";
                }
                
                $scope.showLoadDefault = false;
            });
    }
}]);

wBooksApp.service('BookDataService', ['$http', 'FavoriteService', function($http, FavoriteService){
    this.getData = function(idItemForReturnData, $scope){
        $http.get('https://www.googleapis.com/books/v1/volumes/'+idItemForReturnData+'?key=AIzaSyDE0-szZIrViSPNB284ckdUhvp3pyFLPsY').
            then(function(response) {
                $scope.itemData = response.data;
                $scope.showLoadItemData = false;
                FavoriteService.getService($scope.itemData, "calledFromBookData");
            });
    };
}]);

wBooksApp.service('FavoriteService', [function(){
    thisService = this;

    this.getService = function(itemsReceivedToControlStatusFavorite, whereServiceWasCalled) {
        var controlStatusFavoriteOnItem = function(itemForControlStatusFavorite){
            itemForControlStatusFavorite.verifyIfBrowserSupportsLocalStorage = thisService.verifyIfBrowserSupportsLocalStorage;
            itemForControlStatusFavorite.isFavorite = thisService.isFavorite(itemForControlStatusFavorite);

            itemForControlStatusFavorite.statusFavorite = function(valueStatusFavorite) {
                thisItemFound = this;

                switch(valueStatusFavorite) {
                    case true :
                        thisService.setItemAsFavorite(thisItemFound);
                        break;
                    case false :
                        thisService.setItemAsNotFavorite(thisItemFound);
                        break;
                }

                thisItemFound.isFavorite = valueStatusFavorite;
            }
        }

        switch(whereServiceWasCalled) {
            case "calledFromBookSearch" :
                for (var indexTempForEachItemFound = 0; indexTempForEachItemFound < itemsReceivedToControlStatusFavorite.length; indexTempForEachItemFound++){
                    itemForControlStatusFavorite = itemsReceivedToControlStatusFavorite[indexTempForEachItemFound];
                    controlStatusFavoriteOnItem(itemForControlStatusFavorite);
                }
                break;
            case "calledFromBookData" :
                itemForControlStatusFavorite = itemsReceivedToControlStatusFavorite;
                controlStatusFavoriteOnItem(itemForControlStatusFavorite);
                break;
        }
    }

    this.verifyIfBrowserSupportsLocalStorage = function() {
        if(typeof (Storage) !== "undefined"){ // If support Local Storage
            return true;
        } else { // If no support Local Storage
            return false;
        }
    };

    this.isFavorite = function(itemForVerify){
        var statusFavorite = localStorage.getItem(itemForVerify.id);
        return statusFavorite === "1";
    };

    this.setItemAsFavorite = function(itemForSetAsFavorite){
        localStorage.setItem(itemForSetAsFavorite.id,"1");
    };

    this.setItemAsNotFavorite = function(itemForSetAsNotFavorite){
        localStorage.removeItem(itemForSetAsNotFavorite.id);
    };
}]);