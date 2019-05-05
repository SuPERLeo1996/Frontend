$(function () {
    if($.cookie('token')){
        $.ajax({
            type: "GET",
            url: "http://192.168.152.128:8888/account/login/info/get?token="+$.cookie('token'),
            dataType: "JSON",
            success: function (res) {
                if(res.success){
                    if(res.result == null){
                        $('#login').show();
                    }else {

                        $('#logout').show();
                        $("#loginInfo").show();
                        $("#loginInfo_userName").text(res.result.username);
                    }
                }
            }
        });
    }else {
        $('#login').show();
    }
    $.ajax({
        type: "GET",
        url: "http://192.168.152.128:8888/file/user/suffix/get?token="+$.cookie('token'),
        dataType: "JSON",
        success: function (res) {
            if(res.success){
                var data = res.result;
                $("#mySelect2").select2({
                    data: data
                });
            }
        }
    });

    getTable("http://192.168.152.128:8888/file/user/list?token="+$.cookie('token'));

});

function logout() {
    $.cookie('token', '', { expires: -1,path:'/ '}); // 删除 cookie
    window.location.href="index.html";
}

function uploadPage() {
    window.open('uploadFile1.html');
}

function searchList() {
    var keywords = $('#keywords').val();
    var type = $("#mySelect2").select2("data")[0];
    var url = "http://192.168.152.128:8888/file/user/list?token="+$.cookie('token');
    if(keywords){
        url += "&keywords=" + keywords;
    }
    if(type.text != "全部"){
        url += "&fileSuffix="+type.text;
    }
    $('#table').bootstrapTable('destroy');
    getTable(url);
}

window.operateEvents = {
    'click #download': function (e, value, row, index) {
        // console.log(value,row,index);
        window.open("http://192.168.152.128:8888/server/file/download/"+row["id"]);
        // $.ajax({
        //     type : "POST",
        //     url : "/wadmin/ad/deleteAd",
        //     data : {
        //         adId : row['adId']
        //     },
        //     dataType : 'JSON',
        //     success : function (data) {
        //         if (data.result != 0) {
        //             toastr.info("info", data.message);
        //             return ;
        //         }
        //         toastr.success("success", '删除成功');
        //         $("#table").bootstrapTable('remove', {
        //             field: 'adId',
        //             values: [row['adId']]
        //         });
        //     }
        // });

        // return false;
    },
    'click #delete': function (e, value, row, index) {
        $.ajax({
            type : "GET",
            url : "http://192.168.152.128:8888/file/delete?id="+row["id"],
            dataType : 'JSON',
            success : function (data) {
                if (data.success) {
                    $("#table").bootstrapTable('refresh');
                }else {
                    alert(data.msg);
                }

            }
        });

        return false;
    }
};

function getTable(url) {
    $('#table').bootstrapTable({
        url: url, // 请求后台的URL（*）
        method: 'get', // 请求方式（*）
        // toolbar : '#toolbar', // 工具按钮用哪个容器
        striped: true, // 是否显示行间隔色
        cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        sortable : false, //用 是否启排序
        // sortOrder : "asc", // 排序方式
        sidePagination: "client", // 分页方式：client客户端分页，server服务端分页（*）
        pagination: true, // 是否显示分页（*）
        pageNumber: 1,    //如果设置了分页，首页页码
        pageSize: 10,                       //每页的记录行数（*）
        // pageList: [4,5,6],        //可供选择的每页的行数（*）
        //	onlyInfoPagination:false, //设置为 true 只显示总数据数，而不显示分页
        showRefresh: false, // 是否显示刷新按钮
//		queryParamsType:'',
        clickToSelect: true, // 是否启用点击选中行
        //	uniqueId : "fileid", // 每一行的唯一标识，一般为主键列
        showToggle: false, // 是否显示详细视图和列表视图的切换按钮
        //	cardView : false, // 是否显示详细视图
        //	detailView : false, // 是否显示父子表
        search: false,   //是否启用搜索框
        columns: [{
            //field: 'Number',//可不加
            title: '序号',//标题  可不加
            align: 'center',
            valign: 'middle',
            width: 10,
            formatter: function (value, row, index) {
                return index+1;
            }
        },{
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle',
            width: 100,
        }, {
            field: 'fileSuffix',
            title: '文件类型',
            align: 'center',
            valign: 'middle',
            width: 100,

        },{
            field: 'createTimeStr',
            title: '创建时间',
            align: 'center',
            valign: 'middle',
            width: 100,

        }, {
            field: 'count',
            title: '下载次数',
            align: 'center',
            valign: 'middle',
            width: 30,

        }, {
            field: 'tDepartment',
            title: '操作',
            align: 'center',
            valign: 'middle',
            width: 55,
            events: operateEvents,
            formatter: function (value, row, index) {
                return [
                    '<div style="margin-left: 10px;"><button id = "download" class = "buttonTheme">下载</button><button id = "delete" class = "buttonTheme">删除</button></div>',
                ].join('');
            }
        }],
        silent: true, // 刷新事件必须设置
        responseHandler: function(data){
            return data.result;
        }

    });




}
