var layer = layui.layer;
var form = layui.form;
$(function () {
    // 获取用户信息，将信息显示在表格中
    getUserInfoo();
})
function getUserInfoo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return layui.msg(res.message);
            }
            //获取信息成功给表单赋值
            form.val("formTest", res.data)//formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值

        },
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
}
// 点击提交修改的时候，获取输入的表单信息，提交数据给接口，提示更改成功与否
$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    // 获取表单中的数据
    var data = $(this).serialize();
    // console.log(data);
    
    $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: data,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            // layer.msg(res.message);
            window.parent.getUserInfo();
        }

    })

})
//登陆名只可读不可修改
// 邮箱格式要正确
// 跟新用户信息之后要修改左侧的欢迎
// 点击重置的时候获取原来的表单信息
$('.reset').on('click', function () {
    getUserInfoo();
})