$(document).ready(function(){
    $(".nav-tabs a").click(function(){
        $(this).tab('show');
    });
});
var password = document.getElementById("newpassword"), confirm_password = document.getElementById("password");

function validatePassword(){
if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Mật khẩu xác nhận không chính xác.");
} else {
    confirm_password.setCustomValidity('');
}
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;