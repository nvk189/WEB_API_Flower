var app = angular.module("AppBanHoa", []);

app.controller("BillOut", function ($scope, $http) {
  $scope.Ban = [];
  $scope.products = [];
  $scope.createBan = [];

  $scope.p = [];

  $scope.GetBan = function () {
    $http({
      method: "GET",
      url: current_url + "/api/HoaDon/get-all",
    }).then(function (response) {
      $scope.Ban = response.data;
      // console.log($scope.Ban)
      updatePagination($scope.Ban);
    });
  };
  $scope.GetBan();

  // lấy trạng thái hoạt động của đơn hàng
  $scope.TrangthaiChanged = function () {
    const category = document.querySelector("#trangthaihd");
    let categoryItem = category.value;
    $scope.trangthai = categoryItem;
    console.log($scope.trangthai);
  };
  // hiển thị thêm sản phẩm
  $scope.addProduct = function () {
    $scope.products.push({
      maChiTietDonHang: 0,
      maDonHang: 0,
      maSanPham: "",
      soLuong: 0,
      gia: 0,
    });
  };

  // hàm xóa sản phẩm nhập
  $scope.removeProduct = function (index) {
    $scope.products.splice(index, 1);
  };
  $scope.removeProduct1 = function (index) {
    $scope.list.splice(index, 1);
  };

  // hàm tính tổng tiền
  $scope.Total = function () {
    $scope.total = 0;
    for (var i = 0; i < $scope.products.length; i++) {
      var product = $scope.products[i];
      product.tongTien = product.soLuong * product.gia;
      $scope.total += product.tongTien;
    }

    return $scope.total;
  };

  $scope.Totallist = function () {
    $scope.total = 0;
    for (var i = 0; i < $scope.list.length; i++) {
      var product = $scope.list[i];
      product.tongTien = product.soLuong * product.gia;
      $scope.total += product.tongTien;
    }

    return $scope.total;
  };

  // tìm kiếm
  $scope.Timkiem = function () {
    if (document.getElementById("search-export") != "") {
      $http({
        method: "GET",
        url: current_url + "/api/HoaDon/get-by-id/" + $scope.searchban,
      }).then(function (response) {
        // console.log(response)
        $scope.Ban = response;
        // console.log($scope.Nhap)
        updatePagination($scope.Ban);
      });
    } else {
      alert("Nhập thông tin tìm kiếm");
    }
  };

  $scope.load = function (selectedItem) {
    $scope.list = [];
    ($scope.mahdb = selectedItem.maDonHang),
      ($scope.tenkh = selectedItem.hoTen),
      ($scope.sodt = selectedItem.dienThoai),
      ($scope.diachi = selectedItem.diaChi),
      ($scope.ngayban = new Date(selectedItem.ngayGiaoHang)),
      ($scope.tongtien = selectedItem.tongTien);
    if (selectedItem.trangThai === true) {
      $scope.trangthai = "true";
    } else if (selectedItem.trangThai === false) {
      $scope.trangthai = "false";
    }

    // for (var i = 0; i < selectedItem.list_json_chitiethoadon.length; i++) {

    //   $scope.list[i]= selectedItem.list_json_chitiethoadon[i]

    // }
    for (var i = 0; i < selectedItem.list_json_chitiethoadon.length; i++) {
      $scope.list[i] = selectedItem.list_json_chitiethoadon[i];
    }

    $scope.listdetail = []; // Initialize listdetail as an empty array

    $scope.Detail = function () {
      $http({
        method: "GET",
        url: current_url + "/api/SanPham/get-all",
      }).then(function (response) {
        var products = response.data;

        $scope.listdetailMap = {};
        for (var i = 0; i < $scope.list.length; i++) {
          var currentProduct = $scope.list[i].maSanPham;
          var matchingProduct = products.find(function (product) {
            return product.maSanPham === currentProduct;
          });

          if (matchingProduct) {
            // Create an array for each unique maSanPham
            if (!$scope.listdetailMap[currentProduct]) {
              $scope.listdetailMap[currentProduct] = [];
            }

            $scope.listdetailMap[currentProduct].push({
              maSanPham: matchingProduct.maSanPham,
              tenSanPham: matchingProduct.tenSanPham,
            });
          }
        }
      });
    };
    $scope.Detail();
  };
  // in hóa đơn
  $scope.preparePrintData = function () {
    // Set variables for the printing section
    $scope.tenkh1 = $scope.tenkh;
    $scope.sodt1 = $scope.sodt;
    $scope.diachi1 = $scope.diachi;
    // ... set other variables as needed ...

    // Open the print dialog
    // window.print();
  };

  // thêm hóa đơn bán
  $scope.them = function () {
    $scope.Total();
    var data = {
      hoTen: $scope.tenkh,
      dienThoai: $scope.sodt,
      diaChi: $scope.diachi,
      ngayDatHang: $scope.ngayban,
      ngayGiaoHang: $scope.ngayban,
      tongTien: $scope.total,
      trangThai: JSON.parse($scope.trangthai),
      list_json_chitiethoadon: $scope.products,
    };

    console.log(data);

    $http({
      method: "POST",
      url: current_url + "/api/HoaDon/create-hoadon",
      data: JSON.stringify(data),
    })
      .then(function (response) {
        $scope.createBan = response.data;
        console.log($scope.createBan);

        alert("Thêm thành công");
        $scope.GetBan();
      })
      .catch(function (error) {
        window.alert("Thông tin không hợp lệ yêu cầu nhập lại ");
        console.error("Error:", error);
      });
  };

  // hàm sửa
  $scope.sua = function () {
    $scope.Totallist();
    var data = {
      maDonHang: $scope.mahdb,
      hoTen: $scope.tenkh,
      dienThoai: $scope.sodt,
      diaChi: $scope.diachi,
      ngayDatHang: $scope.ngayban,
      ngayGiaoHang: $scope.ngayban,
      tongTien: $scope.total,
      trangThai: JSON.parse($scope.trangthai),
      list_json_chitiethoadon: $scope.list,
    };

    console.log(data);

    $http({
      method: "POST",
      url: current_url + "/api/HoaDon/update-hoadon",
      data: JSON.stringify(data),
    }).then(function (response) {
      $scope.createBan = response.data;
      console.log($scope.createBan);

      alert("Sửa  thành công");
      $scope.GetBan();
    });
    // .catch(function(error) {
    //     window.alert('Thông tin không hợp lệ yêu cầu nhập lại ')
    //     console.error('Error:', error);
    // });
  };

  // làm chức năng xóa
  $scope.xoa = function () {
    if (document.getElementById("mahd").value != "") {
      $http({
        method: "GET",
        url: current_url + "/api/HoaDon/Delete?id=" + $scope.mahdb,
      }).then(function (response) {
        // $scope.createBan = response.data;
        // console.log($scope.createBan)

        alert("xóa thành công");
        $scope.GetBan();
      });
    } else {
      alert("Chọn  sản phẩm muốm xóa");
    }
  };

  // phân trang
  function updatePagination(maloaisp) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 8;
    $scope.pages = [];
    $scope.totalPages = 0;
    $scope.about = maloaisp.length;
    $scope.totalPages = Math.ceil(maloaisp.length / $scope.itemsPerPage);
    for (var i = 1; i <= $scope.totalPages; i++) {
      $scope.pages.push(i);
    }
    $scope.getData = function () {
      var begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
      var end = begin + $scope.itemsPerPage;
      $scope.Ban = maloaisp.slice(begin, end);
    };
    $scope.setPage = function (page) {
      $scope.currentPage = page;
      $scope.getData();
    };
    $scope.getData();
  }

  // thống kê hóa đơn hiên jtiaj

  $scope.printInvoice = function () {
    // Create a new window or tab for printing
    var printWindow = window.open("", "_blank");

    // Build the HTML content dynamically
    var invoiceContent = `
        <html>
            <head>
                <style>
                    /* Add your styles here */
                </style>
            </head>
            <body ng-app="AppBanHoa" ng-controller="BillOut" onload="window.print()">
                <!-- Your existing HTML content -->
                <!-- ... -->

                <table>
                    <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                    </tr>`;

    // Add rows dynamically based on the data
    for (var i = 0; i < $scope.list.length; i++) {
      invoiceContent += `
            <tr>
                <td>${i + 1}</td>
                <td>${
                  $scope.listdetailMap[$scope.list[i].maSanPham][0].tenSanPham
                }</td>
                <td>${$scope.list[i].soLuong}</td>
                <td>${$scope.list[i].thanhTien}</td>
            </tr>`;
    }

    // Add the total row
    invoiceContent += `
            <tr>
                <td colspan="3" class="dam">Tổng</td>
                <td class="dam"><label id="tien">${$scope.tongtien}</label></td>
            </tr>
        </table>

        <div class="doi dam ky">Người mua hàng</div>
        <div class="doi dam ky">Người bán hàng</div>
        <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
        <div class="doi ky1">(Ký, ghi rõ họ tên)</div>
    </body>
</html>`;

    // Write the HTML content to the new window
    printWindow.document.write(invoiceContent);

    // Close the document writing
    printWindow.document.close();
  };
});
