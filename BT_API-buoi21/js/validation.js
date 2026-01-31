const validation = {
   
    kiemTraRong: function (value, spanId, mess) {
        if (value.trim() === "") {
            document.getElementById(spanId).innerHTML = mess;
            return false;
        }
        document.getElementById(spanId).innerHTML = "";
        return true;
    },

    
    kiemTraSo: function (value, spanId, mess) {
        const pattern = /^[0-9]+$/;
        if (value.match(pattern)) {
            document.getElementById(spanId).innerHTML = "";
            return true;
        }
        document.getElementById(spanId).innerHTML = mess;
        return false;
    }
    
 
};