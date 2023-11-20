var app = angular.module("AppBanHoa", []);

app.controller("Bill", function ($scope, $http) {
  $scope.NhanVien = [];
  $scope.nhaSXValues = [];
  $scope.NhaSX=[];
  $scope.Nhap=[];
  $scope.createNhap=[];
  $scope.products = [];
  $scope.manhasx;
  $scope.maNVkho;
  

  $scope.GetNhaSX = function () {
    $http({
      method: "GET",
      url: current_url + "/api/NhaCungCap/get-all",
    }).then(function (response) {
    
      $scope.NhaSX = response.data;
     
    });
  };
  $scope.GetNhaSX();

  $scope.GetNV = function () {
    $http({
      method: "GET",
      url: current_url + "/api/TaiKhoan/get-loai_tai_khoan/2",
    }).then(function (response) {
    
      $scope.NhanVien = response.data;
      // $scope.products = response.data;
    });
  };
  $scope.GetNV();

  $scope.GetNhap = function () {
    $http({
      method: "GET",
      url: current_url + "/api/HoaDonNhap/get-all",
    }).then(function (response) {
    
   
      $scope.Nhap = response.data;
      console.log($scope.Nhap)
      updatePagination($scope.Nhap)
    });
  };
  $scope.GetNhap();




  // lấy danh sách nhà cung cấp
  $scope.NhaSXChanged = function() {
    const trangthai = document.querySelector("#nhacungcap");
    let liveitem = trangthai.value;
    $scope.manhasx = liveitem;
    console.log(typeof($scope.nhasx))
   
  }
  
  // lấy danh sách nhân viên
  $scope.NhanVienkhoChanged = function() {
    const trangthai = document.querySelector("#nhanviennhap");
    let liveitem = trangthai.value;
    $scope.maNVkho = liveitem;
    console.log(typeof($scope.maNVkho))
   
  }

// Nhập mới
  $scope.F5= function(){
    
    
     document.getElementById('mahd').value = '';
    document.getElementById('nhacungcap').value = 'choose';
    document.getElementById('datetimeInput').value = '';
    document.getElementById('tongtien').value = '';
    document.getElementById('nhanviennhap').value = 'choose';
    // document.getElementById('DSSanPham').value = '';
    document.getElementById('search-import').value = '';
 }
  
  // load data  chưa làm được
  $scope.loadData = function (selectedItem) {
   
     $scope.list=[];
    $scope.mahdn = selectedItem.maHoaDonNhap;
    $scope.ngaynhap = new Date(selectedItem.ngayNhap);
    $scope.tongTien = selectedItem.tongTien;
    // Lặp qua mảng NhaSX và lấy giá trị maNhaCungCap của từng phần tử
    var nhasxFound = false;
    var NVkhoFound = false;
    for (var i = 0; i < $scope.NhanVien.length; i++) {
      if (selectedItem.maTaiKhoan === $scope.NhanVien[i].maTaiKhoan) {
            $scope.NVkho = JSON.stringify($scope.NhanVien[i].maTaiKhoan);
            NVkhoFound = true;
            break;
          }
        }
    for (var i = 0; i < $scope.NhaSX.length; i++) {
          if (selectedItem.maNhaCungCap === $scope.NhaSX[i].maNhaCungCap) {
            $scope.nhasx = JSON.stringify($scope.NhaSX[i].maNhaCungCap);
            nhasxFound = true;
            break;
          }
    }
    for (var i = 0; i < selectedItem.list_json_chitiethoadonnhap.length; i++) {

      
      $scope.list[i]= selectedItem.list_json_chitiethoadonnhap[i]
      // $scope.products[i]= selectedItem.list_json_chitiethoadonnhap[i]
    }
}

// hàm xóa sản phẩm nhập
$scope.removeProduct = function(index) {
  $scope.products.splice(index, 1);
};
$scope.removeProduct1 = function(index) {
  $scope.list.splice(index, 1);
  };

//danh sách sản phẩm nhập
$scope.addProduct = function() {
  $scope.products.push({
    maSanPham: "",
    tenSanPham: "",
    soLuong: 0,
    giaNhap: 0
  });
};
$scope.Total = function() {
    $scope.total = 0; 
    for (var i = 0; i < $scope.products.length; i++) {
        var product = $scope.products[i];
        product.tongTien = product.soLuong * product.giaNhap;
        $scope.total += product.tongTien;
    }
  
    return  $scope.total;
  };

  $scope.Totallist = function() {
    $scope.totallist = 0; 
    for (var i = 0; i < $scope.list.length; i++) {
        var product = $scope.list[i];
        product.tongTien = product.soLuong * product.giaNhap;
        $scope.totallist += product.tongTien;
    }
  
    return  $scope.total;
  };
  
  // thêm xóa đơn
  $scope.them = function(){
    $scope.Total();
      var data= {
        maNhaCungCap:  $scope.nhasx,
        ngayNhap : $scope.ngaynhap,
        tongTien : $scope.total,
        maTaiKhoan : $scope.NVkho,
        list_json_chitiethoadonnhap : $scope.products
      }
     
      
      $http({
        method: 'POST',
        url: current_url + "/api/HoaDonNhap/create-hoadon",
        data: JSON.stringify(data),
    })
    .then(function(response) {
      $scope.createNhap = response.data;
      console.log($scope.createNhap)
      
      alert('Thêm thành công')
      $scope.GetNhap();
     
    })
    .catch(function(error) {
        window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
        console.error('Error:', error);
    });
    }  


    // sửa hóa đơn nhập
    $scope.Sua = function(){
      $scope.Totallist();
      var data= {
        maHoaDonNhap: $scope.mahdn,
        maNhaCungCap:  $scope.nhasx,
        ngayNhap : $scope.ngaynhap,
        tongTien : $scope.totallist,
        maTaiKhoan : $scope.NVkho,
        list_json_chitiethoadonnhap : $scope.list
      }
      $http({
        method: 'POST',
        url: current_url + "/api/HoaDonNhap/update-hoadon",
        data: JSON.stringify(data),
    })
    .then(function(response) {
      $scope.createNhap = response.data;
     
      
      alert('Sửa thành công')
      $scope.GetNhap();
     
    })
    .catch(function(error) {
        window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
        console.error('Error:', error);
    });
    }  
    // tìm kiếm theo mã hóa đơn // tìm kiếm thành công nhưng hiển thị chưa đc
    $scope.Timkiem = function(){
     
      
      if(document.getElementById('search-import') != ''){

        $http({
          method: 'GET',
          url: current_url + "/api/HoaDonNhap/get-by-id/" + $scope.searchnhap,
      })
      .then(function(response) {
        // console.log(response)
        $scope.Nhap = response;
        // console.log($scope.Nhap)
        updatePagination($scope.Nhap)
      })
      }
      else{
        alert('Nhập thông tin tìm kiếm')
      }
    }  
   // phân trang
   function updatePagination(maloaisp) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 8;
    $scope.pages = [];
    $scope.totalPages = 0;
    $scope.about= maloaisp.length
    $scope.totalPages = Math.ceil(maloaisp.length / $scope.itemsPerPage);
    for (var i = 1; i <= $scope.totalPages; i++) {
        $scope.pages.push(i);
    }
    $scope.getData = function () {
        var begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var end = begin + $scope.itemsPerPage;
        $scope.Nhap = maloaisp.slice(begin, end);
    };
    $scope.setPage = function (page) {
        $scope.currentPage = page;
        $scope.getData();
    };
    $scope.getData();
  }
});