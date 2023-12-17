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
       
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.Sum=0;
          $scope.thongke = response.data.data;
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
           
            $scope.Sum += currentElement.doanhThu;
          }
          console.log( $scope.totalAmount)
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };
      $scope.GetMoney();

 // tìm kiếm theo ngày 
      $scope.SearchMoney = function () {
        var data ={
            fr_NgayTao : formatDate( $scope.searchfr),
            to_NgayTao:  formatDate( $scope.searchto)
        }
       
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.sum=0
          $scope.thongke = response.data.data;
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
           
            $scope.Sum += currentElement.doanhThu;
          }
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };

  


  // phân trang
      function updatePagination(maloaisp) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 8;
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



      // thống kê ngày hiện tại 
      $scope.getdate=[]
      
      $scope.GetDate = function () {
        var data ={
            fr_NgayTao : formatDate(today),
            to_NgayTao: formatDate(today)
      
        }
      
        console.log(data)
        $http({
          method: "POST",
          url:  "https://localhost:7261/api/HoaDon/GetSearch",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.numberbill = 0;
          $scope.totalAmount=0;
          $scope.productsSold=0;
          $scope.falseStatusCount=0;
          // $scope.getdate = response.data;
          $scope.thongke = response.data;
          console.log($scope.thongke)
          updatePagination($scope.thongke)
          
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
            $scope.numberbill++;
            $scope.totalAmount += currentElement.tongTien;
           
            for (var j = 0; j < currentElement.list_json_chitiethoadon.length; j++) {
              $scope.productsSold += currentElement.list_json_chitiethoadon[j].soLuong;
            }
      
            
            if (!currentElement.trangThai) {
              $scope.falseStatusCount++;
            }
          }
          
        });
      };


      $scope.GetDate();


});

app.controller("thongkehdb", function ($scope, $http) {
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
       
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.Sum=0;
          $scope.thongke = response.data.data;
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
           
            $scope.Sum += currentElement.doanhThu;
          }
          console.log( $scope.totalAmount)
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };
      $scope.GetMoney();

 // tìm kiếm theo ngày 
      $scope.SearchMoney = function () {
        var data ={
            fr_NgayTao : formatDate( $scope.searchfr),
            to_NgayTao:  formatDate( $scope.searchto)
        }
       
        console.log(data)
        $http({
          method: "POST",
          url: current_url + "/api/ThongKe/thống kê doanh thu",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.sum=0
          $scope.thongke = response.data.data;
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
           
            $scope.Sum += currentElement.doanhThu;
          }
          console.log($scope.thongke)
          updatePagination($scope.thongke)
        });
      };

  


  // phân trang
      function updatePagination(maloaisp) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 8;
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



      // thống kê ngày hiện tại 
      
      
      $scope.GetDate = function () {
        var data ={
            fr_NgayTao : formatDate(today),
            to_NgayTao: formatDate(today)
      
        }
      
        console.log(data)
        $http({
          method: "POST",
          url:  "https://localhost:7261/api/HoaDon/GetSearch",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.numberbill = 0;
          $scope.totalAmount=0;
          $scope.productsSold=0;
          $scope.falseStatusCount=0;
          // $scope.getdate = response.data;
          $scope.thongke = response.data;
          console.log($scope.thongke)
          updatePagination($scope.thongke)
          
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
            $scope.numberbill++;
            $scope.totalAmount += currentElement.tongTien;
           
            for (var j = 0; j < currentElement.list_json_chitiethoadon.length; j++) {
              $scope.productsSold += currentElement.list_json_chitiethoadon[j].soLuong;
            }
      
            
            if (!currentElement.trangThai) {
              $scope.falseStatusCount++;
            }
          }
          
        });
      };


      $scope.GetDate();


      // thống kê hóa đơn bán
      // ngày bất kỳ
      $scope.GetDateBan = function () {
        var data ={
            fr_NgayTao : new Date($scope.searchbanfr),
            to_NgayTao: new Date($scope.searchbanto)
      
        }
      
        console.log(data)
        $http({
          method: "POST",
          url:  "https://localhost:7261/api/ThongKe/thống kê hóa đơn bán",
          data: JSON.stringify(data)
        }).then(function (response) {
          $scope.thongke=[]
          $scope.numberbill = 0;
          $scope.totalAmount=0;
          $scope.productsSold=0;
          $scope.falseStatusCount=0;
          $scope.thongke = response.data.data;
          console.log($scope.thongke)
          updatePagination($scope.thongke)
          
          for (var i = 0; i < $scope.thongke.length; i++) {
            var currentElement = $scope.thongke[i];
            $scope.numberbill++;
            $scope.totalAmount += currentElement.tongTien;
           
            for (var j = 0; j < currentElement.list_json_chitiethoadon.length; j++) {
              $scope.productsSold += currentElement.list_json_chitiethoadon[j].soLuong;
            }
      
            
            if (!currentElement.trangThai) {
              $scope.falseStatusCount++;
            }
          }
          
        });
      
  };


  
});
      // ngày bất kỳ
    /// thống kê hóa đơn nhập
app.controller("thongkehdn", function ($scope, $http) {
    $scope.GetDateNhap = function () {
      var data ={
          fr_NgayTao : new Date($scope.searchbanfr),
          to_NgayTao: new Date($scope.searchbanto)
    
      }
    
      console.log(data)
      $http({
        method: "POST",
        url:  "https://localhost:7261/api/ThongKe/thống kê hóa đơn nhập",
        data: JSON.stringify(data)
      }).then(function (response) {
        $scope.thongke=[]
        $scope.numberbill = 0;
        $scope.totalAmountN=0;
        $scope.productsSold=0;
        $scope.falseStatusCount=0;
        $scope.thongke = response.data.data;
        console.log($scope.thongke)
        updatePagination($scope.thongke)
        
        for (var i = 0; i < $scope.thongke.length; i++) {
          var currentElement = $scope.thongke[i];
          $scope.numberbill++;
          $scope.totalAmountN += currentElement.tongTien;
         
         
    
          for (var j = 0; j < currentElement.list_json_chitiethoadonnhap.length; j++) {
            $scope.productsSold += currentElement.list_json_chitiethoadonnhap[j].soLuong;
          }
         
        }
        
      });
    };

    // phân trang
    function updatePagination(maloaisp) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
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

    
})

app.controller("thongkesp", function ($scope, $http) {

  $scope.GetBanChay = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ThongKe/sanphamthongke?id=4",
    }).then(function (response) {
      console.log(response.data);
      $scope.listItem = response.data;

      for (var i = 0; i < $scope.listItem.length; i++) {
        $scope.number_sales[i] = ($scope.listItem[i].gia - $scope.listItem[i].giaGiam)/ $scope.listItem[i].gia * 100;
      }
      console.log($scope.number_sales);
      console.log($scope.listItem);
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
      $scope.listItem = response.data;
    });
  };
  // $scope.GetHot();


  /////// sản phẩm mới 
  
  $scope.GetNew = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ThongKe/sanphamthongke?id=3",
    }).then(function (response) {
      console.log(response.data);
      $scope.listItem= response.data;
    });
  };
  // $scope.GetNew();


 
})