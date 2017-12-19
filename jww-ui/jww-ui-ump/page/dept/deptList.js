layui.config({
    base: "../../js/"
}).use(['base', 'form', 'layer', 'jquery', 'table'], function () {
    var base = layui.base,
        form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery,
        table = layui.table;

    $(function(){
        window.iframeConfig = {
            iframe_1: {
                attr_name: 'iframe_1'
            }
        };
    });
    //列表加载
    var tableIns = table.render({
        //设置表头
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'deptName', title: '部门名称', sort: true, edit: 'text'},
            {field: 'sortNo', title: '排序', sort: true, edit: 'text'},
            {field: 'parentName', title: '上级部门', sort: true},
            //{field: 'enable', title: '状态', templet: '#checkboxTpl', unresize: true},
            {field: 'opt', title: '操作', fixed: 'right', width: 160, align: 'center', toolbar: '#toolBar'}
        ]],
        url: 'dept/queryListPage',
        method: 'POST',
        request: {
            pageName: 'current', //页码的参数名称，默认：page
            limitName: 'size' //每页数据量的参数名，默认：limit
        },
        response: {
            statusCode: 200, //成功的状态码，默认：0
        },
        elem: '#deptTable',
        page: {
            elem: 'pageDiv',
            limit: 10,
            limits: [10, 20, 30, 40, 50]
        }
    });

    /**注释状态操作
    //监听状态操作
    form.on('checkbox(enableCbx)', function(obj){
        // layer.tips(this.value + ' ' + this.name + '：'+ obj.elem.checked, obj.othis);
        var enable = 0;
        if(obj.elem.checked == true){
            enable = 1;
        }
        var modData = {"id":$(this).attr("data-id"),"enable":enable};
        modDeptData(modData);
    });
    */
    //监听单元格编辑
    table.on('edit(deptTable)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        // layer.msg('[ID: '+ data.id +'] ' + field + ' 字段更改为：'+ value);
        var modData = {};
        modData["id"] = data.id;
        modData[field] = value;
        // alert(JSON.stringify(modData));
        modDeptData(modData);
    });

    //监听工具条
    table.on('tool(deptTable)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data;
        $('#deptId').val(data.id);
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if (layEvent === 'detail') { //查看
            // console.log(JSON.stringify(data));
            $('#pageOpt').val('detail');
            var index = layui.layer.open({
                title: "查看部门",
                type: 2,
                content: "deptAdd.html?v=11",
                success: function (layero, index) {
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回部门列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            });
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            });
            layui.layer.full(index);
        } else if (layEvent === 'del') { //删除
            var deptIds = [data.id];
            layer.confirm('您确定要删除吗？', {icon: 3, title: '确认'}, function () {
                $.ajax({
                    type: 'DELETE',
                    url: 'dept/delBatchByIds',
                    data: JSON.stringify(deptIds),
                    success: function (data) {
                        if (data.code == 200) {
                            if (data.data === true) {
                                obj.del();
                                layer.msg("删除成功", {icon: 1, time: 2000});
                            }
                        } else {
                            layer.msg(data.message, {icon: 2});
                        }
                    }
                });
            });
        } else if (layEvent === 'edit') { //编辑
            $('#pageOpt').val('edit');
            var index = layui.layer.open({
                title: "编辑部门",
                type: 2,
                content: "deptAdd.html?v=16",
                success: function (layero, index) {
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回部门列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            });
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function () {
                layui.layer.full(index);
            });
            layui.layer.full(index);
        }
    });

    //监听表格复选框选择
    table.on('checkbox(deptTable)', function (obj) {
    });

    //查询
    $(".search_btn").click(function () {
        var searchKey = $(".search_input").val();
        tableIns.reload({
            where: { //设定异步数据接口的额外参数，任意设
                condition: {
                    dept_name: searchKey
                }
            },
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    });

    //添加部门
    $(".deptAdd_btn").click(function () {
        $('#pageOpt').val('add');
        $('#deptId').val('');
        var index = layui.layer.open({
            title: "添加部门",
            type: 2,
            content: "deptAdd.html?v=7",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回部门列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        });
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function () {
            layui.layer.full(index);
        });
        layui.layer.full(index);
    });

    //批量删除
    $(".batchDel").click(function () {
        var checkStatus = table.checkStatus('deptTable');
        if (checkStatus.data.length === 0) {
            layer.msg("请选择要删除的用户", {icon: 0, time: 2000});
            return;
        }
        layer.confirm('确定删除选中的信息？', {icon: 3, title: '确认'}, function (index) {
            var indexMsg = layer.msg('删除中，请稍候', {icon: 16, time: false, shade: 0.8});
            var deptIds = [];
            for (var i = 0; i < checkStatus.data.length; i++) {
                deptIds[i] = checkStatus.data[i].id;
            }
            $.ajax({
                type: 'DELETE',
                url: 'dept/delBatchByIds',
                data: JSON.stringify(deptIds),
                success: function (data) {
                    if (data.code == 200) {
                        if (data.data === true) {
                            layer.close(indexMsg);
                            layer.msg("删除成功", {icon: 1, time: 2000});
                            tableIns.reload({
                                page: {
                                    curr: 1 //重新从第 1 页开始
                                }
                            });
                        }
                    } else {
                        layer.msg(data.message, {icon: 2});
                    }
                }
            });
        });
    })

    function modDeptData(modData) {
        var index = layer.msg('修改中，请稍候',{icon: 16,time:false,shade:0.8});
        $.ajax({
            type: "PUT",
            url: "dept/modify",
            data: JSON.stringify(modData),
            success: function(data){
                if(data.code==200){
                    setTimeout(function(){
                        layer.close(index);
                        layer.msg("修改成功！");
                    },500);
                }else{
                    top.layer.close(index);
                    top.layer.msg("修改失败！");
                }
            },
            contentType: "application/json"
        });
    }

});