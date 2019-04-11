$(function () {
    getTable();
});

function getTable1() {
    // $("#table").bootstrapTable({ // 对应table标签的id
    //     url: '/Interface/GetData',         //请求后台的URL（*）
    //     method: 'get',                      //请求方式（*）
    //     striped: true,                      //是否显示行间隔色
    //     cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    //     pagination: true,                   //是否显示分页（*）
    //     sortable: false,                     //是否启用排序
    //     sortOrder: "asc",                   //排序方式
    //     queryParams: function (params) {
    //         var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    //             limit: params.limit,   //页面大小
    //             offset:params.offset
    //         };
    //         return temp;
    //     },//传递参数（*）
    //     sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    //     pageNumber: 1,                       //初始化加载第一页，默认第一页
    //     pageSize: 10,                       //每页的记录行数（*）
    //     pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
    //     search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
    //     contentType: "application/x-www-form-urlencoded",
    //     strictSearch: false,
    //     showColumns: false,                  //是否显示所有的列
    //     showRefresh: false,                  //是否显示刷新按钮
    //     minimumCountColumns: 2,             //最少允许的列数
    //     clickToSelect: true,                //是否启用点击选中行
    //     height: 700,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
    //     uniqueId: "no",                     //每一行的唯一标识，一般为主键列
    //     showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
    //     cardView: false,                    //是否显示详细视图
    //     detailView: false,                   //是否显示父子表
    //     columns: [
    //         {
    //             field: 'ID',
    //             title: 'ID'
    //         }, {
    //             field: 'Name',
    //             title: '名字'
    //         }, {
    //             field: 'Sex',
    //             title: '性别'
    //         },
    //         {
    //             field: 'operate',
    //             title: '操作',
    //             formatter: operateFormatter //自定义方法，添加操作按钮
    //         },
    //     ],
    //     rowStyle: function (row, index) {
    //         var classesArr = ['success', 'info'];
    //         var strclass = "";
    //         if (index % 2 === 0) {//偶数行
    //             strclass = classesArr[0];
    //         } else {//奇数行
    //             strclass = classesArr[1];
    //         }
    //         return { classes: strclass };
    //     }//隔行变色
    //
    // });
    //
    // var queryParams = function operateFormatter(value, row, index) {//赋予的参数
    //     return [
    //         '<a class="btn active disabled" href="#">编辑</a>',
    //         '<a class="btn active" href="#">档案</a>',
    //         '<a class="btn btn-default" href="#">记录</a>',
    //         '<a class="btn active" href="#">准入</a>'
    //     ].join('');
    // };

}

window.operateEvents = {
    "click #TableEditor":function(ev,value,row,index){
        //触发点击事件后 ...
    }
};


function getTable() {
    $('#table').bootstrapTable({
        url: 'http://localhost:8888/file/list', // 请求后台的URL（*）
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
            field: 'fileName',
            title: '文件名称',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'createTimeStr',
            title: '创建时间',
            align: 'center',
            valign: 'middle'

        }, {
            field: 'count',
            title: '下载次数',
            align: 'center',
            valign: 'middle'

        }, {
            field: 'tDepartment',
            title: '操作',
            align: 'center',
            valign: 'middle',
            events: operateEvents,
            formatter: function (value, row, index) {
                return [
                    '<button id = "TableDelete" type="button" class = "buttonTheme"  data-target:"#myModal">删除</button>',
                ].join('');
            }
        }],
        silent: true, // 刷新事件必须设置
        responseHandler: function(data){
            return data.result;
        }

    });





    //使用函数，添加按钮
    function AddFunctionAlty(value,row,index){
        return [
            '<button id = "TableEditor" type="button" class = "btn btn-info btngroup" data-target:"#myModal" >编辑</button>',
            '<button id = "TableDelete" type="button" class = "btn btn-info btngroup"  data-target:"#myModal">删除</button>',
        ].join('');
    }
}
