const API_URL = "https://svcy.myclass.vn/api/QuanLyNhanVienApi";

const nvService = {
    layDanhSach: function() {
        return axios({
            url: `${API_URL}/LayDanhSachNhanVien`,
            method: 'GET'
        });
    },

    themNhanVien: function(nv) {
        return axios({
            url: `${API_URL}/ThemNhanVien`,
            method: 'POST',
            data: nv
        });
    },

    
    xoaNhanVien: function(maNV) {
        return axios({
            url: `${API_URL}/XoaNhanVien?maNhanVien=${maNV}`, 
            method: 'DELETE'
        });
    },

    layThongTinChiTiet: function(maNV) {
        return axios({
            url: `${API_URL}/LayThongTinNhanVien?maNhanVien=${maNV}`,
            method: 'GET'
        });
    },

    capNhatNhanVien: function(maNV, nvCapNhat) {
        return axios({
            url: `${API_URL}/CapNhatThongTinNhanVien?maNhanVien=${maNV}`,
            method: 'PUT',
            data: nvCapNhat
        });
    }
};