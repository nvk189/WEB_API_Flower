var app = angular.module("AppBanHoa", []);

app.controller("ListProduct", function ($scope, $http) {
  // $scope.listItem = [];
  $scope.maloaisp=[];
  $scope.imgProduct = '';
  $scope.searchtensp='';
  
  $scope.GetProduct = function () {
    $http({
      method: "GET",
      url: current_url + "/api/SanPham/get-all",
    }).then(function (response) {
     
      $scope.listItem = response.data;
      updatePagination($scope.listItem)
    });
  };
  $scope.GetProduct();

  $scope.GetLoaiSP = function () {
    $http({
      method: "GET",
      url: current_url + "/api/ChuyenMuc/get-all",
    }).then(function (response) {
    
      $scope.maloaisp = response.data;
    });
  };
  $scope.GetLoaiSP();

  
  ///  hàm lấy mã chuyên mục
  $scope.getSelectedValue = function() {
    const pro = document.querySelector("#loaisp");
    let proItem = pro.value;
    $scope.loaisp = proItem;
    // console.log($scope.loaisp)

  };
  
  // hàm lấy giá trị trường đặc biệt
  
  $scope.getdb = function() {
    //   console.log($scope.dacbiet);
    const pro = document.querySelector("#dacbiet");
    let proItem = pro.value;
    $scope.dacbietma = proItem;
    console.log($scope.dacbietma)
};
$scope.NhapMoi = function(){

  document.getElementById('loaisp').value= 'choose',
  document.getElementById('masanpham').value= ' ',
  document.getElementById('tensanpham').value= ' ',
  document.getElementById('imgproduct').value= ' ',
  document.getElementById('viewimg').src= ' '
  document.getElementById('slsp').value= ' ',
  document.getElementById('giaban').value= ' ',
  document.getElementById('giagiam').value= ' ',
  document.getElementById('mota').value= ' '
  document.getElementById('dacbiet').value= 'choose '
  document.getElementById('trangthai').value= 'true '
  
 }



// hàm reload
 
var image = document.getElementById('viewimg');
// hàm click
$scope.loaiData= function(selectedItem){
  var chuyenmuc = false;
  for (var i = 0; i < $scope.maloaisp.length; i++) {
    if (selectedItem.maChuyenMuc === $scope.maloaisp[i].maChuyenMuc) {
          $scope.loaisp = JSON.stringify($scope.maloaisp[i].maChuyenMuc);
          chuyenmuc = true;
          break;
        }
      }
      // console.log(selectedItem.moTa)
  $scope.masanpham = selectedItem.maSanPham,
  $scope.tensanpham = selectedItem.tenSanPham,
  $scope.mota = selectedItem.moTa,
  
  image.src = selectedItem.anhDaiDien;
  // $scope.imgProduct = selectedItem.anhDaiDien,
  $scope.soluong = selectedItem.soLuong,
  $scope.gia = selectedItem.gia,
  $scope.giagiam = selectedItem.giaGiam
  if (selectedItem.trangThai === true) {
    $scope.trangthai = "true";
  } else if (selectedItem.trangThai === false) {
    $scope.trangthai= "false"; 
  } else {
    $scope.trangthai= "choose"; 
  }
  if (selectedItem.dacBiet === true) {
    $scope.dacbietma = "true";
  } else if (selectedItem.dacBiet === false) {
    $scope.dacbietma= "false"; 
  } else {
    $scope.dacbietma= "choose"; 
  }
}

// hàm thêm 
$scope.themsp = function() {
    var data = {
        // maSanPham: 0,
        maChuyenMuc: $scope.loaisp,
        tenSanPham: $scope.tensanpham,
        moTa: $scope.mota,
        anhDaiDien: image.src,
        gia: $scope.gia,
        giaGiam: $scope.giagiam,
        soLuong: $scope.soluong,
        trangThai: JSON.parse($scope.trangthai),
        luotXem: 0,
        dacBiet: JSON.parse($scope.dacbietma),
        list_json_chitietsanpham: [
            {
               
                moTaChiTiet:$scope.mota,
                chiTiet:$scope.mota,
            }
        ]
    };
  

    $http({
        method: 'POST',
        url: "https://localhost:7261/api/SanPham/create",
        data: JSON.stringify(data),
    })
    .then(function(response) {
      $scope.dataSign = response.data;
      // console.log($scope.dataSign);
        alert('Thêm thành công')
        $scope.GetProduct();
    })
    .catch(function(error) {
      window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
      console.error('Error:', error);
  });
    
  
}


// hàm sửa
$scope.suasp = function() {
  var data = {
      maSanPham: $scope.masanpham,
      maChuyenMuc: $scope.loaisp,
      tenSanPham: $scope.tensanpham,
      moTa: $scope.mota,
      anhDaiDien: image.src,
      gia: $scope.gia,
      giaGiam: $scope.giagiam,
      soLuong: $scope.soluong,
      trangThai: JSON.parse($scope.trangthai),
      luotXem: 0,
      dacBiet: JSON.parse($scope.dacbietma),
      list_json_chitietsanpham: [
          {
              moTaChiTiet:$scope.mota,
              chiTiet:$scope.mota,
          }
      ]
  };


  $http({
      method: 'POST',
      url: current_url + "/api/SanPham/update",
      data: JSON.stringify(data),
  })
  .then(function(response) {
    $scope.dataSign = response.data;
      alert('Sửa thành công')
      $scope.GetProduct();
  })

}


// xoa
$scope.xoasp = function() {
  var alertdelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm không?");
  if(alertdelete){
    $http({
        method: 'GET',
        url: current_url + "/api/SanPham/delete?id="+ $scope.masanpham,
    })
    .then(function(response) {
      $scope.dataSign = response.data;
        alert('Xóa thành công')
        $scope.GetProduct();
    })
  }
  else{
      // $scope.GetProduct();
      alert("Xóa thất bại")
  }

}

// tìm kiếm sản phẩm

$scope.timkiemsp = function() {

  if(document.getElementById('search-product').value!=''){

    var data ={
        page :1,
        pageSize : 10000,
        tenSanPham : $scope.searchtensp
    }
    $http({
      method: 'POST',
      url: current_url + "/api/SanPham/search",

      data : JSON.stringify(data)
  })
  .then(function(response) {
    
    $scope.listItem = response.data.data;
    console.log($scope.listItem)
    updatePagination($scope.listItem)
  })
  }
  else{
    alert("Nhập thông tin tìm kiếm")
  }

}


/// link ảnh 
  // var anhDaiDien = document.getElementById("AnhDaiDien");
  // var image = document.getElementById('viewimg');
  // var newImagePath = "./assets/img/Product/Đèn chùm/" + anhDaiDien.value.split("\\").pop();
  // image.src = newImagePath;

  /// phần trang tương ứng cho ds
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
        $scope.listItem = maloaisp.slice(begin, end);
    };
    $scope.setPage = function (page) {
        $scope.currentPage = page;
        $scope.getData();
    };
    $scope.getData();
  }
})