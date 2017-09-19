wBooksApp.filter('yearFilter', function () {
    return function (dateByJson) {
        if (dateByJson !== null) {
            var date = new Date(dateByJson);
            var year = date.getFullYear();
            return year;
        }   
    };
});

wBooksApp.filter("htmlFilter", ['$sce', function($sce) {
	return function(htmlByJson){
		return $sce.trustAsHtml(htmlByJson);
	}
}]);