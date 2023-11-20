var app = angular.module("AppBanHoa", []);

app.controller("KhachHang", function ($scope, $http) {
    $scope.khachhang = [];
    $scope.itemkh=[];
    
  
    $scope.GetKhachHang = function () {
      $http({
        method: "GET",
        url: current_url + "/api/KhachHang/get-all",
      }).then(function (response) {
      
        $scope.khachhang = response.data;
        updatePagination($scope.khachhang)
      });
    };
    $scope.GetKhachHang();

    $scope.categoryChanged = function() {
      const category = document.querySelector("#gioitinh");
      let categoryItem = category.value;
      $scope.idCategory = categoryItem;
      // console.log( $scope.idCategory);
  
 
  };
   

  $scope.loadData = function (selectedItem) {
    
    $scope.makh = selectedItem.maKhachHang;
    $scope.tenkh = selectedItem.hoTen;
    $scope.sodt = selectedItem.dienThoai;
    $scope.email = selectedItem.email;
    $scope.diachi = selectedItem.diaChi;
    if (selectedItem.gioiTinh === true) {
      $scope.idCategory = "true";
    } else if (selectedItem.gioiTinh === false) {
      $scope.idCategory= "false"; 
    } else {
      $scope.idCategory= "choose"; 
    }
    }

  


$scope.NhapMoi= function () {
  document.getElementById('makh').value = '';
  document.getElementById('tenkh').value = '';
  document.getElementById('sdtkh').value = '';
  document.getElementById('emailkh').value = '';
  document.getElementById('diachikh').value = '';
  document.getElementById('gioitinh').value = 'choose';
  $scope.GetKhachHang();
  document.getElementById('search-customer').value = '';


 
}

  //thêm
  // $scope.makh
  $scope.them = function() {
    var data = {
      maKhachHang: $scope.makh,
      hoTen: $scope.tenkh,
      gioiTinh: JSON.parse($scope.idCategory),
      email: $scope.email,
      dienThoai: $scope.sodt,
      diaChi: $scope.diachi,
    };
   if( document.getElementById('sdtkh').value != ''){

       $http({
           method: 'POST',
           url: current_url + "/api/KhachHang/create-khach",
           data: JSON.stringify(data),
       })
       .then(function(response) {
         $scope.itemkh = response.data;
         
         alert('Thêm thành công')
         $scope.GetKhachHang();
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



//sửa

$scope.sua = function() {
  var data = {
    maKhachHang: $scope.makh,
    hoTen: $scope.tenkh,
    gioiTinh: JSON.parse($scope.idCategory),
    email: $scope.email,
    dienThoai: $scope.sodt,
    diaChi: $scope.diachi,
  };
 if( document.getElementById('sdtkh').value != ''){

     $http({
         method: 'POST',
         url: current_url + "/api/KhachHang/update-khach",
         data: JSON.stringify(data),
     })
     .then(function(response) {
       $scope.itemkh = response.data;
       
       alert('Sửa thành công')
       $scope.GetKhachHang();

      
 
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
$scope.Search = function () {
  var data ={
    page: 1,
    pageSize: 100,
    ten_khach : $scope.search
  }
  if(  document.getElementById('search-customer').value != ''){
    $http({
      method: "POST",
      url: 'https://localhost:7261/api/KhachHang/search',
      data : {page: 1,
        pageSize: 10000,
        ten_khach : $scope.search}
    }).then(function (response) {
      $scope.khachhang = response.data.data;
      console.log( $scope.khachhang)
      // updatePagination($scope.khachhang)
    });
  }
  else (
    alert('Nhập thông tin tìm kiếm')
    )
  }
  // $scope.updatePagination($scope.khachhang);



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
          $scope.khachhang = maloaisp.slice(begin, end);
      };
      $scope.setPage = function (page) {
          $scope.currentPage = page;
          $scope.getData();
      };
      $scope.getData();
    }
})