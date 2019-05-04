

function sendMail() {
    if($('#email').val()){
        $.ajax({
            type: "GET",
            url: "http://localhost:8888/account/send/mail?email="+$('#email').val(),
            dataType: "JSON",
            success: function (res) {
                if(res.success){
                    alert("邮件已发送！");
                }else {
                    alert(res.msg);
                }
            }
        });
    }else {
        alert("请输入邮箱！");
    }

}

function register() {
    if(!$('#username').val()){
        alert("请输入用户名！");
        return;
    }
    if(!$('#email').val()){
        alert("请输入邮箱！");
        return;
    }
    if(!$('#password').val()){
        alert("请输入密码！");
        return;
    }
    if(!$('#code').val()){
        alert("请输入邮箱验证码！");
        return;
    }
    var data = {
        "username":$('#username').val(),
        "email":$('#email').val(),
        "password":$('#password').val(),
        "code":$('#code').val()
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:8888/account/register",
        dataType: "JSON",
        data:JSON.stringify(data),
        success: function (res) {
            if(res.success){
                alert("注册成功!");
                window.location.href="signin.html";
            }else {
                alert(res.msg);
            }
        }
    });

}