var app = angular.module("AppBanHoa", []);

app.controller("TaiKhoan", function ($scope, $http) {

    $scope.taikhoan = [];
    $scope.upadatetk=[];
    

    // hàm lấy mã chức mục
    
    $scope.GetTaiKhoan = function () {
      $http({
        method: "GET",
        url: current_url + "/api/TaiKhoan/get-all",
      }).then(function (response) {
        
        $scope.taikhoan = response.data;
        updatePagination($scope.taikhoan)
        //    console.log($scope.taikhoan)
      });
    };
    $scope.GetTaiKhoan();
    
    $scope.levelChanged = function() {
        const chucvu = document.querySelector("#chucvu");
        let levelitem = chucvu.value;
        $scope.level = levelitem;
        // console.log( $scope.level);
    
   
    };

    // hàm lấy kiểu boolean trường trạng thái
    $scope.liveChanged = function() {
        const trangthai = document.querySelector("#trangthai");
        let liveitem = trangthai.value;
        $scope.live = liveitem;
       
    
   
    };
// loatdata
$scope.loadData = function (selectedItem) {
   
    $scope.matk = selectedItem.maTaiKhoan;
    $scope.tentk = selectedItem.tenDangNhap;
    $scope.matkhau = selectedItem.matKhau;
    $scope.hoten = selectedItem.list_json_chitiettaikhoan[0].hoTen;
    $scope.email = selectedItem.list_json_chitiettaikhoan[0].email;
    $scope.sodt = selectedItem.list_json_chitiettaikhoan[0].dienThoai;
    $scope.diachi = selectedItem.list_json_chitiettaikhoan[0].diaChi;
    
    if (selectedItem.trangThai === true) {
        $scope.live = "true";
      } else if (selectedItem.trangThai === false) {
        $scope.live= "false"; 
      } else {
        $scope.live= "choose"; 
      }

      if (selectedItem.maLoaiTaiKhoan === 1) {
        $scope.level = "1";
      } else if (selectedItem.maLoaiTaiKhoan === 2) {
        $scope.level= "2"; 
      }
      else if (selectedItem.maLoaiTaiKhoan === 3) {
        $scope.level= "3"; 
      }
       else {
        $scope.level= "choose"; 
      }
    
      
}

// nhập mới
$scope.LamMoi =function(){
  document.getElementById('hotentk').value='';
  document.getElementById('matkhau').value='';
  document.getElementById('emailtk').value='';
  document.getElementById('sdttk').value='';
  document.getElementById('diachi').value='';
  document.getElementById('matk').value='';
  document.getElementById('tentk').value='';
  document.getElementById('chucvu').value='choose';
  document.getElementById('trangthai').value='choose';
 
}
//sửa trạng thái mà mã loại tài khoản

$scope.sua = function() {
    
    var data = {
        maTaiKhoan :$scope.matk,
        tenDangNhap :'',
        matKhau: '',
        maLoaiTaiKhoan: parseInt($scope.level),
        trangThai:JSON.parse ($scope.live),
        list_json_chitiettaikhoan: [{
            maChiTietTaiKhoan: 0,
            maTaiKhoan: 0,
            hoTen: '',
            email: '',
            dienThoai: '',
            diaChi: ''
        }]
    };

   
       $http({
           method: 'POST',
           url: current_url + "/api/TaiKhoan/update-admin",
           data: JSON.stringify(data),
       })
       .then(function(response) {
         $scope.upadatetk = response.data;
         
         alert('Sửa thành công')
         $scope.GetTaiKhoan();
        
       })
      //  .catch(function(error) {
      //      alert('Thông tin không hợp lệ yêu cầu nhập lại ')
      //      console.error('Error:', error);
      //  });
   
  
} 
/// làm thêm chức năng tìm kiếm

$scope.SearchCM = function () {
  if(  document.getElementById('searchStaff').value != ''){
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










    // phân trang
    function updatePagination(maloaisp) {
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.filteredMaloaisp = [];
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
            $scope.taikhoan = maloaisp.slice(begin, end);
        };
        $scope.setPage = function (page) {
            $scope.currentPage = page;
            $scope.getData();
        };
        $scope.getData();
      }
})