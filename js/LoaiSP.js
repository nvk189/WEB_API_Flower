var app = angular.module("AppBanHoa", []);

app.controller("LoaiSP", function ($scope, $http) {
  $scope.themloaisp = [];
  $scope.maloaisp=[];
  $scope.tenloaisp='',
 

  
  
/// lấy tất cả thông tin loại sản phẩm
  $scope.GetLoaiSP = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ChuyenMuc/get-all",
    }).then(function (response) {
    
      $scope.maloaisp = response.data;
      
        // phân trang
      updatePagination($scope.maloaisp)
      
    });
  };
  $scope.GetLoaiSP();

  



  // thêm 
  $scope.them = function() {
    var data = {
        maChuyenMuc: $scope.maChuyenMuc,
        tenChuyenMuc: $scope.tenloaisp
    };
   if( document.getElementById('tenloai').value != ''){

       $http({
           method: 'POST',
           url: current_url + "/api/ChuyenMuc/create",
           data: JSON.stringify(data),
       })
       .then(function(response) {
         $scope.themloaisp = response.data;
         
         alert('Thêm thành công')
         $scope.GetLoaiSP();
        
   
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

// sửa
$scope.sua = function() {
    var data = {
        maChuyenMuc: $scope.maChuyenMuc,
        tenChuyenMuc: $scope.tenloaisp
    };
   if( document.getElementById('tenloai').value != ''){

       $http({
           method: 'POST',
           url: current_url + "/api/ChuyenMuc/update",
           data: JSON.stringify(data),
       })
       .then(function(response) {
         $scope.themloaisp = response.data;
         
         alert('Sửa thành công')
         $scope.GetLoaiSP();
         $scope.NhapMoi();
        
   
       })
       .catch(function(error) {
           window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
           console.error('Error:', error);
       });
   }
   else{
    alert('Chọn thông tin cần sửa ')
   }
} 
//

$scope.loadData = function (selectedItem) {
    
    $scope.maChuyenMuc = selectedItem.maChuyenMuc;
    $scope.tenloaisp = selectedItem.tenChuyenMuc;
};

// hàm nhập mới
$scope.NhapMoi= function () {
    document.getElementById('maloai').value = '';
    document.getElementById('tenloai').value = '';
    document.getElementById('search-product-type').value = '';

   
}



// tìm kiếm 


    $scope.SearchCM = function () {
        if(  document.getElementById('search-product-type').value != ''){
        $http({
          method: "GET",
          url: `https://localhost:7261/api/ChuyenMuc/search/${$scope.searchcm}`,
        }).then(function (response) {
          $scope.maloaisp = response.data;
          updatePagination($scope.maloaisp)
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
        $scope.maloaisp = maloaisp.slice(begin, end);
    };
    $scope.setPage = function (page) {
        $scope.currentPage = page;
        $scope.getData();
    };
    $scope.getData();
}
});









