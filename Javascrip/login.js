
app
app.controller("LoginCtrl", function ($scope, $http) {
    $scope.login = function () {
        $scope.loginData = [];
        var data = {
            username: $scope.userName,
            password: $scope.password
        };
    
        $http({
            method: 'POST',
            url: "https://localhost:7165/api/TaiKhoan1/login",
            data: JSON.stringify(data),
        })
        .then(function (response) {
            $scope.loginData = response.data;
            console.log($scope.loginData.maloaitk)
            localStorage.setItem('newcart', JSON.stringify($scope.loginData.chitiet))
            console.log(localStorage.getItem('newcart'))
           
            // var customerId= 0;
            // customerId = JSON.parse(localStorage.getItem('newcart'))[0].maTaiKhoan;

            if($scope.loginData.maloaitk ===1){

                window.location.href = '/html/Home.html';
                
            }
            else if($scope.loginData.maloaitk ===2){
                
                window.location.href = '/admin/TongQuanNV.html';
            }
            else if($scope.loginData.maloaitk ===3){
                
                window.location.href = '/admin/TongQuan.html';
            }
            else{
                alert('Thông tin tài khoản hoặc mật khẩu không hợp lệ yêu cầu nhập lại')
            }
        });
        
        
        
    };
    
          // Kiểm tra tính hợp lệ của token
});


 
  app.controller("SignCtrl", function ($scope, $http) {
    $scope.dataSign;
    $scope.hoTen = '';
    $scope.email = '';
    $scope.dienThoai = '';
    $scope.diaChi = '';
    $scope.matKhau='';
    $scope.sign = function() {
        var data = {
            maTaiKhoan: 0,
            tenDangNhap: $scope.email,
            matKhau: $scope.matKhau,
            maLoaiTaiKhoan: 1,
            trangThai: true,
            list_json_chitiettaikhoan: [
                {
                    maChiTietTaiKhoan: 0,
                    maTaiKhoan: 0,
                    hoTen: $scope.hoTen,
                    email: $scope.email,
                    dienThoai: $scope.dienThoai,
                    diaChi: $scope.diaChi
                }
            ]
        };
      
        $http({
            method: 'POST',
            url: 'https://localhost:7165/api/TaiKhoan1/create',
            data: data,
        })
        .then(function(response) {
          $scope.dataSign = response.data;
          // console.log($scope.dataSign);
          alert('Đăng ký thành công')
          window.location.href = '/html/login.html'

        })
        .catch(function(error) {
            window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
            console.error('Error:', error);
        });
    }
});



    

    


