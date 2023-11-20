app 
app.controller("thongke", function ($scope, $http) {

    var today = new Date();
    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0, nên cần cộng thêm 1.
        var year = date.getFullYear();
    
        // Đảm bảo rằng ngày và tháng luôn có 2 chữ số
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
    
        return year + '-' + month + '-' + day;
    }
    $scope.thongke=[];
    $scope.GetMoney = function () {
        var data ={
            fr_NgayTao : formatDate(today),
            to_NgayTao: formatDate(today)
        }
        // var data ={
        //     fr_NgayTao : '2023-10-05',
        //     to_NgayTao: '2023-10-06'
        // }
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
         
          $scope.thongke = response.data.data;
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };
      $scope.GetMoney();


      $scope.SearchMoney = function () {
        var data ={
            fr_NgayTao : $scope.searchfr,
            to_NgayTao:  $scope.searchto
        }
       
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
         
          $scope.thongke = response.data.data;
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };



      function updatePagination(maloaisp) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 6;
        $scope.about= maloaisp.length
        $scope.pages = [];
        $scope.totalPages = 0;
        $scope.totalPages = Math.ceil(maloaisp.length / $scope.itemsPerPage);
        for (var i = 1; i <= $scope.totalPages; i++) {
            $scope.pages.push(i);
        }
        $scope.getData = function () {
            var begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
            var end = begin + $scope.itemsPerPage;
            $scope.thongke = maloaisp.slice(begin, end);
        };
        $scope.setPage = function (page) {
            $scope.currentPage = page;
            $scope.getData();
        };
        $scope.getData();
      }



      // thống kê ngày hiện tại của hóa đơn bán 
     
    
})