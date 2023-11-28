app 
app.controller("BillCtrl", function ($scope, $http) {
$scope.Bill=[]
$scope.totalbill=0;
$scope.listBill=[];
var selectproduct = localStorage.getItem('productbill');

$scope.listBill = JSON.parse(selectproduct) 
console.log($scope.listBill)  // console.log(selectproduct[0].tenSanPham)

// xóa 
$scope.removeProduct = function(index) {
    $scope.listBill.splice(index, 1);

    // Cập nhật local storage sau khi thực hiện xóa
    localStorage.setItem('productbill', JSON.stringify($scope.listBill));

    // Cập nhật $scope.Bill (nếu cần)
    $scope.Bill = angular.copy($scope.listBill);
    TotalBill()
    };
// Kiểm tra xem có dữ liệu trong local storage không
if (selectproduct) {
   
   

    
    $scope.listBill.forEach(function(item) {
        $scope.Bill.push({
            maSanPham: item.maSanPham,
            soLuong: item.soLuong,
            gia: item.gia
        });
    });
    console.log($scope.Bill)
} else {
    // Nếu không có dữ liệu trong local storage, thêm giá trị mặc định vào $scope.products
    $scope.Bill.push({
        maSanPham: "",
        soLuong: 0,
        gia: 0
    });
}

// hàm tính tổng tiền
function TotalBill() {
    var total = 0;
    for (var i = 0; i < $scope.Bill.length; i++) {
        total += $scope.Bill[i].soLuong * $scope.Bill[i].gia;
    }
    return total;
}

// Gọi hàm để lấy tổng tiền và gán vào biến $scope.totalAmount
$scope.totalbill = TotalBill();
console.log($scope.totalbill)



// hàm thêm hóa đơn từ giỏ hàng
// $scope.them =function(){

// }
$scope.user =JSON.parse (localStorage.getItem('newcart'))
$scope.hoten= $scope.user[0].hoTen
$scope.email= $scope.user[0].email
$scope.dienthoai= $scope.user[0].dienThoai
$scope.diachi= $scope.user[0].diaChi

$scope.them = function(){
      var data= {
        hoTen : $scope.hoten,
        dienThoai : $scope.dienthoai,
        diaChi : $scope.diachi,
        ngayDatHang : $scope.ngaygiao,
        ngayGiaoHang : $scope.ngaygiao,
        tongTien : $scope.totalbill,
        trangThai : true,
        list_json_chitiethoadon: $scope.Bill
      }
     
      
   $http({
        method: 'POST',
        url: current_url_use + "/api/HoaDon/create-hoadon",
        data: JSON.stringify(data),
    })
    .then(function(response) {
      $scope.createBan = response.data;
    //   console.log($scope.createBan)
      
      alert('Đặt hàng thành công')
      window.location.href="/html/Home.html"
    
     
    })
    // .catch(function(error) {
    //     window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
    //     console.error('Error:', error);
    // });
    }  
})