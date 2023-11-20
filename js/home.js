
var app = angular.module('AppBanHang', []);

app.controller("HomeCtrl", function ($scope, $http) {
$scope.listItem = [];
    $scope.GetBanChay= function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/get-all',
        }).then(function (response) {  
            console.log(response);
            $scope.listItem = response.data;  
        });
    };   
	$scope.GetBanChay();




    $scope.sanpham;	 
    $scope.GetSanPham= function () {
        $http({
            method: 'GET', 
            url: current_url + '/api/SanPham/get-by-id/47',
        }).then(function (response) {  
            debugger;
            $scope.sanpham = response.data;  
        });
    };   
	$scope.GetSanPham();
});