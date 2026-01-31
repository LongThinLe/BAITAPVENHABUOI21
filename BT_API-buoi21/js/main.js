function layDanhSach() {
    nvService.layDanhSach()
        .then(function(res) {
            renderTable(res.data);
        })
        .catch(function(err) {
            console.log("Lỗi lấy danh sách:", err);
        });
}

function renderTable(mangNV) {
    let content = "";
    mangNV.forEach(function(nv) {
       
        content += `
            <tr>
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.heSoChucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNV('${nv.maNhanVien}')">Xóa</button>
                    <button class="btn btn-primary" onclick="suaNV('${nv.maNhanVien}')">Sửa</button>
                </td>
            </tr>
        `;
    });
    const tBody = document.getElementById("tableDanhSach");
    if(tBody) tBody.innerHTML = content;
}

window.onload = function() {
    layDanhSach();
};

function themNhanVien() {
    const ma = document.getElementById("maNV").value; 
    const ten = document.getElementById("tenNV").value;
    const chucVu = document.getElementById("chucVu").value;
    const heSo = document.getElementById("heSo").value;
    const luongCB = document.getElementById("luongCB").value;
    const gioLam = document.getElementById("soGio").value;

    let isValid = true;
    isValid &= validation.kiemTraRong(ma, "spanMa", "Mã không được để trống");
    isValid &= validation.kiemTraRong(ten, "spanTen", "Tên không được để trống");

    if (!isValid) return; 

    const nv = new NhanVien(ma, ten, chucVu, heSo, luongCB, gioLam);

    nvService.themNhanVien(nv)
        .then(function(res) {
            alert("Thêm thành công!");
            layDanhSach();
            document.getElementById("formNV").reset(); 
        })
        .catch(function(err) {
            alert("Lỗi: Mã nhân viên đã tồn tại hoặc dữ liệu không hợp lệ!");
        });
}

function xoaNV(ma) {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên " + ma + " không?")) {
        nvService.xoaNhanVien(ma)
            .then(function(res) {
                alert("Đã xóa thành công!");
                layDanhSach(); 
            })
            .catch(function(err) {
                console.log(err);
               
                alert("Xóa thất bại! Kiểm tra lại tham số maNhanVien trong services.js");
            });
    }
}

function suaNV(ma) {
    nvService.layThongTinChiTiet(ma)
        .then(function(res) {
            const nv = res.data;
            document.getElementById("maNV").value = nv.maNhanVien;
            document.getElementById("tenNV").value = nv.tenNhanVien;
            document.getElementById("chucVu").value = nv.chucVu;
            document.getElementById("heSo").value = nv.heSoChucVu;
            document.getElementById("luongCB").value = nv.luongCoBan;
            document.getElementById("soGio").value = nv.soGioLamTrongThang;
            document.getElementById("maNV").readOnly = true;
        })
        .catch(function(err) {
            console.log("Lỗi lấy chi tiết:", err);
        });
}

function capNhatNV() {
    const ma = document.getElementById("maNV").value;
    const ten = document.getElementById("tenNV").value;
    const chucVu = document.getElementById("chucVu").value;
    const heSo = document.getElementById("heSo").value;
    const luongCB = document.getElementById("luongCB").value;
    const gioLam = document.getElementById("soGio").value;

    const nvCapNhat = new NhanVien(ma, ten, chucVu, heSo, luongCB, gioLam);

    nvService.capNhatNhanVien(ma, nvCapNhat)
        .then(function(res) {
            alert("Cập nhật thành công!");
            document.getElementById("maNV").readOnly = false;
            layDanhSach();
            document.getElementById("formNV").reset();
        })
        .catch(function(err) {
            alert("Cập nhật thất bại!");
        });
}