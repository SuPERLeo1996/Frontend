function login() {
    if(!$('#username').val()){
        alert("请输入用户名！");
        return;
    }
    if(!$('#password').val()){
        alert("请输入密码！");
        return;
    }
    var data = {
        "username":$('#username').val(),
        "password":$('#password').val()
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://192.168.152.128:8888/account/login",
        dataType: "JSON",
        data:JSON.stringify(data),
        success: function (res) {
            if(res.success){
                alert("登录成功!");
                var exp = new Date();
                exp.setTime(exp.getTime() + 24*60*60*1000);
                document.cookie = "token" + "="+ res.result + ";expires=" + exp.toGMTString()+";path=/";
                window.location.href="index.html";
            }else {
                alert(res.msg);
            }
        }
    });

}