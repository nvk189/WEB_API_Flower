var app = angular.module("AppBanHoa", []);
app.controller("NhaCungCap", function ($scope, $http) {
    $scope.nhasx = [];
    $scope.maloaisp=[];
    $scope.manhasx
    
    $scope.loadData = function (selectedItem) {
    
      $scope.manhasx = selectedItem.maNhaCungCap;
      $scope.tennhasx = selectedItem.tenNhaCungCap;
      $scope.sodt = selectedItem.dienThoai;
      $scope.email = selectedItem.email;
      $scope.diachi = selectedItem.diaChi;
  };

  $scope.NhapMoi= function () {
    document.getElementById('mancc').value = '';
    document.getElementById('tenncc').value = '';
    document.getElementById('sdtncc').value = '';
    document.getElementById('emailncc').value = '';
    document.getElementById('diachincc').value = '';

   
}
    $scope.GetNhaSX = function () {
      $http({
        method: "GET",
        url: current_url + "/api/NhaCungCap/get-all",
      }).then(function (response) {
      
        $scope.nhasx = response.data;
        updatePagination($scope.nhasx)
      });
    };
    $scope.GetNhaSX();


// thêm nhà cung cấp
    $scope.them = function() {
      var data = {
          tenNhaCungCap: $scope.tennhasx,
          dienThoai: $scope.sodt,
          email: $scope.email,
          diaChi: $scope.diachi,
      };
     if( document.getElementById('sdtncc').value != ''){
  
         $http({
             method: 'POST',
             url: current_url + "/api/NhaCungCap/create",
             data: JSON.stringify(data),
         })
         .then(function(response) {
           $scope.themloaisp = response.data;
           
           alert('Thêm thành công')
           $scope.GetNhaSX();
          
     
         })
         .catch(function(error) {
             window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
             console.error('Error:', error);
         });
     }
     else{
      alert('Nhập đầy đủ thông tin')
     }
  }

  // sửa nhà cung cấp
  $scope.sua = function() {
    var data = {
        maNhaCungCap: $scope.manhasx,
        tenNhaCungCap: $scope.tennhasx,
        dienThoai: $scope.sodt,
        email: $scope.email,
        diaChi: $scope.diachi,
    };
   if( document.getElementById('sdtncc').value != ''){

       $http({
           method: 'POST',
           url: current_url + "/api/NhaCungCap/update",
           data: JSON.stringify(data),
       })
       .then(function(response) {
         $scope.themloaisp = response.data;
         
         alert('Sửa thành công')
         $scope.GetNhaSX();
       })
       .catch(function(error) {
           window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
           console.error('Error:', error);
       });
   }
   else{
    alert('Nhập đầy đủ thông tin')
   }
}



// tìm kiếm  
      $scope.page= 1
      $scope.pageSize=100000

      $scope.SearchSX = function () {
        if(  document.getElementById('search-supplier').value != ''){
          $http({
            method: "POST",
            url: "https://localhost:7261/api/NhaCungCap/search",
            data: { page:$scope.page ,
              pageSize:$scope.pageSize, 
              tenNhaCungCap: $scope.searchnhasx}
        }).then(function (response) {
          $scope.nhasx = response.data.data;
          updatePagination($scope.nhasx)
        });
      }
      else (
          alert('Nhập thông tin tìm kiếm')
            )
      }

    /// phần trang tương ứng cho ds
    function updatePagination(maloaisp) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 5;
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
          $scope.nhasx = maloaisp.slice(begin, end);
      };
      $scope.setPage = function (page) {
          $scope.currentPage = page;
          $scope.getData();
      };
      $scope.getData();
    }
  })