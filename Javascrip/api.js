
app

app.controller("HomeCtrl", function ($scope, $http) {
  $scope.listItem = [];
  $scope.product1 = [];
  $scope.listItemhot=[];
  $scope.listItemNew=[];
 
  $scope.GetBanChay = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ThongKe/sanphamthongke?id=4",
    }).then(function (response) {
      console.log(response.data);
      $scope.listItem = response.data;
    });
  };
  $scope.GetBanChay();


  /// sản phẩm bán chay đặt nhiều nhất 

  $scope.GetHot = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ThongKe/sanphamthongke?id=2",
    }).then(function (response) {
      console.log(response.data);
      $scope.listItemhot = response.data;
    });
  };
  $scope.GetHot();


  /////// sản phẩm mới 
  
  $scope.GetNew = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ThongKe/sanphamthongke?id=3",
    }).then(function (response) {
      console.log(response.data);
      $scope.listItemNew = response.data;
    });
  };
  $scope.GetNew();


});


