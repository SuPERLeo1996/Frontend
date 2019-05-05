

function sendMail() {
    if($('#email').val()){
        $.ajax({
            type: "GET",
            url: "http://192.168.152.128:8888/account/send/mail?email="+$('#email').val(),
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
    var reg = /^[a-zA-Z][a-zA-Z0-9]{3,12}$/
    if(!reg.test($('#username').val())){
        alert("用户名只允许输入4到12位字母和数字");
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
    var reg1 = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/;
    if(!reg1.test($('#password').val())){
        alert("密码必须由8到16位字母、数字、特殊符号线组成.");
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
        url: "http://192.168.152.128:8888/account/register",
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